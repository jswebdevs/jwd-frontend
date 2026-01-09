import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AdminProjectMedia from "./AdminProjectMedia";

const ProjectAdding = () => {
  const [loading, setLoading] = useState(false);

  // Initial State based on Mongoose Model
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    company: "",
    year: new Date().getFullYear().toString(),
    details: "",
    results: [],
    techStack: [],
    image: "", // Will hold the media object or string url
    link: "",
    sortOrder: 0,
    isFeatured: true,
  });

  // Temporary states for Array Inputs
  const [tempTech, setTempTech] = useState("");
  const [tempResult, setTempResult] = useState("");

  const API_BASE_URL = "https://backend.jswebdevs.com/api";

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  // Array Handlers (Tech Stack & Results)
  const addArrayItem = (field, value, setter) => {
    if (!value.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    setter("");
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Media Handler
  const handleMediaChange = (mediaObject) => {
    setFormData((prev) => ({ ...prev, image: mediaObject }));
  };

  // --- Submit ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      // Prepare Payload
      // Note: Backend expects 'image' as string (URL).
      // If AdminProjectMedia returns an object with .url, we use that.
      const payload = {
        ...formData,
        image: formData.image?.url || formData.image || "", // Extract URL if object
      };

      await axios.post(`${API_BASE_URL}/projects`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Success Alert
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Project created successfully!",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "bg-white dark:bg-gray-700 rounded-xl",
          title: "text-indigo-600 dark:text-purple-400",
        },
      });

      // Reset Form
      setFormData({
        title: "",
        slug: "",
        company: "",
        year: new Date().getFullYear().toString(),
        details: "",
        results: [],
        techStack: [],
        image: "",
        link: "",
        sortOrder: 0,
        isFeatured: true,
      });
    } catch (err) {
      console.error("Add Project Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          err.message ||
          "Failed to add project.",
        customClass: {
          popup: "bg-white dark:bg-gray-700 rounded-xl",
          title: "text-pink-600 dark:text-pink-400",
          confirmButton:
            "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Styles ---
  const inputClass =
    "w-full p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const labelClass =
    "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1";
  const tagClass =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700";

  return (
    // 3. Mobile Responsive | 5. All CSS in a single line
    <div className="max-w-5xl mx-auto my-10 md:my-20 px-4 md:px-6">
      {/* Main Container with Glassmorphism */}
      {/* 1. Color Palette: purple-600, gray-700, purple-400 | 2. Dark/White Mode | 5. All CSS in a single line */}
      <div className="relative rounded-[32px] bg-white/5 dark:bg-gray-700/60 backdrop-blur-2xl border border-purple-500/30 shadow-[0_40px_120px_rgba(16,0,129,0.35)] p-6 md:p-12 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="relative mb-10 md:mb-16 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-400">
              Add New Project
            </h2>
            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Showcase your latest work
            </p>
          </div>
          {/* Badge */}
          <div className="hidden md:flex items-center gap-3 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-600 dark:text-purple-300 text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse"></span>
            Portfolio Admin
          </div>
        </div>

        <form className="relative space-y-10" onSubmit={handleSubmit}>
          {/* --- Section 1: Core Info --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={!formData.slug ? generateSlug : undefined}
                className={inputClass}
                placeholder="e.g. Vertex Quiz Platform"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Slug (URL ID) *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. vertex-quiz-platform"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Company / Client *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Vertex"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Year *</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={inputClass}
                placeholder="2024"
                required
              />
            </div>
          </div>

          {/* --- Section 2: Details --- */}
          <div>
            <label className={labelClass}>
              Project Details (Description) *
            </label>
            <textarea
              name="details"
              rows="5"
              value={formData.details}
              onChange={handleChange}
              className={inputClass}
              placeholder="Describe the project logic, stack, and challenges..."
              required
            ></textarea>
          </div>

          {/* --- Section 3: Tech Stack & Results (Interactive Arrays) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <label className={labelClass}>Tech Stack</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tempTech}
                  onChange={(e) => setTempTech(e.target.value)}
                  className={`${inputClass} py-2 text-sm`}
                  placeholder="e.g. React.js"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    addArrayItem("techStack", tempTech, setTempTech))
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("techStack", tempTech, setTempTech)
                  }
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span key={index} className={tagClass}>
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("techStack", index)}
                      className="ml-2 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <label className={labelClass}>Key Results / Achievements</label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={tempResult}
                  onChange={(e) => setTempResult(e.target.value)}
                  className={`${inputClass} py-2 text-sm`}
                  placeholder="e.g. Boosted SEO by 50%"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(),
                    addArrayItem("results", tempResult, setTempResult))
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem("results", tempResult, setTempResult)
                  }
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {formData.results.map((res, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <span>• {res}</span>
                    <button
                      type="button"
                      onClick={() => removeArrayItem("results", index)}
                      className="text-red-400 hover:text-red-600"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Section 4: Media --- */}
          <div>
            <label className={labelClass}>Project Media</label>
            <AdminProjectMedia
              value={formData.image}
              onChange={handleMediaChange}
            />
          </div>

          {/* --- Section 5: Settings --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700">
            <div className="md:col-span-2">
              <label className={labelClass}>Live Link</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className={inputClass}
                placeholder="https://mysite.com"
              />
            </div>
            <div>
              <label className={labelClass}>Sort Order</label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-3 flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
              />
              <label
                htmlFor="isFeatured"
                className="text-gray-700 dark:text-gray-200 font-medium"
              >
                Mark as Featured Project
              </label>
            </div>
          </div>

          {/* --- Actions --- */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-purple-500/20">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold tracking-wide hover:scale-[1.02] active:scale-100 transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdding;
