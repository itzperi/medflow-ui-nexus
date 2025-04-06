
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Activity,
  QrCode,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

type SidebarProps = {
  className?: string;
};

const navItems = [
  {
    title: "Patient Dashboard",
    path: "/",
    icon: Users,
  },
  {
    title: "Revenue Dashboard",
    path: "/revenue",
    icon: DollarSign,
  },
  {
    title: "Management Dashboard",
    path: "/management",
    icon: LayoutDashboard,
  },
  {
    title: "AI Symptom Checker",
    path: "/symptom-checker",
    icon: Activity,
  },
  {
    title: "Patient QR Generator",
    path: "/qr-generator",
    icon: QrCode,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300",
          isOpen ? "w-64" : isMobile ? "w-0 -translate-x-full" : "w-16",
          "bg-sidebar border-r border-border",
          className
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center px-4">
            {(isOpen || !isMobile) && (
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-healthcare-blue" />
                {isOpen && (
                  <span className="text-xl font-bold">MedFlow</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="flex flex-col gap-1 px-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                      !isOpen && !isMobile && "justify-center px-0"
                    )
                  }
                >
                  <item.icon
                    className={cn("h-5 w-5", !isOpen && !isMobile && "h-6 w-6")}
                  />
                  {isOpen && <span>{item.title}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="border-t border-border p-4 flex items-center justify-between">
            <ThemeToggle />
          </div>
        </div>
      </aside>
      
      <div
        className={cn(
          "transition-all duration-300 min-h-screen",
          isOpen ? "ml-64" : isMobile ? "ml-0" : "ml-16"
        )}
      >
        {/* Main content */}
      </div>
    </>
  );
}
