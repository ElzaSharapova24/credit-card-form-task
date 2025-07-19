import * as yup from 'yup';
import type { Asserts } from 'yup';

const isAmex = (cardNumber: string) => {
  const digits = cardNumber.replace(/\s/g, '');
  return /^3[47]/.test(digits);
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;

const creditCardSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .test('cardNumberFormat', 'Invalid card number format', value => {
      if (!value) return false;
      const digits = value.replace(/\s/g, '');
      return /^\d{15}$/.test(digits) || /^\d{16}$/.test(digits);
    })
    .test(
      'cardNumberLength',
      'Card number must be 15 digits for Amex or 16 for others',
      value => {
        if (!value) return false;
        const digits = value.replace(/\s/g, '');

        if (isAmex(digits)) {
          return digits.length === 15;
        } else {
          return digits.length === 16;
        }
      }
    ),

  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .test('expiry', 'Card has expired', value => {
      if (!value) return false;

      const [month, year] = value.split('/').map(Number);
      const expYear = year + 2000; // Convert YY to 20YY

      const currentFullYear = currentDate.getFullYear();

      if (expYear < currentFullYear) {
        return false;
      }
      if (expYear === currentFullYear && month < currentMonth) {
        return false;
      }

      return true;
    }),

  cvv: yup
    .string()
    .required('CVV is required')
    .test(
      'cvvFormat',
      'CVV must be 3 digits for Visa/Mastercard or 4 digits for Amex',
      function (value) {
        if (!value) return false;

        const cardNumber = this.parent.cardNumber || '';
        const digits = cardNumber.replace(/\s/g, '');

        if (isAmex(digits)) {
          return /^\d{4}$/.test(value);
        } else {
          return /^\d{3}$/.test(value);
        }
      }
    ),

  cardholderName: yup
    .string()
    .required('Cardholder name is required')
    .test(
      'nameLength',
      'Name must be at least 5 characters for Amex cards',
      function (value) {
        if (!value) return false;

        const cardNumber = this.parent.cardNumber || '';
        const digits = cardNumber.replace(/\s/g, '');

        if (isAmex(digits)) {
          return value.length >= 5;
        }

        return true;
      }
    )
});

export default creditCardSchema;
export type CreditCardFormValues = Asserts<typeof creditCardSchema>;
