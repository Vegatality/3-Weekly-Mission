import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type TPotalProps = PropsWithChildren;

const Portal = ({ children }: TPotalProps) => {
  return ReactDOM.createPortal(children, document.getElementById('portal')!);
};

const PortalContainer = ({ children }: TPotalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <Portal>{children}</Portal> : null;
};

export default PortalContainer;
