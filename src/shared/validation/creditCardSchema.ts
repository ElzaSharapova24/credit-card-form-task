import * as yup from 'yup';
import type { InferType } from 'yup';
import creditCardType from 'credit-card-type';
import { parseExpiryDate } from '../utils';

interface CreditCardTypeResult {
  niceType: string;
  type: string;
  gaps: Array<number>;
  lengths: Array<number>;
  code: {
    name: string;
    size: number;
  };
}

const getCardType = (cardNumber: string): CreditCardTypeResult | null => {
  const digits = cardNumber.replace(/\s/g, '');

  if (!digits || digits.length < 4) return null;

  try {
    const types = creditCardType(digits);

    return types.length > 0 ? types[0] : null;
  } catch (error) {
    console.warn('Error detecting card type:', error);

    return null;
  }
};

const getCvvLengthForCard = (cardType: CreditCardTypeResult | null): number =>
  cardType?.code?.size ?? 3;

const creditCardSchema = yup.object({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .test('cardNumberFormat', 'Your card number is invalid', value => {
      if (!value) return false;
      const digits = value.replace(/\s/g, '');

      try {
        const cardTypes = creditCardType(digits);

        if (cardTypes.length === 0) return false;

        const cardInfo = cardTypes[0];

        return cardInfo.lengths.includes(digits.length);
      } catch (error) {
        return false;
      }
    }),

  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .test('expiry', 'Card has expired', value => {
      if (!value) return false;
      const { isValid } = parseExpiryDate(value);

      return isValid;
    }),

  cvv: yup
    .string()
    .required('CVV is required')
    .test('cvvFormat', 'Your CVV code is invalid', function (value) {
      if (!value) return false;

      const cardNumber = this.parent.cardNumber || '';
      const cardType = getCardType(cardNumber);

      if (!cardType) return /^\d{3}$/.test(value);

      const requiredLength = getCvvLengthForCard(cardType);
      const regexPattern = new RegExp(`^\\d{${requiredLength}}$`);

      return regexPattern.test(value);
    }),

  cardholderName: yup
    .string()
    .required('Cardholder name is required')
    .test('nameFormat', function (value) {
      if (!value) return false;

      const trimmedName = value.trim();
      const cardNumber = this.parent.cardNumber || '';
      const cardType = getCardType(cardNumber);

      if (cardType && cardType.type === 'american-express') {
        if (trimmedName.length < 5) {
          return this.createError({
            message: 'Name must have at least 5 characters for AMEX cards'
          });
        }

        return true;
      }

      const nameParts = trimmedName.split(/\s+/);

      if (trimmedName.length < 2 || nameParts.length < 2) {
        return this.createError({
          message: 'Name must contain at least first and last name'
        });
      }

      return true;
    })
});

export type CreditCardFormValues = InferType<typeof creditCardSchema>;

export default creditCardSchema;
