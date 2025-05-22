'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore.js';
import { CirclePlus } from 'lucide-react';

export default function EducationForm({ onClose }) {
  const addEducation = UseResumeStore((s) => s.setEducation);
  const [education, setEducation] = useState([
    { name: '', course: '', score: '', duration: '' },
  ]);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setEducation((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addNewEducation = () => {
    setEducation((prev) => [
      ...prev,
      { name: '', course: '', score: '', duration: '' },
    ]);
  };

  const removeEducation = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    education.forEach((edu) => {
      if (edu.course.trim() || edu.name.trim()) {
        addEducation(edu);
      }
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold border-b pb-2">Education Details</h1>

      {education.map((edu, index) => (
        <div key={index} className="border p-4 rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold">#{index + 1}</span>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className={`text-red-500 hover:underline ${index === 0 ? 'hidden' : ''}`}
            >
              Remove
            </button>
          </div>

          <div className="flex flex-col">
            <label>Course</label>
            <input
              value={edu.course}
              onChange={(e) => handleInputChange(e, index, 'course')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>School Name</label>
            <input
              value={edu.name}
              onChange={(e) => handleInputChange(e, index, 'name')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Score</label>
            <input
              placeholder="E.g: CGPA: 8.2/10"
              value={edu.score}
              onChange={(e) => handleInputChange(e, index, 'score')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Duration</label>
            <input
              placeholder="E.g: 2020-2024"
              value={edu.duration}
              onChange={(e) => handleInputChange(e, index, 'duration')}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ))}

      <div className="flex">
        <button
          type="button"
          onClick={addNewEducation}
          className="flex items-center border p-2 rounded hover:bg-gray-100"
        >
          <CirclePlus className="h-5 w-5" />
          <span className="ml-1">Add Education</span>
        </button>
      </div>

      <div className="flex justify-end pt-4">
        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">
          Save All
        </button>
      </div>
    </form>
  );
}
