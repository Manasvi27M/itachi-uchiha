import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash } from "lucide-react";

export default function TechnicalExperienceForm() {
  const {
    technicalExperience,
    addTechnicalExperience,
    updateTechnicalExperience,
    removeTechnicalExperience,
  } = UseResumeStore();

  const [newExperience, setNewExperience] = useState({
    companyName: "",
    role: "",
    duration: "",
    description: "",
  });

  const handleAddNew = () => {
    if (newExperience.companyName.trim() && newExperience.role.trim()) {
      addTechnicalExperience(newExperience);
      setNewExperience({
        companyName: "",
        role: "",
        duration: "",
        description: "",
      });
    }
  };

  const handleChange = (index, field, value) => {
    const updatedItem = { ...technicalExperience[index], [field]: value };
    updateTechnicalExperience(index, updatedItem);
  };

  const handleNewChange = (field, value) => {
    setNewExperience({ ...newExperience, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Existing experience entries */}
      {technicalExperience.length > 0 && (
        <div className="space-y-6">
          {technicalExperience.map((exp, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md bg-white shadow-sm relative"
            >
              <button
                type="button"
                onClick={() => removeTechnicalExperience(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove experience"
              >
                <Trash size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    value={exp.companyName || ""}
                    onChange={(e) =>
                      handleChange(index, "companyName", e.target.value)
                    }
                    placeholder="Google Inc."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role/Position</label>
                  <input
                    type="text"
                    value={exp.role || ""}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    placeholder="Senior Software Engineer"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  value={exp.duration || ""}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                  placeholder="Jan 2020 - Present"
                  className="form-input"
                />
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Description</label>
                <textarea
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  className="form-input min-h-[100px]"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use new lines to separate different points.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new experience form */}
      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-white">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              value={newExperience.companyName}
              onChange={(e) => handleNewChange("companyName", e.target.value)}
              placeholder="Google Inc."
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role/Position</label>
            <input
              type="text"
              value={newExperience.role}
              onChange={(e) => handleNewChange("role", e.target.value)}
              placeholder="Senior Software Engineer"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group mt-4">
          <label className="form-label">Duration</label>
          <input
            type="text"
            value={newExperience.duration}
            onChange={(e) => handleNewChange("duration", e.target.value)}
            placeholder="Jan 2020 - Present"
            className="form-input"
          />
        </div>

        <div className="form-group mt-4">
          <label className="form-label">Description</label>
          <textarea
            value={newExperience.description}
            onChange={(e) => handleNewChange("description", e.target.value)}
            placeholder="Describe your responsibilities and achievements..."
            className="form-input min-h-[100px]"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            Use new lines to separate different points.
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddNew}
            disabled={
              !newExperience.companyName.trim() || !newExperience.role.trim()
            }
            className="btn btn-primary flex items-center gap-1"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}
