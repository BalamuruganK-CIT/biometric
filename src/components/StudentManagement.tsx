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

const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"];

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Student Management</h2>
          <p className="text-muted-foreground">Manage student registrations and track attendance</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                <Input id="email" type="email" placeholder="john.doe@university.edu" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input id="studentId" placeholder="STU006" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
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
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterAttendance} onValueChange={setFilterAttendance}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="All Attendance" />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{student.studentId}</p>
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
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{student.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Book className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.department}</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <Badge className={getAttendanceBadge(student.attendanceRate)}>
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
                <p className="text-sm font-medium mb-1">Enrolled Classes</p>
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}