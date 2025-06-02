"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PurchaseRequisitionForm } from "@/components/purchase-requisition-form"

export default function NewPurchaseRequisitionPage() {
  const router = useRouter()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight ml-2">New Purchase Requisition</h2>
      </div>

      <PurchaseRequisitionForm />
    </div>
  )
}
