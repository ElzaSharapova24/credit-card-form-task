import { Button, CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const SubmitButton = () => {
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext();

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      fullWidth
      disabled={isSubmitting || !isValid}
      startIcon={
        isSubmitting ? (
          <CircularProgress size={20} color="inherit" />
        ) : undefined
      }
      sx={{
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }
      }}
    >
      {isSubmitting ? 'Processing Payment...' : 'Pay'}
    </Button>
  );
};
