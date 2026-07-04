export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const generateId = () => {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
};

export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isImageFile = (filename) => {
  const ext = getFileExtension(filename);
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);
};

export const isPDFFile = (filename) => {
  const ext = getFileExtension(filename);
  return ext === 'pdf';
};

export const getStatusColor = (status) => {
  const colors = {
    Pending: 'amber',
    Approved: 'emerald',
    Rejected: 'rose',
  };
  return colors[status] || 'slate';
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    Pending: 'bg-amber-50 text-amber-600 border-amber-200',
    Approved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-600 border-rose-200',
  };
  return classes[status] || 'bg-slate-50 text-slate-600 border-slate-200';
};

export const getTrackingId = (id) => {
  if (!id) return '';
  return `HMS-${new Date().getFullYear()}-${String(id).padStart(6, '0')}`;
};