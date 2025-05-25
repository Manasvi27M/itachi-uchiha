'use client';
import React, { useState } from 'react';
import BasicDetailsForm from '../generateresume/BasicDetailsForm';
import EducationForm from '../generateresume/EducationForm';
import TechnicalExperienceForm from '../generateresume/TechnicalExperienceForm';
import SkillsForm from '../generateresume/SkillsForm';
import ProjectsForm from '../generateresume/ProjectsForm';
import CertificatesForm from '../generateresume/CertificationsForm';
import AchievementsForm from '../generateresume/AchievementsForm';
//import AiSuggestionCard from '../shared/AiSuggestionCard';

const sections = [
  { key: 'basic', label: 'Basic Details', Form: BasicDetailsForm },
  { key: 'education', label: 'Education', Form: EducationForm },
  { key: 'experience', label: 'Technical Experience', Form: TechnicalExperienceForm },
  { key: 'skills', label: 'Skills', Form: SkillsForm },
  { key: 'projects', label: 'Projects', Form: ProjectsForm },
  { key: 'certificates', label: 'Certificates', Form: CertificatesForm },
  { key: 'achievements', label: 'Achievements', Form: AchievementsForm },
];

export default function GenerateResumeWithSidebar() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-75 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Add Sections</h2>
        <ul className="space-y-3">
          {sections.map(({ key, label }) => (
            <li key={key}>
              <div className="flex justify-between items-center p-3 bg-white rounded shadow">
                <span>{label}</span>
                <button
                  className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
                  onClick={() => setActiveSection(key)}
                >
                  Add New
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 relative p-6">
        {sections.map(({ key, Form }) =>
          activeSection === key ? (
            <div
              key={key}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 z-50"
            >
              <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Add {sections.find((s) => s.key === key).label}
                  </h3>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => setActiveSection(null)}
                  >
                    ✕
                  </button>
                </div>
                {/*<AiSuggestionCard field={key} onInsert={(text) => {  }} />*/}
                <Form onClose={() => setActiveSection(null)} />
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}