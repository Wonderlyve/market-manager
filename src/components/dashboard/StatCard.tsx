
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  iconColor = "text-supermarket-blue",
  change,
  trend
}: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change || description) && (
          <p className={`text-xs mt-1 ${
            trend === "up" 
              ? "text-green-600" 
              : trend === "down" 
              ? "text-red-600" 
              : "text-muted-foreground"
          }`}>
            {change || description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
