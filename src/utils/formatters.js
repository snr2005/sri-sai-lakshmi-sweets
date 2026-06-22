export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  
  let date = dateInput;
  
  // Handle Firestore Timestamp
  if (dateInput.seconds) {
    date = new Date(dateInput.seconds * 1000);
  } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    date = new Date(dateInput);
  }
  
  if (!(date instanceof Date) || isNaN(date)) return '';
  
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
