"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Calendar,
  Edit,
  Trash2,
  Download,
  Star,
  Search,
  Filter,
} from "lucide-react";

export function ResumeHistorySection({
  resumeData,
  selectedResume,
  onResumeSelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResumes = resumeData
    .filter((resume) => {
      const matchesSearch = resume.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || resume.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "atsScore") return b.atsScore - a.atsScore;
      if (sortBy === "applications") return b.applications - a.applications;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getATSScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Resume History
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Manage and track all your resume versions
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60"
      >
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 lg:w-5 lg:h-5" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="flex items-center justify-between lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <span className="text-sm text-slate-500">
              {filteredResumes.length} resumes
            </span>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 lg:px-4 py-2 lg:py-3 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 lg:px-4 py-2 lg:py-3 border border-slate-200 rounded-lg lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                >
                  <option value="updatedAt">Last Updated</option>
                  <option value="atsScore">ATS Score</option>
                  <option value="applications">Applications</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Resume Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredResumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => onResumeSelect(resume)}
            >
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      resume.status
                    )}`}
                  >
                    {resume.status}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {resume.title}
              </h3>

              <div className="space-y-2 mb-3 lg:mb-4">
                <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-600">
                  <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Updated {resume.updatedAt}</span>
                </div>
                <div className="flex items-center gap-2 text-xs lg:text-sm text-slate-600">
                  <span className="font-medium">Template:</span>
                  <span>{resume.template}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-3 lg:mb-4">
                <div className="text-center">
                  <div
                    className={`text-sm lg:text-lg font-bold ${getATSScoreColor(
                      resume.atsScore
                    )}`}
                  >
                    {resume.atsScore}%
                  </div>
                  <div className="text-xs text-slate-500">ATS Score</div>
                </div>
                <div className="text-center">
                  <div className="text-sm lg:text-lg font-bold text-slate-800">
                    {resume.applications}
                  </div>
                  <div className="text-xs text-slate-500">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-sm lg:text-lg font-bold text-slate-800">
                    {resume.views}
                  </div>
                  <div className="text-xs text-slate-500">Views</div>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-xs lg:text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  Edit
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 p-2 rounded-lg transition-colors">
                  <Download className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <button className="bg-slate-50 hover:bg-slate-100 text-slate-600 p-2 rounded-lg transition-colors">
                  <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredResumes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-12 h-12 lg:w-16 lg:h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg lg:text-xl font-semibold text-slate-600 mb-2">
            No resumes found
          </h3>
          <p className="text-slate-500 text-sm lg:text-base">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}
