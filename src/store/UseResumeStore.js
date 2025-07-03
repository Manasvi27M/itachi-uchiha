// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const SECTION_KEYS = [
//   "basic",
//   "education",
//   "experience",
//   "skills",
//   "projects",
//   "certificates",
//   "achievements",
// ];

// export const UseResumeStore = create(
//   persist(
//     (set) => ({
//       // Section order
//       sectionsOrder: SECTION_KEYS,
//       setSectionsOrder: (newOrder) => set({ sectionsOrder: newOrder }),

//       // Basic details
//       basicDetails: {
//         name: "",
//         phone: "",
//         city: "",
//         state: "",
//         gmail: "",
//         github: "",
//         linkedIn: "",
//       },
//       setBasicDetails: (details) => set({ basicDetails: details }),
//       updateBasicDetail: (key, value) =>
//         set((state) => ({
//           basicDetails: { ...state.basicDetails, [key]: value },
//         })),

//       // Education
//       education: [],
//       setEducation: (education) => set({ education }),
//       addEducation: (item) =>
//         set((state) => ({
//           education: [...state.education, item],
//         })),
//       updateEducation: (index, updatedItem) =>
//         set((state) => {
//           const updated = [...state.education];
//           updated[index] = updatedItem;
//           return { education: updated };
//         }),
//       removeEducation: (index) =>
//         set((state) => ({
//           education: state.education.filter((_, i) => i !== index),
//         })),

//       // Technical experience
//       technicalExperience: [],
//       setTechnicalExperience: (technicalExperience) =>
//         set({ technicalExperience }),
//       addTechnicalExperience: (item) =>
//         set((state) => ({
//           technicalExperience: [...state.technicalExperience, item],
//         })),
//       updateTechnicalExperience: (index, updatedItem) =>
//         set((state) => {
//           const updated = [...state.technicalExperience];
//           updated[index] = updatedItem;
//           return { technicalExperience: updated };
//         }),
//       removeTechnicalExperience: (index) =>
//         set((state) => ({
//           technicalExperience: state.technicalExperience.filter(
//             (_, i) => i !== index
//           ),
//         })),

//       // Skills
//       skills: [],
//       setSkills: (skills) => set({ skills }),
//       addSkill: (skill) =>
//         set((state) => ({
//           skills: [...state.skills, skill],
//         })),
//       updateSkill: (index, updatedSkill) =>
//         set((state) => {
//           const updated = [...state.skills];
//           updated[index] = updatedSkill;
//           return { skills: updated };
//         }),
//       removeSkill: (index) =>
//         set((state) => ({
//           skills: state.skills.filter((_, i) => i !== index),
//         })),

//       // Projects
//       projects: [],
//       setProjects: (projects) => set({ projects }),
//       addProject: (project) =>
//         set((state) => ({
//           projects: [...state.projects, project],
//         })),
//       updateProject: (index, updatedProject) =>
//         set((state) => {
//           const updated = [...state.projects];
//           updated[index] = updatedProject;
//           return { projects: updated };
//         }),
//       removeProject: (index) =>
//         set((state) => ({
//           projects: state.projects.filter((_, i) => i !== index),
//         })),

//       // Certificates
//       certificates: [],
//       setCertificates: (certificate) =>
//         set((state) => ({
//           certificates: [...state.certificates, certificate],
//         })),
//       updateCertificate: (index, updatedCertificate) =>
//         set((state) => {
//           const updated = [...state.certificates];
//           updated[index] = updatedCertificate;
//           return { certificates: updated };
//         }),
//       removeCertificate: (index) =>
//         set((state) => ({
//           certificates: state.certificates.filter((_, i) => i !== index),
//         })),

//       // Achievements
//       achievements: [],
//       setAchievements: (achievements) => set({ achievements }),
//       addAchievement: (achievement) =>
//         set((state) => ({
//           achievements: [...state.achievements, achievement],
//         })),
//       updateAchievement: (index, updatedAchievement) =>
//         set((state) => {
//           const updated = [...state.achievements];
//           updated[index] = updatedAchievement;
//           return { achievements: updated };
//         }),
//       removeAchievement: (index) =>
//         set((state) => ({
//           achievements: state.achievements.filter((_, i) => i !== index),
//         })),

//       // Clear all data
//       clearAllData: () =>
//         set({
//           basicDetails: {
//             name: "",
//             phone: "",
//             city: "",
//             state: "",
//             gmail: "",
//             github: "",
//             linkedIn: "",
//           },
//           education: [],
//           technicalExperience: [],
//           skills: [],
//           projects: [],
//           certificates: [],
//           achievements: [],
//         }),
//     }),
//     {
//       name: "resume-storage",
//     }
//   )
// );
// store/UseResumeStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SECTION_KEYS = [
  "basic",
  "education",
  "experience",
  "skills",
  "projects",
  "certificates",
  "achievements",
];

export const UseResumeStore = create(
  persist(
    (set) => ({
      // Section order
      sectionsOrder: SECTION_KEYS,
      setSectionsOrder: (newOrder) => set({ sectionsOrder: newOrder }),

      // Basic details
      basicDetails: {
        name: "",
        phone: "",
        city: "",
        state: "",
        gmail: "",
        github: "",
        linkedIn: "",
      },
      setBasicDetails: (details) => set({ basicDetails: details }),
      updateBasicDetail: (key, value) =>
        set((state) => ({
          basicDetails: { ...state.basicDetails, [key]: value },
        })),

      // Education
      education: [],
      setEducation: (education) => set({ education }),
      addEducation: (item) =>
        set((state) => ({
          education: [...state.education, item],
        })),
      updateEducation: (index, updatedItem) =>
        set((state) => {
          const updated = [...state.education];
          updated[index] = updatedItem;
          return { education: updated };
        }),
      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

      // Technical experience
      technicalExperience: [],
      setTechnicalExperience: (technicalExperience) =>
        set({ technicalExperience }),
      addTechnicalExperience: (item) =>
        set((state) => ({
          technicalExperience: [...state.technicalExperience, item],
        })),
      updateTechnicalExperience: (index, updatedItem) =>
        set((state) => {
          const updated = [...state.technicalExperience];
          updated[index] = updatedItem;
          return { technicalExperience: updated };
        }),
      removeTechnicalExperience: (index) =>
        set((state) => ({
          technicalExperience: state.technicalExperience.filter(
            (_, i) => i !== index
          ),
        })),

      // Skills
      skills: [],
      setSkills: (skills) => set({ skills }),
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, skill],
        })),
      updateSkill: (index, updatedSkill) =>
        set((state) => {
          const updated = [...state.skills];
          updated[index] = updatedSkill;
          return { skills: updated };
        }),
      removeSkill: (index) =>
        set((state) => ({
          skills: state.skills.filter((_, i) => i !== index),
        })),

      // Projects
      projects: [],
      setProjects: (projects) => set({ projects }),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      updateProject: (index, updatedProject) =>
        set((state) => {
          const updated = [...state.projects];
          updated[index] = updatedProject;
          return { projects: updated };
        }),
      removeProject: (index) =>
        set((state) => ({
          projects: state.projects.filter((_, i) => i !== index),
        })),

      // Certificates
      certificates: [],
      // ← REWRITTEN: now takes an array and *replaces* the entire certificates list
      setCertificates: (certificates) => set({ certificates }),
      updateCertificate: (index, updatedCertificate) =>
        set((state) => {
          const updated = [...state.certificates];
          updated[index] = updatedCertificate;
          return { certificates: updated };
        }),
      removeCertificate: (index) =>
        set((state) => ({
          certificates: state.certificates.filter((_, i) => i !== index),
        })),

      // Achievements
      achievements: [],
      setAchievements: (achievements) => set({ achievements }),
      addAchievement: (achievement) =>
        set((state) => ({
          achievements: [...state.achievements, achievement],
        })),
      updateAchievement: (index, updatedAchievement) =>
        set((state) => {
          const updated = [...state.achievements];
          updated[index] = updatedAchievement;
          return { achievements: updated };
        }),
      removeAchievement: (index) =>
        set((state) => ({
          achievements: state.achievements.filter((_, i) => i !== index),
        })),

      // Clear all data
      clearAllData: () =>
        set({
          basicDetails: {
            name: "",
            phone: "",
            city: "",
            state: "",
            gmail: "",
            github: "",
            linkedIn: "",
          },
          education: [],
          technicalExperience: [],
          skills: [],
          projects: [],
          certificates: [],
          achievements: [],
        }),
    }),
    {
      name: "resume-storage",
    }
  )
);
