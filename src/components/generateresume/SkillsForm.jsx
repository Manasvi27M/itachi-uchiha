'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore.js';
import { Trash } from 'lucide-react';

export default function SkillsFormFull({ onClose }) {
  const skills = UseResumeStore((s) => s.skills);
  const setSkills = UseResumeStore((s) => s.setSkills);

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-2xl border-b-2 pb-2">Skills</h1>

      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border p-2 rounded flex-1"
            placeholder="Enter new skill"
          />
          <button
            onClick={handleAddSkill}
            className="ml-4 bg-teal-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 max-h-60 overflow-y-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 text-black px-3 py-1 rounded-full"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
