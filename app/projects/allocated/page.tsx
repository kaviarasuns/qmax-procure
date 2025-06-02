import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Download, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Allocated Components",
  description: "View all components allocated to projects",
}

export default function AllocatedComponentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight ml-2">Allocated Components</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link href="/projects/allocate">
              <Plus className="mr-2 h-4 w-4" />
              Allocate Components
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="by-project">
        <TabsList>
          <TabsTrigger value="by-project">By Project</TabsTrigger>
          <TabsTrigger value="by-component">By Component</TabsTrigger>
          <TabsTrigger value="recent">Recent Allocations</TabsTrigger>
        </TabsList>
        <TabsContent value="by-project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Components by Project</CardTitle>
              <CardDescription>View all components allocated to each project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Input placeholder="Search allocations..." className="max-w-sm" />
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
                      <DropdownMenuCheckboxItem>Project Alpha</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Project Beta</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Project Gamma</DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Component Type</DropdownMenuLabel>
                      <DropdownMenuCheckboxItem>Resistors</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Capacitors</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Transistors</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>MOSFETs</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Component Type</TableHead>
                      <TableHead>Component Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Allocated Quantity</TableHead>
                      <TableHead>Allocation Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Project Alpha</TableCell>
                      <TableCell>Resistor</TableCell>
                      <TableCell>10K Resistor</TableCell>
                      <TableCell>10K Ohm 1% 1/8W</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>May 15, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Alpha</TableCell>
                      <TableCell>Capacitor</TableCell>
                      <TableCell>1uF Capacitor</TableCell>
                      <TableCell>1uF 50V Ceramic</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>May 15, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Beta</TableCell>
                      <TableCell>MOSFET</TableCell>
                      <TableCell>IRF540N</TableCell>
                      <TableCell>N-Channel 100V 33A</TableCell>
                      <TableCell>25</TableCell>
                      <TableCell>May 14, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Gamma</TableCell>
                      <TableCell>Capacitor</TableCell>
                      <TableCell>1uF Capacitor</TableCell>
                      <TableCell>1uF 50V Ceramic</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>May 14, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Delta</TableCell>
                      <TableCell>Transistor</TableCell>
                      <TableCell>2N2222</TableCell>
                      <TableCell>NPN General Purpose</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>May 13, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Project Alpha</TableCell>
                      <TableCell>Resistor</TableCell>
                      <TableCell>220 Resistor</TableCell>
                      <TableCell>220 Ohm 1% 1/4W</TableCell>
                      <TableCell>75</TableCell>
                      <TableCell>May 10, 2025</TableCell>
                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="by-component">
          <Card>
            <CardHeader>
              <CardTitle>Allocations by Component</CardTitle>
              <CardDescription>View component allocations grouped by component type</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Component allocations would be listed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Allocations</CardTitle>
              <CardDescription>View the most recent component allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Recent allocations would be listed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
