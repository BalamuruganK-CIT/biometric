import { useState } from "react";
import { Calendar, Clock, Users, Play, Square, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Real CoE session data
const sessions = [
  {
    id: 1,
    className: "Artificial Intelligence",
    classCode: "AI-001",
    date: "2024-07-19",
    time: "09:00 AM",
    duration: 90,
    status: "completed",
    attendees: 32,
    totalStudents: 35,
    location: "AI Lab (ILP First floor)",
    instructor: "Dr. Nithiya Baskaran"
  },
  {
    id: 2,
    className: "Industrial Automation",
    classCode: "IA-001",
    date: "2024-07-19",
    time: "10:30 AM",
    duration: 120,
    status: "completed",
    attendees: 28,
    totalStudents: 30,
    location: "Industrial Automation Lab",
    instructor: "Sugin Elankavi Rajendran"
  },
  {
    id: 3,
    className: "VLSI Design",
    classCode: "VLSI-001",
    date: "2024-07-19",
    time: "02:00 PM",
    duration: 90,
    status: "upcoming",
    attendees: 0,
    totalStudents: 25,
    location: "VLSI Lab (ILP, Non-Linear lab)",
    instructor: "Dr. Sureshkumar R"
  },
  {
    id: 4,
    className: "IoT Technology",
    classCode: "IOT-001",
    date: "2024-07-19",
    time: "03:30 PM",
    duration: 120,
    status: "upcoming",
    attendees: 0,
    totalStudents: 40,
    location: "WABCO & Kyutech lab",
    instructor: "Mr. Edward Paulraj J"
  },
  {
    id: 5,
    className: "Drone Technology",
    classCode: "DRONE-001",
    date: "2024-07-20",
    time: "11:00 AM",
    duration: 90,
    status: "scheduled",
    attendees: 0,
    totalStudents: 28,
    location: "Drone Lab",
    instructor: "Suresh A"
  },
  {
    id: 6,
    className: "BIM Technology",
    classCode: "BIM-001",
    date: "2024-07-20",
    time: "01:00 PM",
    duration: 75,
    status: "scheduled",
    attendees: 0,
    totalStudents: 22,
    location: "Digital Library near to Library",
    instructor: "Mr. S. Karthikeyan"
  }
];

const classes = [
  "AI-001 - Artificial Intelligence", 
  "IA-001 - Industrial Automation", 
  "VLSI-001 - VLSI Design",
  "IOT-001 - IoT Technology",
  "DRONE-001 - Drone Technology",
  "BIM-001 - BIM Technology"
];

export function SessionManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.classCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "active": return "bg-primary text-primary-foreground";
      case "upcoming": return "bg-warning text-warning-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getAttendanceRate = (attendees: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((attendees / total) * 100);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">CoE Session Management</h2>
          <p className="text-sm md:text-base text-muted-foreground">Schedule and monitor CoE sessions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Schedule New CoE Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionClass">Select CoE</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a CoE" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionDate">Date</Label>
                  <Input id="sessionDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="sessionTime">Time</Label>
                  <Input id="sessionTime" type="time" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="90" />
                </div>
                <div>
                  <Label htmlFor="location">Lab Location</Label>
                  <Input id="location" placeholder="Lab name" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Schedule Session
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search sessions by CoE name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sessions List */}
      <div className="space-y-3 md:space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base md:text-lg truncate">{session.className}</CardTitle>
                    <p className="text-xs md:text-sm text-muted-foreground">{session.classCode}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.instructor}</p>
                  </div>
                  <Badge className={`${getStatusColor(session.status)} text-xs`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 self-start sm:self-center">
                  {session.status === "upcoming" && (
                    <Button size="sm" className="bg-success hover:bg-success/90 text-xs px-2 py-1">
                      <Play className="mr-1 h-3 w-3" />
                      <span className="hidden sm:inline">Start</span>
                    </Button>
                  )}
                  {session.status === "active" && (
                    <Button size="sm" variant="destructive" className="text-xs px-2 py-1">
                      <Square className="mr-1 h-3 w-3" />
                      <span className="hidden sm:inline">End</span>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Session</DropdownMenuItem>
                      <DropdownMenuItem>Export Attendance</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel Session</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span>{session.time} ({session.duration}min)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <span>{session.attendees}/{session.totalStudents} students</span>
                </div>
                <div className="text-xs md:text-sm col-span-1 sm:col-span-2 lg:col-span-1">
                  <span className="text-muted-foreground">Location: </span>
                  <span className="font-medium truncate block">{session.location}</span>
                </div>
              </div>
              
              {session.status === "completed" && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Attendance Rate</span>
                    <span className={`text-xs md:text-sm font-medium ${
                      getAttendanceRate(session.attendees, session.totalStudents) >= 80 
                        ? "text-success" 
                        : getAttendanceRate(session.attendees, session.totalStudents) >= 60 
                        ? "text-warning" 
                        : "text-destructive"
                    }`}>
                      {getAttendanceRate(session.attendees, session.totalStudents)}%
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-sm md:text-base text-muted-foreground">No sessions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}