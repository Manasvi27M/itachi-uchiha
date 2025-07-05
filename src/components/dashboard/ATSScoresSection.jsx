"use client";

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
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
} from "recharts";

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

export function ATSScoresSection({ resumeData }) {
  const atsData = resumeData.map((resume) => ({
    name: resume.title.split(" ")[0],
    score: resume.atsScore,
    industry: resume.industry,
    status: resume.status,
  }));

  const scoreDistribution = [
    {
      range: "90-100",
      count: resumeData.filter((r) => r.atsScore >= 90).length,
      color: "#10B981",
    },
    {
      range: "80-89",
      count: resumeData.filter((r) => r.atsScore >= 80 && r.atsScore < 90)
        .length,
      color: "#3B82F6",
    },
    {
      range: "70-79",
      count: resumeData.filter((r) => r.atsScore >= 70 && r.atsScore < 80)
        .length,
      color: "#F59E0B",
    },
    {
      range: "60-69",
      count: resumeData.filter((r) => r.atsScore >= 60 && r.atsScore < 70)
        .length,
      color: "#EF4444",
    },
    {
      range: "<60",
      count: resumeData.filter((r) => r.atsScore < 60).length,
      color: "#DC2626",
    },
  ];

  const avgScore = Math.round(
    resumeData.reduce((sum, resume) => sum + resume.atsScore, 0) /
      resumeData.length
  );
  const highScoreCount = resumeData.filter((r) => r.atsScore >= 80).length;
  const improvementNeeded = resumeData.filter((r) => r.atsScore < 70).length;

  const recommendations = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Keywords Usage",
      description:
        "Your resumes show good keyword optimization for ATS systems",
      count: highScoreCount,
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Format Optimization",
      description:
        "Some resumes could benefit from better formatting for ATS parsing",
      count: 2,
    },
    {
      type: "error",
      icon: XCircle,
      title: "Needs Improvement",
      description: "These resumes require significant optimization",
      count: improvementNeeded,
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return "#10B981";
    if (score >= 80) return "#3B82F6";
    if (score >= 70) return "#F59E0B";
    return "#EF4444";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          ATS Score Analysis
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Optimize your resumes for Applicant Tracking Systems
        </p>
      </motion.div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg lg:rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                {avgScore}%
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Average ATS Score
              </p>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${avgScore}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg lg:rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                {highScoreCount}
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                High Scoring Resumes
              </p>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-slate-500">
            Resumes with 80%+ ATS scores
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg lg:rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                +12%
              </h3>
              <p className="text-slate-600 text-sm lg:text-base">
                Score Improvement
              </p>
            </div>
          </div>
          <p className="text-xs lg:text-sm text-slate-500">
            Average improvement this month
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Individual Scores */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200"
        >
          <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
            Resume ATS Scores
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={atsData}
                layout="horizontal"
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="score"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                  shape={(props) => {
                    const { payload } = props;
                    return (
                      <Bar {...props} fill={getScoreColor(payload.score)} />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200"
        >
          <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
            Score Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="count"
                  label={({ range, count }) =>
                    count > 0 ? `${range}: ${count}` : ""
                  }
                  labelStyle={{ fontSize: "12px" }}
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Resume Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60"
      >
        <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
          Detailed Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {resumeData.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-3 lg:p-4 border border-slate-200 rounded-lg lg:rounded-xl hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2 lg:mb-3">
                <h4 className="font-medium text-slate-800 text-sm lg:text-base truncate">
                  {resume.title}
                </h4>
                <span
                  className={`text-sm lg:text-base font-bold`}
                  style={{ color: getScoreColor(resume.atsScore) }}
                >
                  {resume.atsScore}%
                </span>
              </div>
              <div className="mb-2 lg:mb-3">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${resume.atsScore}%`,
                      backgroundColor: getScoreColor(resume.atsScore),
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs lg:text-sm">
                <span className="text-slate-600">
                  {getScoreLabel(resume.atsScore)}
                </span>
                <span className="text-slate-500">{resume.industry}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-slate-200/60"
      >
        <h3 className="text-lg lg:text-xl font-semibold text-slate-800 mb-4 lg:mb-6">
          Optimization Recommendations
        </h3>
        <div className="space-y-3 lg:space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border-l-4 ${
                rec.type === "success"
                  ? "bg-green-50 border-green-500"
                  : rec.type === "warning"
                  ? "bg-yellow-50 border-yellow-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                <rec.icon
                  className={`w-4 h-4 lg:w-5 lg:h-5 mt-0.5 ${
                    rec.type === "success"
                      ? "text-green-600"
                      : rec.type === "warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 mb-1 text-sm lg:text-base">
                    {rec.title}
                  </h4>
                  <p className="text-xs lg:text-sm text-slate-600 mb-2">
                    {rec.description}
                  </p>
                  <span className="text-xs font-medium text-slate-500">
                    Affects {rec.count} resume{rec.count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
