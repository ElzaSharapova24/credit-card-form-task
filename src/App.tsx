import { Paper, Stack, Typography, Box, Divider } from '@mui/material';
import { CreditCardIcon, Form, SubmitButton, TextInputField } from './shared';
import formatExpiryDate from './shared/utils/formatExpiryDate.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import creditCardSchema, {
  type CreditCardFormValues
} from './shared/validationRools/validationSchema.ts';

export const App = () => {
  const handleSubmit = async (formData: CreditCardFormValues) => {
    console.log(formData);
  };

  return (
    <div className="flex size-full items-center justify-center bg-green-600 px-4 py-12">
      <Paper
        elevation={3}
        className="size-full max-w-md rounded-xl bg-white px-6 py-8"
      >
        <Form
          onSubmit={handleSubmit}
          className="flex size-full flex-col gap-6"
          resolver={yupResolver(creditCardSchema) as any} // нужно разобраться с типизацией формы
          mode="onChange"
        >
          <Box className="flex items-center justify-center gap-2">
            <Typography variant="body2" color="GrayText">
              Payment Method:
            </Typography>
            <CreditCardIcon className="size-5" />
            <Typography variant="body1" fontWeight="medium">
              Credit Card
            </Typography>
          </Box>

          <Divider />

          <Stack spacing={3}>
            <TextInputField
              name="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              fullWidth
              inputProps={{ maxLength: 19, autoComplete: 'cc-number' }}
            />

            <Box className="flex gap-4">
              <TextInputField
                name="expiryDate"
                label="Expiration Date"
                placeholder="MM/YY"
                fullWidth
                format={formatExpiryDate}
                inputProps={{ maxLength: 5, autoComplete: 'cc-exp' }}
              />
              <TextInputField
                name="cvv"
                label="CVV"
                placeholder="123"
                fullWidth
                inputProps={{ maxLength: 4, autoComplete: 'cc-csc' }}
                type="password"
              />
            </Box>

            <TextInputField
              name="cardholderName"
              label="Cardholder Name"
              placeholder="John Doe"
              fullWidth
              type={'text'}
              inputProps={{ maxLength: 50, autoComplete: 'cc-name' }}
            />
          </Stack>
          <Box className="mt-4">
            <SubmitButton />
          </Box>
        </Form>
      </Paper>
    </div>
  );
};
