"use client";

import {
  MoreHorizontal,
  Check,
  X,
  MessageSquare,
  Copy,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PurchaseRequisitionActionsProps {
  requisition: {
    id: string;
    status: string;
  };
}

export function PurchaseRequisitionActions({
  requisition,
}: PurchaseRequisitionActionsProps) {
  const handleApprove = () => {
    // Handle approval logic
    console.log("Approving requisition:", requisition.id);
  };

  const handleReject = () => {
    // Handle rejection logic
    console.log("Rejecting requisition:", requisition.id);
  };

  const handleDuplicate = () => {
    // Handle duplication logic
    console.log("Duplicating requisition:", requisition.id);
  };

  const handleExport = () => {
    // Handle export logic
    console.log("Exporting requisition:", requisition.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {requisition.status === "Pending" && (
          <>
            <DropdownMenuItem onClick={handleApprove}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleReject}>
              <X className="mr-2 h-4 w-4" />
              Reject
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Add Comment
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
