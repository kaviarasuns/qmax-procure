import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectAllocationChart } from "@/components/project-allocation-chart"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your projects and component allocations",
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col flex-1 h-full space-y-4 p-4 pt-6 md:p-8 bg-red-50">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/projects/allocate">
              <Plus className="mr-2 h-4 w-4" />
              Allocate Components
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
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
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allocated Components</CardTitle>
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
            <div className="text-2xl font-bold">1,352</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
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
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Allocations</CardTitle>
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
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Component Allocation by Project</CardTitle>
            <CardDescription>Distribution of components across active projects</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ProjectAllocationChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Allocations</CardTitle>
            <CardDescription>Latest component allocations to projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Project Alpha</p>
                  <p className="text-sm text-muted-foreground">50 10K Resistors</p>
                </div>
                <div className="ml-auto font-medium">Today, 10:30 AM</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Project Beta</p>
                  <p className="text-sm text-muted-foreground">25 IRF540N MOSFETs</p>
                </div>
                <div className="ml-auto font-medium">Yesterday, 3:45 PM</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Project Gamma</p>
                  <p className="text-sm text-muted-foreground">100 1uF Capacitors</p>
                </div>
                <div className="ml-auto font-medium">Yesterday, 1:23 PM</div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Project Delta</p>
                  <p className="text-sm text-muted-foreground">30 2N2222 Transistors</p>
                </div>
                <div className="ml-auto font-medium">2 days ago, 9:15 AM</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/projects/allocated" className="flex items-center justify-center w-full">
                View All Allocations
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          <TabsTrigger value="all">All Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Currently active projects and their component allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Project Alpha",
                    description: "Smart Home Controller",
                    components: 245,
                    startDate: "Jan 15, 2025",
                    status: "In Progress",
                  },
                  {
                    name: "Project Beta",
                    description: "Industrial Sensor Array",
                    components: 187,
                    startDate: "Feb 3, 2025",
                    status: "In Progress",
                  },
                  {
                    name: "Project Gamma",
                    description: "Wireless Power Module",
                    components: 312,
                    startDate: "Dec 10, 2024",
                    status: "Testing",
                  },
                  {
                    name: "Project Delta",
                    description: "Automated Irrigation System",
                    components: 156,
                    startDate: "Mar 1, 2025",
                    status: "Design",
                  },
                  {
                    name: "Project Epsilon",
                    description: "Medical Monitoring Device",
                    components: 278,
                    startDate: "Feb 15, 2025",
                    status: "Prototyping",
                  },
                  {
                    name: "Project Zeta",
                    description: "Solar Power Optimizer",
                    components: 174,
                    startDate: "Jan 25, 2025",
                    status: "In Progress",
                  },
                ].map((project) => (
                  <Link href={`/projects/${project.name.toLowerCase().replace(" ", "-")}`} key={project.name}>
                    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <Badge
                            variant={
                              project.status === "In Progress"
                                ? "default"
                                : project.status === "Testing"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Components:</span>
                            <span className="font-medium">{project.components}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Started:</span>
                            <span className="font-medium">{project.startDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Projects</CardTitle>
              <CardDescription>Projects that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Completed projects would be listed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Projects</CardTitle>
              <CardDescription>Complete list of all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">All projects would be listed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
