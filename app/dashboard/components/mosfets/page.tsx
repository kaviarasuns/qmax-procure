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
  title: "MOSFETs Inventory",
  description: "Manage your MOSFETs inventory",
}

export default function MosfetsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">MOSFETs</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add MOSFET
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MOSFETs Inventory</CardTitle>
          <CardDescription>Manage and track all MOSFETs in your inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Search MOSFETs..." className="max-w-sm" />
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
                  <DropdownMenuCheckboxItem>N-Channel</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>P-Channel</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Voltage Rating</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>&lt; 30V</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>30V - 60V</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>&gt; 60V</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S.No</TableHead>
                  <TableHead>Kit S.No</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Manufacturer PN</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Voltage Rating</TableHead>
                  <TableHead>Current Rating</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>M001</TableCell>
                  <TableCell>IRF540N</TableCell>
                  <TableCell>IRF540NPBF</TableCell>
                  <TableCell>N-Channel 100V 33A</TableCell>
                  <TableCell>TO-220</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("125") < 50 ? "destructive" : "default"}>125</Badge>
                  </TableCell>
                  <TableCell>100V</TableCell>
                  <TableCell>33A</TableCell>
                  <TableCell>Bin C-5</TableCell>
                  <TableCell>Power switching applications</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>M002</TableCell>
                  <TableCell>2N7000</TableCell>
                  <TableCell>2N7000-G</TableCell>
                  <TableCell>N-Channel 60V 200mA</TableCell>
                  <TableCell>TO-92</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("250") < 50 ? "destructive" : "default"}>250</Badge>
                  </TableCell>
                  <TableCell>60V</TableCell>
                  <TableCell>200mA</TableCell>
                  <TableCell>Bin C-2</TableCell>
                  <TableCell>Low power switching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>M003</TableCell>
                  <TableCell>IRF9540N</TableCell>
                  <TableCell>IRF9540NPBF</TableCell>
                  <TableCell>P-Channel -100V -23A</TableCell>
                  <TableCell>TO-220</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("85") < 50 ? "destructive" : "default"}>85</Badge>
                  </TableCell>
                  <TableCell>-100V</TableCell>
                  <TableCell>-23A</TableCell>
                  <TableCell>Bin C-6</TableCell>
                  <TableCell>High-side switching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>4</TableCell>
                  <TableCell>M004</TableCell>
                  <TableCell>AO3400</TableCell>
                  <TableCell>AO3400A</TableCell>
                  <TableCell>N-Channel 30V 5.7A</TableCell>
                  <TableCell>SOT-23</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("45") < 50 ? "destructive" : "default"}>45</Badge>
                  </TableCell>
                  <TableCell>30V</TableCell>
                  <TableCell>5.7A</TableCell>
                  <TableCell>Bin C-1</TableCell>
                  <TableCell>SMD applications</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>5</TableCell>
                  <TableCell>M005</TableCell>
                  <TableCell>FQP30N06L</TableCell>
                  <TableCell>FQP30N06L</TableCell>
                  <TableCell>N-Channel 60V 30A</TableCell>
                  <TableCell>TO-220</TableCell>
                  <TableCell>
                    <Badge variant={Number.parseInt("75") < 50 ? "destructive" : "default"}>75</Badge>
                  </TableCell>
                  <TableCell>60V</TableCell>
                  <TableCell>30A</TableCell>
                  <TableCell>Bin C-4</TableCell>
                  <TableCell>Motor control applications</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
