"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
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
import { formatCurrency, formatDate } from "@/lib/format";
import { createClient } from "@/lib/supabase/client";

// Types aligned with the database schema
type PurchaseType =
  | "Proto"
  | "Production"
  | "Testing"
  | "Maintenance"
  | "Research"
  | "asset"
  | "consumable";

type RequisitionStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "In Progress"
  | "Completed"
  | "Cancelled";

interface PurchaseRequisitionItem {
  id: string;
  requisition_id: string;
  item_name: string;
  item_code?: string;
  description?: string;
  quantity: number;
  units: string;
  vendor?: string;
  cost: number;
  currency: string;
  alternate_part?: string;
  link?: string;
  remarks?: string;
}

interface PurchaseRequisition {
  id: string;
  project_code: string;
  purchase_type: PurchaseType;
  requested_by: string; // UUID
  notes?: string;
  date_created: string;
  status: RequisitionStatus;
  total_value: number;
  created_at: string;
  updated_at: string;
}

export default function PurchaseRequisitionDetailPage() {
  const params = useParams();
  const id = useMemo(() => {
    const raw = (params as Record<string, string | string[]>)?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [requisition, setRequisition] = useState<PurchaseRequisition | null>(
    null
  );
  const [items, setItems] = useState<PurchaseRequisitionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requesterName, setRequesterName] = useState<string | null>(null);
  const [requesterEmail, setRequesterEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const supabase = createClient();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Fetch requisition by id
      const { data: req, error: reqError } = await supabase
        .from("purchase_requisitions")
        .select("*")
        .eq("id", id)
        .single();

      if (reqError) {
        console.error("Error fetching requisition:", reqError);
        setError("Failed to load requisition.");
        setRequisition(null);
        setItems([]);
        setIsLoading(false);
        return;
      }

      setRequisition(req as unknown as PurchaseRequisition);

      // Fetch items for the requisition
      const { data: itemRows, error: itemsError } = await supabase
        .from("purchase_requisition_items")
        .select("*")
        .eq("requisition_id", id)
        .order("created_at", { ascending: true });

      if (itemsError) {
        console.error("Error fetching requisition items:", itemsError);
        setItems([]);
      } else {
        setItems((itemRows || []) as unknown as PurchaseRequisitionItem[]);
      }

      // Best-effort: get current user for display (RLS implies it's the requester)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const meta = user.user_metadata as
          | Record<string, unknown>
          | null
          | undefined;
        const fullName =
          typeof meta?.full_name === "string"
            ? (meta.full_name as string)
            : undefined;
        setRequesterName(fullName ?? null);
        setRequesterEmail(user.email ?? null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary" as const;
      case "approved":
        return "default" as const;
      case "rejected":
        return "destructive" as const;
      case "completed":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !requisition) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Purchase Requisition Not Found</h2>
          <p className="text-muted-foreground mt-2">
            {error ?? "The requested purchase requisition could not be found."}
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/purchase-requisitions">
              Back to Purchase Requisitions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalItems = items.length;
  const totalValue = Number(requisition.total_value || 0);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/purchase-requisitions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {requisition.id.slice(0, 8).toUpperCase()}
            </h2>
            <p className="text-muted-foreground">
              Created on {formatDate(requisition.date_created)}
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
          <PurchaseRequisitionActions
            requisition={{ id: requisition.id, status: requisition.status }}
          />
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
            <div className="text-2xl font-bold">{totalItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalValue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchase Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requisition.purchase_type}
            </div>
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
                    {requisition.project_code}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Purchase Type
                  </label>
                  <p className="text-lg font-semibold">
                    {requisition.purchase_type}
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
                        alt={requesterName ?? requisition.requested_by}
                      />
                      <AvatarFallback>
                        {(requesterName ?? requesterEmail ?? "?")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        {requesterName ??
                          requisition.requested_by.slice(0, 8).toUpperCase()}
                      </p>
                      {requesterEmail && (
                        <p className="text-sm text-muted-foreground">
                          {requesterEmail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Date Created
                  </label>
                  <p className="text-lg font-semibold">
                    {formatDate(requisition.date_created)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Updated {formatDate(requisition.updated_at)}
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
              <TabsTrigger value="items">Items ({items.length})</TabsTrigger>
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
                        {items.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center text-sm text-muted-foreground"
                            >
                              No items
                            </TableCell>
                          </TableRow>
                        ) : (
                          items.map((item) => {
                            const itemTotal =
                              Number(item.cost) * Number(item.quantity);
                            return (
                              <TableRow key={item.id}>
                                <TableCell>
                                  <div className="space-y-1">
                                    <p className="font-semibold">
                                      {item.item_name}
                                    </p>
                                    {item.item_code && (
                                      <p className="text-sm text-muted-foreground">
                                        Code: {item.item_code}
                                      </p>
                                    )}
                                    {item.description && (
                                      <p className="text-sm">
                                        {item.description}
                                      </p>
                                    )}
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
                                    {item.alternate_part && (
                                      <p className="text-sm text-muted-foreground">
                                        Alt: {item.alternate_part}
                                      </p>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="space-y-1">
                                    {item.vendor && (
                                      <p className="font-semibold">
                                        {item.vendor}
                                      </p>
                                    )}
                                    <p>
                                      {formatCurrency(Number(item.cost))}{" "}
                                      {item.currency} each
                                    </p>
                                    <p className="text-sm font-semibold">
                                      Total: {formatCurrency(itemTotal)}{" "}
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
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timeline">
              {/* Placeholder timeline until auditing is implemented */}
              <PurchaseRequisitionTimeline
                timeline={[
                  {
                    date: requisition.created_at,
                    action: "Requisition Created",
                    user: requesterName ?? requesterEmail ?? "User",
                    description: "Purchase requisition submitted",
                  },
                ]}
              />
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
              {items.map((item) => {
                const itemTotal = Number(item.cost) * Number(item.quantity);
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate mr-2">{item.item_name}</span>
                    <span className="font-medium">
                      {formatCurrency(itemTotal)}
                    </span>
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totalValue)}</span>
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
                <p className="text-sm">{requisition.project_code}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Requester
                </label>
                <p className="text-sm">
                  {requesterName ?? requisition.requested_by}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm">{formatDate(requisition.updated_at)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
