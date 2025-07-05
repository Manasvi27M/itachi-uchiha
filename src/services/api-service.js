// API Service for handling external data requests
// const API_CONFIG = {
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.resumehub.com",
//   timeout: 10000, // 10 seconds
// };

// Helper function to make API requests
async function makeRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const config = {
    timeout: API_CONFIG.timeout,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout - please check your connection");
    }
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// Mock data functions
export function getMockResumeData() {
  return [
    {
      id: 1,
      title: "Software Engineer Resume",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      atsScore: 85,
      status: "active",
      applications: 12,
      views: 45,
      industry: "Technology",
      template: "Modern",
    },
    {
      id: 2,
      title: "Product Manager Resume",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18",
      atsScore: 92,
      status: "active",
      applications: 8,
      views: 32,
      industry: "Product",
      template: "Professional",
    },
    {
      id: 3,
      title: "Data Scientist Resume",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-15",
      atsScore: 78,
      status: "draft",
      applications: 5,
      views: 23,
      industry: "Data Science",
      template: "Creative",
    },
    {
      id: 4,
      title: "UX Designer Resume",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-12",
      atsScore: 88,
      status: "active",
      applications: 15,
      views: 67,
      industry: "Design",
      template: "Minimal",
    },
    {
      id: 5,
      title: "Marketing Manager Resume",
      createdAt: "2023-12-28",
      updatedAt: "2024-01-08",
      atsScore: 81,
      status: "archived",
      applications: 6,
      views: 28,
      industry: "Marketing",
      template: "Bold",
    },
  ];
}

function getMockAnalytics() {
  return {
    performanceData: [
      { date: "2024-01-01", views: 12, applications: 3, responses: 1 },
      { date: "2024-01-08", views: 18, applications: 5, responses: 2 },
      { date: "2024-01-15", views: 25, applications: 8, responses: 3 },
      { date: "2024-01-22", views: 32, applications: 12, responses: 5 },
      { date: "2024-01-29", views: 28, applications: 10, responses: 4 },
      { date: "2024-02-05", views: 35, applications: 15, responses: 6 },
      { date: "2024-02-12", views: 42, applications: 18, responses: 8 },
    ],
  };
}

function getMockInsights() {
  return {
    insights: [
      {
        type: "optimization",
        title: "Keyword Optimization Opportunity",
        description:
          "Your Software Engineer resume could benefit from adding more technical keywords.",
        impact: "High",
        action: "Add 5-7 relevant technical keywords",
      },
    ],
  };
}

// Main API service functions
export async function getResumeData() {
  try {
    // Try to fetch from external API first
    return await makeRequest("/api/resumes");
  } catch (error) {
    console.warn("External API failed, using mock data:", error.message);
    // Fallback to mock data if API fails
    return getMockResumeData();
  }
}

export async function getAnalytics() {
  try {
    return await makeRequest("/api/analytics");
  } catch (error) {
    console.warn("Analytics API failed, using mock data:", error.message);
    return getMockAnalytics();
  }
}

export async function getInsights() {
  try {
    return await makeRequest("/api/insights");
  } catch (error) {
    console.warn("Insights API failed, using mock data:", error.message);
    return getMockInsights();
  }
}

// Export all functions as a single object for backward compatibility
export const apiService = {
  getResumeData,
  getAnalytics,
  getInsights,
};
