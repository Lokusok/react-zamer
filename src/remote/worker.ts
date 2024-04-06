type TActionsType = Partial<Record<TWorkerEvents, (...args: any[]) => void>>;

const actions: TActionsType = {
  'exec/do': (code: string) => {
    /*
      По хорошему так не делать.
      Лучшим решением было бы сделать бэк на nodejs и исполнять код
      Через jsdom.

      Но тогда бы мы могли обойтись и без воркера.
    */
    try {
      eval(code);
      self.postMessage({ type: 'exec/end' });
    } catch (e) {
      self.postMessage({ type: 'exec/error' });
    }
  },
};

self.addEventListener('message', ({ data }) => {
  const eventType = data.type as TWorkerEvents;
  const action = actions[eventType];

  if (action) {
    action(data.payload);
  }
});
