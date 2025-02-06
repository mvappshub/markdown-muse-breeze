import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import BlogPost from "@/pages/BlogPost";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-background font-inter">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;