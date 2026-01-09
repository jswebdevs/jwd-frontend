import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";

const API_BASE_URL = "https://backend.jswebdevs.com/api";

// 💡 Define the Swal function for Project Deletion
const showDeleteConfirmation = async (projectTitle, onDeleteConfirmed) => {
  // Single-line CSS for Swal implementation
  const customSwalClass = {
    popup: "bg-white dark:bg-gray-700 rounded-xl shadow-2xl",
    title: "text-pink-600 dark:text-pink-400 text-2xl font-bold",
    content: "text-gray-700 dark:text-gray-200",
    confirmButton:
      "bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md focus:ring-4 focus:ring-pink-500/50",
    cancelButton:
      "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 font-bold py-2 px-6 rounded-lg transition-colors shadow-md focus:ring-4 focus:ring-gray-500/50",
    actions: "space-x-4 pt-4",
  };

  const result = await Swal.fire({
    title: `Delete "${projectTitle}"?`,
    text: "This action is irreversible. The project and all its data will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    focusCancel: true,
    customClass: customSwalClass,
    buttonsStyling: false,
    backdrop: "rgba(0,0,0,0.7)",
  });

  if (result.isConfirmed) {
    onDeleteConfirmed();
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err.message || "Unknown error fetching projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handler for deleting a project
  const handleDeleteClick = (project) => {
    const projectTitle = project.title;
    const projectId = project._id;

    // Call the Swal utility function
    showDeleteConfirmation(projectTitle, async () => {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Show success Swal
        Swal.fire({
          icon: "success",
          title: "Project Deleted!",
          text: `"${projectTitle}" has been removed successfully.`,
          customClass: {
            popup: "bg-indigo-50 dark:bg-gray-700 rounded-xl",
            title: "text-indigo-600 dark:text-indigo-400",
            confirmButton:
              "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors",
          },
          buttonsStyling: false,
        });

        // Refresh the list locally
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
      } catch (error) {
        console.error("Error deleting project:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to delete project.";

        // Show error Swal
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
          customClass: {
            popup: "bg-pink-50 dark:bg-gray-700 rounded-xl",
            title: "text-pink-600 dark:text-pink-400",
            confirmButton:
              "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors",
          },
          buttonsStyling: false,
        });
      }
    });
  };

  if (loading) {
    return (
      <p className="text-center p-8 text-lg font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
        Loading projects...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center p-8 text-lg font-medium text-pink-600">
        Error: {error}
      </p>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center p-10">
        <p className="text-lg font-medium text-indigo-600 mb-4">
          No projects found.
        </p>
        <Link
          to="/admin/manage-projects/add"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New Project
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full px-[5%] py-6">

        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Projects</h2>
            <button
              onClick={() => navigate("/admin/manage-projects/add")}
              className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">Add a Project</button>
        </div>

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 shadow-xl rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
        {/* Table Head */}
        <thead className="bg-purple-600 text-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider hidden sm:table-cell">
              ID
            </th>
            <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Project Details
            </th>
            <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider hidden lg:table-cell">
              Tech / Category
            </th>
            <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider hidden md:table-cell">
              Links
            </th>
            <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        {/* Table Body with Framer Animation */}
        <AnimatePresence>
          <motion.tbody
            className="divide-y divide-gray-200 dark:divide-gray-600"
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, idx) => {
              const rowClass =
                idx % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700/50";

              return (
                <motion.tr
                  key={project._id}
                  className={rowClass}
                  custom={idx}
                  variants={tableRowVariants}
                >
                  {/* ID Column */}
                  <td className="py-3 px-4 text-xs font-mono text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                    <span className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {project._id.slice(-6)}
                    </span>
                  </td>

                  {/* Title & Image Column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      {/* Avatar / Thumbnail */}
                      <div className="h-10 w-10 flex-shrink-0">
                        {project.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                            src={project.image}
                            alt={project.title}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                            {project.title?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-purple-400">
                        {project.title}
                      </div>
                    </div>
                  </td>

                  {/* Tech/Category Column */}
                  <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300 hidden lg:table-cell">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                      {project.category || "Web Dev"}
                    </span>
                  </td>

                  {/* Links Column */}
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex space-x-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2"
                          title="Live Demo"
                        >
                          {project.link}
                          <FaExternalLinkAlt />
                        </a>
                      )}
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          title="GitHub Repo"
                        >
                          <FaGithub className="text-lg" />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-3">
                    <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                      {/* View Button */}
                      <Link
                        to={`/admin/manage-projects/view/${project._id}`}
                        className="flex justify-center items-center bg-indigo-600 hover:bg-purple-400 text-white text-sm font-semibold p-2 rounded-full transition-colors duration-300 shadow-md group"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Link>

                      {/* Edit Button */}
                      <Link
                        to={`/admin/manage-projects/update/${project._id}`}
                        className="flex justify-center items-center bg-purple-400 hover:bg-purple-600 text-white text-sm font-semibold p-2 rounded-full transition-colors duration-300 shadow-md group"
                        title="Edit Project"
                      >
                        <FaPencilAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(project)}
                        className="flex justify-center items-center bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold p-2 rounded-full transition-colors duration-300 shadow-md group"
                        title="Delete Project"
                      >
                        <FaTrashAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </div>
  );
};

export default AdminProjects;
