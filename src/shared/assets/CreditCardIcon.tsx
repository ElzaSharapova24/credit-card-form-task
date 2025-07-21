import type { SvgIconComponent } from '@/shared';

export const CreditCardIcon: SvgIconComponent = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.333"
      d="M14.667 6.667H1.333m6 2.666H4M1.333 5.467v5.066c0 .747 0 1.12.146 1.406.127.25.331.454.582.582.286.146.659.146 1.406.146h9.066c.747 0 1.12 0 1.406-.146.25-.127.454-.331.582-.582.146-.286.146-.659.146-1.406V5.467c0-.747 0-1.12-.146-1.406a1.333 1.333 0 0 0-.582-.582c-.286-.146-.659-.146-1.406-.146H3.467c-.747 0-1.12 0-1.406.146-.25.128-.455.332-.582.582-.146.286-.146.659-.146 1.406Z"
    />
  </svg>
);
