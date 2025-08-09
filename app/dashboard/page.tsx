import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "@/components/search";
import { Overview } from "@/components/overview";
import { RecentActivity } from "@/components/recent-activity";
import { createClient } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Inventory Dashboard",
  description: "Manage your electronic components inventory",
};

export default async function DashboardPage() {
  // Add this temporarily to your page.tsx
  console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "SERVICE_ROLE_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ? "Present" : "Missing"
  );
  console.log(
    "ANON_KEY:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing"
  );
  const supabase = await createClient(); // Use the server-side client

  // Fetch users from Supabase and log to console
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.log("Error fetching users:", error);
  } else {
    console.log("Supabase users:", users);
  }
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Inventory Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <Search />
          <Button>Add Component</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Components
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">
              +12 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
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
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Component Types
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
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+1 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
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
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              Component distribution by category
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest inventory changes</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link
                href="/activity"
                className="flex items-center justify-center w-full"
              >
                View All Activity
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Component Categories</CardTitle>
            <CardDescription>
              Quick access to component categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link href="/components/resistors">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Resistors</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">1,245 items</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/components/capacitors">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Capacitors</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">856 items</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/components/transistors">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">Transistors</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">324 items</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/components/mosfets">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">MOSFETs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">428 items</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Link
                href="/components"
                className="flex items-center justify-center w-full"
              >
                View All Categories
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
