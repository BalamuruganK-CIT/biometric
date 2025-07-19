import { useState } from "react";
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    studentId: "STU001",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    enrolledClasses: ["CS101", "MATH202"],
    attendanceRate: 92.5,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    studentId: "STU002",
    phone: "+1 (555) 234-5678",
    department: "Mathematics",
    enrolledClasses: ["MATH202", "PHYS301"],
    attendanceRate: 78.3,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@university.edu",
    studentId: "STU003",
    phone: "+1 (555) 345-6789",
    department: "Physics",
    enrolledClasses: ["PHYS301", "CHEM201"],
    attendanceRate: 95.1,
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@university.edu",
    studentId: "STU004",
    phone: "+1 (555) 456-7890",
    department: "Computer Science",
    enrolledClasses: ["CS101"],
    attendanceRate: 67.8,
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@university.edu",
    studentId: "STU005",
    phone: "+1 (555) 567-8901",
    department: "Chemistry",
    enrolledClasses: ["CHEM201", "MATH202"],
    attendanceRate: 88.9,
    avatar: "/placeholder.svg"
  }
];

const departments = ["Computer", "Mechanical", "Electronics", "Civil", "Innovation"];

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterAttendance, setFilterAttendance] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || student.department === filterDepartment;
    const matchesAttendance = filterAttendance === "all" || 
                             (filterAttendance === "high" && student.attendanceRate >= 85) ||
                             (filterAttendance === "medium" && student.attendanceRate >= 70 && student.attendanceRate < 85) ||
                             (filterAttendance === "low" && student.attendanceRate < 70);
    return matchesSearch && matchesDepartment && matchesAttendance;
  });

  const getAttendanceColor = (rate: number) => {
    if (rate >= 85) return "text-success";
    if (rate >= 70) return "text-warning";
    return "text-destructive";
  };

  const getAttendanceBadge = (rate: number) => {
    if (rate >= 85) return "bg-success text-success-foreground";
    if (rate >= 70) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Student Management</h2>
          <p className="text-sm md:text-base text-muted-foreground">Manage CoE student registrations and track attendance</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@citchennai.net" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="STU006" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 9876543210" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Add Student
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 md:pl-10 text-sm"
            />
          </div>
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="All Clusters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clusters</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAttendance} onValueChange={setFilterAttendance}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Attendance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Attendance</SelectItem>
            <SelectItem value="high">High (85%+)</SelectItem>
            <SelectItem value="medium">Medium (70-84%)</SelectItem>
            <SelectItem value="low">Low (&lt;70%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                  <Avatar className="h-8 w-8 md:h-10 md:w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback className="text-xs md:text-sm">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm md:text-lg truncate">{student.name}</CardTitle>
                    <p className="text-xs md:text-sm text-muted-foreground">{student.studentId}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Student</DropdownMenuItem>
                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground truncate">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs md:text-sm">
                  <Book className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">{student.department} Cluster</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium">Attendance Rate</span>
                  <Badge className={`${getAttendanceBadge(student.attendanceRate)} text-xs`}>
                    {student.attendanceRate.toFixed(1)}%
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      student.attendanceRate >= 85 ? "bg-success" :
                      student.attendanceRate >= 70 ? "bg-warning" : "bg-destructive"
                    }`}
                    style={{ width: `${student.attendanceRate}%` }}
                  />
                </div>
              </div>
              
              <div>
                <p className="text-xs md:text-sm font-medium mb-1">Enrolled CoEs</p>
                <div className="flex flex-wrap gap-1">
                  {student.enrolledClasses.map((cls) => (
                    <Badge key={cls} variant="secondary" className="text-xs">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-sm md:text-base text-muted-foreground">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}