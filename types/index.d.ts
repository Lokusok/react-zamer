export {};

declare global {
  type TWorkerEvents = 'exec/start' | 'exec/do' | 'exec/end' | 'exec/error';
}
