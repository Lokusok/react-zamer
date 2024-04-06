import { useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { useToast } from '@chakra-ui/react';

import executionStore from '@src/store/execution';

import CodeEditor from '@src/containers/code-editor';
import workerService from '@src/worker-service';

import ExecutionWorker from '../remote/worker?worker&url';

function App() {
  const timer = useRef<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    workerService.initWorker(ExecutionWorker, {
      onMessage: ({ data }) => {
        const eventType = data.type as TWorkerEvents;

        // Завершающие события - имеют одинаковую начальную логику
        if (['exec/end', 'exec/error'].includes(eventType)) {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
          executionStore.setIsExecution(false);

          if (eventType === 'exec/end') {
            toast({
              title: 'Код успешно выполнился.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } else if (eventType === 'exec/error') {
            toast({
              position: 'top',
              title: 'Синтаксическая ошибка в коде.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
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
