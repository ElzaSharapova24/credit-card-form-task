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

const cleanCardNumber = (cardNumber: string): string =>
  cardNumber.replace(/\D/g, '');

export const getCvvLength = (cardType: CardType): number =>
  cardType === 'american-express' ? 4 : 3;

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
