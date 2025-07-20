import { Stack, Typography, Box, Divider } from '@mui/material';
import {
  CreditCardIcon,
  CreditCardTypeIcon,
  Form,
  SubmitButton,
  TextInputField
} from './shared';
import creditCardSchema, {
  type CreditCardFormValues
} from './shared/validationRools/validationSchema.ts';
import { useState, useCallback, useMemo, type ChangeEvent } from 'react';
import {
  type CardType,
  formatCardNumber,
  getCvvLength,
  identifyCardType,
  getCardMaxLength
} from './shared/utils/creditCardUtils.ts';
import {
  formatCVV,
  formatExpiryDate,
  formatLettersOnly
} from './shared/utils/inputFormatter.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { parseExpiryDate } from './shared/utils/dateUtils.ts';

interface ProcessedPayload {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export const App = () => {
  const [cardType, setCardType] = useState<CardType>('unknown');

  const cvvLength = useMemo(() => getCvvLength(cardType), [cardType]);
  const maxCardLength = useMemo(() => getCardMaxLength(cardType), [cardType]);

  const handleCardNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): ChangeEvent<HTMLInputElement> => {
      try {
        const input = e.target;
        const value = input.value;

        const selectionStart = input.selectionStart || 0;

        const spacesBefore = (
          value.substring(0, selectionStart).match(/\s/g) || []
        ).length;

        const newCardType = identifyCardType(value);
        const formattedValue = formatCardNumber(value);

        setCardType(newCardType);

        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue
          }
        };

        queueMicrotask(() => {
          if (input) {
            const formattedValueUpToCursor = formatCardNumber(
              value.substring(0, selectionStart)
            );
            const newSpacesBefore = (
              formattedValueUpToCursor.match(/\s/g) || []
            ).length;

            const spaceDiff = newSpacesBefore - spacesBefore;
            const newCursorPosition = selectionStart + spaceDiff;

            input.setSelectionRange(newCursorPosition, newCursorPosition);
          }
        });

        return newEvent as ChangeEvent<HTMLInputElement>;
      } catch (error) {
        console.warn('Error formatting card number:', error);
        setCardType('unknown');

        return e;
      }
    },
    []
  );

  const handleSubmit = async (formData: CreditCardFormValues) => {
    try {
      const { month: expiryMonth, year: expiryYear } = parseExpiryDate(
        formData.expiryDate
      );

      const payload: ProcessedPayload = {
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        expiryMonth,
        expiryYear,
        cvv: formData.cvv,
        cardholderName: formData.cardholderName.trim()
      };

      console.log('Processed payment data:', payload);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-800  px-4 py-12">
      <Box className="w-full max-w-md overflow-hidden rounded-xl bg-white">
        <Form<CreditCardFormValues>
          onSubmit={handleSubmit}
          className="flex size-full flex-col gap-6 p-6 sm:p-8"
          resolver={yupResolver(creditCardSchema)}
          mode="onBlur"
          defaultValues={{
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: ''
          }}
        >
          <Box className="flex items-center justify-center gap-2 pb-2">
            <Typography variant="h5" color="GrayText">
              Payment Method:
            </Typography>
            <CreditCardIcon className="size-5" />
            <Typography variant="h6" fontWeight="medium">
              Credit Card
            </Typography>
          </Box>

          <Divider />

          <Stack spacing={4} className="pt-2">
            <TextInputField
              name="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              fullWidth
              format={handleCardNumberChange}
              startAdornment={<CreditCardTypeIcon cardType={cardType} />}
              inputProps={{
                maxLength: maxCardLength,
                inputMode: 'numeric'
              }}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <Box className="flex flex-col gap-4 sm:flex-row">
              <TextInputField
                name="expiryDate"
                label="Expiration Date"
                placeholder="MM/YY"
                autoComplete="cc-exp"
                fullWidth
                format={formatExpiryDate}
                inputProps={{
                  maxLength: 5,
                  inputMode: 'numeric'
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px'
                  }
                }}
              />

              <TextInputField
                name="cvv"
                label={cvvLength === 4 ? 'CVV (4 digits)' : 'CVV'}
                placeholder={cvvLength === 4 ? '1234' : '123'}
                autoComplete="cc-csc"
                fullWidth
                format={formatCVV}
                inputProps={{
                  maxLength: cvvLength,
                  inputMode: 'numeric'
                }}
                type="password"
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '8px'
                  }
                }}
              />
            </Box>

            <TextInputField
              name="cardholderName"
              label="Cardholder Name"
              placeholder="John Doe"
              autoComplete="cc-name"
              fullWidth
              format={formatLettersOnly}
              type="text"
              inputProps={{
                maxLength: 50,
                style: { textTransform: 'uppercase' }
              }}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px'
                }
              }}
            />
          </Stack>

          <Box className="mt-6">
            <SubmitButton />
          </Box>
        </Form>
      </Box>
    </section>
  );
};
