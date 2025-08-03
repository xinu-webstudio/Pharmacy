export const calculateAge = (dob: string): string => {
  const birthDate = new Date(dob);

  console.log(dob, 'dob');
  const ageDifMs = Date.now() - birthDate.getTime();

  console.log(ageDifMs, 'diffs');
  const ageDate = new Date(ageDifMs);

  console.log(ageDate, 'age');

  console.log(Math.abs(ageDate.getUTCFullYear() - 1970).toString(), 'real age');
  return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
};

export interface AgeDetails {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  formatted: string;
}

export const calculateDetailedAge = (dob: string): AgeDetails | null => {
  if (!dob || dob.trim() === '') {
    return null;
  }

  const birthDate = new Date(dob);
  const today = new Date();

  // Validate the birth date
  if (isNaN(birthDate.getTime()) || birthDate > today) {
    return null;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days
  const totalDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate total months (approximate)
  const totalMonths = years * 12 + months;

  // Format the age string
  let formatted = '';
  if (years > 0) {
    formatted += `${years} year${years !== 1 ? 's' : ''}`;
  }
  if (months > 0) {
    if (formatted) formatted += ', ';
    formatted += `${months} month${months !== 1 ? 's' : ''}`;
  }
  if (days > 0 && years === 0) {
    if (formatted) formatted += ', ';
    formatted += `${days} day${days !== 1 ? 's' : ''}`;
  }

  if (!formatted) {
    formatted = 'Born today';
  }

  return {
    years,
    months,
    days,
    totalDays,
    totalMonths,
    formatted,
  };
};

// Helper function to format age in different ways
export const formatAge = (
  dob: string,
  format: 'years' | 'detailed' | 'exact' = 'years'
): string => {
  const ageDetails = calculateDetailedAge(dob);

  if (!ageDetails) {
    return 'N/A';
  }

  switch (format) {
    case 'years':
      return `${ageDetails.years.toString()} Years`;
    case 'detailed':
      return ageDetails.formatted;
    case 'exact':
      return `${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days`;
    default:
      return ageDetails.years.toString();
  }
};

// Example usage:
// const age = calculateAge('1990-05-15'); // Returns "34" (as of July 2025)
// const detailedAge = calculateDetailedAge('1990-05-15'); // Returns full age object
// const formattedAge = formatAge('1990-05-15', 'detailed'); // Returns "34 years, 1 month"
