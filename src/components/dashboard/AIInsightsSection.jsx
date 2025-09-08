"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Lightbulb,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Users,
  BarChart3,
  Eye,
  Rocket,
} from "lucide-react";

export function AIInsightsSection({ resumeData }) {
  const insights = [
    {
      type: "critical",
      icon: AlertTriangle,
      title: "Critical Optimization Needed",
      description:
        "Your Software Engineer resume is missing 8 key technical keywords that 89% of similar job postings require.",
      impact: "High",
      color: "from-red-500 to-red-600",
      action:
        "Add React, TypeScript, AWS, Docker, Kubernetes, GraphQL, Node.js, and PostgreSQL",
      priority: 1,
      timeToFix: "15 min",
      potentialIncrease: "+34% match rate",
    },
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Industry Trend Alert",
      description:
        "AI/ML skills are trending 67% higher in your industry. Companies are actively seeking these skills.",
      impact: "High",
      color: "from-purple-500 to-purple-600",
      action:
        "Highlight any machine learning, data analysis, or AI project experience",
      priority: 2,
      timeToFix: "30 min",
      potentialIncrease: "+28% visibility",
    },
    {
      type: "format",
      icon: Zap,
      title: "ATS Format Enhancement",
      description:
        "Your resume uses complex formatting that ATS systems struggle to parse. 23% better performance with bullet points.",
      impact: "Medium",
      color: "from-blue-500 to-blue-600",
      action:
        "Convert paragraph descriptions to bullet points with action verbs",
      priority: 3,
      timeToFix: "20 min",
      potentialIncrease: "+19% ATS score",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Excellent Performance",
      description:
        "Your UX Designer resume outperforms 92% of similar profiles with exceptional keyword optimization.",
      impact: "Positive",
      color: "from-emerald-500 to-emerald-600",
      action: "Use this resume as a template for optimizing your other resumes",
      priority: 4,
      timeToFix: "5 min",
      potentialIncrease: "Template ready",
    },
    {
      type: "length",
      icon: Target,
      title: "Length Optimization",
      description:
        "Your Data Scientist resume is 3.2 pages. Resumes over 2 pages see 41% fewer callbacks in your industry.",
      impact: "Medium",
      color: "from-orange-500 to-orange-600",
      action: "Condense experience section and remove outdated skills",
      priority: 5,
      timeToFix: "25 min",
      potentialIncrease: "+22% callback rate",
    },
    {
      type: "skills",
      icon: Lightbulb,
      title: "Skills Gap Analysis",
      description:
        "Based on 1,247 job postings in your field, you're missing 5 high-demand skills that could boost your profile.",
      impact: "Medium",
      color: "from-indigo-500 to-indigo-600",
      action:
        "Consider learning: Terraform, Jenkins, Microservices, Redis, and Elasticsearch",
      priority: 6,
      timeToFix: "Research",
      potentialIncrease: "+31% job matches",
    },
  ];

  const marketTrends = [
    {
      skill: "Artificial Intelligence",
      growth: "+67%",
      demand: "Very High",
      salary: "$145K avg",
      color: "text-emerald-600",
      trend: "up",
      jobs: "2,847 openings",
    },
    {
      skill: "Cloud Computing",
      growth: "+52%",
      demand: "High",
      salary: "$128K avg",
      color: "text-blue-600",
      trend: "up",
      jobs: "1,923 openings",
    },
    {
      skill: "DevOps Engineering",
      growth: "+43%",
      demand: "High",
      salary: "$135K avg",
      color: "text-purple-600",
      trend: "up",
      jobs: "1,456 openings",
    },
    {
      skill: "Data Science",
      growth: "+38%",
      demand: "Medium",
      salary: "$142K avg",
      color: "text-orange-600",
      trend: "up",
      jobs: "987 openings",
    },
  ];

  const personalizedTips = [
    {
      title: "Optimize for Remote Work",
      description:
        "67% of job postings in your field mention remote work. Highlight collaboration tools and remote project experience.",
      priority: "High",
      icon: Users,
      impact: "+24% application success",
    },
    {
      title: "Quantify Your Impact",
      description:
        "Resumes with specific metrics get 40% more interviews. Add numbers to your achievements.",
      priority: "High",
      icon: BarChart3,
      impact: "+40% interview rate",
    },
    {
      title: "Industry Certifications",
      description:
        "AWS or Google Cloud certifications could increase your profile strength by 35% in the technology sector.",
      priority: "Medium",
      icon: Award,
      impact: "+35% profile strength",
    },
    {
      title: "Professional Summary",
      description:
        "Add a compelling 2-3 line summary. Recruiters spend only 6 seconds on initial resume review.",
      priority: "Medium",
      icon: Eye,
      impact: "+18% recruiter engagement",
    },
  ];

  const aiPredictions = {
    interviewIncrease: 34,
    atsImprovement: 28,
    salaryPotential: 23,
    matchRate: 45,
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Positive":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "border-red-200 bg-red-50";
      case "Medium":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              AI-Powered Insights
            </h1>
            <p className="text-slate-600">
              Intelligent recommendations to supercharge your career
            </p>
          </div>
        </div>
      </motion.div>

      {/* AI Performance Prediction - Featured */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-blue-100"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              AI Performance Prediction
            </h3>
            <p className="text-slate-600">
              Based on analysis of 50,000+ successful resumes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              +{aiPredictions.interviewIncrease}%
            </div>
            <p className="text-sm text-slate-600">Interview Callbacks</p>
          </div>
          <div className="text-center bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              +{aiPredictions.atsImprovement}%
            </div>
            <p className="text-sm text-slate-600">ATS Score</p>
          </div>
          <div className="text-center bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              +{aiPredictions.salaryPotential}%
            </div>
            <p className="text-sm text-slate-600">Salary Potential</p>
          </div>
          <div className="text-center bg-white rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              +{aiPredictions.matchRate}%
            </div>
            <p className="text-sm text-slate-600">Job Match Rate</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-slate-700 font-medium mb-2">
                <strong>AI Recommendation:</strong> Implementing the top 3
                critical optimizations could increase your overall resume
                performance by up to 34% within the next 2 weeks.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                Start Optimization
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Priority Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <insight.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {insight.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(
                      insight.impact
                    )}`}
                  >
                    {insight.impact}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  {insight.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-medium text-slate-700">
                        Time to Fix
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      {insight.timeToFix}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-medium text-slate-700">
                        Potential Impact
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-emerald-600">
                      {insight.potentialIncrease}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-xs font-medium text-slate-700 mb-2">
                    Recommended Action:
                  </p>
                  <p className="text-sm text-slate-600 mb-3">
                    {insight.action}
                  </p>
                  <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    Apply Fix
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Market Trends & Skills Demand
            </h3>
            <p className="text-slate-600 text-sm">
              Real-time analysis of 10,000+ job postings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketTrends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-900 text-sm">
                  {trend.skill}
                </h4>
                <div className={`flex items-center gap-1 ${trend.color}`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-bold">{trend.growth}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Demand:</span>
                  <span className="text-xs font-medium text-slate-700">
                    {trend.demand}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Avg Salary:</span>
                  <span className="text-xs font-medium text-emerald-600">
                    {trend.salary}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Open Jobs:</span>
                  <span className="text-xs font-medium text-blue-600">
                    {trend.jobs}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personalized Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Personalized Action Items
            </h3>
            <p className="text-slate-600 text-sm">
              Quick wins to boost your resume performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalizedTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className={`p-4 rounded-xl border-l-4 ${getPriorityColor(
                tip.priority
              )} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tip.priority === "High" ? "bg-red-100" : "bg-yellow-100"
                  }`}
                >
                  <tip.icon
                    className={`w-4 h-4 ${
                      tip.priority === "High"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {tip.title}
                    </h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tip.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tip.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    {tip.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-600">
                      {tip.impact}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Apply →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
