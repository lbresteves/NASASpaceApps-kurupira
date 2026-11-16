import { useDialogFocus } from '@shared/hooks';
import { type PropsWithChildren, type ReactNode, useId } from 'react';
import { createPortal } from 'react-dom';
import { Typography } from '../Typography/Typography';
import { CloseButton } from '../CloseButton/CloseButton';
import { Backdrop, Dialog, DialogBody, DialogFooter, DialogHeader } from './Modal.styled';

export interface IModalProps extends PropsWithChildren {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  /** Semi-transparent, blurred background so the map shows through. */
  isTranslucent?: boolean;
  /** Large dialog for 16:9 media (e.g. slides), sized so the content fits the screen height. */
  isWide?: boolean;
}

export const Modal = ({
  isOpen,
  title,
  onClose,
  footer,
  isTranslucent = false,
  isWide = false,
  children,
}: IModalProps) => {
  const titleId = useId();
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <Backdrop onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <Dialog
        ref={dialogRef}
        isTranslucent={isTranslucent}
        isWide={isWide}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}>
        <DialogHeader>
          <Typography variant="subtitle" id={titleId}>
            {title}
          </Typography>
          <CloseButton label="Close" onClick={onClose} />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </Dialog>
    </Backdrop>,
    document.body,
  );
};
