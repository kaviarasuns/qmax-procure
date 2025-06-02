import type { Metadata } from "next"
import { Download, Filter, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Resistors Inventory",
  description: "Manage your resistors inventory",
}

export default function ResistorsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Resistors</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Resistor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resistors Inventory</CardTitle>
          <CardDescription>Manage and track all resistors in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search resistors..." className="max-w-sm" />
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
                  <DropdownMenuCheckboxItem>Low Stock</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>SMD Package</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Through-hole</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Tolerance</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>1%</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>5%</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>10%</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Manufacturer PN</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Project Reference</TableHead>
                  <TableHead>Tolerance</TableHead>
                  <TableHead>Wattage</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Resistor</TableCell>
                  <TableCell>10K</TableCell>
                  <TableCell>RC0805FR-0710KL</TableCell>
                  <TableCell>10K Ohm 1% 1/8W</TableCell>
                  <TableCell>0805 (2012 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("1245") < 100 ? "destructive" : "default"}>1245</Badge>
                  </TableCell>
                  <TableCell>Power Supply, LED Driver</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>1/8W</TableCell>
                  <TableCell>Bin A-12</TableCell>
                  <TableCell>Project Alpha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Resistor</TableCell>
                  <TableCell>4.7K</TableCell>
                  <TableCell>RC0603FR-074K7L</TableCell>
                  <TableCell>4.7K Ohm 1% 1/10W</TableCell>
                  <TableCell>0603 (1608 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("875") < 100 ? "destructive" : "default"}>875</Badge>
                  </TableCell>
                  <TableCell>Sensor Interface</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>1/10W</TableCell>
                  <TableCell>Bin A-14</TableCell>
                  <TableCell>Project Beta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Resistor</TableCell>
                  <TableCell>1K</TableCell>
                  <TableCell>CFR-25JB-1K</TableCell>
                  <TableCell>1K Ohm 5% 1/4W</TableCell>
                  <TableCell>Through-Hole</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("350") < 100 ? "destructive" : "default"}>350</Badge>
                  </TableCell>
                  <TableCell>Prototype Board</TableCell>
                  <TableCell>5%</TableCell>
                  <TableCell>1/4W</TableCell>
                  <TableCell>Bin B-3</TableCell>
                  <TableCell>Unallocated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Resistor</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>RC1206FR-07100RL</TableCell>
                  <TableCell>100 Ohm 1% 1/4W</TableCell>
                  <TableCell>1206 (3216 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("75") < 100 ? "destructive" : "default"}>75</Badge>
                  </TableCell>
                  <TableCell>Current Limiter</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>1/4W</TableCell>
                  <TableCell>Bin A-2</TableCell>
                  <TableCell>Project Gamma</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Resistor</TableCell>
                  <TableCell>220</TableCell>
                  <TableCell>MFR-25FBF52-220R</TableCell>
                  <TableCell>220 Ohm 1% 1/4W</TableCell>
                  <TableCell>Through-Hole</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("425") < 100 ? "destructive" : "default"}>425</Badge>
                  </TableCell>
                  <TableCell>LED Current Limiter</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>1/4W</TableCell>
                  <TableCell>Bin B-5</TableCell>
                  <TableCell>Project Alpha</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
