import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash } from "lucide-react";

export default function ProjectsForm() {
  const { projects, addProject, updateProject, removeProject } =
    UseResumeStore();

  const [newProject, setNewProject] = useState({
    name: "",
    techstack: "",
    gitlink: "",
    year: "",
    description: "",
  });

  const handleAddNew = () => {
    if (newProject.name.trim()) {
      addProject(newProject);
      setNewProject({
        name: "",
        techstack: "",
        gitlink: "",
        year: "",
        description: "",
      });
    }
  };

  const handleChange = (index, field, value) => {
    const updatedItem = { ...projects[index], [field]: value };
    updateProject(index, updatedItem);
  };

  const handleNewChange = (field, value) => {
    setNewProject({ ...newProject, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Existing project entries */}
      {projects.length > 0 && (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-md bg-white shadow-sm relative"
            >
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Remove project"
              >
                <Trash size={16} />
              </button>

              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  placeholder="E-commerce Platform"
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="form-group">
                  <label className="form-label">Tech Stack</label>
                  <input
                    type="text"
                    value={project.techstack || ""}
                    onChange={(e) =>
                      handleChange(index, "techstack", e.target.value)
                    }
                    placeholder="React, Node.js, MongoDB"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Year</label>
                  <input
                    type="text"
                    value={project.year || ""}
                    onChange={(e) =>
                      handleChange(index, "year", e.target.value)
                    }
                    placeholder="2023"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group mt-4">
                <label className="form-label">GitHub Link</label>
                <input
                  type="url"
                  value={project.gitlink || ""}
                  onChange={(e) =>
                    handleChange(index, "gitlink", e.target.value)
                  }
                  placeholder="https://github.com/username/project"
                  className="form-input"
                />
              </div>

              <div className="form-group mt-4">
                <label className="form-label">Description</label>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  placeholder="Describe your project, its features, and your contributions..."
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

      {/* Add new project form */}
      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-white">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Project
        </h3>

        <div className="form-group">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => handleNewChange("name", e.target.value)}
            placeholder="E-commerce Platform"
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-group">
            <label className="form-label">Tech Stack</label>
            <input
              type="text"
              value={newProject.techstack}
              onChange={(e) => handleNewChange("techstack", e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="text"
              value={newProject.year}
              onChange={(e) => handleNewChange("year", e.target.value)}
              placeholder="2023"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group mt-4">
          <label className="form-label">GitHub Link</label>
          <input
            type="url"
            value={newProject.gitlink}
            onChange={(e) => handleNewChange("gitlink", e.target.value)}
            placeholder="https://github.com/username/project"
            className="form-input"
          />
        </div>

        <div className="form-group mt-4">
          <label className="form-label">Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => handleNewChange("description", e.target.value)}
            placeholder="Describe your project, its features, and your contributions..."
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
            disabled={!newProject.name.trim()}
            className="btn btn-primary flex items-center gap-1"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      </div>
    </div>
  );
}
