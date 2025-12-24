import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function StatsCard({ title, value, icon: Icon, change, trend }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn("text-xs", trend === "up" ? "text-success" : "text-destructive")}>
            {trend === "up" ? "+" : "-"}
            {change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
