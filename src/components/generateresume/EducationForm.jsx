import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash } from "lucide-react";

export default function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } =
    UseResumeStore();
  const [newEducation, setNewEducation] = useState({
    name: "",
    course: "",
    score: "",
    duration: "",
  });

  const handleAddNew = () => {
    if (newEducation.name.trim()) {
      addEducation(newEducation);
      setNewEducation({ name: "", course: "", score: "", duration: "" });
    }
  };

  const handleChange = (index, field, value) => {
    const updatedItem = { ...education[index], [field]: value };
    updateEducation(index, updatedItem);
  };

  const handleNewChange = (field, value) => {
    setNewEducation({ ...newEducation, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Existing education entries */}
      {education.length > 0 && (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md bg-white shadow-sm relative"
            >
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove education"
              >
                <Trash size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Institution Name</label>
                  <input
                    type="text"
                    value={edu.name || ""}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    placeholder="Harvard University"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course/Degree</label>
                  <input
                    type="text"
                    value={edu.course || ""}
                    onChange={(e) =>
                      handleChange(index, "course", e.target.value)
                    }
                    placeholder="B.S. Computer Science"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-group">
                  <label className="form-label">GPA/Score</label>
                  <input
                    type="text"
                    value={edu.score || ""}
                    onChange={(e) =>
                      handleChange(index, "score", e.target.value)
                    }
                    placeholder="3.8/4.0"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    value={edu.duration || ""}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                    placeholder="2018 - 2022"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new education form */}
      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-white">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Education
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Institution Name</label>
            <input
              type="text"
              value={newEducation.name}
              onChange={(e) => handleNewChange("name", e.target.value)}
              placeholder="Harvard University"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Course/Degree</label>
            <input
              type="text"
              value={newEducation.course}
              onChange={(e) => handleNewChange("course", e.target.value)}
              placeholder="B.S. Computer Science"
              className="form-input"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-group">
            <label className="form-label">GPA/Score</label>
            <input
              type="text"
              value={newEducation.score}
              onChange={(e) => handleNewChange("score", e.target.value)}
              placeholder="3.8/4.0"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Duration</label>
            <input
              type="text"
              value={newEducation.duration}
              onChange={(e) => handleNewChange("duration", e.target.value)}
              placeholder="2018 - 2022"
              className="form-input"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddNew}
            disabled={!newEducation.name.trim()}
            className="btn btn-primary flex items-center gap-1"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
      </div>
    </div>
  );
}
