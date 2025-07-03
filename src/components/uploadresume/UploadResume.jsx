// components/UploadResume.jsx
import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import extractContactDetails from "../../lib/extractdetails/extract-contact";

export default function UploadResume() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Zustand setters
  const setBasicDetails = UseResumeStore((state) => state.setBasicDetails);
  const setEducation = UseResumeStore((state) => state.setEducation);
  const setTechnicalExperience = UseResumeStore(
    (state) => state.setTechnicalExperience
  );
  const setSkills = UseResumeStore((state) => state.setSkills);
  const setProjects = UseResumeStore((state) => state.setProjects);
  const setCertificates = UseResumeStore((state) => state.setCertificates);
  const setAchievements = UseResumeStore((state) => state.setAchievements);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setIsLoading(true);
    try {
      const sysPrompt = `You are ResumeParserGPT, a specialized assistant for extracting structured data from resumes. When you receive an input sume data, your job is to output **only** a JSON object following exactly this schema:
{
  "contact": {
    "name": "",
    "phone": "",
    "city": "",
    "state": "",
    "email": "",
    "linkedIn": "",
    "github": "",
    "portfolio": ""
  },
  "summary": "",
  "education": [
    {
      "institution": "",
      "degree": "",
      "period": ""
    }
  ],
  "experience": [
    {
      "role": "",
      "company": "",
      "period": "",
      "bullets": [""]
    }
  ],
  "skills": [""],
  "projects": [
    {
      "name": "",
      "period": "",
      "description": ""
    }
  ],
  "certifications": [""],
  "achievements": [""]
}


**Rules:**
1. **Output only valid JSON** — no markdown, no explanations.
2. If any field is missing in the resume, set it to an empty string ("") or an empty array ([]) for lists.
3. Dates should use ISO format (YYYY-MM or YYYY-MM-DD). If only a year is given, use YYYY.
4. Split the candidate name into firstName and lastName. If only one name is present, put it into firstName and leave lastName empty.
5. For multi-item sections (education, experience, skills, certifications, projects), include one array element per entry.
6. Preserve the order of entries as they appear in the resume. 
Data: `;

      const resumeText = `MANASVI M
 +91-9019862884 | Bengaluru, Karnataka | manasvii.social@gmail.com | LinkedIn | GitHub | Portfolio
 SUMMARY
 Aspiring Full Stack Developer with a strong foundation in both front-end and back-end technologies,
 and a passion for problem-solving, eager to build impactful web applications and solutions while continuously
 learning and growing in dynamic environments.
 SKILLS
 Programming Languages
 Front End Development
 Back End Development
 Version Control and Tools
 Java, C++, C, Python, JavaScript
 React, Tailwind CSS, HTML5, CSS3, Bootstrap
 MySQL, MongoDB, Node.js, Express Microsoft Azure
 Git, Github, Postman, RESTful APIs, Streamlit
 PROJECTS
 SmartResume | AI-Driven Resume & Job Matching Platform 
March 2025– Present
 • Architecting a full-stack web app using Next.js, Tailwind CSS, and Node.js, allowing users to create
 ATS-optimized resumes with AI-powered suggestions and multiple design templates.
 • Integrated job recommendation and resume tailoring engine using REST APIs, MongoDB, and dynamic
 resume scoring logic, improving job application efficiency by personalizing resumes for each listing.
 Crop Connect | Agriculture Equipment and Produce Marketplace 
Oct 2024– Dec 2024
 • Built a responsive marketplace platform using HTML, CSS, JavaScript, and MySQL, enabling farmers
 to rent equipment and sell produce.
 • Enhanced user experience with streamlined workflows and mobile-first UI, increasing average session duration
 by 40%.
 WanderWise | Smart Travel Booking System 
Jun 2024– Jul 2024
 • Created a travel management system using Flask and MySQL with secure user login, booking, and
 cancellation modules, supporting real-time seat and room tracking.
 • Improved data access efficiency by 60% using optimized SQL joins, foreign keys, and database normal
ization to support scalable, relational data handling.
 Graph Coloring Visualizer | Greedy Algorithm 
Jun 2024– Jul 2024
 • Designed an interactive Streamlit app to visualize the Greedy Graph Coloring algorithm with user-defined
 or auto-generated graphs, enhancing algorithmic learning.
 • Supported visualization for 50+ graph configurations, enabling students and educators to explore opti
mization techniques in graph theory interactively.
 EDUCATION
 RNS Institute of Technology
 Bachelor of Information Science and Engineering
 Deeksha Center for Learning
 Pre-University
 CERTIFICATIONS
 2022- Present
 CGPA: 9.22
 2020- 2022
 Score: 96%
 Microsoft Certified — Azure Fundamentals (AZ-900)
 EXTRA CURRICULAR ACTIVITIES AND ACHIEVEMENTS
 GirlScript Summer of Code | Contributed to 3+ organizations collaborating with global developers
 LogicLeap | Organized a series of department-level competitive coding contest for 4th and 6th semester students`;
      console.log(resumeText);

      // Adjust URL if backend lives elsewhere
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemma-3n-e4b-it:free",
            messages: [
              // { role: "system", content: sysPrompt },
              { role: "user", content: sysPrompt + resumeText },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null);
        const message =
          (errorJson && errorJson.error) ||
          `Server responded with ${response.status}`;
        console.log(response);
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);

      // data.choices is an array; we want the first message from the assistant:
      let assistantMessage = data.choices[0].message.content.trim();
      assistantMessage = assistantMessage
        .replace(/^```(?:json)?\s*/, "")
        .replace(/\s*```$/, "");
      console.log(assistantMessage);

      // Now parse that string as JSON:
      let parsed;
      try {
        parsed = JSON.parse(assistantMessage);
      } catch (e) {
        console.error("Failed to parse JSON from assistant:", assistantMessage);
        throw e;
      }

      // parsed now contains your structured resume object:
      console.log(parsed);
      // parsed keys: { contact, summary, skills, education, experience, projects, certifications, achievements }

      // ─── 1) BASIC DETAILS from contact block ─────────────────────────────────────────
      // 1) Extract the raw contact string from parsed.contact

      const contact = parsed.contact || {};

      setBasicDetails({
        name: contact.name || "",
        phone: contact.phone || "",
        city: contact.city || "",
        state: contact.state || "",
        email: contact.email || "",
        linkedIn: contact.linkedIn || "",
        github: contact.github || "",
        portfolio: contact.portfolio || "",
      });

      // ─── 2) EDUCATION (already an array of {institution, degree, period}) ──────────────
      const eduRaw = Array.isArray(parsed.education) ? parsed.education : [];
      const eduArray = eduRaw.map((entry) => ({
        institution: entry.institution || "",
        degree: entry.degree || "",
        period: entry.period || "",
      }));
      setEducation(eduArray);

      // ─── 3) EXPERIENCE (already an array of {role, company, period, bullets}) ───────────
      const expRaw = Array.isArray(parsed.experience) ? parsed.experience : [];
      const expArray = expRaw.map((entry) => ({
        role: entry.role || "",
        company: entry.company || "",
        period: entry.period || "",
        bullets: Array.isArray(entry.bullets) ? entry.bullets : [],
      }));
      setTechnicalExperience(expArray);

      // ─── 4) SKILLS (array of strings) ─────────────────────────────────────────────────────
      let skillsRaw = parsed.skills || [];
      if (!Array.isArray(skillsRaw)) {
        if (typeof skillsRaw === "string") {
          skillsRaw = skillsRaw
            .split(/[,;\n•·•\u2022]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        } else {
          skillsRaw = [];
        }
      }
      setSkills(skillsRaw);

      // ─── 5) PROJECTS (array of {name, period, description}) ──────────────────────────────
      const projRaw = Array.isArray(parsed.projects) ? parsed.projects : [];
      const projArray = projRaw.map((entry) => ({
        name: entry.name || "",
        period: entry.period || "",
        description: entry.description || "",
      }));
      setProjects(projArray);

      // ─── 6) CERTIFICATIONS (array of strings) ────────────────────────────────────────────
      let certRaw = parsed.certifications || [];
      if (!Array.isArray(certRaw)) {
        if (typeof certRaw === "string") {
          certRaw = certRaw
            .split(/[\n;•·•\u2022]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        } else {
          certRaw = [];
        }
      }
      setCertificates(certRaw);

      // ─── 7) ACHIEVEMENTS (array of strings) ──────────────────────────────────────────────
      let achieveRaw = parsed.achievements || [];
      if (!Array.isArray(achieveRaw)) {
        if (typeof achieveRaw === "string") {
          achieveRaw = achieveRaw
            .split(/[\n;•·•\u2022]+/)
            .map((s) => s.trim())
            .filter(Boolean);
        } else {
          achieveRaw = [];
        }
      }
      setAchievements(achieveRaw);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to parse resume");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Upload Your Resume
      </h2>

      <label
        htmlFor="resumeFile"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a PDF or DOCX file:
      </label>
      <input
        id="resumeFile"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />

      {isLoading && (
        <p className="mt-4 text-blue-600 animate-pulse">
          Parsing resume, please wait…
        </p>
      )}
      {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}

      {!isLoading && !error && (
        <p className="mt-4 text-green-600">
          Once uploaded, your resume fields will be auto‐filled below.
        </p>
      )}
    </div>
  );
}
