import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Edit, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PurchaseRequisitionActions } from "@/components/purchase-requisition-actions";
import { PurchaseRequisitionTimeline } from "@/components/purchase-requisition-timeline";
// import { PurchaseRequisitionActions } from "@/components/purchase-requisition-actions";
// import { PurchaseRequisitionTimeline } from "@/components/purchase-requisition-timeline";

export const metadata: Metadata = {
  title: "Purchase Requisition Details",
  description: "View detailed information about a purchase requisition",
};

// Mock data - in a real app, this would come from an API based on the ID
const getPurchaseRequisition = (id: string) => {
  const mockData = {
    "pr-2025-001": {
      id: "PR-2025-001",
      projectCode: "PROJ-ALPHA",
      projectName: "Smart Home Controller",
      purchaseType: "Proto",
      requestedBy: "John Doe",
      requestedByEmail: "john.doe@company.com",
      status: "Pending",
      dateCreated: "2025-05-15T10:30:00Z",
      dateUpdated: "2025-05-15T10:30:00Z",
      totalValue: 2450.0,
      currency: "USD",
      notes:
        "Urgent requirement for prototype development. Please prioritize components with shorter lead times.",
      items: [
        {
          id: "1",
          itemName: "10K Resistor",
          itemCode: "RC0805FR-0710KL",
          description: "10K Ohm 1% 1/8W Surface Mount Resistor",
          quantity: 100,
          units: "pcs",
          vendor: "DigiKey",
          cost: 0.05,
          currency: "USD",
          alternatePart: "RC0805FR-0710RL",
          link: "https://www.digikey.com/product-detail/en/yageo/RC0805FR-0710KL/311-10.0KCRCT-ND/730391",
          remarks: "Standard tolerance acceptable",
          image: null,
        },
        {
          id: "2",
          itemName: "1uF Capacitor",
          itemCode: "CL10A105KB8NNNC",
          description: "1uF 50V X7R Ceramic Capacitor",
          quantity: 50,
          units: "pcs",
          vendor: "Mouser",
          cost: 0.15,
          currency: "USD",
          alternatePart: "CL10A105KA8NNNC",
          link: "https://www.mouser.com/ProductDetail/Samsung-Electro-Mechanics/CL10A105KB8NNNC",
          remarks: "X7R dielectric preferred",
          image: null,
        },
        {
          id: "3",
          itemName: "ESP32 Module",
          itemCode: "ESP32-WROOM-32",
          description: "ESP32 WiFi + Bluetooth Module",
          quantity: 10,
          units: "pcs",
          vendor: "Espressif",
          cost: 3.5,
          currency: "USD",
          alternatePart: "ESP32-WROOM-32D",
          link: "https://www.espressif.com/en/products/modules/esp32",
          remarks: "Latest revision required",
          image: null,
        },
        {
          id: "4",
          itemName: "PCB Fabrication",
          itemCode: "PCB-ALPHA-V1.2",
          description: "4-layer PCB, 100x80mm, 1.6mm thickness",
          quantity: 25,
          units: "pcs",
          vendor: "JLCPCB",
          cost: 12.0,
          currency: "USD",
          alternatePart: "",
          link: "https://jlcpcb.com/",
          remarks: "Green solder mask, HASL finish",
          image: null,
        },
        {
          id: "5",
          itemName: "Enclosure",
          itemCode: "ABS-100x80x25",
          description: "ABS Plastic Enclosure, 100x80x25mm",
          quantity: 10,
          units: "pcs",
          vendor: "Hammond",
          cost: 8.5,
          currency: "USD",
          alternatePart: "PC-100x80x25",
          link: "https://www.hammfg.com/",
          remarks: "Black color preferred",
          image: null,
        },
      ],
      timeline: [
        {
          date: "2025-05-15T10:30:00Z",
          action: "Requisition Created",
          user: "John Doe",
          description: "Purchase requisition submitted for review",
        },
        {
          date: "2025-05-15T11:15:00Z",
          action: "Under Review",
          user: "System",
          description: "Requisition assigned to procurement team",
        },
      ],
    },
  };

  return mockData[id as keyof typeof mockData] || null;
};

export default async function PurchaseRequisitionDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await props.params;
  const requisition = getPurchaseRequisition(resolvedParams.id);

  if (!requisition) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Purchase Requisition Not Found</h2>
          <p className="text-muted-foreground mt-2">
            The requested purchase requisition could not be found.
          </p>
          <Button asChild className="mt-4">
            <Link href="/purchase-requisitions">
              Back to Purchase Requisitions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/purchase-requisitions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {requisition.id}
            </h2>
            <p className="text-muted-foreground">
              Created on{" "}
              {new Date(requisition.dateCreated).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <PurchaseRequisitionActions requisition={requisition} />
        </div>
      </div>

      {/* Status and Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={getStatusColor(requisition.status)}
              className="text-sm"
            >
              {requisition.status}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requisition.items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${requisition.totalValue.toLocaleString()} {requisition.currency}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchase Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requisition.purchaseType}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column - Requisition Details */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requisition Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Project Code
                  </label>
                  <p className="text-lg font-semibold">
                    {requisition.projectCode}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {requisition.projectName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Purchase Type
                  </label>
                  <p className="text-lg font-semibold">
                    {requisition.purchaseType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Requested By
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={requisition.requestedBy}
                      />
                      <AvatarFallback>
                        {requisition.requestedBy
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{requisition.requestedBy}</p>
                      <p className="text-sm text-muted-foreground">
                        {requisition.requestedByEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Date Created
                  </label>
                  <p className="text-lg font-semibold">
                    {new Date(requisition.dateCreated).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(requisition.dateCreated).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              {requisition.notes && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Additional Notes
                    </label>
                    <p className="mt-1 text-sm">{requisition.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">
                Items ({requisition.items.length})
              </TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <Card>
                <CardHeader>
                  <CardTitle>Requested Items</CardTitle>
                  <CardDescription>
                    Detailed breakdown of all items in this requisition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Details</TableHead>
                          <TableHead>Specifications</TableHead>
                          <TableHead>Vendor & Cost</TableHead>
                          <TableHead>Additional Info</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requisition.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="font-semibold">{item.itemName}</p>
                                <p className="text-sm text-muted-foreground">
                                  Code: {item.itemCode}
                                </p>
                                <p className="text-sm">{item.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p>
                                  <span className="font-semibold">
                                    {item.quantity}
                                  </span>{" "}
                                  {item.units}
                                </p>
                                {item.alternatePart && (
                                  <p className="text-sm text-muted-foreground">
                                    Alt: {item.alternatePart}
                                  </p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="font-semibold">{item.vendor}</p>
                                <p>
                                  {item.cost.toFixed(2)} {item.currency} each
                                </p>
                                <p className="text-sm font-semibold">
                                  Total:{" "}
                                  {(item.cost * item.quantity).toFixed(2)}{" "}
                                  {item.currency}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline"
                                  >
                                    Product Link
                                  </a>
                                )}
                                {item.remarks && (
                                  <p className="text-sm text-muted-foreground">
                                    {item.remarks}
                                  </p>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline">
              <PurchaseRequisitionTimeline timeline={requisition.timeline} />
            </TabsContent>
            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>Comments & Discussion</CardTitle>
                  <CardDescription>
                    Internal comments and discussion about this requisition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No comments yet.</p>
                    <p className="text-sm">
                      Start a discussion about this requisition.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Actions and Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                Approve Requisition
              </Button>
              <Button className="w-full" variant="outline">
                Request Changes
              </Button>
              <Button className="w-full" variant="outline">
                Add Comment
              </Button>
              <Button className="w-full" variant="outline">
                Duplicate Requisition
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requisition.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate mr-2">{item.itemName}</span>
                  <span className="font-medium">
                    ${(item.cost * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  ${requisition.totalValue.toFixed(2)} {requisition.currency}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Project
                </label>
                <p className="text-sm">{requisition.projectName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Requester
                </label>
                <p className="text-sm">{requisition.requestedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm">
                  {new Date(requisition.dateUpdated).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
