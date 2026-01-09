import { useState, memo } from "react";
import Modal from "react-modal";
import MediaLibrary from "../../components/media/MediaLibrary"; // Adjust path as needed
import { FaPlay, FaFileAlt } from "react-icons/fa";

Modal.setAppElement("#root");

const API_BASE_URL = "https://backend.jswebdevs.com/";

const getFullUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
};

const PreviewItem = ({ file, onRemove }) => (
  // 1. Color Palette: gray-700, gray-200 | 2. Dark/White Mode | 5. All CSS in a single line
  <div className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-xl p-3 relative w-full bg-white dark:bg-gray-800 shadow-sm transition-all duration-200 hover:shadow-md">
    {/* Image Preview Container */}
    {/* 1. Color Palette: gray-200, gray-900 | 2. Dark/White Mode | 5. All CSS in a single line */}
    <div className="w-16 h-12 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden rounded-lg flex-shrink-0 border border-gray-300 dark:border-gray-600">
      <img
        src={getFullUrl(file.thumbUrl || file.url || file)} // Handle object or string string
        alt={file.originalName || "Project Image"}
        className="object-cover w-full h-full"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>

    <div className="flex-1 min-w-0">
      {/* 1. Color Palette: gray-700, gray-200 | 2. Dark/White Mode | 5. All CSS in a single line */}
      <p className="text-sm font-medium truncate text-gray-700 dark:text-gray-200">
        {file.originalName || "Selected Image"}
      </p>
    </div>

    {/* Remove Button: pink-600 | 5. All CSS in a single line */}
    <button
      type="button"
      onClick={() => onRemove()}
      className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-500 font-bold cursor-pointer text-xl px-2 transition-colors duration-200"
      title="Remove media"
    >
      ✕
    </button>
  </div>
);

const AdminProjectMedia = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMediaSelect = (selected) => {
    if (!selected || selected.length === 0) return;
    // We only need one image for the project
    onChange(selected[0]);
    setIsOpen(false);
  };

  const handleRemove = () => {
    onChange(""); // Reset to empty string
  };

  return (
    // 1. Color Palette: gray-700, gray-800 | 2. Dark/White Mode | 5. All CSS in a single line
    <section className="rounded-xl space-y-6 border border-gray-300 dark:border-gray-700 p-5 shadow-lg bg-white dark:bg-gray-800/50">
      {/* 3. Mobile Responsive: flex-col on mobile, sm:flex-row on wider screens | 5. All CSS in a single line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* 1. Color Palette: gray-800, gray-200 | 2. Dark/White Mode | 5. All CSS in a single line */}
        <label className="w-full sm:w-1/3 text-sm font-medium text-gray-800 dark:text-gray-200 flex-shrink-0">
          Project Featured Image
        </label>

        <div className="flex-1 w-full">
          {value ? (
            <PreviewItem file={value} onRemove={handleRemove} />
          ) : (
            // 1. Color Palette: gray-300, gray-600, purple-600 | 2. Dark/White Mode | 5. All CSS in a single line
            <button
              type="button"
              className="border border-dashed border-gray-300 dark:border-gray-600 w-full p-3 rounded-xl cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors hover:border-purple-400 dark:hover:border-purple-600"
              onClick={() => setIsOpen(true)}
            >
              + Select Project Image
            </button>
          )}
        </div>
      </div>

      {/* Media Library Modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldFocusAfterRender={false}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1000 },
          content: {
            inset: "5%",
            padding: 0,
            border: "none",
            borderRadius: "0.75rem",
            overflow: "hidden",
            backgroundColor: "transparent",
          },
        }}
      >
        {/* 1. Color Palette: gray-900, gray-800 | 2. Dark/White Mode | 5. All CSS in a single line */}
        <div className="bg-white dark:bg-gray-900 w-full h-full relative flex flex-col rounded-xl">
          {/* Header */}
          {/* 1. Color Palette: gray-200, gray-700, purple-600 | 2. Dark/White Mode | 5. All CSS in a single line */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-purple-600 dark:text-purple-400">
              Select Project Media
            </h3>
            {/* Close Button: pink-600 | 5. All CSS in a single line */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <MediaLibrary
              multiple={false}
              onSelect={handleMediaSelect}
              onClose={() => setIsOpen(false)}
              filter="photos"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default memo(AdminProjectMedia);
