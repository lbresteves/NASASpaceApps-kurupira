import { type PropsWithChildren, useState } from 'react';
import { IconButton } from '../IconButton/IconButton';
import { Modal } from '../Modal/Modal';
import { InfoIcon } from './InfoIcon';

export { InfoList, InfoParagraph, InfoSection, InfoSectionTitle } from './InfoButton.styled';

export interface IInfoButtonProps extends PropsWithChildren {
  /** Accessible name and tooltip of the (i) button, e.g. "About MODIS and VIIRS". */
  label: string;
  title: string;
}

/** An (i) button that opens a translucent modal with the given explanation. */
export const InfoButton = ({ label, title, children }: IInfoButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton label={label} icon={<InfoIcon />} onClick={() => setIsOpen(true)} />
      <Modal isOpen={isOpen} title={title} onClose={() => setIsOpen(false)} isTranslucent>
        {children}
      </Modal>
    </>
  );
};
