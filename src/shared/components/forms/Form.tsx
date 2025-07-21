import type { FormEvent, ReactElement } from 'react';
import { type FieldValues, FormProvider, useForm } from 'react-hook-form';
import type { TFormProps } from '@/shared';

export const Form = <TFormValues extends FieldValues>({
  children,
  onSubmit,
  curriedSubmit,
  defaultValues,
  stopPropagation,
  className,
  ...useFormProps
}: TFormProps<TFormValues>): ReactElement => {
  const formHandlers = useForm<TFormValues>({
    ...useFormProps,
    defaultValues
  });

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (stopPropagation) {
      e.stopPropagation();
    }

    return curriedSubmit
      ? formHandlers.handleSubmit(onSubmit(formHandlers, defaultValues))(e)
      : formHandlers.handleSubmit(onSubmit)(e);
  };

  return (
    <FormProvider {...formHandlers}>
      <form onSubmit={submitHandler} className={className} autoComplete="on">
        {typeof children === 'function' ? children(formHandlers) : children}
      </form>
    </FormProvider>
  );
};
