
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 sm:ml-16 md:ml-64">
          <Outlet />
        </main>
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
}
