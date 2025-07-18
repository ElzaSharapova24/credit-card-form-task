import type { ChangeEvent } from 'react';

const formatExpiryDate = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target;
  let value = input.value.replace(/\D/g, '');
  console.log(value);

  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }

  input.value = value;
  return e;
};

export default formatExpiryDate;
