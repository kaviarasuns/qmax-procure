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
import { AllocationForm } from "@/components/allocation-form"

export default function AllocateComponentsPage() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/projects/allocated")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight ml-2">Allocate Components to Project</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Selection</CardTitle>
          <CardDescription>Select a project to allocate components to or create a new project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project">Select Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-alpha">Project Alpha</SelectItem>
                  <SelectItem value="project-beta">Project Beta</SelectItem>
                  <SelectItem value="project-gamma">Project Gamma</SelectItem>
                  <SelectItem value="project-delta">Project Delta</SelectItem>
                  <SelectItem value="project-epsilon">Project Epsilon</SelectItem>
                  <SelectItem value="project-zeta">Project Zeta</SelectItem>
                  <SelectItem value="new">+ Create New Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedProject === "new" && (
            <div className="space-y-4 border-t pt-4 mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-code">Project Code</Label>
                  <Input id="project-code" placeholder="Enter project code" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea id="project-description" placeholder="Enter project description" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Expected End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProject && selectedProject !== "new" && <AllocationForm projectId={selectedProject} />}
      {selectedProject === "new" && (
        <Card>
          <CardHeader>
            <CardTitle>Create Project</CardTitle>
            <CardDescription>Create the new project before allocating components</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="mr-2" onClick={() => setSelectedProject("project-new")}>
              Create Project
            </Button>
            <Button variant="outline" onClick={() => setSelectedProject("")}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
