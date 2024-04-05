import { TWorkerEvents } from '@src/types';

type TActionsType = Partial<Record<TWorkerEvents, (...args: any[]) => void>>;

const actions: TActionsType = {
  'exec/do': (code: string) => eval(code), // @todo fix it
};

self.addEventListener('message', ({ data }) => {
  console.log('in worker:', data);

  const eventType = data.type as TWorkerEvents;
  const action = actions[eventType];

  if (action) {
    action();
    self.postMessage({ type: 'exec/end' });
  }
});
