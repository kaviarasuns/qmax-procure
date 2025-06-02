import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Purchase Requisitions",
  description: "Manage purchase requisitions for electronic components",
};

export default function PurchaseRequisitionsPage() {
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
            <Link href="/purchase-requisitions/new">
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
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
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
            <div className="text-2xl font-bold">12</div>
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
            <div className="text-2xl font-bold">28</div>
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
            <div className="text-2xl font-bold">$24,580</div>
            <p className="text-xs text-muted-foreground">This month</p>
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
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href="/purchase-requisitions/pr-2025-001"
                          className="hover:underline"
                        >
                          PR-2025-001
                        </Link>
                      </TableCell>
                      <TableCell>PROJ-ALPHA</TableCell>
                      <TableCell>Proto</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>$2,450.00</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>May 15, 2025</TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href="/purchase-requisitions/pr-2025-002"
                          className="hover:underline"
                        >
                          PR-2025-002
                        </Link>
                      </TableCell>
                      <TableCell>PROJ-BETA</TableCell>
                      <TableCell>Production</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>$1,850.00</TableCell>
                      <TableCell>
                        <Badge>Approved</Badge>
                      </TableCell>
                      <TableCell>May 14, 2025</TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href="/purchase-requisitions/pr-2025-003"
                          className="hover:underline"
                        >
                          PR-2025-003
                        </Link>
                      </TableCell>
                      <TableCell>PROJ-GAMMA</TableCell>
                      <TableCell>Testing</TableCell>
                      <TableCell>Robert Johnson</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>$980.00</TableCell>
                      <TableCell>
                        <Badge variant="outline">Completed</Badge>
                      </TableCell>
                      <TableCell>May 13, 2025</TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href="/purchase-requisitions/pr-2025-004"
                          className="hover:underline"
                        >
                          PR-2025-004
                        </Link>
                      </TableCell>
                      <TableCell>PROJ-DELTA</TableCell>
                      <TableCell>Proto</TableCell>
                      <TableCell>Alice Brown</TableCell>
                      <TableCell>6</TableCell>
                      <TableCell>$1,200.00</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pending</Badge>
                      </TableCell>
                      <TableCell>May 12, 2025</TableCell>
                    </TableRow>
                    <TableRow className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href="/purchase-requisitions/pr-2025-005"
                          className="hover:underline"
                        >
                          PR-2025-005
                        </Link>
                      </TableCell>
                      <TableCell>PROJ-EPSILON</TableCell>
                      <TableCell>Production</TableCell>
                      <TableCell>Michael Davis</TableCell>
                      <TableCell>20</TableCell>
                      <TableCell>$3,750.00</TableCell>
                      <TableCell>
                        <Badge>Approved</Badge>
                      </TableCell>
                      <TableCell>May 11, 2025</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
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
              <p className="text-sm text-muted-foreground">
                Pending requisitions would be listed here...
              </p>
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
              <p className="text-sm text-muted-foreground">
                Approved requisitions would be listed here...
              </p>
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
              <p className="text-sm text-muted-foreground">
                Completed requisitions would be listed here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
