import { GraduationCap, User, Settings } from "lucide-react";
import { StudentAttendance } from "@/components/StudentAttendance";
import { Card } from "@/components/ui/card";

const Student = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Mobile-Optimized Student Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">EduAttend</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            
            {/* Mobile-responsive user info */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">John Smith</p>
                  <p className="text-xs text-muted-foreground">Student ID: CS2024001</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              {/* Mobile user avatar only */}
              <div className="sm:hidden bg-primary/10 p-2 rounded-lg">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
          
          {/* Mobile user info row */}
          <div className="sm:hidden mt-2 text-center border-t border-border/50 pt-2">
            <p className="text-sm font-medium text-foreground">John Smith</p>
            <p className="text-xs text-muted-foreground">Student ID: CS2024001</p>
          </div>
        </div>
      </header>

      {/* Mobile-Optimized Main Content */}
      <main className="p-3 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="p-4 sm:p-8 bg-card/50 backdrop-blur-sm border-primary/10">
            <StudentAttendance />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Student;