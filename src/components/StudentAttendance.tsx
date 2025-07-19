import { useState } from "react";
import { Calendar, Clock, MapPin, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiometricScanner } from "./BiometricScanner";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  className: string;
  sessionTitle: string;
  instructor: string;
  startTime: string;
  endTime: string;
  location: string;
  attendanceCount: number;
  totalStudents: number;
  status: 'active' | 'upcoming' | 'ended';
}

const mockSessions: Session[] = [
  {
    id: "1",
    className: "Computer Science 101",
    sessionTitle: "Introduction to Programming",
    instructor: "Dr. Sarah Johnson",
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    location: "Room A-201",
    attendanceCount: 45,
    totalStudents: 50,
    status: 'active'
  },
  {
    id: "2",
    className: "Mathematics 201",
    sessionTitle: "Linear Algebra",
    instructor: "Prof. Michael Chen",
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    location: "Room B-105",
    attendanceCount: 38,
    totalStudents: 42,
    status: 'upcoming'
  },
  {
    id: "3",
    className: "Physics 150",
    sessionTitle: "Quantum Mechanics",
    instructor: "Dr. Emily Rodriguez",
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    location: "Lab C-301",
    attendanceCount: 28,
    totalStudents: 35,
    status: 'upcoming'
  }
];

export function StudentAttendance() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAttendanceComplete = (success: boolean) => {
    if (success && selectedSession) {
      setAttendanceMarked(prev => [...prev, selectedSession.id]);
      toast({
        title: "Attendance Recorded",
        description: `Successfully marked present for ${selectedSession.className}`,
      });
      setSelectedSession(null);
    }
  };

  const getStatusBadge = (status: Session['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Live Now</Badge>;
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
      case 'ended':
        return <Badge variant="secondary">Ended</Badge>;
    }
  };

  const isSessionAttended = (sessionId: string) => attendanceMarked.includes(sessionId);

  if (selectedSession) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setSelectedSession(null)}
            className="mb-4"
          >
            ← Back to Sessions
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
          <p className="text-muted-foreground mt-2">Use your fingerprint to verify attendance</p>
        </div>

        <Card className="border-primary/20">
          <CardHeader className="text-center bg-primary/5">
            <CardTitle className="text-2xl text-primary">{selectedSession.className}</CardTitle>
            <p className="text-lg text-foreground">{selectedSession.sessionTitle}</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {selectedSession.startTime} - {selectedSession.endTime}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {selectedSession.location}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <BiometricScanner 
              onScanComplete={handleAttendanceComplete}
              disabled={false}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Session Details</p>
                <p className="text-sm text-muted-foreground">Instructor: {selectedSession.instructor}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedSession.attendanceCount}/{selectedSession.totalStudents} Present
                  </span>
                </div>
                {getStatusBadge(selectedSession.status)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Student Attendance</h1>
        <p className="text-muted-foreground mt-2">Select a session to mark your attendance</p>
      </div>

      <div className="grid gap-4">
        {mockSessions.map((session) => (
          <Card 
            key={session.id} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
              session.status === 'active' 
                ? 'border-success/30 bg-success/5' 
                : 'border-border hover:border-primary/30'
            } ${isSessionAttended(session.id) ? 'bg-muted/50' : ''}`}
            onClick={() => {
              if (session.status === 'active' && !isSessionAttended(session.id)) {
                setSelectedSession(session);
              }
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-foreground">{session.className}</h3>
                    {getStatusBadge(session.status)}
                    {isSessionAttended(session.id) && (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-sm font-medium">Attended</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-lg text-foreground mb-2">{session.sessionTitle}</p>
                  <p className="text-sm text-muted-foreground mb-3">Instructor: {session.instructor}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.startTime} - {session.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{session.location}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {session.attendanceCount}/{session.totalStudents}
                    </span>
                  </div>
                  
                  {session.status === 'active' && !isSessionAttended(session.id) ? (
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      Mark Attendance
                    </Button>
                  ) : session.status === 'upcoming' ? (
                    <Button size="sm" variant="outline" disabled>
                      Not Yet Started
                    </Button>
                  ) : isSessionAttended(session.id) ? (
                    <Button size="sm" variant="outline" disabled>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Completed
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Session Ended
                    </Button>
                  )}
                </div>
              </div>
              
              {session.status !== 'active' && !isSessionAttended(session.id) && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      {session.status === 'upcoming' 
                        ? 'Attendance will be available when the session starts'
                        : 'Attendance window has closed for this session'
                      }
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary">{attendanceMarked.length}</p>
                <p className="text-sm text-muted-foreground">Today's Attendance</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">
                  {mockSessions.filter(s => s.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Live Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockSessions.length}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}