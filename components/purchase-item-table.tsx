"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Trash, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { BulkUploadDialog } from "@/components/bulk-upload-dialog";

interface PurchaseItem {
  id: string;
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
  image: File | null;
}

interface PurchaseItemTableProps {
  items: PurchaseItem[];
  setItems: (items: PurchaseItem[]) => void;
}

export function PurchaseItemTable({ items, setItems }: PurchaseItemTableProps) {
  const [newItem, setNewItem] = useState<Partial<PurchaseItem>>({
    itemName: "",
    itemCode: "",
    description: "",
    quantity: 1,
    units: "pcs",
    vendor: "",
    cost: 0,
    currency: "USD",
    alternatePart: "",
    link: "",
    remarks: "",
    image: null,
  });

  const handleAddItem = () => {
    if (
      !newItem.itemName ||
      !newItem.itemCode ||
      !newItem.quantity ||
      !newItem.cost
    ) {
      alert(
        "Please fill in all required fields (Item Name, Item Code, Quantity, Cost)"
      );
      return;
    }

    const item: PurchaseItem = {
      id: Date.now().toString(),
      itemName: newItem.itemName || "",
      itemCode: newItem.itemCode || "",
      description: newItem.description || "",
      quantity: newItem.quantity || 1,
      units: newItem.units || "pcs",
      vendor: newItem.vendor || "",
      cost: newItem.cost || 0,
      currency: newItem.currency || "USD",
      alternatePart: newItem.alternatePart || "",
      link: newItem.link || "",
      remarks: newItem.remarks || "",
      image: newItem.image || null,
    };

    setItems([...items, item]);

    // Reset form
    setNewItem({
      itemName: "",
      itemCode: "",
      description: "",
      quantity: 1,
      units: "pcs",
      vendor: "",
      cost: 0,
      currency: "USD",
      alternatePart: "",
      link: "",
      remarks: "",
      image: null,
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewItem({ ...newItem, image: file });
  };

  const handleBulkAdd = (newItems: any[]) => {
    setItems([...items, ...newItems]);
  };

  return (
    <div className="space-y-6">
      {/* Add New Item Form */}
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Add New Item</h3>
          <BulkUploadDialog onItemsAdded={handleBulkAdd} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name *</Label>
            <Input
              id="item-name"
              placeholder="e.g., 10K Resistor"
              value={newItem.itemName}
              onChange={(e) =>
                setNewItem({ ...newItem, itemName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-code">Item Code *</Label>
            <Input
              id="item-code"
              placeholder="e.g., RC0805FR-0710KL"
              value={newItem.itemCode}
              onChange={(e) =>
                setNewItem({ ...newItem, itemCode: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., 10K Ohm 1% 1/8W"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  quantity: Number.parseInt(e.target.value) || 1,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="units">Units</Label>
            <Select
              value={newItem.units}
              onValueChange={(value) =>
                setNewItem({ ...newItem, units: value })
              }
            >
              <SelectTrigger id="units">
                <SelectValue placeholder="Select units" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pcs">pcs</SelectItem>
                <SelectItem value="units">units</SelectItem>
                <SelectItem value="sets">sets</SelectItem>
                <SelectItem value="meters">meters</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="liters">liters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendor">Specific Vendor</Label>
            <Input
              id="vendor"
              placeholder="e.g., DigiKey, Mouser"
              value={newItem.vendor}
              onChange={(e) =>
                setNewItem({ ...newItem, vendor: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Approximate Cost *</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              min="0"
              value={newItem.cost}
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  cost: Number.parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={newItem.currency}
              onValueChange={(value) =>
                setNewItem({ ...newItem, currency: value })
              }
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="alternate-part">Alternate Part</Label>
            <Input
              id="alternate-part"
              placeholder="e.g., Alternative part number"
              value={newItem.alternatePart}
              onChange={(e) =>
                setNewItem({ ...newItem, alternatePart: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link (If Any)</Label>
            <Input
              id="link"
              type="url"
              placeholder="e.g., https://www.digikey.com/..."
              value={newItem.link}
              onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Any additional notes"
              value={newItem.remarks}
              onChange={(e) =>
                setNewItem({ ...newItem, remarks: e.target.value })
              }
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {newItem.image ? newItem.image.name : "Upload Image"}
              </Button>
            </div>
          </div>
        </div>
        <Button type="button" onClick={handleAddItem} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Item to Requisition
        </Button>
      </div>

      {/* Items Table */}
      {items.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Item Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.units}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.cost.toFixed(2)}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>
                    {(item.cost * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No items added yet. Use the form above to add items to this purchase
          requisition.
        </div>
      )}
    </div>
  );
}
