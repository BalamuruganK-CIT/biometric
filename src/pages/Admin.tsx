import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { OverviewDashboard } from "@/components/OverviewDashboard";
import { ClassManagement } from "@/components/ClassManagement";
import { SessionManagement } from "@/components/SessionManagement";
import { StudentManagement } from "@/components/StudentManagement";

const Admin = () => {
  const [currentView, setCurrentView] = useState("overview");

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <OverviewDashboard />;
      case "classes":
        return <ClassManagement />;
      case "sessions":
        return <SessionManagement />;
      case "students":
        return <StudentManagement />;
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Settings</h2>
            <p className="text-muted-foreground">System configuration and preferences coming soon.</p>
          </div>
        );
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </DashboardLayout>
  );
};

export default Admin;