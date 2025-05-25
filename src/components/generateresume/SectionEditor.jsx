import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, GripVertical } from "lucide-react";
import BasicDetailsForm from "./BasicDetailsForm";
import EducationForm from "./EducationForm";
import TechnicalExperienceForm from "./TechnicalExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";
import AchievementsForm from "./AchievementsForm";

// Section configuration with labels and components
const SECTION_CONFIG = {
  basic: { label: "Basic Details", Component: BasicDetailsForm },
  education: { label: "Education", Component: EducationForm },
  experience: {
    label: "Technical Experience",
    Component: TechnicalExperienceForm,
  },
  skills: { label: "Skills", Component: SkillsForm },
  projects: { label: "Projects", Component: ProjectsForm },
  certificates: { label: "Certificates", Component: CertificationsForm },
  achievements: { label: "Achievements", Component: AchievementsForm },
};

export default function SectionEditor({ id, isActive }) {
  const [isOpen, setIsOpen] = useState(id === "basic"); // Open basic by default

  // Setup sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Get section configuration
  const { label, Component } = SECTION_CONFIG[id] || {
    label: "Unknown Section",
    Component: () => <div>Section not found</div>,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-item px-2 ${
        isDragging ? "dragging" : ""
      } overflow-hidden`}
    >
      <div
        className="drag-handle"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        <GripVertical size={14} />
      </div>

      <Accordion.Root
        type="single"
        collapsible
        value={isOpen ? id : undefined}
        onValueChange={(value) => setIsOpen(value === id)}
      >
        <Accordion.Item value={id} className="overflow-hidden">
          <Accordion.Trigger className="accordion-trigger ml-4">
            <span>{label}</span>
            <ChevronDown
              size={16}
              className="accordion-icon transition-transform duration-300 cursor-pointer"
            />
          </Accordion.Trigger>

          <Accordion.Content className="accordion-content">
            <div className="p-4 bg-gray-50 rounded-b-md">
              <Component />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}
