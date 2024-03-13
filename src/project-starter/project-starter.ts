import { ExecOptions, exec } from 'child_process';
import * as util from 'util';
import { zenityCommand } from './error-message';

const execPromise = util.promisify(exec);

export async function open_application(command: string, options: ExecOptions) {
  try {
    process.chdir(String(options.cwd));
    const res = await execPromise(String(command));
    if (res.stderr) {
      throw new Error(String(res.stderr));
    } else {
      console.log('success process [open application] stdout:', res.stdout);
    }
  } catch (err: unknown) {
    const error_command = zenityCommand(String(options.cwd), String(err));
    const { stderr, stdout } = await execPromise(error_command);
    if (stderr) {
      console.error('zenity command failed:', stderr);
    } else {
      console.log('End process [open application] stdout:', stdout);
    }
  }
}
