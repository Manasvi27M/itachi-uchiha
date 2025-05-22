'use client';
import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { UseResumeStore } from '../../store/UseResumeStore';

export default function AchievementsForm({ onClose }) {
  const setAchievements = UseResumeStore((s) => s.setAchievements);
  const [achievements, setLocalAchievements] = useState(['']);

  const handleAchievementsChange = (e, index) => {
    const value = e.target.value;
    setLocalAchievements((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const removeAchievement = (index) => {
    setLocalAchievements((prev) => prev.filter((_, i) => i !== index));
  };

  const addAchievementField = () => {
    setLocalAchievements((prev) => [...prev, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nonEmptyAchievements = achievements.filter((a) => a.trim() !== '');
    setAchievements(nonEmptyAchievements); // ✅ updates global state
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="font-semibold text-2xl border-b-2 pb-2">Achievements</h1>

      {achievements.map((achievement, index) => (
        <div key={index} className="flex gap-3 px-4">
          <div className="text-lg font-semibold rounded-full bg-slate-200 border-neutral-700 border-2 h-10 w-10 flex items-center justify-center">
            <span className="text-black">{index + 1}</span>
          </div>
          <input
            type="text"
            value={achievement}
            onChange={(e) => handleAchievementsChange(e, index)}
            className="bg-neutral-900 text-white border-none rounded-lg focus:ring-0 flex-1 p-2"
          />
          <button
            type="button"
            onClick={() => removeAchievement(index)}
            className={`text-red-400 p-1 px-3 rounded-lg hover:bg-neutral-900 ${
              index === 0 ? 'hidden' : ''
            }`}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex ml-10">
        <button
          type="button"
          onClick={addAchievementField}
          className="bg-neutral-900 border-2 p-2 rounded-lg flex items-center hover:opacity-90"
        >
          <CirclePlus className="h-5 w-5" />
          <span className="ml-1">Add Achievement</span>
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 px-4 py-2 rounded border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Save Achievements
        </button>
      </div>
    </form>
  );
}
