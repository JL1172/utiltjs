import { killPortProcess } from 'kill-port-process';

export const kill_processes = (): void => {
  killPortProcess(5173);
};
