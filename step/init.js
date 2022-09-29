import fs from 'fs';
import { logError } from './util.js';

const solutionItems = ['.firebaserc', 'firebase.json', 'public'];

console.log('cleaning up any previous solutions...');

(async () => {
  await logError(() =>
    fs.promises.rename('solution', 'solution_' + Date.now().toString())
  );

  await logError(() => fs.promises.mkdir('solution'));

  for (const item of solutionItems) {
    logError(() => fs.promises.rename(item, `solution/${item}`));
  }
})();
