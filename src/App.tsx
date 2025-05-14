import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Publications from "./pages/Publications";
import PublicationDetailPage from "./pages/PublicationDetailPage.tsx"; // New import
import Activities from "./pages/Activities";
import PublicOpinionPolls from "./pages/PublicOpinionPolls";
import PollDetailPage from "./pages/PollDetailPage.tsx"; // New import
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import PartnersClients from "./pages/PartnersClients"; // Added
import CommunityRole from "./pages/CommunityRole"; // Added
import AWRADRegional from "./pages/AWRADRegional"; // Added
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminPublications from "./pages/Admin/Publications";
import MediaManager from "./pages/Admin/MediaManager";
import LoginPage from "./pages/Admin/LoginPage"; // Added
import ProtectedRoute from "./components/Admin/ProtectedRoute"; // Added
import PublicationForm from "./pages/Admin/PublicationForm.tsx"; // Added
import PollForm from "./pages/Admin/PollForm.tsx"; // Added

const queryClient = new QueryClient();

// Layout component for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* LanguageProvider is now in main.tsx, wrapping AuthProvider and App */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            {/* Routes below this will be protected */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/publications" element={<AdminPublications />} />
            <Route path="/admin/publications/new" element={<PublicationForm />} />
            <Route path="/admin/publications/edit/:id" element={<PublicationForm />} />
            <Route path="/admin/polls/new" element={<PollForm />} /> 
            <Route path="/admin/polls/edit/:id" element={<PollForm />} />
            {/* TODO: Create a separate /admin/polls listing page or integrate polls into /admin/publications */}
            <Route path="/admin/media" element={<MediaManager />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* Default admin route */}
            {/* Fallback for any other /admin routes, ensure it's last among admin routes */}
            <Route path="/admin/*" element={<AdminDashboard />} /> 
          </Route>
          
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
          <Route path="/publications" element={<PublicLayout><Publications /></PublicLayout>} />
          <Route path="/publications/:slug" element={<PublicLayout><PublicationDetailPage /></PublicLayout>} />
          <Route path="/activities" element={<PublicLayout><Activities /></PublicLayout>} />
          <Route path="/public-opinion-polls" element={<PublicLayout><PublicOpinionPolls /></PublicLayout>} />
          <Route path="/public-opinion-polls/:slug" element={<PublicLayout><PollDetailPage /></PublicLayout>} />
          <Route path="/partners-clients" element={<PublicLayout><PartnersClients /></PublicLayout>} /> {/* Added */}
          <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/community-role" element={<PublicLayout><CommunityRole /></PublicLayout>} />
          <Route path="/regional" element={<PublicLayout><AWRADRegional /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
