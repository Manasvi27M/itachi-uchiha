import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";

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
      const sysPrompt = `You are ResumeParserGPT, a specialized assistant for extracting structured data from resumes. When you receive an input resume data, your job is to output **only** a JSON object following exactly this schema:
{
  "basicDetails": {
    "name": "",
    "phone": "",
    "city": "",
    "state": "",
    "gmail": "",
    "github": "",
    "linkedIn": ""
  },
  "education": [
    {
      "name": "",
      "course": "",
      "score": "",
      "duration": ""
    }
  ],
  "technicalExperience": [
    {
      "companyName": "",
      "role": "",
      "duration": "",
      "description": ""
    }
  ],
  "skills": [""],
  "projects": [
    {
      "name": "",
      "techstack": "",
      "gitlink": "",
      "year": "",
      "description": ""
    }
  ],
  "certificates": [
    {
      "title": "",
      "tag": ""
    }
  ],
  "achievements": [""]
}

**Rules:**
1. **Output only valid JSON** — no markdown, no explanations.
2. If any field is missing in the resume, set it to an empty string ("") or an empty array ([]) for lists.
3. For basicDetails.gmail, extract the email address from the resume.
4. For skills, provide an array of individual skill strings.
5. For certificates, provide an array of objects with title and tag (issuer) fields.
6. For technicalExperience.description, combine all bullet points into a single string separated by newlines.
7. For education.name, use the institution name; for education.course, use the degree/program name.
8. Dates should be in a readable format (e.g., "2024-08 – 2024-11" or "Jun 2024 - Present").
9. Preserve the order of entries as they appear in the resume.
Data: `;

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          resolve(dataUrl.split(",", 2)[1]);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      // Build the JSON payload
      const payload = {
        Parameters: [
          {
            Name: "File",
            FileValue: {
              Name: file.name,
              Data: base64,
            },
          },
          {
            Name: "StoreFile",
            Value: true,
          },
        ],
      };
      const CONVERTAI_API = process.env.CONVERTAI_API;

      // Call ConvertAPI
      const convRes = await fetch(
        "https://v2.convertapi.com/convert/pdf/to/txt",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CONVERTAI_API}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!convRes.ok) {
        const errBody = await convRes.text().catch(() => null);
        throw new Error(`ConvertAPI error ${convRes.status}: ${errBody}`);
      }

      const convJson = await convRes.json();
      console.log("ConvertAPI response:", convJson);

      const txtUrl = convJson.Files?.[0]?.Url;
      console.log("Text URL:", txtUrl);

      if (!txtUrl) throw new Error("No File URL returned from ConvertAPI");

      // Download the TXT and read as string
      const txtRes = await fetch(txtUrl);
      if (!txtRes.ok) {
        let msg = txtRes.statusText;
        try {
          const errJson = await txtRes.json();
          msg = errJson.Message || errJson.message || JSON.stringify(errJson);
        } catch {}
        throw new Error(`Download failed (${txtRes.status}): ${msg}`);
      }

      const resumeText = await txtRes.text();
      console.log("Extracted resume text:", resumeText);
      const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

      // Call LLM API
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [{ role: "user", content: sysPrompt + resumeText }],
          }),
        }
      );

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null);
        const message =
          (errorJson && errorJson.error) ||
          `Server responded with ${response.status}`;
        console.log("LLM API error:", response);
        throw new Error(message);
      }

      const data = await response.json();
      console.log("LLM API response:", data);

      // Extract and clean the assistant's response
      let assistantMessage = data.choices[0].message.content.trim();
      assistantMessage = assistantMessage
        .replace(/^```(?:json)?\s*/, "")
        .replace(/\s*```$/, "");

      console.log("Cleaned assistant message:", assistantMessage);

      // Parse JSON
      let parsed;
      try {
        parsed = JSON.parse(assistantMessage);
      } catch (e) {
        console.error("Failed to parse JSON from assistant:", assistantMessage);
        throw new Error("Invalid JSON response from AI: " + e.message);
      }

      console.log("Parsed resume data:", parsed);

      // MAP DATA TO STORE - Fixed to match the expected structure

      // 1) Basic details - Direct mapping
      const basicDetails = parsed.basicDetails || {};
      const mappedBasicDetails = {
        name: basicDetails.name || "",
        phone: basicDetails.phone || "",
        city: basicDetails.city || "",
        state: basicDetails.state || "",
        gmail: basicDetails.gmail || "",
        github: basicDetails.github || "",
        linkedIn: basicDetails.linkedIn || "",
      };

      console.log("Setting basic details:", mappedBasicDetails);
      setBasicDetails(mappedBasicDetails);

      // 2) Education - Map to expected structure
      const education =
        Array.isArray(parsed.education) && parsed.education.length > 0
          ? parsed.education.map((e, index) => {
              console.log(`Processing education item ${index}:`, e);
              return {
                name: String(e.name || e.institution || ""), // Handle both name and institution
                course: String(e.course || e.degree || ""), // Handle both course and degree
                score: String(e.score || ""),
                duration: String(e.duration || e.period || ""), // Handle both duration and period
              };
            })
          : [];

      console.log("Final education array:", education);
      setEducation(education);

      // 3) Technical Experience - Map to expected structure
      const technicalExperience =
        Array.isArray(parsed.technicalExperience) &&
        parsed.technicalExperience.length > 0
          ? parsed.technicalExperience.map((e, index) => {
              console.log(`Processing technical experience item ${index}:`, e);
              // Convert bullets array to description string if needed
              let description = e.description || "";
              if (Array.isArray(e.bullets) && e.bullets.length > 0) {
                description = e.bullets.join("\n");
              }

              return {
                companyName: String(e.companyName || e.company || ""),
                role: String(e.role || ""),
                duration: String(e.duration || e.period || ""),
                description: String(description),
              };
            })
          : [];

      console.log("Final technical experience array:", technicalExperience);
      setTechnicalExperience(technicalExperience);

      // 4) Skills - Direct mapping
      const skills =
        Array.isArray(parsed.skills) && parsed.skills.length > 0
          ? parsed.skills
              .filter((skill) => skill && skill.trim())
              .map((s) => String(s))
          : [];

      console.log("Setting skills:", skills);
      setSkills(skills);

      // 5) Projects - Map to expected structure
      const projects =
        Array.isArray(parsed.projects) && parsed.projects.length > 0
          ? parsed.projects.map((p, index) => {
              console.log(`Processing project item ${index}:`, p);
              return {
                name: String(p.name || ""),
                techstack: String(p.techstack || ""),
                gitlink: String(p.gitlink || ""),
                year: String(p.year || p.period || ""),
                description: String(p.description || ""),
              };
            })
          : [];

      console.log("Setting projects:", projects);
      setProjects(projects);

      // 6) Certificates - Map to expected structure
      let certificates = [];
      if (
        Array.isArray(parsed.certificates) &&
        parsed.certificates.length > 0
      ) {
        certificates = parsed.certificates
          .map((cert, index) => {
            console.log(`Processing certificate item ${index}:`, cert);
            // Handle both string and object formats
            if (typeof cert === "string") {
              return {
                title: cert,
                tag: "",
              };
            } else if (typeof cert === "object") {
              return {
                title: String(cert.title || cert.name || ""),
                tag: String(cert.tag || cert.issuer || ""),
              };
            }
            return { title: "", tag: "" };
          })
          .filter((cert) => cert.title.trim());
      }

      console.log("Setting certificates:", certificates);
      setCertificates(certificates);

      // 7) Achievements - Direct mapping
      const achievements =
        Array.isArray(parsed.achievements) && parsed.achievements.length > 0
          ? parsed.achievements
              .filter((achievement) => achievement && achievement.trim())
              .map((a) => String(a))
          : [];

      console.log("Setting achievements:", achievements);
      setAchievements(achievements);

      setIsLoading(false);
      console.log("Resume parsing completed successfully!");
    } catch (err) {
      console.error("Error parsing resume:", err);
      setError(err.message || "Failed to parse resume");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Upload Your Resume
      </h2>

      <div className="mb-4">
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
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-teal-50 file:text-teal-700
                     hover:file:bg-teal-100 transition-colors
                     border border-gray-300 rounded-md
                     focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {isLoading && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-blue-600 animate-pulse flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Parsing resume, please wait…
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="mt-4 p-4 bg-green-50 rounded-md">
          <p className="text-green-600">
            Once uploaded, your resume fields will be auto-filled in the editor.
          </p>
        </div>
      )}
    </div>
  );
}
