import { exec as execRaw } from 'child_process';
import util from 'util';

const exec = util.promisify(execRaw);

console.log('Cloning the image capture app from the MDN repositor on Github');

(async () => {
  await exec('git clone https://github.com/mdn/samples-server.git temp');
  await exec('cp -r temp/s//webrtc-capturestill/ public/');
  await exec('rm -rf temp');
})();
