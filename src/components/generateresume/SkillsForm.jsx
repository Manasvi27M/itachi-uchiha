import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash, X } from "lucide-react";

export default function SkillsForm() {
  const { skills, setSkills } = UseResumeStore();
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label">Add Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., JavaScript, React, Node.js"
            className="form-input flex-1"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="btn btn-primary whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline ml-1">Add</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Press Enter to add multiple skills quickly
        </p>
      </div>

      {skills.length > 0 && (
        <div className="mt-4">
          <label className="form-label mb-2">Your Skills</label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 group transition-colors hover:bg-gray-200"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove skill"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500">No skills added yet</p>
          <p className="text-sm text-gray-400">
            Add skills to showcase your technical expertise
          </p>
        </div>
      )}
    </div>
  );
}
