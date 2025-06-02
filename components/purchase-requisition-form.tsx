"use client";

import type React from "react";
import type { PurchaseItem } from "@/components/purchase-item-table";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PurchaseItemTable } from "@/components/purchase-item-table";

export function PurchaseRequisitionForm() {
  const router = useRouter();
  const [projectCode, setProjectCode] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [requestedBy, setRequestedBy] = useState("John Doe"); // Auto-populated from logged-in user
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the purchase requisition object
    const requisition = {
      projectCode,
      purchaseType,
      requestedBy,
      items,
      notes,
      dateCreated: new Date().toISOString(),
      status: "Pending",
      totalValue: items.reduce(
        (sum, item) => sum + item.cost * item.quantity,
        0
      ),
    };

    // In a real application, this would be sent to an API
    console.log("Purchase Requisition Submitted:", requisition);

    // Show success message and redirect
    alert("Purchase requisition submitted successfully!");
    router.push("/purchase-requisitions");
  };

  const calculateTotalValue = () => {
    return items
      .reduce((sum, item) => sum + item.cost * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Requisition Details</CardTitle>
          <CardDescription>
            Enter the basic information for this purchase requisition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="project-code">Project Code</Label>
              <Select
                value={projectCode}
                onValueChange={setProjectCode}
                required
              >
                <SelectTrigger id="project-code">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PROJ-ALPHA">
                    PROJ-ALPHA - Smart Home Controller
                  </SelectItem>
                  <SelectItem value="PROJ-BETA">
                    PROJ-BETA - Industrial Sensor Array
                  </SelectItem>
                  <SelectItem value="PROJ-GAMMA">
                    PROJ-GAMMA - Wireless Power Module
                  </SelectItem>
                  <SelectItem value="PROJ-DELTA">
                    PROJ-DELTA - Automated Irrigation System
                  </SelectItem>
                  <SelectItem value="PROJ-EPSILON">
                    PROJ-EPSILON - Medical Monitoring Device
                  </SelectItem>
                  <SelectItem value="PROJ-ZETA">
                    PROJ-ZETA - Solar Power Optimizer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchase-type">Type of Purchase</Label>
              <Select
                value={purchaseType}
                onValueChange={setPurchaseType}
                required
              >
                <SelectTrigger id="purchase-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proto">Proto</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Testing">Testing</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                  <SelectItem value="consumable">Consumable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requested-by">Requested By</Label>
              <Select
                value={requestedBy}
                onValueChange={setRequestedBy}
                required
              >
                <SelectTrigger id="requested-by">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                  <SelectItem value="Alice Brown">Alice Brown</SelectItem>
                  <SelectItem value="Michael Davis">Michael Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes or special requirements"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Items</CardTitle>
          <CardDescription>
            Add items to this purchase requisition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PurchaseItemTable items={items} setItems={setItems} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Items: {items.length}</span>
            <span>Total Value: ${calculateTotalValue()}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={items.length === 0 || !projectCode || !purchaseType}
          >
            Submit Requisition
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
