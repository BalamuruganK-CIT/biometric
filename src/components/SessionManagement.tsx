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

// Mock data
const sessions = [
  {
    id: 1,
    className: "Computer Science 101",
    classCode: "CS101",
    date: "2024-07-19",
    time: "09:00 AM",
    duration: 90,
    status: "completed",
    attendees: 45,
    totalStudents: 50,
    location: "Room A-201"
  },
  {
    id: 2,
    className: "Mathematics 202",
    classCode: "MATH202",
    date: "2024-07-19",
    time: "11:00 AM",
    duration: 75,
    status: "completed",
    attendees: 28,
    totalStudents: 30,
    location: "Room B-105"
  },
  {
    id: 3,
    className: "Physics 301",
    classCode: "PHYS301",
    date: "2024-07-19",
    time: "02:00 PM",
    duration: 120,
    status: "upcoming",
    attendees: 0,
    totalStudents: 35,
    location: "Lab C-301"
  },
  {
    id: 4,
    className: "Chemistry 201",
    classCode: "CHEM201",
    date: "2024-07-19",
    time: "03:30 PM",
    duration: 90,
    status: "upcoming",
    attendees: 0,
    totalStudents: 40,
    location: "Lab D-201"
  },
  {
    id: 5,
    className: "Computer Science 101",
    classCode: "CS101",
    date: "2024-07-20",
    time: "09:00 AM",
    duration: 90,
    status: "scheduled",
    attendees: 0,
    totalStudents: 50,
    location: "Room A-201"
  }
];

const classes = ["CS101 - Computer Science 101", "MATH202 - Mathematics 202", "PHYS301 - Physics 301"];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Session Management</h2>
          <p className="text-muted-foreground">Schedule and monitor class sessions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionClass">Select Class</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sessionDate">Date</Label>
                  <Input id="sessionDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="sessionTime">Time</Label>
                  <Input id="sessionTime" type="time" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="90" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Room A-101" />
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search sessions by class name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-lg">{session.className}</CardTitle>
                    <p className="text-sm text-muted-foreground">{session.classCode}</p>
                  </div>
                  <Badge className={getStatusColor(session.status)}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {session.status === "upcoming" && (
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <Play className="mr-1 h-3 w-3" />
                      Start Session
                    </Button>
                  )}
                  {session.status === "active" && (
                    <Button size="sm" variant="destructive">
                      <Square className="mr-1 h-3 w-3" />
                      End Session
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{session.time} ({session.duration}min)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{session.attendees}/{session.totalStudents} students</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Location: </span>
                  <span className="font-medium">{session.location}</span>
                </div>
              </div>
              
              {session.status === "completed" && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Attendance Rate</span>
                    <span className={`text-sm font-medium ${
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sessions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}