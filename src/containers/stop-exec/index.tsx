import { observer } from 'mobx-react-lite';

import { CloseIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton, Tooltip } from '@chakra-ui/react';

import workerService from '@src/worker-service';
import { useStore } from '@src/store';

type TProps = ButtonProps;

function StopExec(props: TProps) {
  const { executionStore } = useStore();

  const handlers = {
    onClick: () => {
      workerService.reInit();
      executionStore.setIsExecution(false);
    },
  };

  return (
    <Tooltip label={'Остановить'}>
      <IconButton
        {...props}
        isDisabled={!executionStore.isExecution}
        colorScheme='red'
        aria-label='Прекратить выполнение'
        size='md'
        icon={<CloseIcon />}
        onClick={handlers.onClick}
        data-testid='stop-exec-btn'
      />
    </Tooltip>
  );
}

export default observer(StopExec);
