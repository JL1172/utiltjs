import { ExecOptions, exec } from 'child_process';
import * as util from 'util';

const execPromise = util.promisify(exec);
const zenityCommand = (filePath: string, err: string) => {
  return `zenity --info --title="Error" --text="There Was An Error Opening Application ${filePath}: ${err}" --width=400 --height=700`;
};
console.log(process.env.PORTFOLIO_PATH);
export async function open_application(command: string, options: ExecOptions) {
  try {
    process.chdir(String(options.cwd));
    setTimeout(() => {
      process.exit(0);
    }, 3000);
    const res = await execPromise(String(command));
    if (res.stderr) {
      throw new Error(String(res.stderr));
    } else {
      console.log('process stdout:', res.stdout);
    }
  } catch (err: unknown) {
    console.log(err);
    const error_command = zenityCommand(String(options.cwd), String(err));
    const { stderr, stdout } = await execPromise(error_command);
    if (stderr) {
      console.error('zenity command failed:', stderr);
    } else {
      console.log('process end stdout:', stdout);
    }
  }
}

open_application('npm run dev', {
  cwd: process.env.PORTFOLIO_PATH,
  env: {},
});
