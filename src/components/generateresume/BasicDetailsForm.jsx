'use client';
import React, { useState } from 'react';
import { UseResumeStore } from '../../store/UseResumeStore';
export default function BasicDetailsForm({ onClose }) {
  const setBasicDetails = UseResumeStore((state) => state.setBasicDetails);
  const [form, setForm] = useState({ name: '', phone: '', city: '', state: '', gmail: '', github: '', linkedIn: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setBasicDetails(form);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {['name','phone','city','state','gmail','github','linkedIn'].map((field) => (
        <div key={field} className="flex flex-col">          
          <label className="capitalize">{field}</label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="mr-2 px-4 py-2">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
