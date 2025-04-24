import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

// Define the base API URL that will be used throughout the application
export const API_BASE_URL = "http://localhost:5000/api";

export function Layout() {
  useEffect(() => {
    // Test connection to the backend
    fetch(`${API_BASE_URL}/patients`)
      .then(response => {
        if (response.ok) {
          console.log("Connected to backend successfully");
        } else {
          console.error("Backend connection error:", response.statusText);
        }
      })
      .catch(error => {
        console.error("Backend connection failed:", error);
      });
  }, []);

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
