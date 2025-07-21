import type { ChangeEvent } from 'react';

export const formatLettersOnly = (
  e: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');

  const newEvent = { ...e, target: { ...e.target, value } };

  return newEvent as ChangeEvent<HTMLInputElement>;
};
