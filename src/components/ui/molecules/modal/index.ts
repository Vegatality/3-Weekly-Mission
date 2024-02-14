import ModalCloseBtn from '@components/ui/atoms/button/modal-btn/ModalCloseBtn';
import { StModalActionBtn } from '@components/ui/atoms/button/modal-btn/StModalActionBtn';
import { StModalLabel } from '@components/ui/atoms/label/modal-label/StModalLabel';

import ModalProvider from './context/ModalProvider';
import { StModalBackground } from './StModalBackground';
import { StModalInput } from './StModalInput';
import { StModalSubText } from './StModalSubText';
import { StModalWrapper } from './StModalWrapper';

const Modal = Object.assign(ModalProvider, {
  StModalBackground,
  StModalWrapper,
  StModalLabel,
  StModalSubText,
  ModalCloseBtn,
  StModalActionBtn,
  StModalInput,
});

export default Modal;
