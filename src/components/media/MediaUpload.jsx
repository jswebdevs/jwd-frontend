import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  XCircle,
  UploadCloud,
  FileText,
  FileVideo,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";

const MediaUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const UPLOAD_URL = "https://backend.jswebdevs.com/api/media";

  const formatSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
  };

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9), // Unique ID for animation keys
      preview:
        file.type.startsWith("image/") || file.type.startsWith("video/")
          ? URL.createObjectURL(file)
          : null,
    }));
    setFiles((prev) => [...prev, ...fileArray]); // Append to existing, don't replace
    setProgress({});
  };

  const handleFileChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (idToRemove) => {
    setFiles(files.filter(({ id }) => id !== idToRemove));
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select files to upload");
    setUploading(true);
    const newProgress = {};
    const formData = new FormData();
    files.forEach(({ file }) => formData.append("files", file));

    try {
      await axios.post(UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percentCompleted = Math.round(
            (event.loaded * 100) / event.total
          );
          // Simplified progress for bulk (or you can track individually if API supports parallel)
          files.forEach(
            ({ file }) => (newProgress[file.name] = percentCompleted)
          );
          setProgress({ ...newProgress });
        },
      });

      // Artificial delay for UX "Complete" state
      setTimeout(() => {
        setUploading(false);
        setFiles([]);
        setProgress({});
        navigate("/admin/media");
      }, 500);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Upload Media | Admin Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-[5%]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Upload Media
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Add photos, videos, or documents to your library.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/media")}
              className="text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Cancel & Go Back
            </button>
          </div>

          {/* Drag & Drop Area */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => fileInputRef.current.click()}
            className={`
              relative border-3 border-dashed rounded-2xl p-12 w-full transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center
              ${
                dragOver
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500"
              }
            `}
          >
            <div
              className={`p-4 rounded-full mb-4 transition-colors ${
                dragOver
                  ? "bg-blue-100 dark:bg-blue-800"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              <UploadCloud
                size={40}
                className={`transition-colors ${
                  dragOver
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </div>

            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Drag & drop files here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              or click to browse from your computer
            </p>

            <div className="flex gap-4 text-xs text-gray-400">
              <span className="flex items-center">
                <ImageIcon size={12} className="mr-1" /> Images
              </span>
              <span className="flex items-center">
                <FileVideo size={12} className="mr-1" /> Videos
              </span>
              <span className="flex items-center">
                <FileText size={12} className="mr-1" /> Docs
              </span>
            </div>

            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </motion.div>

          {/* File List & Action Bar */}
          <div className="mt-8">
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      {files.length} {files.length === 1 ? "file" : "files"}{" "}
                      selected
                    </span>
                    <button
                      onClick={() => setFiles([])}
                      className="text-xs text-red-500 hover:text-red-600 font-medium"
                      disabled={uploading}
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {files.map(({ file, preview, id }) => (
                      <motion.div
                        key={id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                          {file.type.startsWith("image/") ? (
                            <img
                              src={preview}
                              alt={file.name}
                              className="object-cover w-full h-full"
                            />
                          ) : file.type.startsWith("video/") ? (
                            <FileVideo className="text-blue-500" size={24} />
                          ) : (
                            <FileText className="text-orange-500" size={24} />
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 z-10">
                          <p className="truncate text-gray-800 dark:text-gray-200 font-medium text-sm">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatSize(file.size)}
                          </p>
                        </div>

                        {/* Progress or Actions */}
                        <div className="flex items-center gap-3 z-10">
                          {uploading ? (
                            <div className="text-right">
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                                {progress[file.name] || 0}%
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => removeFile(id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                              title="Remove file"
                            >
                              <XCircle size={20} />
                            </button>
                          )}
                        </div>

                        {/* Progress Bar Background Overlay */}
                        {uploading && (
                          <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-blue-500/50"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress[file.name] || 0}%` }}
                            transition={{ ease: "linear" }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Upload Button */}
                  <motion.div layout className="pt-4 flex justify-end">
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className={`
                        px-8 py-3 rounded-xl font-bold text-white shadow-lg flex items-center gap-2 transition-all
                        ${
                          uploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:scale-105 active:scale-95 shadow-blue-600/30"
                        }
                      `}
                    >
                      {uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <UploadCloud size={20} />
                          Upload {files.length} Files
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MediaUpload;
