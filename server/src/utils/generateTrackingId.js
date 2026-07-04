export const generateTrackingId = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 999999) + 1;
  return `HMS-${year}-${String(random).padStart(6, '0')}`;
};