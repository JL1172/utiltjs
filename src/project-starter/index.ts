import * as readline from 'readline-sync';
import * as fs from 'fs';

export async function main(): Promise<void> {
  try {
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
      projects as Record<string, Record<string, number>[]>
    ).paths.map((n) => n.alias);
    console.log(project_names);
    // need to add handling of names
  } catch (err) {
    console.error('Traced Stack Where Error Arised:');
    console.trace();
    console.error(err);
  }
}

main();
