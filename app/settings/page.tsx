import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your inventory system settings",
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="component-types">Component Types</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your inventory system general settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="ElectroTech Systems" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                <Input id="low-stock-threshold" type="number" defaultValue="50" />
                <p className="text-sm text-muted-foreground">
                  Items with quantity below this threshold will be marked as low stock
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-view">Default Dashboard View</Label>
                <Select defaultValue="overview">
                  <SelectTrigger id="default-view">
                    <SelectValue placeholder="Select default view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="components">Components</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="email-notifications" />
                <Label htmlFor="email-notifications">Enable email notifications for low stock</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="component-types">
          <Card>
            <CardHeader>
              <CardTitle>Component Types</CardTitle>
              <CardDescription>Manage component types and their custom fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Resistors</h3>
                    <Button variant="outline" size="sm">
                      Edit Fields
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">12 custom fields configured</p>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Capacitors</h3>
                    <Button variant="outline" size="sm">
                      Edit Fields
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">10 custom fields configured</p>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Transistors</h3>
                    <Button variant="outline" size="sm">
                      Edit Fields
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">9 custom fields configured</p>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">MOSFETs</h3>
                    <Button variant="outline" size="sm">
                      Edit Fields
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">11 custom fields configured</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add New Component Type</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle>Storage Locations</CardTitle>
              <CardDescription>Manage storage locations for your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Location management interface would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">User management interface would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
