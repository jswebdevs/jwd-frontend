import { useNavigate } from "react-router-dom";
import MediaLibrary from "./MediaLibrary";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const Media = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Media Library | Admin Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-[5%]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center md:text-left">
              <h2
                className="text-3xl font-bold text-gray-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                onClick={() => navigate("/admin/site-settings/media")}
              >
                Media Library
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and organize your website assets
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center gap-2"
              onClick={() => navigate("/admin/media/upload")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Upload Media
            </motion.button>
          </div>

          {/* Library Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-6"
          >
            <MediaLibrary />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Media;
