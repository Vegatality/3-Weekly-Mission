import { createContext, PropsWithChildren, useContext } from 'react';

export type TCardProviderContext = {
  linkId: number;
  favorite: boolean;
  createdAt: string;
  url: string;
  title: string;
  imageSource: string | null;
  description: string | null;
};

type TCardProviderProps = PropsWithChildren<TCardProviderContext>;

const CardProviderContext = createContext<TCardProviderContext | undefined>(undefined);

const CardProvider = ({ children, ...rest }: TCardProviderProps) => {
  return <CardProviderContext.Provider value={rest}>{children}</CardProviderContext.Provider>;
};

export const useCardProvider = () => {
  const context = useContext(CardProviderContext);

  if (context === undefined) throw new Error('useCardProvider must be used within CardProvider');

  return context;
};

export default CardProvider;
