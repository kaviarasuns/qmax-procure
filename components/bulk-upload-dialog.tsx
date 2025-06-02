"use client";

import type React from "react";

import { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BulkUploadItem {
  itemName: string;
  itemCode: string;
  description: string;
  quantity: number;
  units: string;
  vendor: string;
  cost: number;
  currency: string;
  alternatePart: string;
  link: string;
  remarks: string;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
  value: any;
}

interface BulkUploadDialogProps {
  onItemsAdded: (items: any[]) => void;
}

export function BulkUploadDialog({ onItemsAdded }: BulkUploadDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validItems, setValidItems] = useState<BulkUploadItem[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const expectedColumns = [
    "itemName",
    "itemCode",
    "description",
    "quantity",
    "units",
    "vendor",
    "cost",
    "currency",
    "alternatePart",
    "link",
    "remarks",
  ];

  const requiredColumns = ["itemName", "itemCode", "quantity", "cost"];

  const validateItem = (item: any, rowIndex: number): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Check required fields
    requiredColumns.forEach((field) => {
      if (!item[field] || item[field].toString().trim() === "") {
        errors.push({
          row: rowIndex + 1,
          field,
          message: `${field} is required`,
          value: item[field],
        });
      }
    });

    // Validate quantity
    if (
      item.quantity &&
      (isNaN(Number(item.quantity)) || Number(item.quantity) <= 0)
    ) {
      errors.push({
        row: rowIndex + 1,
        field: "quantity",
        message: "Quantity must be a positive number",
        value: item.quantity,
      });
    }

    // Validate cost
    if (item.cost && (isNaN(Number(item.cost)) || Number(item.cost) < 0)) {
      errors.push({
        row: rowIndex + 1,
        field: "cost",
        message: "Cost must be a non-negative number",
        value: item.cost,
      });
    }

    // Validate URL if provided
    if (item.link && item.link.trim() !== "") {
      try {
        new URL(item.link);
      } catch {
        errors.push({
          row: rowIndex + 1,
          field: "link",
          message: "Invalid URL format",
          value: item.link,
        });
      }
    }

    return errors;
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""));
      const item: any = {};

      headers.forEach((header, index) => {
        item[header] = values[index] || "";
      });

      data.push(item);
    }

    return data;
  };

  const parseXLSX = (buffer: ArrayBuffer): any[] => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setErrors([]);
    setValidItems([]);

    try {
      let data: any[] = [];

      if (file.name.endsWith(".csv")) {
        const text = await file.text();
        setProgress(25);
        data = parseCSV(text);
      } else if (file.name.endsWith(".xlsx")) {
        const buffer = await file.arrayBuffer();
        setProgress(25);
        data = parseXLSX(buffer);
      }

      setProgress(50);

      // Validate data
      const allErrors: ValidationError[] = [];
      const validatedItems: BulkUploadItem[] = [];

      data.forEach((item, index) => {
        const itemErrors = validateItem(item, index);
        allErrors.push(...itemErrors);

        if (itemErrors.length === 0) {
          validatedItems.push({
            itemName: item.itemName?.toString() || "",
            itemCode: item.itemCode?.toString() || "",
            description: item.description?.toString() || "",
            quantity: Number(item.quantity) || 1,
            units: item.units?.toString() || "pcs",
            vendor: item.vendor?.toString() || "",
            cost: Number(item.cost) || 0,
            currency: item.currency?.toString() || "USD",
            alternatePart: item.alternatePart?.toString() || "",
            link: item.link?.toString() || "",
            remarks: item.remarks?.toString() || "",
          });
        }
      });

      setProgress(75);
      setErrors(allErrors);
      setValidItems(validatedItems);
      setProgress(100);
      setShowPreview(true);
    } catch (error) {
      setErrors([
        {
          row: 0,
          field: "file",
          message: `Error processing file: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          value: file.name,
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setShowPreview(false);
      processFile(selectedFile);
    }
  };

  const handleAddItems = () => {
    const itemsToAdd = validItems.map((item) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...item,
      image: null,
    }));

    onItemsAdded(itemsToAdd);
    setOpen(false);
    setFile(null);
    setShowPreview(false);
    setValidItems([]);
    setErrors([]);
  };

  const downloadTemplate = () => {
    const template = [
      expectedColumns,
      [
        "10K Resistor",
        "RC0805FR-0710KL",
        "10K Ohm 1% 1/8W",
        "100",
        "pcs",
        "DigiKey",
        "0.05",
        "USD",
        "RC0805FR-0710KL-ALT",
        "https://www.digikey.com/...",
        "Standard resistor",
      ],
    ];

    const csvContent = template.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "purchase_items_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-lg">
          <Upload className="mr-2 h-4 w-4" />
          Bulk Upload Items
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Bulk Upload Purchase Items</DialogTitle>
          <DialogDescription>
            Upload a CSV or XLSX file to add multiple items at once.
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={downloadTemplate}
            >
              Download template file
            </Button>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bulk-file">Select File (.csv or .xlsx)</Label>
            <Input
              id="bulk-file"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
            />
          </div>

          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="text-sm">Processing file...</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Found {errors.length} validation error(s). Please fix these
                issues:
              </AlertDescription>
            </Alert>
          )}

          {errors.length > 0 && (
            <ScrollArea className="h-32 w-full border rounded-md p-2">
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600">
                    Row {error.row}: {error.field} - {error.message}
                    {error.value && (
                      <span className="text-gray-500">
                        {" "}
                        (value: "{error.value}")
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {showPreview && validItems.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">
                  {validItems.length} valid item(s) ready to import
                </span>
              </div>

              <ScrollArea className="h-48 w-full border rounded-md">
                <div className="p-2 space-y-2">
                  {validItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.itemName}</div>
                        <div className="text-sm text-gray-600">
                          {item.itemCode} • Qty: {item.quantity} • ${item.cost}
                        </div>
                      </div>
                      <Badge variant="secondary">{item.currency}</Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {file && !isProcessing && (
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-sm">
                <strong>File:</strong> {file.name} (
                {(file.size / 1024).toFixed(1)} KB)
              </div>
              {showPreview && (
                <div className="text-sm mt-1">
                  <strong>Summary:</strong> {validItems.length} valid items,{" "}
                  {errors.length} errors
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddItems}
            disabled={!showPreview || validItems.length === 0}
          >
            Add {validItems.length} Item(s)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
