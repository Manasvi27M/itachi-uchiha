'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore.js';
import { CirclePlus } from 'lucide-react';

export default function CertificatesForm({ onClose }) {
  const addCertificate = UseResumeStore((s) => s.setCertificates);
  const [certificates, setCertificates] = useState([{ title: '', tag: '' }]);

  const handleCertificatesChange = (e, index, field) => {
    const value = e.target.value;
    setCertificates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addNewCertificate = () => {
    setCertificates((prev) => [...prev, { title: '', tag: '' }]);
  };

  const removeCertificate = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    certificates.forEach((cert) => {
      if (cert.title.trim()) addCertificate(cert);
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-semibold border-b pb-2">Certificates</h1>

      {certificates.map((certificate, index) => (
        <div key={index} className="border p-4 rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold">#{index + 1}</span>
            <button
              type="button"
              onClick={() => removeCertificate(index)}
              className={`text-red-500 hover:underline ${index === 0 ? 'hidden' : ''}`}
            >
              Remove
            </button>
          </div>
          <div className="flex flex-col">
            <label>Certificate Title</label>
            <input
              value={certificate.title}
              onChange={(e) => handleCertificatesChange(e, index, 'title')}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Tag</label>
            <input
              value={certificate.tag}
              onChange={(e) => handleCertificatesChange(e, index, 'tag')}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
      ))}

      <div className="flex">
        <button
          type="button"
          onClick={addNewCertificate}
          className="flex items-center border p-2 rounded hover:bg-gray-100"
        >
          <CirclePlus className="h-5 w-5" />
          <span className="ml-1">Add Certificate</span>
        </button>
      </div>

      <div className="flex justify-end pt-4">
        <button type="button" onClick={onClose} className="mr-2 px-4 py-2 rounded border">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">
          Save All
        </button>
      </div>
    </form>
  );
}
