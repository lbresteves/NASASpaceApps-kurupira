import { useAnchorPosition } from '@shared/hooks';
import type { PropsWithChildren, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { TooltipAnchor, TooltipBubble } from './Tooltip.styled';

export interface ITooltipProps extends PropsWithChildren {
  content: ReactNode;
}

export const Tooltip = ({ content, children }: ITooltipProps) => {
  const { anchorRef, position, show, hide } = useAnchorPosition<HTMLSpanElement>();

  return (
    <TooltipAnchor ref={anchorRef} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {position &&
        createPortal(
          <TooltipBubble role="tooltip" style={{ left: position.x, top: position.y }}>
            {content}
          </TooltipBubble>,
          document.body,
        )}
    </TooltipAnchor>
  );
};
