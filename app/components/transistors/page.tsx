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
  title: "Transistors Inventory",
  description: "Manage your transistors inventory",
}

export default function TransistorsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transistors</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Transistor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transistors Inventory</CardTitle>
          <CardDescription>Manage and track all transistors in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search transistors..." className="max-w-sm" />
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
                  <DropdownMenuCheckboxItem>NPN</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>PNP</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Package</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>TO-92</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>SOT-23</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>SOT-223</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Manufacturer PN</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Collector Current</TableHead>
                  <TableHead>Voltage Rating</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Allocation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Transistor</TableCell>
                  <TableCell>2N2222</TableCell>
                  <TableCell>2N2222ATFR</TableCell>
                  <TableCell>NPN General Purpose</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("324") < 100 ? "destructive" : "default"}>324</Badge>
                  </TableCell>
                  <TableCell>NPN</TableCell>
                  <TableCell>800mA</TableCell>
                  <TableCell>40V</TableCell>
                  <TableCell>Bin F-5</TableCell>
                  <TableCell>Project Delta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transistor</TableCell>
                  <TableCell>2N3904</TableCell>
                  <TableCell>2N3904BU</TableCell>
                  <TableCell>NPN General Purpose</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("450") < 100 ? "destructive" : "default"}>450</Badge>
                  </TableCell>
                  <TableCell>NPN</TableCell>
                  <TableCell>200mA</TableCell>
                  <TableCell>40V</TableCell>
                  <TableCell>Bin F-2</TableCell>
                  <TableCell>Project Alpha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transistor</TableCell>
                  <TableCell>2N3906</TableCell>
                  <TableCell>2N3906-AP</TableCell>
                  <TableCell>PNP General Purpose</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("375") < 100 ? "destructive" : "default"}>375</Badge>
                  </TableCell>
                  <TableCell>PNP</TableCell>
                  <TableCell>200mA</TableCell>
                  <TableCell>40V</TableCell>
                  <TableCell>Bin F-3</TableCell>
                  <TableCell>Project Beta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transistor</TableCell>
                  <TableCell>BC547</TableCell>
                  <TableCell>BC547BTA</TableCell>
                  <TableCell>NPN General Purpose</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("85") < 100 ? "destructive" : "default"}>85</Badge>
                  </TableCell>
                  <TableCell>NPN</TableCell>
                  <TableCell>100mA</TableCell>
                  <TableCell>45V</TableCell>
                  <TableCell>Bin F-6</TableCell>
                  <TableCell>Unallocated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transistor</TableCell>
                  <TableCell>BC557</TableCell>
                  <TableCell>BC557BTA</TableCell>
                  <TableCell>PNP General Purpose</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("125") < 100 ? "destructive" : "default"}>125</Badge>
                  </TableCell>
                  <TableCell>PNP</TableCell>
                  <TableCell>100mA</TableCell>
                  <TableCell>45V</TableCell>
                  <TableCell>Bin F-7</TableCell>
                  <TableCell>Project Gamma</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
