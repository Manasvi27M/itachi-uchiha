import React from "react";
import { UseResumeStore } from "../../store/UseResumeStore";

export default function BasicDetailsForm() {
  const { basicDetails, updateBasicDetail } = UseResumeStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBasicDetail(name, value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={basicDetails.name || ""}
            onChange={handleChange}
            placeholder="John Doe"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={basicDetails.phone || ""}
            onChange={handleChange}
            placeholder="+1 (123) 456-7890"
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={basicDetails.city || ""}
            onChange={handleChange}
            placeholder="San Francisco"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={basicDetails.state || ""}
            onChange={handleChange}
            placeholder="California"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="gmail" className="form-label">
          Email Address
        </label>
        <input
          id="gmail"
          name="gmail"
          type="email"
          value={basicDetails.gmail || ""}
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
          className="form-input"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="github" className="form-label">
            GitHub URL
          </label>
          <input
            id="github"
            name="github"
            type="url"
            value={basicDetails.github || ""}
            onChange={handleChange}
            placeholder="https://github.com/johndoe"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedIn" className="form-label">
            LinkedIn URL
          </label>
          <input
            id="linkedIn"
            name="linkedIn"
            type="url"
            value={basicDetails.linkedIn || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
}
