import { useEffect, useRef } from 'react';

import CodeEditor from '@src/containers/code-editor';
import { observer } from 'mobx-react-lite';

import executionStore from '@src/store/execution';
import workerService from '@src/worker-service';

import { useToast } from '@chakra-ui/react';

import { TWorkerEvents } from '@src/types';

function App() {
  const timer = useRef<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    workerService.initWorker(new URL('../remote/worker.ts', import.meta.url), {
      onMessage: ({ data }) => {
        console.log('in app:', data);
        const eventType = data.type as TWorkerEvents;

        if (eventType === 'exec/end') {
          executionStore.setIsExecution(false);
          toast({
            title: 'Код успешно выполнился.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!executionStore.isExecution) return;

    if (executionStore.executionTime !== 0) {
      timer.current = window.setTimeout(() => {
        // Где-то отменили выполнение
        if (!executionStore.isExecution) return;

        executionStore.setIsExecution(false);
        workerService.reInit();
        toast({
          title: 'Код выполнялся слишком долго.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }, executionStore.executionTime * 1000);
    }

    workerService.sendMessage('exec/do', executionStore.code);
  }, [executionStore.isExecution]);

  return <CodeEditor />;
}

export default observer(App);
