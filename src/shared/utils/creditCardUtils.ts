import creditCardType from 'credit-card-type';

export type CardType =
  | 'visa'
  | 'mastercard'
  | 'american-express'
  | 'discover'
  | 'diners-club'
  | 'jcb'
  | 'unionpay'
  | 'maestro'
  | 'unknown';

const CARD_TYPE_MAP: Record<string, CardType> = {
  visa: 'visa',
  mastercard: 'mastercard',
  'american-express': 'american-express',
  discover: 'discover',
  'diners-club': 'diners-club',
  jcb: 'jcb',
  unionpay: 'unionpay',
  maestro: 'maestro'
};

// Утилита для очистки номера карты
const cleanCardNumber = (cardNumber: string): string =>
  cardNumber.replace(/\D/g, '');

export const identifyCardType = (cardNumber: string): CardType => {
  try {
    const cleanNumber = cleanCardNumber(cardNumber);

    if (!cleanNumber || cleanNumber.length < 4) {
      return 'unknown';
    }

    const cardTypes = creditCardType(cleanNumber);

    if (cardTypes.length === 0) {
      return 'unknown';
    }

    const detectedType = cardTypes[0].type;

    return CARD_TYPE_MAP[detectedType] || 'unknown';
  } catch (error) {
    console.error('Error identifying card type:', error);

    return 'unknown';
  }
};

export const getCvvLength = (cardType: CardType): number =>
  cardType === 'american-express' ? 4 : 3;

export const formatCardNumber = (value: string): string => {
  if (!value) return '';

  const cleanValue = cleanCardNumber(value);

  if (cleanValue.length === 0) return '';

  const cardTypes = creditCardType(cleanValue);

  // Если тип карты не определен, используем стандартное форматирование по 4 цифры
  if (cardTypes.length === 0) {
    return cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  const cardInfo = cardTypes[0];
  const gaps = cardInfo.gaps || [];

  let result = '';

  for (let i = 0; i < cleanValue.length; i++) {
    if (gaps.includes(i)) {
      result += ' ';
    }
    result += cleanValue[i];
  }

  return result;
};

export const getCardMaxLength = (cardType: CardType): number => {
  const lengths: Record<CardType, number> = {
    visa: 19,
    mastercard: 19,
    'american-express': 17,
    discover: 19,
    'diners-club': 17,
    jcb: 19,
    unionpay: 19,
    maestro: 19,
    unknown: 23
  };

  return lengths[cardType];
};
