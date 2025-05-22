'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore.js';
import { Trash2, Plus } from 'lucide-react';

export default function TechnicalExperienceForm({ onClose }) {
  const experiences = UseResumeStore((s) => s.technicalExperience);
  const addExperience = UseResumeStore((s) => s.setTechnicalExperience);
  const setExperiences = UseResumeStore((s) => s.setSkills); // if you have a setter for all
  const [item, setItem] = useState({ companyName: '', role: '', duration: '', description: '' });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.companyName || item.role || item.duration || item.description) {
      addExperience(item);
      setItem({ companyName: '', role: '', duration: '', description: '' });
    }
  };

  const handleRemove = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    UseResumeStore.setState({ technicalExperience: updated });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold border-b pb-2">Technical Experience</h1>

      {/* Experience Cards */}
      {experiences.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No experiences added yet.</p>
      ) : (
        <div className="grid gap-4">
          {experiences.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">{exp.role || 'Untitled Role'}</h2>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-600"
                  title="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> {exp.companyName || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Duration:</strong> {exp.duration || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                <strong>Description:</strong> {exp.description || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <h2 className="font-medium text-lg flex items-center gap-2">
          <Plus className="w-5 h-5 text-teal-600" />
          Add New Experience
        </h2>
        {['companyName', 'role', 'duration'].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="capitalize font-medium text-sm">{field}</label>
            <input
              name={field}
              value={item[field]}
              onChange={handleChange}
              className="p-2 border rounded bg-gray-50"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label className="font-medium text-sm">Description</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            className="p-2 border rounded bg-gray-50 h-28 resize-none"
            placeholder="Brief description of your role or accomplishments"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Save Experience
          </button>
        </div>
      </form>
    </div>
  );
}
