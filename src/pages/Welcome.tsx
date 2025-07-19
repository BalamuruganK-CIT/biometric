import { GraduationCap, Users, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  
  console.log("Welcome component rendering...");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">EduAttend</h1>
                <p className="text-muted-foreground">Biometric Attendance System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              🔒 Secure • 📱 Modern • ⚡ Fast
            </Badge>
            <h2 className="text-4xl font-bold text-foreground">
              Welcome to the Future of Attendance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience seamless, secure, and accurate attendance tracking powered by advanced biometric technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Portal Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-primary/10 p-4 rounded-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
                <CardDescription className="text-base">
                  Mark your attendance using secure fingerprint authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Biometric verification</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Real-time session tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Personal attendance dashboard</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 group-hover:bg-primary-hover"
                  onClick={() => navigate('/student')}
                >
                  Access Student Portal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Admin Portal Card */}
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-accent/30 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-accent/10 p-4 rounded-2xl mb-4 group-hover:bg-accent/20 transition-colors">
                  <Settings className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-2xl">Admin Portal</CardTitle>
                <CardDescription className="text-base">
                  Manage classes, sessions, and monitor attendance analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Class & session management</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Real-time attendance monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Comprehensive reporting</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => navigate('/admin')}
                >
                  Access Admin Portal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <Card className="bg-gradient-to-r from-muted/50 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Why Choose EduAttend?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl">🔐</div>
                    <h4 className="font-semibold">Secure & Private</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced encryption and no biometric data storage
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl">⚡</div>
                    <h4 className="font-semibold">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground">
                      Mark attendance in under 3 seconds
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl">📊</div>
                    <h4 className="font-semibold">Smart Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive insights and reporting
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>Powered by advanced biometric technology • Built for educational institutions</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;