import { Stack, Typography, Box, Divider, Alert } from '@mui/material';
import { useState, useCallback, useMemo, type ChangeEvent } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { PaymentSuccessModal } from './shared/modals/PaymentSuccessModal.tsx';
import {
  CreditCardIcon,
  CreditCardTypeIcon,
  Form,
  SubmitButton,
  TextInputField
} from './shared';
import {
  type CardType,
  formatLettersOnly,
  getCvvLength,
  identifyCardType
} from './shared/utils';
import creditCardSchema, {
  type CreditCardFormValues
} from './shared/validationRules/creditCardSchema.ts';

export const App = () => {
  const [cardType, setCardType] = useState<CardType>('unknown');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cvvLength = useMemo(() => getCvvLength(cardType), [cardType]);

  const handleCardNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): ChangeEvent<HTMLInputElement> => {
      try {
        const value = e.target.value;
        const newCardType = identifyCardType(value);

        setCardType(newCardType);

        return e;
      } catch (error) {
        console.warn('Error formatting card number:', error);
        setCardType('unknown');

        return e;
      }
    },
    [cardType]
  );

  const handleSubmit = async (formData: CreditCardFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Payment form data:', formData);
      console.log('Payment submitted successfully!');

      setSubmitStatus('success');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error processing payment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmitStatus('idle');
    setCardType('unknown');

    console.log('Ready for next transaction');
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
          {formHandlers => (
            <>
              <Box sx={{ display: showSuccessModal ? 'none' : 'block' }}>
                <Box className="mb-2 flex items-center justify-center gap-2 pb-2">
                  <Typography variant="h5" color="GrayText">
                    Payment Method:
                  </Typography>
                  <CreditCardIcon className="size-5" />
                  <Typography variant="h6" fontWeight="medium">
                    Credit Card
                  </Typography>
                </Box>

                <Divider />

                {submitStatus === 'error' && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Payment submission failed. Please try again.
                  </Alert>
                )}

                <Stack spacing={4} className="pt-5">
                  <TextInputField
                    name="cardNumber"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    inputMask={
                      cardType === 'american-express'
                        ? '9999 9999 9999 999'
                        : '9999 9999 9999 9999'
                    }
                    autoComplete="cc-number"
                    fullWidth
                    disabled={isSubmitting}
                    onInputChange={handleCardNumberChange}
                    startAdornment={<CreditCardTypeIcon cardType={cardType} />}
                  />

                  <Box className="flex flex-col gap-4 sm:flex-row">
                    <TextInputField
                      name="expiryDate"
                      label="Expiration Date"
                      placeholder="MM/YY"
                      inputMask="99/99"
                      autoComplete="cc-exp"
                      fullWidth
                      disabled={isSubmitting}
                    />

                    <TextInputField
                      name="cvv"
                      label={cvvLength === 4 ? 'CVV (4 digits)' : 'CVV'}
                      placeholder={cvvLength === 4 ? '1234' : '123'}
                      autoComplete="cc-csc"
                      fullWidth
                      disabled={isSubmitting}
                      inputMask={
                        cardType === 'american-express' ? '9999' : '999'
                      }
                      type="password"
                    />
                  </Box>

                  <TextInputField
                    name="cardholderName"
                    label="Cardholder Name"
                    placeholder="John Doe"
                    autoComplete="cc-name"
                    fullWidth
                    disabled={isSubmitting}
                    onInputChange={formatLettersOnly}
                    type="text"
                    inputProps={{
                      maxLength: 50,
                      style: { textTransform: 'uppercase' }
                    }}
                  />
                </Stack>

                <Box className="mt-6">
                  <SubmitButton />
                </Box>
              </Box>
              <PaymentSuccessModal
                open={showSuccessModal}
                onClose={() => {
                  handleCloseSuccessModal();
                  formHandlers.reset();
                }}
              />
            </>
          )}
        </Form>
      </Box>
    </section>
  );
};
