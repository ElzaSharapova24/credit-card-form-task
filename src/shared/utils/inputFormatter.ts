import type { ChangeEvent } from 'react';

export const formatExpiryDate = (
  e: ChangeEvent<HTMLInputElement>
): ChangeEvent<HTMLInputElement> => {
  const input = e.target;
  const rowValue = input.value;
  const value = rowValue.replace(/\D/g, '');

  const selectionStart = input.selectionStart || 0;

  const spacesBefore = (
    rowValue.substring(0, selectionStart).match(/\//g) || []
  ).length;

  const formattedValue = formatDate(value);

  const newEvent = { ...e, target: { ...e.target, value: formattedValue } };

  queueMicrotask(() => {
    if (input) {
      const formattedValueUpToCursor = formatDate(
        value.substring(0, selectionStart)
      );
      const newSpacesBefore = (formattedValueUpToCursor.match(/\//g) || [])
        .length;

      const spaceDiff = newSpacesBefore - spacesBefore;
      const newCursorPosition = selectionStart + spaceDiff;

      input.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  });

  return newEvent as ChangeEvent<HTMLInputElement>;
};

function formatDate(value: string): string {
  let formattedValue = value;

  if (value.length > 4) {
    formattedValue = value.slice(0, 4);
  }

  if (value.length > 2) {
    formattedValue = value.slice(0, 2) + '/' + value.slice(2);
  }

  return formattedValue;
}

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
