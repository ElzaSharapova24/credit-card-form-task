import type { ReactElement, SVGProps } from 'react';

export type SvgIconComponentProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export type SvgIconComponent = (props: SvgIconComponentProps) => ReactElement;
