import * as readline from 'readline-sync';
import * as fs from 'fs';
import { kill_processes } from './process-kill';
import { open_application } from './project-starter';

export async function main(): Promise<void> {
  try {
    console.log('Initiating Kill Port Process.');
    const ports: number[] = [5173, 3000, 8005];
    for (const port of ports) {
      await kill_processes(port);
    }
    console.log('Concluded Kill Port Process.');
    const jsonFilePath = '../resources/project-starter.json';
    const projects = await new Promise((resolve, reject) =>
      fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
        if (err) {
          reject(
            `Error Reading Json File For Project Paths, Ensure Proper Configuration: ${err}`,
          );
        } else {
          resolve(JSON.parse(data));
        }
      }),
    );
    const project_names = (
      projects as Record<string, Record<string, string>[]>
    ).paths.map((n) => n.alias);
    const response = readline.keyInSelect(
      project_names,
      'What Project Do You Want To Start',
    );
    const yOrNo = readline.keyInYN(
      'Is This For Development? (If Yes VSCode Will Open)',
    );
    const filter = project_names.filter((n, i) => i === response);
    const select_project = (
      projects as Record<string, Record<string, string>[]>
    ).paths.find((n) => n.alias === filter[0]);
    // just found out i didnt get the position and need to get better at leetcode problems, gonna put this project on hold the last place i left off is grabbing the specific project that was selected, now it need to go to the command level
    // if (yOrNo) {
    //   // await open_application();
    // } else {
    // }
    // console.log(select_project);
  } catch (err) {
    console.error('Traced Stack Where Error Arised:');
    console.trace();
    console.error(err);
  }
}

main();
