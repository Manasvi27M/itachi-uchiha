"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Menu, ChevronRight } from "lucide-react";
import { OverviewSection } from "./OverviewSection";
import { ResumeHistorySection } from "./ResumeHistorySection";
import { AnalyticsSection } from "./AnalyticsSection";
import { ATSScoresSection } from "./ATSScoresSection";
import { AIInsightsSection } from "./AIInsightsSection";

export function DashboardContent({
  selectedView,
  resumeData,
  selectedResume,
  onResumeSelect,
  onRefresh,
  onToggleSidebar,
  sidebarCollapsed,
  onCollapseSidebar,
}) {
  const renderContent = () => {
    switch (selectedView) {
      case "overview":
        return <OverviewSection resumeData={resumeData} />;
      case "resumes":
        return (
          <ResumeHistorySection
            resumeData={resumeData}
            selectedResume={selectedResume}
            onResumeSelect={onResumeSelect}
          />
        );
      case "analytics":
        return <AnalyticsSection resumeData={resumeData} />;
      case "ats-scores":
        return <ATSScoresSection resumeData={resumeData} />;
      case "ai-insights":
        return <AIInsightsSection resumeData={resumeData} />;
      default:
        return <OverviewSection resumeData={resumeData} />;
    }
  };

  const getViewTitle = () => {
    switch (selectedView) {
      case "overview":
        return "Dashboard Overview";
      case "resumes":
        return "Resume History";
      case "analytics":
        return "Analytics";
      case "ats-scores":
        return "ATS Scores";
      case "ai-insights":
        return "AI Insights";
      default:
        return "Dashboard";
    }
  };

  const getBreadcrumbs = () => {
    switch (selectedView) {
      case "overview":
        return [{ label: "Dashboard", href: "#" }, { label: "Overview" }];
      case "resumes":
        return [{ label: "Dashboard", href: "#" }, { label: "Resume History" }];
      case "analytics":
        return [{ label: "Dashboard", href: "#" }, { label: "Analytics" }];
      case "ats-scores":
        return [{ label: "Dashboard", href: "#" }, { label: "ATS Scores" }];
      case "ai-insights":
        return [{ label: "Dashboard", href: "#" }, { label: "AI Insights" }];
      default:
        return [{ label: "Dashboard" }];
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 bg-white border-b border-slate-200 px-4">
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-4 h-4 text-slate-600" />
          </button>
          <button
            onClick={onCollapseSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden lg:block"
          >
            <Menu className="w-4 h-4 text-slate-600" />
          </button>
          <div className="h-4 w-px bg-slate-300 mx-2"></div>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-1 text-sm">
            {getBreadcrumbs().map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                )}
                <span
                  className={`${
                    crumb.href
                      ? "text-slate-600 hover:text-slate-900 cursor-pointer"
                      : "text-slate-900 font-medium"
                  } ${index === 0 ? "hidden md:block" : ""}`}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
