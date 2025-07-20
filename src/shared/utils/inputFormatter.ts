import type { ChangeEvent } from 'react';

export const formatExpiryDate = (
  e: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  const value = e.target.value.replace(/\D/g, '');
  let formattedValue = value;

  if (value.length > 4) {
    formattedValue = value.slice(0, 4);
  }

  if (value.length > 2) {
    formattedValue = value.slice(0, 2) + '/' + value.slice(2);
  }

  const newEvent = { ...e, target: { ...e.target, value: formattedValue } };

  return newEvent as ChangeEvent<HTMLInputElement>;
};

export const formatLettersOnly = (
  e: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');

  const newEvent = { ...e, target: { ...e.target, value } };

  return newEvent as ChangeEvent<HTMLInputElement>;
};

export const formatCVV = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target;

  input.value = input.value.replace(/[^\d]/g, '');

  return e;
};
