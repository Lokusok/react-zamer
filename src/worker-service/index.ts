import { TWorkerEvents } from '@src/types';
import { TOptions } from './types';

class WorkerService {
  worker: Worker | null = null;
  options: TOptions | null | void = null;
  path: string | URL | null = null;

  /**
   * Инициализация воркера
   */
  initWorker(path: string | URL, options: TOptions) {
    this.worker = new Worker(path, { type: 'module' });
    this.worker.postMessage({ type: 'exec/start' });

    this.path = path;
    this.options = options;

    this.worker.addEventListener('message', options?.onMessage);
  }

  /**
   * Отослать событие воркеру
   */
  sendMessage(event: TWorkerEvents, payload?: any) {
    if (!this.worker) return;

    this.worker.postMessage({ type: event, payload });
  }

  /**
   * Остановить выполнение воркера
   */
  terminate() {
    this.worker?.terminate();
  }

  /**
   * Переинициализация
   */
  reInit() {
    if (this.path && this.options) {
      this.terminate();
      this.initWorker(this.path, this.options);
    }
  }

  /**
   * Уничтожение воркера
   */
  removeActiveWorker() {
    if (this.worker) {
      this.worker.terminate();

      this.worker = null;
      this.options = null;
    }
  }
}

const workerService = new WorkerService();

export default workerService;
