import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash } from "lucide-react";

export default function AchievementsForm() {
  const { achievements, setAchievements } = UseResumeStore();
  const [newAchievement, setNewAchievement] = useState("");

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAchievement();
    }
  };

  const handleRemove = (index) => {
    const updated = achievements.filter((_, i) => i !== index);
    setAchievements(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  return (
    <div className="space-y-4">
      <div className="form-group">
        <label className="form-label">Add Achievement</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Won first place in national coding competition"
            className="form-input flex-1"
          />
          <button
            type="button"
            onClick={handleAddAchievement}
            disabled={!newAchievement.trim()}
            className="btn btn-primary whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline ml-1">Add</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Press Enter to add quickly</p>
      </div>

      {achievements.length > 0 && (
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-2 items-center group">
              <input
                value={achievement}
                onChange={(e) => handleChange(index, e.target.value)}
                className="form-input flex-1"
                placeholder={`Achievement #${index + 1}`}
              />
              <button
                onClick={() => handleRemove(index)}
                className="text-gray-400 group-hover:text-red-500 transition-colors"
                title="Remove achievement"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {achievements.length === 0 && (
        <div className="text-center p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
          <p className="text-gray-500">No achievements added yet</p>
          <p className="text-sm text-gray-400">
            Add your accomplishments to highlight your success
          </p>
        </div>
      )}
    </div>
  );
}
