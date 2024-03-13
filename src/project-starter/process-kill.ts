import { exec } from 'child_process';
import * as util from 'util';
import { zenityCommand } from './error-message';

const execPromise = util.promisify(exec);

export const kill_processes = async (port: number) => {
  try {
    const { stderr, stdout } = await execPromise(`lsof -ti :${port}`);
    if (!stderr) {
      console.log(`PID :${stdout} on Port ${port} found.`);
      const { stderr: processStderr } = await execPromise(
        `kill ${stdout.trim()}`,
      );
      if (processStderr) {
        zenityCommand('null', stderr);
      } else {
        console.log(
          `PID: ${stdout.trim()} Successfully Terminated At Port ${port}.`,
        );
      }
    }
  } catch (err) {
    console.error(`Nothing On Port ${port}.`);
  }
};
