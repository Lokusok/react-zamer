import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import TextareaCodeEditor from '@uiw/react-textarea-code-editor';

import { Box, Button, HStack, Text } from '@chakra-ui/react';

import SliderTime from '../slider-time';

import executionStore from '@src/store/execution';
import StopExec from '../stop-exec';

function CodeEditor() {
  const [isFocused, setIsFocused] = useState(false);

  const handlers = {
    onEditorChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      executionStore.setCode(e.target.value),
    onEditorFocus: () => setIsFocused(true),
    onEditorBlur: () => setIsFocused(false),
    onButtonClick: () => executionStore.setIsExecution(true),
    onDrop: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const file = e.dataTransfer.files.item(0);
      console.log(file);
      if (!file) return;

      const fileReader = new FileReader();
      fileReader.readAsText(file);

      fileReader.onload = () => {
        const code = fileReader.result;
        console.log({ code });
        if (code) executionStore.setCode(code.toString());
      };
      fileReader.onerror = function () {
        console.log('error: ', fileReader.error);
      };
    },
  };

  const options = {
    isButtonDisabled:
      executionStore.isExecution || executionStore.code.length === 0,
  };

  const values = {
    code: executionStore.code,
  };

  return (
    <>
      <Box
        flexGrow={1}
        h={'100%'}
        display={'flex'}
        flexDir={'column'}
        placeContent={'center'}
      >
        <Text textAlign={'center'} fontSize={35} fontWeight={900}>
          Zamer.js
        </Text>
        <Box maxW={'720px'} w={'100%'} mx={'auto'} position={'relative'}>
          <Box
            boxShadow={
              isFocused ? 'rgba(50, 50, 50, 0.35) 0px 0px 35px 10px' : ''
            }
            transition={'box-shadow ease 0.3s'}
            mb={'20px'}
            borderRadius={'6px'}
            overflow={'hidden'}
            onDrop={handlers.onDrop}
          >
            <TextareaCodeEditor
              value={values.code}
              language='js'
              placeholder='Вводить код сюда'
              onChange={handlers.onEditorChange}
              padding={15}
              style={{
                fontSize: 15,
                minHeight: '200px',
                fontFamily: 'monospace',
              }}
              onFocus={handlers.onEditorFocus}
              onBlur={handlers.onEditorBlur}
            />
            <StopExec position={'absolute'} right={-50} top={0} />
          </Box>
          <HStack justifyContent={'space-between'}>
            <Button
              onClick={handlers.onButtonClick}
              isDisabled={options.isButtonDisabled}
              colorScheme='blue'
            >
              Начать выполнение
            </Button>

            <SliderTime width={'265px'} />
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default observer(CodeEditor);