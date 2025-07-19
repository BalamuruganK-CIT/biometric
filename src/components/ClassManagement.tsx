import { useState } from "react";
import { Plus, Calendar, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Real CoE data from Chennai Institute of Technology
const classes = [
  {
    id: 1,
    name: "Artificial Intelligence",
    code: "AI-001",
    instructor: "Dr. Nithiya Baskaran",
    students: 35,
    sessions: 24,
    schedule: "MWF 9:00 AM",
    semester: "July 2024",
    department: "Computer",
    venue: "AI Lab (ILP First floor)",
    contact: "7708840045",
    email: "nithiyab@citchennai.net"
  },
  {
    id: 2,
    name: "Industrial Automation",
    code: "IA-001", 
    instructor: "Sugin Elankavi Rajendran",
    students: 30,
    sessions: 36,
    schedule: "TTh 10:30 AM",
    semester: "July 2024",
    department: "Mechanical",
    venue: "Industrial Automation Lab",
    contact: "8438285884",
    email: "suginelankavir@citchennai.net"
  },
  {
    id: 3,
    name: "VLSI Design",
    code: "VLSI-001",
    instructor: "Dr. Sureshkumar R",
    students: 25,
    sessions: 28,
    schedule: "MWF 2:00 PM",
    semester: "July 2024",
    department: "Electronics",
    venue: "VLSI Lab (ILP, Non-Linear lab)",
    contact: "9655754701",
    email: "sureshkumarr@citchennai.net"
  },
  {
    id: 4,
    name: "Drone Technology",
    code: "DRONE-001",
    instructor: "Suresh A",
    students: 28,
    sessions: 20,
    schedule: "TTh 11:00 AM",
    semester: "July 2024",
    department: "Mechanical",
    venue: "Drone Lab",
    contact: "9444320999",
    email: "suresha@citchennai.net"
  },
  {
    id: 5,
    name: "IoT Technology", 
    code: "IOT-001",
    instructor: "Mr. Edward Paulraj J",
    students: 40,
    sessions: 32,
    schedule: "MWF 3:30 PM",
    semester: "July 2024",
    department: "Electronics",
    venue: "WABCO & Kyutech lab (ILP First floor)",
    contact: "7010146007",
    email: "edwardpaulrajj@citchennai.net"
  },
  {
    id: 6,
    name: "BIM (Building Information Modeling)",
    code: "BIM-001",
    instructor: "Mr. S. Karthikeyan",
    students: 22,
    sessions: 18,
    schedule: "TTh 1:00 PM",
    semester: "July 2024",
    department: "Civil",
    venue: "Digital Library near to Library",
    contact: "9043281528",
    email: "skarthikeyan@citchennai.net"
  }
];

export function ClassManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || cls.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ["Computer", "Mechanical", "Electronics", "Civil", "Innovation"];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">CoE Management</h2>
          <p className="text-sm md:text-base text-muted-foreground">Create and manage Centers of Excellence</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create CoE
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Create New CoE</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="className">CoE Name</Label>
                  <Input id="className" placeholder="e.g., Artificial Intelligence" />
                </div>
                <div>
                  <Label htmlFor="classCode">CoE Code</Label>
                  <Input id="classCode" placeholder="e.g., AI-001" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instructor">Faculty In-charge</Label>
                  <Input id="instructor" placeholder="Faculty name" />
                </div>
                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" placeholder="Mobile number" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cluster">Cluster</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input id="venue" placeholder="Lab location" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input id="schedule" placeholder="e.g., MWF 9:00 AM" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Faculty email" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create CoE
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
            placeholder="Search CoEs, codes, or faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Clusters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clusters</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CoE Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg truncate">{cls.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1 text-xs">{cls.code}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit CoE
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete CoE
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground truncate">{cls.instructor}</p>
                <p className="text-xs text-muted-foreground">{cls.department} Cluster</p>
                <p className="text-xs text-muted-foreground truncate">{cls.venue}</p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  {cls.students} students
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {cls.sessions} sessions
                </div>
              </div>
              
              <div className="text-xs">
                <p className="font-medium text-foreground">{cls.schedule}</p>
                <p className="text-muted-foreground">{cls.semester}</p>
                <p className="text-muted-foreground">{cls.contact}</p>
              </div>
              
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-sm md:text-base text-muted-foreground">No CoE found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}