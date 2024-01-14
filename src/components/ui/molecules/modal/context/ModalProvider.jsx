import { createContext, useContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children, ...rest }) => {
  return <ModalContext.Provider value={rest}>{children}</ModalContext.Provider>;
};

/**
 * @description context provider 안에서 공유할 수 있는 훅 ---> context provider 안에 있지 않은 컴포넌트에서 사용하면 에러를 띄워줘야 함.
 */
export const useModalProvider = () => {
  const context = useContext(ModalContext); // 거름망

  if (context === undefined) throw new Error('useModalProvider는 ModalProvider 내부에서만 사용할 수 있습니다.');

  return context;
};

export default ModalProvider;
