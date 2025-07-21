import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  Fade,
  IconButton,
  Backdrop
} from '@mui/material';
import { type FC } from 'react';

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export const PaymentSuccessModal: FC<PaymentSuccessModalProps> = ({
  open,
  onClose
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="xs"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 3,
        padding: 2,
        zIndex: 1300
      }
    }}
    BackdropComponent={Backdrop}
    BackdropProps={{
      sx: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)'
      }
    }}
    TransitionComponent={Fade}
    transitionDuration={300}
  >
    <DialogContent>
      <Box className="text-center">
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >
            ✕
          </Box>
        </IconButton>

        <Box className="mb-6 flex justify-center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              color: 'white',
              animation: 'bounce 0.6s ease-in-out',
              boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)'
            }}
          >
            ✓
          </Box>
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="success.main"
          gutterBottom
        >
          Payment Successful!
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your payment has been processed successfully.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onClose}
          sx={{
            minWidth: 140,
            borderRadius: 2,
            py: 1.5,
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
            }
          }}
        >
          OK
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
);
