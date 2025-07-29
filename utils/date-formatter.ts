export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '-';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
