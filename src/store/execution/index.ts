import { makeAutoObservable } from 'mobx';

const defaultCode = `function fibonacci(n) {
  if (n <= 1) {
      return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(10);`;

class ExecutionStore {
  isExecution: boolean = false;
  executionTime: number = 10;
  code: string = defaultCode;

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

const executionStore = new ExecutionStore();

export default executionStore;
