import { compose } from 'lodash/fp';
import {
  type FieldValues,
  useController,
  useFormContext
} from 'react-hook-form';
import { TextField } from '@mui/material';
import type { TextInputFieldProps } from './components.types.ts';

export const TextInputField = <TDataType,>({
  name,
  format,
  ...props
}: TextInputFieldProps<TDataType>) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController<FieldValues>({
    control,
    name,
    defaultValue: ''
  });

  // const fieldError = fieldState.error as unknown as FieldError | undefined;
  const { value, ...handlers } = field;
  const hasError = !!fieldState.error;
  const errorMessage = fieldState.error?.message;

  return (
    <TextField
      {...props}
      {...field}
      {...handlers}
      id={name}
      value={value || ''}
      helperText={hasError || errorMessage}
      {...(format && { onChange: compose(handlers.onChange, format) })}
    />
  );
};
