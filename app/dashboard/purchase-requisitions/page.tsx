"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

// Purchase types from the enum in the database
type PurchaseType =
  | "Proto"
  | "Production"
  | "Testing"
  | "Maintenance"
  | "Research"
  | "asset"
  | "consumable";

// Requisition status from the enum in the database
type RequisitionStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | "In Progress"
  | "Completed"
  | "Cancelled";

interface PurchaseRequisitionItem {
  id: string;
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
  requested_by: string;
  notes?: string;
  date_created: string;
  status: RequisitionStatus;
  total_value: number;
  items?: PurchaseRequisitionItem[];
  user?: {
    email: string;
    user_metadata: {
      full_name: string;
    };
  };
}

export default function PurchaseRequisitionsPage() {
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequisitions = async () => {
      setIsLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("purchase_requisitions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching requisitions:", error);
        setRequisitions([]);
      } else if (data) {
        setRequisitions(data as PurchaseRequisition[]);
      }
      setIsLoading(false);
    };

    fetchRequisitions();
  }, []);

  // Calculate stats
  const stats = {
    total: requisitions.length,
    pending: requisitions.filter(
      (r: PurchaseRequisition) => r.status === "Pending"
    ).length,
    approved: requisitions.filter(
      (r: PurchaseRequisition) => r.status === "Approved"
    ).length,
    totalValue: requisitions.reduce(
      (sum: number, r: PurchaseRequisition) => sum + Number(r.total_value),
      0
    ),
  };

  // Shared table section for rendering a list of requisitions
  const TableSection = ({ list }: { list: PurchaseRequisition[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requisition ID</TableHead>
            <TableHead>Project Code</TableHead>
            <TableHead>Purchase Type</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Items Count</TableHead>
            <TableHead>Total Value</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : list.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No requisitions found
              </TableCell>
            </TableRow>
          ) : (
            list.map((requisition: PurchaseRequisition) => (
              <TableRow
                key={requisition.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/dashboard/purchase-requisitions/${requisition.id}`}
                    className="hover:underline"
                  >
                    {requisition.id.slice(0, 8).toUpperCase()}
                  </Link>
                </TableCell>
                <TableCell>{requisition.project_code}</TableCell>
                <TableCell>{requisition.purchase_type}</TableCell>
                <TableCell>
                  {requisition.user?.user_metadata?.full_name ||
                    requisition.user?.email}
                </TableCell>
                <TableCell>{requisition.items?.length || 0}</TableCell>
                <TableCell>{formatCurrency(requisition.total_value)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      requisition.status === "Pending"
                        ? "secondary"
                        : requisition.status === "Approved"
                        ? "default"
                        : "outline"
                    }
                  >
                    {requisition.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(requisition.date_created)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Purchase Requisitions
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard/purchase-requisitions/new">
              <Plus className="mr-2 h-4 w-4" />
              New Requisition
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requisitions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total requisitions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approval
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Ready for purchase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">Total value</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requisitions</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Requisitions</CardTitle>
              <CardDescription>
                Manage and track all purchase requisitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search requisitions..."
                    className="max-w-sm"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem>
                        Pending
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Approved
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Completed
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Purchase Type</DropdownMenuLabel>
                      <DropdownMenuCheckboxItem>Proto</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Production
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Testing
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TableSection list={requisitions} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requisitions</CardTitle>
              <CardDescription>Requisitions awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <TableSection
                list={requisitions.filter((r) => r.status === "Pending")}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Requisitions</CardTitle>
              <CardDescription>
                Requisitions approved for purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableSection
                list={requisitions.filter((r) => r.status === "Approved")}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Requisitions</CardTitle>
              <CardDescription>
                Requisitions that have been fulfilled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TableSection
                list={requisitions.filter((r) => r.status === "Completed")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
