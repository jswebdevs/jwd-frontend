import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import {
  Trash2,
  FileText,
  PlayCircle,
  Eye,
  X,
  Check,
  Image as ImageIcon,
  Film,
  File,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Removed: import { motion, AnimatePresence } from "framer-motion";

const MediaLibrary = ({ multiple = true, onSelect, onClose }) => {
  const [media, setMedia] = useState([]);
  const [selectedInternal, setSelectedInternal] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20); // MODIFIED: Changed limit to 20
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [viewMedia, setViewMedia] = useState(null);

  const loader = useRef(null);

  // Reset state when filter changes
  useEffect(() => {
    setMedia([]);
    setPage(1);
    setAllLoaded(false);
  }, [filter]);

  // Load Media Function
  const loadMedia = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);
    try {
      let typeQuery = "";
      if (filter === "photos") typeQuery = "image";
      else if (filter === "videos") typeQuery = "video";
      else if (filter === "documents") typeQuery = "docs";

      const res = await axios.get(
        `https://backend.jswebdevs.com/api/media?page=${page}&limit=${limit}${
          typeQuery ? `&type=${typeQuery}` : ""
        }`
      );

      const newMedia = res.data.media || [];
      setMedia((prev) => [
        ...prev,
        ...newMedia.filter((nm) => !prev.find((m) => m._id === nm._id)),
      ]);
      setTotal(res.data.total || 0);

      // Check if all media items have been loaded
      if (
        !newMedia.length ||
        media.length + newMedia.length >= res.data.total
      ) {
        setAllLoaded(true);
      }
    } catch (err) {
      console.error("Error loading media:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter, loading, media.length, allLoaded]);

  // Initial Load
  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !allLoaded) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    // Only set up observer if loader element is present and total media count is not zero (to avoid observer issues on initial empty load)
    if (loader.current && total === 0 && !loading) {
      // Observer handles the initial load when setTotal updates
    } else if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, allLoaded, total]); // Added total dependency for observer logic

  // Handlers
  function handleSelect(item) {
    if (multiple) {
      setSelectedInternal((prev) =>
        prev.find((i) => i._id === item._id)
          ? prev.filter((i) => i._id !== item._id)
          : [...prev, item]
      );
    } else {
      setSelectedInternal([item]);
    }
  }

  function confirmSelection() {
    if (selectedInternal.length === 0) return;
    if (onSelect) {
      onSelect(multiple ? selectedInternal : [selectedInternal[0]]);
      setSelectedInternal([]);
      if (onClose) onClose();
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(`https://backend.jswebdevs.com/api/media/${id}`);
      setMedia((prev) => prev.filter((item) => item._id !== id));
      setSelectedInternal((prev) => prev.filter((item) => item._id !== id));
      setViewMedia(null);
    } catch (err) {
      console.error("Error deleting media:", err);
      alert("Failed to delete media.");
    }
  };

  const getCorrectUrl = (url, folder) => {
    if (!url) return null;
    const fileName = url.split("/").pop();
    if (url.startsWith("/uploads")) return url;
    return `/uploads/${folder}/${fileName}`;
  };

  // Icons mapping for filters
  const filterIcons = {
    all: null,
    photos: <ImageIcon size={16} />,
    videos: <Film size={16} />,
    documents: <File size={16} />,
  };

  return (
    <div className="space-y-6">
      {/* --- Filter Bar --- */}
      <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        {["all", "photos", "videos", "documents"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === t
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {filterIcons[t]}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* --- Media Grid (Replaced motion.div with standard div) --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {media.map((item) => {
          const isSelected = selectedInternal.find((i) => i._id === item._id);
          const url = getCorrectUrl(item.url, item.folder);
          const thumbUrl = getCorrectUrl(item.thumbUrl, item.folder);
          const fullUrl = `https://backend.jswebdevs.com/${url}`;
          const fullThumbUrl = thumbUrl
            ? `https://backend.jswebdevs.com/${thumbUrl}`
            : fullUrl;

          return (
            // Replaced motion.div with standard div
            <div
              key={item._id}
              className={`group relative aspect-square border rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 ${
                isSelected
                  ? "ring-4 ring-blue-600 dark:ring-blue-500"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Selection Overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-blue-600/20 z-10 pointer-events-none transition-colors" />
              )}

              {/* Hover Actions */}
              <div className="absolute inset-x-0 top-0 p-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-gradient-to-b from-black/60 to-transparent">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewMedia(item);
                  }}
                  className="bg-white/90 text-gray-800 p-1.5 rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
              </div>

              {onSelect && (
                <div className="absolute inset-x-0 bottom-0 p-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 bg-gradient-to-t from-black/60 to-transparent">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-1 ${
                      isSelected
                        ? "bg-red-500 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isSelected ? "Deselect" : multiple ? "Select" : "Pick"}
                  </button>
                </div>
              )}

              {/* Content Render */}
              <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                {item.mimeType.startsWith("image/") ? (
                  <LazyLoadImage
                    src={fullThumbUrl}
                    alt={item.originalName}
                    effect="blur"
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : item.mimeType.startsWith("video/") ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-gray-900 group-hover:scale-110 transition-transform duration-500">
                    <LazyLoadImage
                      src={fullThumbUrl}
                      alt={item.originalName}
                      effect="blur"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <PlayCircle className="absolute w-12 h-12 text-white/90 drop-shadow-lg" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center group-hover:scale-110 transition-transform duration-500">
                    <FileText size={48} className="mb-2 text-blue-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 line-clamp-2 break-all">
                      {item.originalName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Loader --- */}
      <div ref={loader} className="h-20 flex justify-center items-center py-6">
        {loading && !allLoaded && (
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        )}
        {!loading && allLoaded && media.length === 0 && (
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            No media found
          </span>
        )}
      </div>

      {/* --- View Modal (Replaced AnimatePresence/motion.div) --- */}
      {viewMedia && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setViewMedia(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-semibold text-gray-800 dark:text-white truncate max-w-[80%]">
                {viewMedia.originalName}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(viewMedia._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => setViewMedia(null)}
                  className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-gray-100 dark:bg-gray-900/50 min-h-[300px]">
              {viewMedia.mimeType.startsWith("image/") ? (
                <img
                  src={`https://backend.jswebdevs.com/${getCorrectUrl(
                    viewMedia.url,
                    viewMedia.folder
                  )}`}
                  alt={viewMedia.originalName}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-md"
                />
              ) : viewMedia.mimeType.startsWith("video/") ? (
                <video
                  src={`https://backend.jswebdevs.com/${getCorrectUrl(
                    viewMedia.url,
                    viewMedia.folder
                  )}`}
                  controls
                  className="max-w-full max-h-[60vh] rounded-lg shadow-md bg-black w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  <FileText size={64} className="text-blue-500 mb-4" />
                  <p className="text-gray-900 dark:text-white font-medium text-lg mb-1">
                    {viewMedia.originalName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {viewMedia.mimeType}
                  </p>
                  <a
                    href={`https://backend.jswebdevs.com/${getCorrectUrl(
                      viewMedia.url,
                      viewMedia.folder
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Download / View
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Floating Confirm Selection Button (Replaced AnimatePresence/motion.div) --- */}
      {onSelect && selectedInternal.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={confirmSelection}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Check size={20} strokeWidth={3} />
            <span>Confirm ({selectedInternal.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
