// pages/GenerateResumePage.jsx
/*'use client';
import React, { useRef } from 'react';
import GenerateResumeWithSidebar from '../components/generateresume/GenerateResumeWithSidebar';
import ResumePreviewStandardTemplate from '../components/generateresume/ResumePreviewStandardTemplate';
import { UseResumeStore } from '../store/UseResumeStore';
import { FileDown } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function GenerateResumePage() {
  const {
    basicDetails,
    education,
    technicalExperience,
    skills,
    projects,
    certificates,
    achievements,
  } = UseResumeStore();

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'GeneratedResume-Resume.AI',
    pageStyle: `
      @page { size: auto;  margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
      }
    `,
    removeAfterPrint: true,          // cleans up the iframe after printing
  });

  console.log('preview div is:', componentRef.current);

  return (
    <div className="flex h-screen">

      {/* PRINT BUTTON *}
      <div className="p-4 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-neutral-900 border-2 p-2 rounded-lg flex items-center hover:opacity-90 disabled:opacity-50"
        >
          <FileDown className="h-4 w-4" />
          <span className="ml-1 bg-teal-600 text-sm">Download PDF</span>
        </button>
      </div>

      {/* SIDEBAR *}
      <aside className="w-1/4 print:hidden">
        <GenerateResumeWithSidebar />
      </aside>

      {/* RESUME PREVIEW *}
      <main className="w-3/4 p-4 overflow-auto bg-white">
        <ResumePreviewStandardTemplate
          ref={componentRef}                // ← Pass the ref here
          basicDetails={basicDetails}
          education={education}
          technicalExperience={technicalExperience}
          skills={skills}
          projects={projects}
          certificates={certificates}
          achievements={achievements}
        />
      </main>
    </div>
  );
}
*/

'use client';
import React, { useRef, useEffect } from 'react';
import GenerateResumeWithSidebar from '../components/generateresume/GenerateResumeWithSidebar';
import ResumePreviewStandardTemplate from '../components/generateresume/ResumePreviewStandardTemplate';
import { UseResumeStore } from '../store/UseResumeStore';
import { FileDown } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

export default function GenerateResumePage() {
  const {
    basicDetails,
    education,
    technicalExperience,
    skills,
    projects,
    certificates,
    achievements,
  } = UseResumeStore();

  const componentRef = useRef(null);

  // Debug: watch when ref is set
  useEffect(() => {
    console.log('🔍 componentRef.current now is:', componentRef.current);
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'GeneratedResume-Resume.AI',
    pageStyle: `
      @page { margin: 0; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `,
  });

  return (
    <div className="flex h-screen">
      {/* PRINT BUTTON */}
      <div className="p-4 print:hidden">
        <button
          onClick={() => {
            console.log('🚀 printing:', componentRef.current);
            handlePrint();
          }}
          className="bg-neutral-900 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FileDown className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className="w-1/4 print:hidden">
        <GenerateResumeWithSidebar />
      </aside>

      {/* RESUME PREVIEW */}
      <main className="w-3/4 p-4 bg-gray-50 overflow-auto">
        <ResumePreviewStandardTemplate
          ref={componentRef}          // ← pass the ref here
          basicDetails={basicDetails}
          education={education}
          technicalExperience={technicalExperience}
          skills={skills}
          projects={projects}
          certificates={certificates}
          achievements={achievements}
        />
      </main>
    </div>
  );
}
