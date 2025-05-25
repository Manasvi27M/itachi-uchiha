import React, { useState } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";
import { Plus, Trash } from "lucide-react";

export default function CertificationsForm() {
  const {
    certificates,
    setCertificates,
    updateCertificate,
    removeCertificate,
  } = UseResumeStore();

  const [newCertificate, setNewCertificate] = useState({
    title: "",
    tag: "",
  });

  const handleAddNew = () => {
    if (newCertificate.title.trim()) {
      setCertificates(newCertificate);
      setNewCertificate({ title: "", tag: "" });
    }
  };

  const handleChange = (index, field, value) => {
    const updatedItem = { ...certificates[index], [field]: value };
    updateCertificate(index, updatedItem);
  };

  const handleNewChange = (field, value) => {
    setNewCertificate({ ...newCertificate, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Existing certificates */}
      {certificates.length > 0 && (
        <div className="space-y-2">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-md bg-white shadow-sm flex items-center justify-between"
            >
              <div className="flex-1 mr-4">
                <div className="text-sm font-medium">{cert.title}</div>
                {cert.tag && (
                  <div className="text-xs text-gray-500">{cert.tag}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const newTitle = window.prompt(
                      "Certificate title:",
                      cert.title
                    );
                    if (newTitle !== null) {
                      handleChange(index, "title", newTitle);
                    }
                  }}
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove certificate"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new certificate */}
      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-white">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Add New Certificate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Certificate Title</label>
            <input
              type="text"
              value={newCertificate.title}
              onChange={(e) => handleNewChange("title", e.target.value)}
              placeholder="AWS Certified Solutions Architect"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tag/Issuer</label>
            <input
              type="text"
              value={newCertificate.tag}
              onChange={(e) => handleNewChange("tag", e.target.value)}
              placeholder="Amazon Web Services"
              className="form-input"
            />
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddNew}
            disabled={!newCertificate.title.trim()}
            className="btn btn-primary flex items-center gap-1"
          >
            <Plus size={16} /> Add Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
