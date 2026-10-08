import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { GalleryItem } from '../types';
import {
  UploadCloud,
  Image as ImageIcon,
  FolderOpen,
  Search,
  Filter,
  Plus,
  X,
  Trash2,
  Copy,
  Download,
  Calendar,
  Sparkles,
  Check,
  Building,
  ExternalLink,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SchoolPictureStorageProps {
  onPictureAdded?: (item: GalleryItem) => void;
  standalone?: boolean;
}

export const SchoolPictureStorage: React.FC<SchoolPictureStorageProps> = ({
  onPictureAdded,
  standalone = true
}) => {
  const { t } = useLanguage();
  const { addToast, user, role } = useAuth();

  const [pictures, setPictures] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modal state for storing a new picture
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Form State
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'Campus' | 'Events' | 'Sports' | 'Classrooms' | 'Graduation' | 'Laboratories'>('Campus');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Campus', 'Laboratories', 'Classrooms', 'Events', 'Sports', 'Graduation'];

  const fetchPictures = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPictures(data);
      }
    } catch (err) {
      console.error('Failed to load stored pictures', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  // Handle file selection / upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
        addToast(t('storage.success', 'Picture uploaded successfully!'), 'success');
      } else {
        addToast(data.error || 'Failed to upload picture file', 'error');
      }
    } catch (err) {
      addToast('Upload failed. Check internet connection or file size.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Submit form to store new picture in database
  const handleStorePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = imageUrl || imagePreview;

    if (!finalUrl) {
      addToast('Please select an image file or provide a picture URL.', 'error');
      return;
    }
    if (!title.trim()) {
      addToast('Please enter a title for the school picture.', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const payload = {
        title,
        category,
        imageUrl: finalUrl,
        description: description || `Photograph of ${title} at Shambu Special Secondary School.`,
        date: date || new Date().toISOString().split('T')[0]
      };

      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.id) {
        addToast(t('storage.success', 'Picture stored in school repository!'), 'success');
        setPictures(prev => [data, ...prev]);
        if (onPictureAdded) onPictureAdded(data);
        
        // Reset modal form
        setTitle('');
        setDescription('');
        setImageUrl('');
        setImagePreview(null);
        setIsModalOpen(false);
      } else {
        addToast(data.error || 'Failed to store picture', 'error');
      }
    } catch (err) {
      addToast('Error saving picture to storage database', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete picture
  const handleDeletePicture = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(t('storage.delete_confirm', 'Are you sure you want to remove this picture from school storage?'))) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPictures(prev => prev.filter(p => p.id !== id));
        addToast('Picture deleted from storage.', 'info');
        if (lightboxItem?.id === id) setLightboxItem(null);
      }
    } catch (err) {
      addToast('Failed to delete picture', 'error');
    }
  };

  // Copy URL to Clipboard
  const handleCopyUrl = (url: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    addToast(t('storage.link_copied', 'Picture URL copied to clipboard!'), 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPictures = pictures.filter(pic => {
    const matchesCategory = selectedCategory === 'All' || pic.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      pic.title.toLowerCase().includes(query) ||
      pic.description.toLowerCase().includes(query) ||
      pic.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`space-y-8 ${standalone ? 'bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm' : ''}`}>
      
      {/* Storage Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <FolderOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{t('storage.tag', 'School Picture Storage')}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            {t('storage.title', 'Store & Manage School Pictures')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t('storage.subtitle', 'Store, upload, organize, and archive high-resolution photographs of Shambu Special Secondary School campus, laboratories, events, and facilities.')}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 block font-bold">{t('storage.total_pics', 'Stored Pictures')}</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{pictures.length}</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-initial px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            <span>{t('storage.upload_btn', 'Store New Picture')}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search picture storage..."
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Stored Pictures Grid */}
      {loading ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500">Loading school picture storage repository...</p>
        </div>
      ) : filteredPictures.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-4">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Stored Pictures Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No school pictures match your search criteria. Click "Store New Picture" above to upload new photographs into the school repository.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Store Picture Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPictures.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setLightboxItem(item)}
              className="group cursor-pointer bg-slate-50 dark:bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </div>

                  {/* Actions overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      onClick={(e) => handleCopyUrl(item.imageUrl, item.id, e)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-md transition-colors"
                      title={t('storage.copy_url', 'Copy Picture URL')}
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={item.imageUrl}
                      download={`shambu_school_${item.title.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-md transition-colors"
                      title={t('storage.download', 'Download Picture')}
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    {(role === 'admin' || user) && (
                      <button
                        onClick={(e) => handleDeletePicture(item.id, e)}
                        className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl backdrop-blur-md transition-colors"
                        title="Delete Picture"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 pb-3 pt-0 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Stored</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload / Store Picture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t('storage.drag_drop_title', 'Upload School Photograph')}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Store high-quality images of school buildings, labs, campus events, and facilities.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleStorePicture} className="space-y-4 text-xs sm:text-sm">
                
                {/* File Dropzone */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Picture File
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-colors space-y-2 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {imagePreview || imageUrl ? (
                      <div className="relative aspect-video max-h-48 mx-auto rounded-xl overflow-hidden bg-black">
                        <img
                          src={imageUrl || imagePreview!}
                          alt="Upload preview"
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                          Click to change file
                        </div>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-emerald-500 mx-auto transition-colors" />
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {t('storage.drag_drop_desc', 'Drag and drop an image file here, or click to browse from device')}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Supports JPG, PNG, WEBP, GIF (Max file size: 10MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Direct Image URL fallback */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('storage.or_url', 'Or enter direct picture URL')}
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={e => {
                      setImageUrl(e.target.value);
                      if (e.target.value) setImagePreview(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>

                {/* Picture Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t('storage.pic_title', 'Picture Title')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Science Laboratory Wing"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t('storage.pic_category', 'Picture Category')}
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-semibold"
                    >
                      <option value="Campus">Campus & Buildings</option>
                      <option value="Laboratories">Laboratories & STEM</option>
                      <option value="Classrooms">Classrooms & ICT</option>
                      <option value="Events">Events & Ceremonies</option>
                      <option value="Sports">Sports & Stadium</option>
                      <option value="Graduation">Graduation & Awards</option>
                    </select>
                  </div>
                </div>

                {/* Date Captured */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('storage.pic_date', 'Date Captured')}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>

                {/* Description / Caption */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {t('storage.pic_desc', 'Description / Caption')}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Provide details about the photograph..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Storing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t('storage.save_pic', 'Save Picture to Storage')}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase">
                      {lightboxItem.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {lightboxItem.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(lightboxItem.imageUrl, lightboxItem.id)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      {copiedId === lightboxItem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy URL</span>
                    </button>
                    <a
                      href={lightboxItem.imageUrl}
                      download={`shambu_${lightboxItem.title.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>

                <h3 className="text-lg font-bold">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{lightboxItem.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
