import { create } from 'zustand';

export const UseResumeStore = create((set) => ({
  // Basic Details
  basicDetails: {
    name: '',
    gmail: '',
    phone: '',
    city: '',
    state: '',
    github: '',
    linkedIn: '',
  },
  setBasicDetails: (newDetails) => set((state) => ({
    basicDetails: { ...state.basicDetails, ...newDetails },
  })),

  // Education
  education: [
    {
      name: '',       // Institution name
      course: '',     // Course title
      score: '',      // Grade/CGPA
      duration: '',   // Duration
    },
  ],
  setEducation: (newEntry) => set((state) => ({
    education: [...state.education, newEntry],
  })),

  // Technical Experience
  technicalExperience: [
    {
      companyName: '',
      role: '',
      duration: '',
      description: '',
    },
  ],
  setTechnicalExperience: (newEntry) => set((state) => ({
    technicalExperience: [...state.technicalExperience, newEntry],
  })),

  // Skills
  skills: [''], // Array of strings
  setSkills: (newSkills) => set(() => ({
    skills: newSkills,
  })),

  // Projects
  projects: [
    {
      name: '',
      techstack: '',
      year: '',
      gitlink: '',
      description: '',
    },
  ],
  setProjects: (newEntry) => set((state) => ({
    projects: [...state.projects, newEntry],
  })),

  // Certificates
  certificates: [
    {
      title: '',
      tag: '',
    },
  ],
  setCertificates: (newEntry) => set((state) => ({
    certificates: [...state.certificates, newEntry],
  })),

  // Achievements
  achievements: [''],
  setAchievements: (newAchievements) => set(() => ({
    achievements: newAchievements,
  })),
}));
