import { Button, CircularProgress } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export const SubmitButton = () => {
  const { formState } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClick = () => {
    if (formState.isValid) {
      setIsSubmitting(true);
      console.log('submit');
    }
  };

  return (
    <div className="mt-auto w-full">
      <Button
        fullWidth
        variant="contained"
        type="submit"
        disabled={!formState.isValid || isSubmitting}
        onClick={handleClick}
        sx={{
          height: '48px',
          position: 'relative',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500
        }}
      >
        {isSubmitting ? (
          <>
            <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
            Processing...
          </>
        ) : (
          'Pay'
        )}
      </Button>
    </div>
  );
};
