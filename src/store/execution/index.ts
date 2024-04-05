import { makeAutoObservable, spy } from 'mobx';

class ExecutionStore {
  isExecution: boolean = false;
  executionTime: number = 10;
  code: string = 'function add(a, b) {\n  return a + b;\n}';

  constructor() {
    makeAutoObservable(this);
  }

  setIsExecution(valIsExecution: boolean) {
    this.isExecution = valIsExecution;
  }

  setExecutionTime(valExecutionTime: number) {
    this.executionTime = valExecutionTime;
  }

  setCode(valCode: string) {
    this.code = valCode;
  }
}

spy((event) => {
  if (event.type === 'action') {
    console.log(`${event.name} with args: ${event.arguments}`);
  }
});

const executionStore = new ExecutionStore();

export default executionStore;
