
import { Bell } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  date: string;
}

interface AlertsTableProps {
  alerts: Alert[];
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="bg-muted/30 p-3 flex items-center gap-2 border-b">
        <Bell className="h-4 w-4 text-supermarket-blue" />
        <h3 className="font-medium">Alertes récentes</h3>
      </div>
      <div className="max-h-[300px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.type === 'warning' 
                      ? 'bg-amber-100 text-amber-800' 
                      : alert.type === 'danger'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.type === 'warning' 
                      ? 'Attention' 
                      : alert.type === 'danger' 
                      ? 'Critique'
                      : 'Info'}
                  </span>
                </TableCell>
                <TableCell>{alert.message}</TableCell>
                <TableCell>{alert.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
