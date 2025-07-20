export const parseExpiryDate = (
  expiryDate: string
): {
  month: string;
  year: string;
  isValid: boolean;
} => {
  if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    return { month: '', year: '', isValid: false };
  }

  const [month, twoDigitYearStr] = expiryDate.split('/');
  const twoDigitYear = parseInt(twoDigitYearStr, 10);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentTwoDigitYear = currentYear % 100;
  let fullYear: number;

  if (twoDigitYear < currentTwoDigitYear - 20) {
    fullYear = Math.floor(currentYear / 100 + 1) * 100 + twoDigitYear;
  } else {
    fullYear = Math.floor(currentYear / 100) * 100 + twoDigitYear;
  }

  // Проверка на истекшую дату
  const isValid =
    fullYear > currentYear ||
    (fullYear === currentYear && parseInt(month, 10) >= currentMonth);

  return {
    month: month.padStart(2, '0'),
    year: fullYear.toString(),
    isValid
  };
};
