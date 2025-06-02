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
  title: "Capacitors Inventory",
  description: "Manage your capacitors inventory",
}

export default function CapacitorsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Capacitors</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Capacitor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Capacitors Inventory</CardTitle>
          <CardDescription>Manage and track all capacitors in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search capacitors..." className="max-w-sm" />
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
                  <DropdownMenuCheckboxItem>Ceramic</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Electrolytic</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Voltage Rating</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>16V</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>25V</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>50V</DropdownMenuCheckboxItem>
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
                  <TableHead>Voltage Rating</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Capacitor</TableCell>
                  <TableCell>1uF</TableCell>
                  <TableCell>CL10A105KB8NNNC</TableCell>
                  <TableCell>1uF 50V X7R</TableCell>
                  <TableCell>0603 (1608 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("856") < 100 ? "destructive" : "default"}>856</Badge>
                  </TableCell>
                  <TableCell>Power Supply, Filter</TableCell>
                  <TableCell>50V</TableCell>
                  <TableCell>Ceramic</TableCell>
                  <TableCell>Bin D-12</TableCell>
                  <TableCell>Project Gamma</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Capacitor</TableCell>
                  <TableCell>10uF</TableCell>
                  <TableCell>CL21A106KOQNNNE</TableCell>
                  <TableCell>10uF 16V X5R</TableCell>
                  <TableCell>0805 (2012 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("625") < 100 ? "destructive" : "default"}>625</Badge>
                  </TableCell>
                  <TableCell>Power Decoupling</TableCell>
                  <TableCell>16V</TableCell>
                  <TableCell>Ceramic</TableCell>
                  <TableCell>Bin D-14</TableCell>
                  <TableCell>Project Alpha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Capacitor</TableCell>
                  <TableCell>100nF</TableCell>
                  <TableCell>CL05B104KO5NNNC</TableCell>
                  <TableCell>100nF 16V X7R</TableCell>
                  <TableCell>0402 (1005 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("1250") < 100 ? "destructive" : "default"}>1250</Badge>
                  </TableCell>
                  <TableCell>Digital Decoupling</TableCell>
                  <TableCell>16V</TableCell>
                  <TableCell>Ceramic</TableCell>
                  <TableCell>Bin D-3</TableCell>
                  <TableCell>Multiple Projects</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Capacitor</TableCell>
                  <TableCell>470uF</TableCell>
                  <TableCell>UVR1C471MED</TableCell>
                  <TableCell>470uF 16V</TableCell>
                  <TableCell>Radial, 8x11.5mm</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("75") < 100 ? "destructive" : "default"}>75</Badge>
                  </TableCell>
                  <TableCell>Power Supply</TableCell>
                  <TableCell>16V</TableCell>
                  <TableCell>Electrolytic</TableCell>
                  <TableCell>Bin E-2</TableCell>
                  <TableCell>Project Beta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Capacitor</TableCell>
                  <TableCell>22pF</TableCell>
                  <TableCell>C0G0603C220J5GACTU</TableCell>
                  <TableCell>22pF 50V C0G/NP0</TableCell>
                  <TableCell>0603 (1608 Metric)</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("425") < 100 ? "destructive" : "default"}>425</Badge>
                  </TableCell>
                  <TableCell>Crystal Oscillator</TableCell>
                  <TableCell>50V</TableCell>
                  <TableCell>Ceramic</TableCell>
                  <TableCell>Bin D-5</TableCell>
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
