// Generates a temporary loopback-only test copy; never alters real legal slots.
import { cp, mkdtemp, readFile, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { approvedLegalFixture } from './legal-document.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
const destination=await mkdtemp(join(tmpdir(),'clinic-legal-layout-'));
for(const entry of ['app','components','hooks','i18n','lib','messages','public','styles','package.json','next.config.mjs','next-env.d.ts','tsconfig.json','tailwind.config.ts','postcss.config.js','proxy.ts']) await cp(resolve(root,entry),join(destination,entry),{recursive:true});
await symlink(resolve(root,'node_modules'),join(destination,'node_modules'),'dir');
const file=join(destination,'lib/content/legal-documents.ts');
const source=await readFile(file,'utf8');
await writeFile(file,source.replace('{ kind: "privacy", publicationStatus: "draft", applicability: "needs-review", content: {} }',JSON.stringify(approvedLegalFixture())));
console.log(destination);
