import { observer } from 'mobx-react-lite';

import { CloseIcon } from '@chakra-ui/icons';
import { ButtonProps, IconButton, Tooltip } from '@chakra-ui/react';

import workerService from '@src/worker-service';
import executionStore from '@src/store/execution';

type TProps = ButtonProps;

function StopExec(props: TProps) {
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
      />
    </Tooltip>
  );
}

export default observer(StopExec);
