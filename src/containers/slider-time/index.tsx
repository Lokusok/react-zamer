import { observer } from 'mobx-react-lite';

import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

import { useStore } from '@src/store';

type TProps = {
  width: number | string;
};

function SliderTime(props: TProps) {
  const { executionStore } = useStore();

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  const handlers = {
    onChange: (val: number) => {
      executionStore.setExecutionTime(val);
    },
  };

  const values = {
    sliderValue: executionStore.executionTime,
    sliderValueMark:
      executionStore.executionTime === 0
        ? '∞'
        : executionStore.executionTime + 'с.',
  };

  return (
    <Box w={props.width} p={4} pt={6}>
      <Slider
        value={values.sliderValue}
        onChange={handlers.onChange}
        min={0}
        max={100}
        isDisabled={executionStore.isExecution}
      >
        <SliderMark value={25} {...labelStyles}>
          25
        </SliderMark>
        <SliderMark value={50} {...labelStyles}>
          50
        </SliderMark>
        <SliderMark value={75} {...labelStyles}>
          75
        </SliderMark>
        <SliderMark
          value={values.sliderValue}
          textAlign='center'
          bg='blue.500'
          color='white'
          mt='-10'
          ml='-5'
          w='12'
        >
          {values.sliderValueMark}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}

export default observer(SliderTime);
