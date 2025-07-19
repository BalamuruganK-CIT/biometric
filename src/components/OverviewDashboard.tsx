import { Users, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Real CoE data for demonstration
const stats = {
  totalStudents: 3247,
  activeClasses: 28,
  todaySessions: 8,
  attendanceRate: 92.3
};

const recentSessions = [
  { id: 1, class: "Artificial Intelligence", time: "09:00 AM", attended: 32, total: 35, status: "completed", venue: "AI Lab (ILP First floor)" },
  { id: 2, class: "Industrial Automation", time: "10:30 AM", attended: 28, total: 30, status: "completed", venue: "Industrial Automation Lab" },
  { id: 3, class: "VLSI Design", time: "02:00 PM", attended: 0, total: 25, status: "upcoming", venue: "VLSI Lab" },
  { id: 4, class: "IoT Technology", time: "03:30 PM", attended: 0, total: 40, status: "upcoming", venue: "WABCO & Kyutech Lab" },
];

const alerts = [
  { id: 1, message: "2 students have attendance below 75% in Drone Technology", type: "warning" },
  { id: 2, message: "VLSI Design session starting in 15 minutes", type: "info" },
  { id: 3, message: "New CoE registration for AR/VR lab completed", type: "success" },
];

export function OverviewDashboard() {
  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm md:text-base text-muted-foreground">Real-time CoE attendance monitoring and analytics</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Total Students</CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Active CoEs</CardTitle>
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.activeClasses}</div>
            <p className="text-xs text-muted-foreground">Centers active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.todaySessions}</div>
            <p className="text-xs text-muted-foreground">Scheduled today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-success">+4.8% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg md:text-xl">Today's CoE Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session) => (
                <div key={session.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted/50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm md:text-base truncate">{session.class}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{session.time}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.venue}</p>
                  </div>
                  <div className="text-right sm:text-left sm:w-auto">
                    <div className="text-xs md:text-sm font-medium">
                      {session.status === "completed" ? `${session.attended}/${session.total}` : `${session.total} enrolled`}
                    </div>
                    <Badge variant={session.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {session.status === "completed" ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg md:text-xl">CoE System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className={`h-3 w-3 md:h-4 md:w-4 mt-0.5 flex-shrink-0 ${
                    alert.type === "warning" ? "text-warning" : alert.type === "success" ? "text-success" : "text-primary"
                  }`} />
                  <p className="text-xs md:text-sm text-foreground leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}