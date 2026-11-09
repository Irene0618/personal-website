import { readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(resolve(root,'media-manifest.json'),'utf8'));
const gh = args => new Promise((ok,fail) => {
  const child = spawn('gh',args,{cwd:root,windowsHide:true});
  let output='',error='';
  child.stdout.on('data',data=>output+=data);
  child.stderr.on('data',data=>error+=data);
  child.on('error',fail);
  child.on('close',code=>code===0?ok(output):fail(new Error(error||`gh exited ${code}`)));
});
const getAssets = async () => JSON.parse(await gh(['api',`repos/${manifest.repository}/releases/tags/${manifest.tag}`])).assets;
const verify = (file,asset) => {
  if (!asset || asset.state!=='uploaded' || asset.size!==file.size || asset.digest!==`sha256:${file.sha256}`) throw new Error(`Missing or mismatched release video: ${file.asset}`);
};
const current = await getAssets();
const queue = [];
for (const [path,file] of Object.entries(manifest.files)) {
  const existing=current.find(asset=>asset.name===file.asset);
  if (existing) verify(file,existing);
  else queue.push({path,file});
}
if (process.argv.includes('--verify')) {
  if (queue.length) throw new Error(`${queue.length} videos have not been uploaded`);
} else {
  await Promise.all(Array.from({length:2},async()=>{
    while (queue.length) {
      const {path,file}=queue.shift();
      const local=resolve(root,'public/portfolio',path);
      const hash=createHash('sha256');
      for await (const chunk of createReadStream(local)) hash.update(chunk);
      if (hash.digest('hex')!==file.sha256) throw new Error(`Local video changed: ${path}`);
      console.log(`Uploading ${file.asset} (${Math.round(file.size/1048576)} MiB)`);
      await gh(['release','upload',manifest.tag,local,'--repo',manifest.repository]);
      console.log(`Uploaded ${file.asset}`);
    }
  }));
}
const uploaded=await getAssets();
for (const file of Object.values(manifest.files)) verify(file,uploaded.find(asset=>asset.name===file.asset));
console.log(`Verified ${Object.keys(manifest.files).length} videos, including their SHA-256 hashes.`);
