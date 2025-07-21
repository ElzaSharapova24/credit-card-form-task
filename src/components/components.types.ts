import type {
  DefaultValues,
  FieldValues,
  UseFormProps,
  UseFormReturn
} from 'react-hook-form';
import type { ChangeEvent, ReactNode } from 'react';
import type { TextFieldProps } from '@mui/material';

export type TFormProps<TFormValues extends FieldValues> = Omit<
  UseFormProps<TFormValues>,
  'defaultValues'
> & {
  className?: string;
  stopPropagation?: boolean;
  defaultValues?: DefaultValues<TFormValues>;
  children:
    | ReactNode
    | ((formHandlers: UseFormReturn<TFormValues>) => ReactNode);
} & (
    | {
        onSubmit: (formValues: TFormValues) => void;
        curriedSubmit?: false;
      }
    | {
        onSubmit: (
          formHandlers: UseFormReturn<TFormValues>,
          defaultValues?: UseFormProps<TFormValues>['defaultValues']
        ) => (formValues: TFormValues) => void;
        curriedSubmit: true;
      }
  );

export type InputBaseProps<TDataType> = {
  name: keyof TDataType;
};

type TextInputFieldOwnProps<DataType> = InputBaseProps<DataType> &
  Omit<TextFieldProps, 'onBlur' | 'onChange'>;

export type TextInputFieldProps<DataType> = TextInputFieldOwnProps<DataType> & {
  label?: string;
  inputMask?: string;
  onInputChange?: (
    value: ChangeEvent<HTMLInputElement>
  ) => ChangeEvent<HTMLInputElement>;
  format?: (
    value: ChangeEvent<HTMLInputElement>
  ) => ChangeEvent<HTMLInputElement>;
};
