import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLimits } from '../actions/getLimits';
import { ResponseLimit as Limit } from '../types/limits';
import { Steps } from '../constants/steps';
import { MAX_MONTHS, MIN_MONTHS } from '../constants/config';

type AppContextType = {
  amount: number | undefined;
  month: number | undefined;
  onSetAmount: (value: number) => void;
  onSetMonth: (value: number) => void;
  onSetStep: (value: number) => void;
  MAX_MONTHS: number;
  MIN_MONTHS: number;
  limit: Limit | null;
  step: Steps;
};

const AppContext = createContext({} as AppContextType);

type AppContextProps = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [month, setMonth] = useState<number>(MIN_MONTHS);
  const [limit, setLimit] = useState<Limit | null>(null);
  const [step, setStep] = useState<Steps>(Steps.step1);

  console.log("step", step);

  useEffect(() => {
    getLimits().then(data => {
      setLimit({
        max: data?.max,
        min: data?.min,
        currency: data?.currency,
      });
      setAmount(data?.min);
    });
  }, []);

  const onSetAmount = useCallback(
    (value: number) => {
      setAmount(value);
    },
    [amount, setAmount],
  );

  const onSetMonth = useCallback(
    (value: number) => {
      setMonth(value);
    },
    [month, setMonth],
  );

  const onSetStep = useCallback(
    (value: Steps) => {
      console.log(value);
      setStep(value);
    },
    [step, setStep],
  );

  const value = useMemo(
    () => ({
      amount: amount || limit?.min,
      month,
      onSetMonth,
      onSetAmount,
      onSetStep,
      MAX_MONTHS,
      MIN_MONTHS,
      limit,
      step
    }),
    [amount, month, step, limit],
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
