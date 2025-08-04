// Enhanced version with more features
export const numberToWordsEnhanced = (
  amount: number,
  options: {
    currency?: string;
    subCurrency?: string;
    locale?: 'US' | 'IN'; // US or Indian numbering system
  } = {}
): string => {
  const { currency = 'RUPEES', subCurrency = 'PAISE', locale = 'US' } = options;

  if (amount === 0) return 'ZERO ONLY.';
  if (amount < 0)
    return `MINUS ${numberToWordsEnhanced(Math.abs(amount), options)}`;

  const ones = [
    '',
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE',
    'SIX',
    'SEVEN',
    'EIGHT',
    'NINE',
    'TEN',
    'ELEVEN',
    'TWELVE',
    'THIRTEEN',
    'FOURTEEN',
    'FIFTEEN',
    'SIXTEEN',
    'SEVENTEEN',
    'EIGHTEEN',
    'NINETEEN',
  ];

  const tens = [
    '',
    '',
    'TWENTY',
    'THIRTY',
    'FORTY',
    'FIFTY',
    'SIXTY',
    'SEVENTY',
    'EIGHTY',
    'NINETY',
  ];

  // Indian numbering system: Crore, Lakh
  const indianScales = [
    { value: 10000000, name: 'CRORE' },
    { value: 100000, name: 'LAKH' },
    { value: 1000, name: 'THOUSAND' },
    { value: 100, name: 'HUNDRED' },
  ];

  // US numbering system: Billion, Million
  const usScales = [
    { value: 1000000000, name: 'BILLION' },
    { value: 1000000, name: 'MILLION' },
    { value: 1000, name: 'THOUSAND' },
    { value: 100, name: 'HUNDRED' },
  ];

  const scales = locale === 'IN' ? indianScales : usScales;

  const convertHundreds = (num: number): string => {
    let result = '';

    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' HUNDRED';
      num %= 100;
      if (num > 0) result += ' ';
    }

    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) result += ' ' + ones[num];
    } else if (num > 0) {
      result += ones[num];
    }

    return result;
  };

  const [integerPart, decimalPart] = amount.toFixed(2).split('.');
  let num = parseInt(integerPart ?? '');

  if (num === 0 && (!decimalPart || parseInt(decimalPart) === 0)) {
    return 'ZERO ONLY.';
  }

  let words = '';

  // Process each scale
  for (const scale of scales) {
    if (num >= scale.value) {
      const scaleAmount = Math.floor(num / scale.value);
      words += convertHundreds(scaleAmount) + ' ' + scale.name + ' ';
      num %= scale.value;
    }
  }

  // Handle remaining number (less than 100)
  if (num > 0) {
    words += convertHundreds(num) + ' ';
  }

  // Build result
  let result = '';
  if (words.trim()) {
    result = `${currency} ${words.trim()}`;
  }

  // Handle decimal part
  if (decimalPart && parseInt(decimalPart) > 0) {
    const subAmount = parseInt(decimalPart);
    const subWords = convertHundreds(subAmount);
    if (result) {
      result += ` AND ${subWords} ${subCurrency}`;
    } else {
      result = `${subWords} ${subCurrency}`;
    }
  }

  return result + ' ONLY.';
};
