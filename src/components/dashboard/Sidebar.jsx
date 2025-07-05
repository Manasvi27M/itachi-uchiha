import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  TrendingUp,
  Brain,
  Settings,
  Home,
  Star,
  Archive,
  Search,
  Bell,
  Plus,
  ChevronDown,
  User,
  LogOut,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

const navigationItems = [
  { id: "overview", title: "Overview", icon: Home, badge: null },
  { id: "resumes", title: "Resume History", icon: FileText, badge: "5" },
  { id: "analytics", title: "Analytics", icon: BarChart3, badge: null },
  { id: "ats-scores", title: "ATS Scores", icon: TrendingUp, badge: "New" },
  { id: "ai-insights", title: "AI Insights", icon: Brain, badge: "3" },
];

const quickActions = [
  { id: "favorites", title: "Favorites", icon: Star, count: 3 },
  { id: "archived", title: "Archived", icon: Archive, count: 12 },
];

export function DashboardSidebar({
  selectedView,
  onViewChange,
  isOpen,
  onToggle,
  isCollapsed,
  onCollapse,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (viewId) => {
    onViewChange(viewId);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Header */}
        <div className="border-b border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    ResumeHub
                  </h1>
                  <p className="text-xs text-slate-500">
                    Professional Dashboard
                  </p>
                </div>
              )}
            </motion.div>

            <div className="flex items-center gap-2">
              {!isCollapsed && (
                <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Bell className="w-4 h-4 text-slate-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              )}
              {/* <button
                onClick={onCollapse}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden lg:block"
              >
                <Menu className="w-4 h-4 text-slate-600" />
              </button> */}
              <button
                onClick={onToggle}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 overflow-y-auto">
          {/* Quick Create Button */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg p-3 flex items-center justify-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="font-medium">Create Resume</span>
              </button>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mb-8">
            {!isCollapsed && (
              <h3 className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-3">
                Navigation
              </h3>
            )}
            <div className="space-y-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:cursor-pointer ${
                      selectedView === item.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                    } ${isCollapsed ? "justify-center" : "justify-start"}`}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              selectedView === item.id
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          {!isCollapsed && (
            <div className="mb-8">
              <h3 className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              <div className="space-y-1">
                {quickActions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index + 5) * 0.05 }}
                  >
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {item.count}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {!isCollapsed && (
            <div>
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all duration-200">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Settings</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all duration-200">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-medium">Help & Support</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative"
            ref={userMenuRef}
          >
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full bg-slate-50 hover:bg-slate-100 rounded-lg p-3 transition-colors flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                {!isCollapsed && (
                  <div className="text-left">
                    <p className="font-semibold text-slate-900 text-sm">
                      John Doe
                    </p>
                    <p className="text-xs text-slate-500">Premium Account</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* User Menu Dropdown */}
            <AnimatePresence>
              {showUserMenu && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg py-2"
                >
                  <button className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-sm">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <div className="border-t border-slate-200 my-2"></div>
                  <button className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-sm text-red-600">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}
