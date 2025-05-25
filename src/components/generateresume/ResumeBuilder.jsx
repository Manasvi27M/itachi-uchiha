import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UseResumeStore } from "../../store/UseResumeStore";
import ResumePreview from "./ResumePreview";
import SectionEditor from "./SectionEditor";
import { Download, FileDown, RefreshCw as Refresh } from "lucide-react";

export default function ResumeBuilder() {
  const {
    sectionsOrder = [],
    setSectionsOrder,
    clearAllData,
  } = UseResumeStore();
  const sections = Array.isArray(sectionsOrder) ? sectionsOrder : [];

  const [activeId, setActiveId] = useState(null);
  const resumeRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionsOrder.indexOf(active.id);
      const newIndex = sectionsOrder.indexOf(over.id);

      setSectionsOrder(arrayMove(sectionsOrder, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "MyResume",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 200);
      });
    },
    pageStyle: `
      @page {
        size: letter;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    clearAllData();
    setShowResetConfirm(false);
  };

  return (
    <div className="h-screen flex">
      {/* Editor Panel - Scrollable */}
      <div className="w-1/2 h-screen overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">
              Edit Your Resume
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="btn btn-secondary flex items-center gap-1 text-sm"
                title="Reset all data"
              >
                <Refresh size={16} />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={handlePrint}
                className="btn btn-primary flex items-center gap-1"
                title="Download as PDF"
              >
                <FileDown size={16} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sectionsOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {sections.map((sectionKey) => (
                  <SectionEditor
                    key={sectionKey}
                    id={sectionKey}
                    isActive={activeId === sectionKey}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Preview Panel - Fixed */}
      <div className="w-1/2 max-h-screen bg-gray-100 fixed right-0 overflow-y-auto">
        <div className="h-full p-6 flex flex-col items-center">
          <div className="mb-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
            <p className="text-sm text-gray-500">
              Drag sections to reorder them
            </p>
          </div>

          <div className="w-full max-w-[8.5in] mx-auto flex-1">
            <div className="resume-paper bg-white shadow-lg">
              <ResumePreview ref={resumeRef} />
            </div>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 animate-slide-up">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reset Resume
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to reset all resume data? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
