import React from "react";
import ResumeBuilder from "../components/generateresume/ResumeBuilder";

function GenerateResumePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-16 sm:px-6 lg:px-8 py-8">
        <ResumeBuilder />
      </main>
    </div>
  );
}

export default GenerateResumePage;
