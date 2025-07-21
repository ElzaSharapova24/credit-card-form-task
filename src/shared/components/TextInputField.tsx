import {
  type FieldValues,
  useController,
  useFormContext
} from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import type { TextInputFieldProps } from './components.types.ts';
import Inputmask from 'inputmask';
import { useEffect, useRef } from 'react';

export const TextInputField = <T extends FieldValues = FieldValues>({
  name,
  onInputChange,
  inputMask,
  startAdornment,
  ...props
}: TextInputFieldProps<T> & { startAdornment?: React.ReactNode }) => {
  const { control, trigger, clearErrors } = useFormContext();
  const { field, fieldState } = useController<FieldValues>({
    control,
    name
  });

  const { value, onChange, ...handlers } = field;
  const hasError = !!fieldState.error;
  const errorMessage = fieldState.error?.message;

  const handleFocus = () => {
    if (hasError) {
      clearErrors(name);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputMask) {
      Inputmask.remove(inputRef.current);
      const im = new Inputmask(inputMask, {
        placeholder: ''
      });

      im.mask(inputRef.current);
    }
  }, [inputMask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedEvent = onInputChange ? onInputChange(e) : e;

    onChange(formattedEvent);
    if (hasError) {
      trigger(name);
    }
  };

  return (
    <TextField
      {...props}
      {...field}
      {...handlers}
      id={name}
      value={value || ''}
      error={hasError}
      inputRef={inputRef}
      helperText={hasError ? errorMessage : props.helperText}
      onChange={handleChange}
      onFocus={handleFocus}
      InputProps={{
        ...props.InputProps,
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined
      }}
      inputProps={{
        ...props.inputProps,
        'aria-invalid': hasError,
        name
      }}
      className="w-full"
      sx={{
        '& .MuiFormHelperText-root': {
          minHeight: '1.5rem',
          marginTop: '4px',
          transition: 'all 0.2s ease'
        },
        '& .MuiInputBase-root': {
          borderRadius: '8px'
        }
      }}
    />
  );
};
