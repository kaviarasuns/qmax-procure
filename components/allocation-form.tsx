"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AllocationFormProps {
  projectId: string;
}

export function AllocationForm({ projectId }: AllocationFormProps) {
  const router = useRouter();
  const [allocations, setAllocations] = useState<
    Array<{
      id: string;
      componentType: string;
      componentName: string;
      quantity: number;
      available: number;
    }>
  >([]);
  const [componentType, setComponentType] = useState("");
  const [componentName, setComponentName] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Get project name from ID
  const projectName = projectId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleAddComponent = () => {
    if (!componentType || !componentName || quantity <= 0) return;

    // Get available quantity based on component type and name
    let available = 0;
    if (componentType === "resistor" && componentName === "10k-resistor") {
      available = 1245;
    } else if (
      componentType === "capacitor" &&
      componentName === "1uf-capacitor"
    ) {
      available = 856;
    } else if (componentType === "transistor" && componentName === "2n2222") {
      available = 324;
    } else if (componentType === "mosfet" && componentName === "irf540n") {
      available = 125;
    } else {
      available = 500; // Default for demo
    }

    setAllocations([
      ...allocations,
      {
        id: Date.now().toString(),
        componentType,
        componentName,
        quantity,
        available,
      },
    ]);

    // Reset form
    setComponentType("");
    setComponentName("");
    setQuantity(1);
  };

  const handleRemoveComponent = (id: string) => {
    setAllocations(allocations.filter((allocation) => allocation.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would update the database
    router.push("/projects/allocated");
  };

  const getComponentOptions = () => {
    switch (componentType) {
      case "resistor":
        return (
          <>
            <SelectItem value="10k-resistor">10K Resistor</SelectItem>
            <SelectItem value="4.7k-resistor">4.7K Resistor</SelectItem>
            <SelectItem value="1k-resistor">1K Resistor</SelectItem>
            <SelectItem value="100-resistor">100 Resistor</SelectItem>
            <SelectItem value="220-resistor">220 Resistor</SelectItem>
          </>
        );
      case "capacitor":
        return (
          <>
            <SelectItem value="1uf-capacitor">1uF Capacitor</SelectItem>
            <SelectItem value="10uf-capacitor">10uF Capacitor</SelectItem>
            <SelectItem value="100nf-capacitor">100nF Capacitor</SelectItem>
            <SelectItem value="10nf-capacitor">10nF Capacitor</SelectItem>
            <SelectItem value="1nf-capacitor">1nF Capacitor</SelectItem>
          </>
        );
      case "transistor":
        return (
          <>
            <SelectItem value="2n2222">2N2222</SelectItem>
            <SelectItem value="2n3904">2N3904</SelectItem>
            <SelectItem value="2n3906">2N3906</SelectItem>
            <SelectItem value="bc547">BC547</SelectItem>
            <SelectItem value="bc557">BC557</SelectItem>
          </>
        );
      case "mosfet":
        return (
          <>
            <SelectItem value="irf540n">IRF540N</SelectItem>
            <SelectItem value="2n7000">2N7000</SelectItem>
            <SelectItem value="irf9540n">IRF9540N</SelectItem>
            <SelectItem value="ao3400">AO3400</SelectItem>
            <SelectItem value="fqp30n06l">FQP30N06L</SelectItem>
          </>
        );
      default:
        return (
          <SelectItem value="default">Select component type first</SelectItem>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allocate Components to {projectName}</CardTitle>
        <CardDescription>
          Select components to allocate to this project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="component-type">Component Type</Label>
            <Select value={componentType} onValueChange={setComponentType}>
              <SelectTrigger id="component-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resistor">Resistor</SelectItem>
                <SelectItem value="capacitor">Capacitor</SelectItem>
                <SelectItem value="transistor">Transistor</SelectItem>
                <SelectItem value="mosfet">MOSFET</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="component-name">Component</Label>
            <Select
              value={componentName}
              onValueChange={setComponentName}
              disabled={!componentType}
            >
              <SelectTrigger id="component-name">
                <SelectValue placeholder="Select component" />
              </SelectTrigger>
              <SelectContent>{getComponentOptions()}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number.parseInt(e.target.value) || 0)
              }
              disabled={!componentName}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleAddComponent}
              disabled={!componentType || !componentName || quantity <= 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Component
            </Button>
          </div>
        </div>

        {allocations.length > 0 && (
          <div className="rounded-md border mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Component Type</TableHead>
                  <TableHead>Component Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell className="capitalize">
                      {allocation.componentType}
                    </TableCell>
                    <TableCell className="capitalize">
                      {allocation.componentName
                        .replace(/-/g, " ")
                        .replace(/(\d+)([a-z]+)/g, "$1$2")}
                    </TableCell>
                    <TableCell>{allocation.quantity}</TableCell>
                    <TableCell>{allocation.available}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          allocation.quantity <= allocation.available
                            ? "default"
                            : "destructive"
                        }
                      >
                        {allocation.quantity <= allocation.available
                          ? "Available"
                          : "Insufficient"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveComponent(allocation.id)}
                        className="h-8 w-8"
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

        <div className="space-y-2">
          <Label htmlFor="notes">Allocation Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter any notes about this allocation"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={allocations.length === 0}>
          Allocate Components
        </Button>
      </CardFooter>
    </Card>
  );
}
