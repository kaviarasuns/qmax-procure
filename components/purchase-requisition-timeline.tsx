import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TimelineEvent {
  date: string;
  action: string;
  user: string;
  description: string;
}

interface PurchaseRequisitionTimelineProps {
  timeline: TimelineEvent[];
}

export function PurchaseRequisitionTimeline({
  timeline,
}: PurchaseRequisitionTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
        <CardDescription>
          Track the progress of this purchase requisition
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt={event.user} />
                <AvatarFallback>
                  {event.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{event.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} at{" "}
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground">by {event.user}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
