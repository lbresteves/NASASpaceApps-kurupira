import type { PropsWithChildren } from 'react';
import { FadeContainer, type IFadeStyledProps } from './Fade.styled';

export interface IFadeProps extends PropsWithChildren, IFadeStyledProps {}

export const Fade = ({ isVisible, children }: IFadeProps) => {
  return <FadeContainer isVisible={isVisible}>{children}</FadeContainer>;
};
