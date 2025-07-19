import { useState } from "react";
import { Calendar, Clock, MapPin, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiometricScanner } from "./BiometricScanner";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  cluster: string;
  className: string;
  sessionTitle: string;
  instructor: string;
  mobile: string;
  email: string;
  startTime: string;
  endTime: string;
  location: string;
  attendanceCount: number;
  totalStudents: number;
  status: 'active' | 'upcoming' | 'ended';
}

// Real CoE Data from Chennai Institute of Technology
const coeSessions: Session[] = [
  {
    id: "1",
    cluster: "Mechanical",
    className: "Industrial Automation",
    sessionTitle: "Advanced Industrial Automation Systems",
    instructor: "Sugin Elankavi Rajendran",
    mobile: "8438285884",
    email: "suginelankavir@citchennai.net",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    location: "Industrial Automation Lab",
    attendanceCount: 28,
    totalStudents: 35,
    status: 'active'
  },
  {
    id: "2",
    cluster: "Mechanical",
    className: "Drone Technology",
    sessionTitle: "UAV Systems and Applications",
    instructor: "Suresh A",
    mobile: "9444320999",
    email: "suresha@citchennai.net",
    startTime: "11:30 AM",
    endTime: "01:00 PM",
    location: "Drone Lab",
    attendanceCount: 22,
    totalStudents: 30,
    status: 'upcoming'
  },
  {
    id: "3",
    cluster: "Mechanical",
    className: "Robotics - KUKA",
    sessionTitle: "Industrial Robotics Programming",
    instructor: "Dr. Gowtham K",
    mobile: "9629011556",
    email: "gowthamk@citchennai.net",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    location: "KUKA - CITAR",
    attendanceCount: 25,
    totalStudents: 32,
    status: 'upcoming'
  },
  {
    id: "4",
    cluster: "Electronics",
    className: "VLSI Design",
    sessionTitle: "Advanced VLSI Circuit Design",
    instructor: "Dr. Sureshkumar R",
    mobile: "9655754701",
    email: "sureshkumarr@citchennai.net",
    startTime: "09:30 AM",
    endTime: "11:30 AM",
    location: "VLSI Lab - ILP",
    attendanceCount: 18,
    totalStudents: 25,
    status: 'active'
  },
  {
    id: "5",
    cluster: "Electronics",
    className: "IoT Systems",
    sessionTitle: "Internet of Things Applications",
    instructor: "Edward Paulraj J",
    mobile: "7010146007",
    email: "edwardpaulrajj@citchennai.net",
    startTime: "01:30 PM",
    endTime: "03:30 PM",
    location: "WABCO & Kyutech Lab",
    attendanceCount: 20,
    totalStudents: 28,
    status: 'upcoming'
  },
  {
    id: "6",
    cluster: "Computer",
    className: "Artificial Intelligence",
    sessionTitle: "Machine Learning Fundamentals",
    instructor: "Dr. Nithiya Baskaran",
    mobile: "7708840045",
    email: "nithiyab@citchennai.net",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    location: "AI Lab - ILP",
    attendanceCount: 35,
    totalStudents: 40,
    status: 'active'
  },
  {
    id: "7",
    cluster: "Computer",
    className: "Cyber Security",
    sessionTitle: "Network Security & Ethical Hacking",
    instructor: "Dr. Thiyagarajan",
    mobile: "9865667733",
    email: "thiyagarajand.cse@citchennai.net",
    startTime: "02:30 PM",
    endTime: "04:30 PM",
    location: "OOPS Lab - First Floor",
    attendanceCount: 24,
    totalStudents: 30,
    status: 'upcoming'
  },
  {
    id: "8",
    cluster: "Civil",
    className: "BIM Technology",
    sessionTitle: "Building Information Modeling",
    instructor: "S. Karthikeyan",
    mobile: "9043281528",
    email: "skarthikeyan@citchennai.net",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    location: "Digital Library",
    attendanceCount: 15,
    totalStudents: 20,
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
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        <div className="text-center px-2">
          <Button 
            variant="outline" 
            onClick={() => setSelectedSession(null)}
            className="mb-3 sm:mb-4 min-h-[44px]"
          >
            ← Back to Sessions
          </Button>
          <h1 className="text-xl sm:text-3xl font-bold text-foreground">Mark Attendance</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">Use your fingerprint to verify attendance</p>
        </div>

        <Card className="border-primary/20 mx-2 sm:mx-0">
          <CardHeader className="text-center bg-primary/5 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-2xl text-primary">{selectedSession.className}</CardTitle>
            <p className="text-base sm:text-lg text-foreground">{selectedSession.sessionTitle}</p>
            
            {/* Mobile-responsive session info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">{selectedSession.startTime} - {selectedSession.endTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-center">{selectedSession.location}</span>
              </div>
            </div>
            
            {/* Cluster badge */}
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {selectedSession.cluster} Cluster
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-8">
            <BiometricScanner 
              onScanComplete={handleAttendanceComplete}
              disabled={false}
            />
          </CardContent>
        </Card>

        <Card className="mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Session Details</p>
                <p className="text-sm text-muted-foreground">Instructor: {selectedSession.instructor}</p>
                <p className="text-xs text-muted-foreground">
                  Mobile: {selectedSession.mobile} | Email: {selectedSession.email}
                </p>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
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
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-foreground">CIT CoE Attendance</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">Select a session to mark your attendance</p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {coeSessions.map((session) => (
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
            <CardContent className="p-4 sm:p-6">
              {/* Mobile-first responsive layout */}
              <div className="space-y-3 sm:space-y-0">
                {/* Header row with title and status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-xl font-semibold text-foreground">{session.className}</h3>
                      <Badge variant="outline" className="text-xs">
                        {session.cluster}
                      </Badge>
                      {getStatusBadge(session.status)}
                      {isSessionAttended(session.id) && (
                        <div className="flex items-center gap-1 text-success">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm font-medium">Attended</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm sm:text-lg text-foreground">{session.sessionTitle}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Instructor: {session.instructor}</p>
                  </div>
                  
                  {/* Desktop attendance count and button */}
                  <div className="hidden sm:flex flex-col items-end space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {session.attendanceCount}/{session.totalStudents}
                      </span>
                    </div>
                    
                    {session.status === 'active' && !isSessionAttended(session.id) ? (
                      <Button size="sm" className="bg-success hover:bg-success/90 min-h-[36px]">
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
                
                {/* Session details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{session.startTime} - {session.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="break-words">{session.location}</span>
                  </div>
                </div>
                
                {/* Mobile attendance count and button */}
                <div className="flex items-center justify-between sm:hidden">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {session.attendanceCount}/{session.totalStudents} Present
                    </span>
                  </div>
                  
                  {session.status === 'active' && !isSessionAttended(session.id) ? (
                    <Button size="sm" className="bg-success hover:bg-success/90 min-h-[44px] px-4">
                      Mark Attendance
                    </Button>
                  ) : session.status === 'upcoming' ? (
                    <Button size="sm" variant="outline" disabled className="min-h-[44px]">
                      Not Started
                    </Button>
                  ) : isSessionAttended(session.id) ? (
                    <Button size="sm" variant="outline" disabled className="min-h-[44px]">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Done
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="min-h-[44px]">
                      Ended
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Info message */}
              {session.status !== 'active' && !isSessionAttended(session.id) && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />
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

      {/* Mobile-responsive stats card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-2">Quick Stats</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div>
                <p className="text-lg sm:text-2xl font-bold text-primary">{attendanceMarked.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Today's Attendance</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-accent">
                  {coeSessions.filter(s => s.status === 'active').length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Live Sessions</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{coeSessions.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}