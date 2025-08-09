"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AddComponentPage() {
  const router = useRouter()
  const [componentType, setComponentType] = useState("resistor")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/components/" + componentType + "s")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight ml-2">Add Component</h2>
      </div>

      <Tabs defaultValue="resistor" onValueChange={setComponentType}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resistor">Resistor</TabsTrigger>
          <TabsTrigger value="capacitor">Capacitor</TabsTrigger>
          <TabsTrigger value="transistor">Transistor</TabsTrigger>
          <TabsTrigger value="mosfet">MOSFET</TabsTrigger>
        </TabsList>

        <TabsContent value="resistor">
          <Card>
            <CardHeader>
              <CardTitle>Add New Resistor</CardTitle>
              <CardDescription>Enter the details for the new resistor component</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value (Ohms)</Label>
                    <Input id="value" placeholder="e.g. 10000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer-pn">Manufacturer Part Number</Label>
                    <Input id="manufacturer-pn" placeholder="e.g. RC0805FR-0710KL" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="package">Package</Label>
                    <Select defaultValue="0805">
                      <SelectTrigger id="package">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0603">0603 (1608 Metric)</SelectItem>
                        <SelectItem value="0805">0805 (2012 Metric)</SelectItem>
                        <SelectItem value="1206">1206 (3216 Metric)</SelectItem>
                        <SelectItem value="through-hole">Through-Hole</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" min="1" placeholder="e.g. 100" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="tolerance">Tolerance</Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="tolerance">
                        <SelectValue placeholder="Select tolerance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.1">0.1%</SelectItem>
                        <SelectItem value="1">1%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wattage">Wattage Rating</Label>
                    <Select defaultValue="0.125">
                      <SelectTrigger id="wattage">
                        <SelectValue placeholder="Select wattage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.1">1/10W</SelectItem>
                        <SelectItem value="0.125">1/8W</SelectItem>
                        <SelectItem value="0.25">1/4W</SelectItem>
                        <SelectItem value="0.5">1/2W</SelectItem>
                        <SelectItem value="1">1W</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Storage Location</Label>
                    <Input id="location" placeholder="e.g. Bin A-12" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-reference">Project Reference</Label>
                  <Input id="project-reference" placeholder="e.g. Power Supply, LED Driver" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter a detailed description of the component" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea id="remarks" placeholder="Any additional notes or remarks" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Add Resistor</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="mosfet">
          <Card>
            <CardHeader>
              <CardTitle>Add New MOSFET</CardTitle>
              <CardDescription>Enter the details for the new MOSFET component</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="kit-sno">Kit S.No</Label>
                    <Input id="kit-sno" placeholder="e.g. M006" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g. IRF540N" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer-pn">Manufacturer Part Number</Label>
                    <Input id="manufacturer-pn" placeholder="e.g. IRF540NPBF" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="package">Package</Label>
                    <Select defaultValue="to-220">
                      <SelectTrigger id="package">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to-220">TO-220</SelectItem>
                        <SelectItem value="to-92">TO-92</SelectItem>
                        <SelectItem value="sot-23">SOT-23</SelectItem>
                        <SelectItem value="sot-223">SOT-223</SelectItem>
                        <SelectItem value="dpak">DPAK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select defaultValue="n-channel">
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="n-channel">N-Channel</SelectItem>
                        <SelectItem value="p-channel">P-Channel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" min="1" placeholder="e.g. 50" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="voltage-rating">Voltage Rating (V)</Label>
                    <Input id="voltage-rating" placeholder="e.g. 100" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-rating">Current Rating (A)</Label>
                    <Input id="current-rating" placeholder="e.g. 33" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Storage Location</Label>
                    <Input id="location" placeholder="e.g. Bin C-5" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter a detailed description of the component" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea id="remarks" placeholder="Any additional notes or remarks" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Add MOSFET</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="capacitor">
          <Card>
            <CardHeader>
              <CardTitle>Add New Capacitor</CardTitle>
              <CardDescription>Enter the details for the new capacitor component</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Capacitor form fields would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transistor">
          <Card>
            <CardHeader>
              <CardTitle>Add New Transistor</CardTitle>
              <CardDescription>Enter the details for the new transistor component</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Transistor form fields would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
