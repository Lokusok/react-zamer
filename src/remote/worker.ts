self.addEventListener('message', ({ data }) => {
  console.log('in worker:', data);

  if (data.type === 'exec/do') {
    eval(data.payload); // @todo fix it

    self.postMessage({ type: 'exec/end' });
  }
});
