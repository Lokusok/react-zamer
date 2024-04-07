import { createContext, useMemo, useContext } from 'react';

import executionStore, { ExecutionStore } from './execution';

type TStoreContext = {
  executionStore: ExecutionStore;
};

const StoreContext = createContext<TStoreContext | null>(null);

type TProps = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: TProps) => {
  const ctxValue = useMemo<TStoreContext>(
    () => ({
      executionStore,
    }),
    []
  );

  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
};

export const useStore: () => TStoreContext = () => {
  const ctx = useContext(StoreContext);

  if (ctx === null) {
    throw new Error('Не могу найти store');
  }

  return ctx;
};
