import { useState, useEffect } from "react";
import { DashboardSidebar } from "../components/dashboard/Sidebar";
import { DashboardContent } from "../components/dashboard/DashboardContent";
import { LoadingSpinner } from "../components/dashboard/LoadingSpinner";
import { ErrorBoundary } from "../components/dashboard/ErrorBoundary";
import { getMockResumeData } from "../services/api-service";

export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState("overview");
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeData, setResumeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadResumeData();
  }, []);

  const loadResumeData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = getMockResumeData();
      setResumeData(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to load resume data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadResumeData();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Failed to Load Data
          </h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex overflow-hidden">
        <DashboardSidebar
          selectedView={selectedView}
          onViewChange={setSelectedView}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isCollapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          } lg:ml-0`}
        >
          <DashboardContent
            selectedView={selectedView}
            resumeData={resumeData}
            selectedResume={selectedResume}
            onResumeSelect={setSelectedResume}
            onRefresh={handleRefresh}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarCollapsed={sidebarCollapsed}
            onCollapseSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </main>
      </div>
    </ErrorBoundary>
  );
}
