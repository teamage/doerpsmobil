import { createSignal, createContext, useContext, JSX, Signal } from 'solid-js';

const CounterContext = createContext<Signal<number>>();

export function CounterProvider(props: { children: JSX.Element }) {
  const countSignal = createSignal(0);

  return (
    <CounterContext.Provider value={countSignal}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext)!;
}
