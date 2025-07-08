"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Eye,
  Send,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

const COLORS = ["#1e293b", "#3b82f6", "#64748b", "#94a3b8", "#cbd5e1"];

export function OverviewSection({ resumeData }) {
  const totalResumes = resumeData.length;
  const totalApplications = resumeData.reduce(
    (sum, resume) => sum + resume.applications,
    0
  );
  const totalViews = resumeData.reduce((sum, resume) => sum + resume.views, 0);
  const avgATSScore = Math.round(
    resumeData.reduce((sum, resume) => sum + resume.atsScore, 0) /
      resumeData.length
  );

  const monthlyData = [
    { month: "Jan", resumes: 2, applications: 15, views: 45, responses: 8 },
    { month: "Feb", resumes: 3, applications: 22, views: 67, responses: 12 },
    { month: "Mar", resumes: 1, applications: 18, views: 52, responses: 9 },
    { month: "Apr", resumes: 4, applications: 28, views: 78, responses: 15 },
    { month: "May", resumes: 2, applications: 20, views: 61, responses: 11 },
    { month: "Jun", resumes: 3, applications: 25, views: 73, responses: 14 },
  ];

  const performanceData = [
    { week: "Week 1", applications: 12, interviews: 3, offers: 1 },
    { week: "Week 2", applications: 18, interviews: 5, offers: 2 },
    { week: "Week 3", applications: 15, interviews: 4, offers: 1 },
    { week: "Week 4", applications: 22, interviews: 7, offers: 3 },
  ];

  const industryData = resumeData.reduce((acc, resume) => {
    acc[resume.industry] = (acc[resume.industry] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(industryData).map(([name, value]) => ({
    name,
    value,
  }));

  const stats = [
    {
      title: "Total Resumes",
      value: totalResumes,
      icon: FileText,
      color: "from-slate-600 to-slate-700",
      change: "+12%",
      trend: "up",
      description: "Active resume versions",
    },
    {
      title: "Applications Sent",
      value: totalApplications,
      icon: Send,
      color: "from-blue-500 to-blue-600",
      change: "+8%",
      trend: "up",
      description: "This month",
    },
    {
      title: "Profile Views",
      value: totalViews,
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      change: "+15%",
      trend: "up",
      description: "Total impressions",
    },
    {
      title: "Avg ATS Score",
      value: `${avgATSScore}%`,
      icon: Star,
      color: "from-emerald-500 to-emerald-600",
      change: "+5%",
      trend: "up",
      description: "Optimization level",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
          <p className="font-semibold text-slate-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.dataKey}:</span>
              <span className="font-medium text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard Overview
          </h1>
          <span>
            {/* Create Resume Button */}
            <button className="ml-4 bg-slate-900 hover:bg-slate-800 hover:cursor-pointer text-white px-4 py-2 rounded-lg text-md font-medium transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">
                <a href="/generateresume">Create Resume</a>
              </span>
            </button>
          </span>
        </div>
        <p className="text-slate-600">
          Track your resume performance and career progress
        </p>
      </motion.div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <p className="text-slate-900 font-medium">{stat.title}</p>
              <p className="text-slate-500 text-sm">{stat.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Interactive Monthly Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Monthly Trends
              </h3>
              <p className="text-slate-600 text-sm">
                Applications, views, and responses over time
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-900 rounded-full"></div>
                <span className="text-slate-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-slate-600">Views</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="applicationsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="viewsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#1e293b"
                  strokeWidth={2}
                  fill="url(#applicationsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#viewsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Enhanced Industry Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              Resume Distribution
            </h3>
            <p className="text-slate-600 text-sm">
              Breakdown by industry focus
            </p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  innerRadius="40%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelStyle={{
                    fontSize: "12px",
                    fill: "#475569",
                    fontWeight: "500",
                  }}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Performance Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
      >
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            Application Funnel
          </h3>
          <p className="text-slate-600 text-sm">
            Track your success rate from applications to offers
          </p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="week"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="applications"
                fill="#1e293b"
                radius={[4, 4, 0, 0]}
              />
              <Bar dataKey="interviews" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="offers" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Enhanced Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Recent Activity
            </h3>
            <p className="text-slate-600 text-sm">
              Latest updates on your resumes
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {resumeData.slice(0, 4).map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate">
                  {resume.title}
                </h4>
                <p className="text-sm text-slate-600">
                  Updated {resume.updatedAt}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-semibold text-slate-900">
                    ATS: {resume.atsScore}%
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      resume.atsScore >= 80
                        ? "bg-green-500"
                        : resume.atsScore >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                </div>
                <div className="text-xs text-slate-500">
                  {resume.applications} applications
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
