import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type AppContextType = {
  amount: number | undefined;
  mounth: number | undefined;
  onSetAmount: (value: number) => void;
  onSetMounth: (value: number) => void;
};

const AppContext = createContext({} as AppContextType);

type AppContextProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [amount, setAmount] = useState<number>();
  const [mounth, setMounth] = useState<number>(3);

  const onSetAmount = useCallback(
    (value: number) => {
      setAmount(value);
    },
    [amount],
  );

  const onSetMounth = useCallback(
    (value: number) => {
      setMounth(value);
    },
    [mounth],
  );

  const value = useMemo(
    () => ({
      amount,
      mounth,
      onSetMounth,
      onSetAmount,
    }),
    [amount, mounth],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used appProvider');
  }

  return context;
};
