import React, { forwardRef } from "react";
import { UseResumeStore } from "../../store/UseResumeStore";

const ResumePreview = forwardRef(function ResumePreview(props, ref) {
  const {
    sectionsOrder,
    basicDetails,
    education,
    technicalExperience,
    skills,
    projects,
    certificates,
    achievements,
  } = UseResumeStore();

  /* ---------- Helper functions ---------- */
  const renderDescription = (txt) =>
    txt
      ? txt
          .split("\n")
          .map((line, i) => line.trim() && <div key={i}>{line}</div>)
      : null;

  /* ---------- Single-section renderers ---------- */
  const SectionEducation = () => (
    <div className="flex text-[8px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Education
      </h1>
      <div className="flex flex-col">
        {education?.map((e, i) => (
          <div key={i} className="flex justify-between mb-1">
            <div className="flex gap-[2px]">
              <h1 className="font-bold">
                {e.course}
                <span className={`${e.course ? "" : "hidden"}`}>,</span>
              </h1>
              <h1>{e.name}</h1>
            </div>
            <div className="flex gap-[2px]">
              <h1>
                {e.score}
                <span className={`${e.score && e.duration ? "" : "hidden"}`}>
                  {" "}
                  |
                </span>
              </h1>
              <h1>{e.duration}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SectionExperience = () => (
    <div className="flex text-[8px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Technical Experience
      </h1>
      <div className="flex flex-col gap-1">
        {technicalExperience?.map((e, i) => (
          <div key={i} className="flex flex-col mb-1">
            <div className="font-bold flex justify-between text-[10px]">
              <h1>{e.companyName}</h1>
              <h1>{e.duration}</h1>
            </div>
            <h1 className="italic">{e.role}</h1>
            <h1 className="leading-[1.38]">
              {renderDescription(e.description)}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );

  const SectionSkills = () => (
    <div className="flex text-[10px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Skills
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        {skills?.map((s, i) => (
          <div key={i} className="flex items-center">
            <h1>{s}</h1>
            {i < skills.length - 1 && <span className="mx-1">|</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const SectionProjects = () => (
    <div className="flex text-[8px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Projects
      </h1>
      {projects?.map((p, i) => (
        <div key={i} className="flex flex-col mb-2">
          <div className="font-bold text-[10px] flex justify-between">
            <div className="flex items-center">
              <h1>{p.name}</h1>
              <span className={`${p.name && p.techstack ? "ml-1" : "hidden"}`}>
                -
              </span>
              {p.techstack && (
                <span className="ml-1 text-gray-700 text-[8px]">
                  ({p.techstack})
                </span>
              )}
            </div>
            <div className="flex">
              <a
                href={p.gitlink}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-teal-800 ${p.gitlink ? "" : "hidden"}`}
              >
                GitHub
              </a>
              <span
                className={`${p.gitlink && p.year ? "" : "hidden"} mx-[2px]`}
              >
                |
              </span>
              <h1>{p.year}</h1>
            </div>
          </div>
          <h1 className="leading-[1.38]">{renderDescription(p.description)}</h1>
        </div>
      ))}
    </div>
  );

  const SectionCertificates = () => (
    <div className="flex text-[8px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Certificates
      </h1>
      <div className="flex flex-col">
        {certificates?.map((c, i) => (
          <div key={i} className="flex items-center mb-1">
            <h1 className="font-semibold">
              <span className={`${c.title ? "" : "hidden"} mr-[2px]`}>•</span>
              {c.title}
            </h1>
            <h1>
              <span className={`${c.title && c.tag ? "" : "hidden"} mx-[2px]`}>
                |
              </span>
              {c.tag}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );

  const SectionAchievements = () => (
    <div className="flex text-[8px] flex-col mb-2">
      <h1 className="text-[12px] text-teal-800 border-b-[1px] border-neutral-300 w-full mb-1">
        Achievements
      </h1>
      <div className="flex flex-col">
        {achievements?.map((a, i) => (
          <div key={i} className="flex items-center mb-1">
            <h1>
              <span className={`${a ? "" : "hidden"} mr-[2px]`}>•</span>
              {a}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------- Mapping key → renderer ---------- */
  const renderers = {
    basic: () => null, // header already covers basic details
    education: SectionEducation,
    experience: SectionExperience,
    skills: SectionSkills,
    projects: SectionProjects,
    certificates: SectionCertificates,
    achievements: SectionAchievements,
  };

  return (
    <div
      ref={ref}
      className="w-full h-full bg-white text-neutral-800 p-5 overflow-hidden print:p-0"
    >
      {/* ---------- Header (basic details) ---------- */}
      <div className="flex justify-between items-end border-b-2 pb-1 border-teal-800 mb-3">
        <div className="flex flex-col text-[8px] w-1/5">
          <h1>{basicDetails.phone}</h1>
          <h1>
            {basicDetails.city}
            <span className={`${basicDetails.city ? "" : "hidden"}`}>, </span>
            {basicDetails.state}
          </h1>
          <h1 className="text-teal-800">{basicDetails.gmail}</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center">
            {basicDetails.name || "Your Name"}
          </h1>
        </div>
        <div className="text-[8px] text-right w-1/5 flex flex-col">
          {basicDetails.github && (
            <a
              href={basicDetails.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800"
            >
              GitHub
            </a>
          )}
          {basicDetails.linkedIn && (
            <a
              href={basicDetails.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {/* ---------- Dynamic body sections ---------- */}
      {(sectionsOrder || [])
        .filter((k) => k !== "basic")
        .map((key) => {
          const Render = renderers[key];
          return Render ? <Render key={key} /> : null;
        })}
    </div>
  );
});

export default ResumePreview;
