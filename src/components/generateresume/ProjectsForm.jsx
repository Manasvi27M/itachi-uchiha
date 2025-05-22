'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore.js';

export default function ProjectsFormFull({ onClose }) {
  const addProject = UseResumeStore((s) => s.setProjects);
  const [item, setItem] = useState({
    name: '',
    techstack: '',
    gitlink: '',
    year: '',
    description: '',
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(item);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['name', 'techstack', 'gitlink', 'year'].map((f) => (
        <div key={f} className="flex flex-col">
          <label className="capitalize">{f}</label>
          <input
            name={f}
            value={item[f]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <div className="flex flex-col">
        <label>Description</label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleChange}
          className="w-full border p-2 rounded h-24"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Save Project
        </button>
      </div>
    </form>
  );
}
