"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Send,
  Clock,
  Target,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

export function AnalyticsSection({ resumeData }) {
  const performanceData = [
    { date: "Jan 1", views: 12, applications: 3, responses: 1 },
    { date: "Jan 8", views: 18, applications: 5, responses: 2 },
    { date: "Jan 15", views: 25, applications: 8, responses: 3 },
    { date: "Jan 22", views: 32, applications: 12, responses: 5 },
    { date: "Jan 29", views: 28, applications: 10, responses: 4 },
    { date: "Feb 5", views: 35, applications: 15, responses: 6 },
    { date: "Feb 12", views: 42, applications: 18, responses: 8 },
  ];

  const conversionData = resumeData.map((resume) => ({
    name: resume.title.split(" ")[0],
    viewToApplication: ((resume.applications / resume.views) * 100).toFixed(1),
    atsScore: resume.atsScore,
  }));

  const industryPerformance = [
    { industry: "Technology", avgViews: 45, avgApplications: 12, avgATS: 85 },
    { industry: "Product", avgViews: 38, avgApplications: 10, avgATS: 88 },
    { industry: "Design", avgViews: 52, avgApplications: 15, avgATS: 82 },
    { industry: "Marketing", avgViews: 35, avgApplications: 8, avgATS: 79 },
    { industry: "Data Science", avgViews: 41, avgApplications: 11, avgATS: 86 },
  ];

  const metrics = [
    {
      title: "Total Profile Views",
      value: "195",
      change: "+23%",
      trend: "up",
      icon: Eye,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Application Rate",
      value: "18.5%",
      change: "+5.2%",
      trend: "up",
      icon: Target,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Response Rate",
      value: "12.3%",
      change: "-2.1%",
      trend: "down",
      icon: Send,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Avg. Response Time",
      value: "3.2 days",
      change: "-0.8 days",
      trend: "up",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
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
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Deep insights into your resume performance
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div
                className={`w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-r ${metric.color} rounded-lg lg:rounded-xl flex items-center justify-center`}
              >
                <metric.icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs lg:text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
                ) : (
                  <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <h3 className="text-lg lg:text-2xl font-bold text-slate-800 mb-1">
              {metric.value}
            </h3>
            <p className="text-slate-600 text-xs lg:text-sm">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
          Performance Over Time
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="views"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="applications"
                stackId="2"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="responses"
                stackId="3"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
              />
              <defs>
                <linearGradient
                  id="applicationGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="responseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Conversion Rates */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
            Conversion Rates by Resume
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={conversionData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="viewToApplication"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Industry Benchmarks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
            Industry Benchmarks
          </h3>
          <div className="space-y-3 lg:space-y-4">
            {industryPerformance.map((industry, index) => (
              <div
                key={industry.industry}
                className="p-3 lg:p-4 bg-slate-50 rounded-lg lg:rounded-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-slate-800 text-sm lg:text-base">
                    {industry.industry}
                  </h4>
                  <span className="text-xs lg:text-sm text-slate-600">
                    ATS: {industry.avgATS}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 lg:gap-4 text-xs lg:text-sm">
                  <div>
                    <span className="text-slate-600">Avg Views: </span>
                    <span className="font-medium">{industry.avgViews}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Avg Apps: </span>
                    <span className="font-medium">
                      {industry.avgApplications}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
