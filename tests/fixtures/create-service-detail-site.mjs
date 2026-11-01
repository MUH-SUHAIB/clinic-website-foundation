// Build/run this isolated copy for positive route and visual tests. The real
// catalogue remains unapproved. No environment switch can expose fixture data.
// Usage: node tests/fixtures/create-service-detail-site.mjs
import { cp, mkdtemp, readFile, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { approvedDetailFixture } from "./service-detail.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const destination = await mkdtemp(join(tmpdir(), "clinic-service-detail-test-"));
for (const entry of ["app", "components", "hooks", "i18n", "lib", "messages", "public", "styles", "package.json", "next.config.mjs", "next-env.d.ts", "tsconfig.json", "tailwind.config.ts", "postcss.config.js", "proxy.ts"]) {
  await cp(resolve(root, entry), join(destination, entry), { recursive: true });
}
await symlink(resolve(root, "node_modules"), join(destination, "node_modules"), "dir");
const catalogue = join(destination, "lib/content/services.ts");
const source = await readFile(catalogue, "utf8");
await writeFile(catalogue, source.replace(
  "export const clinicServices: readonly ClinicService[] = [",
  `export const clinicServices: readonly ClinicService[] = [\n${JSON.stringify(approvedDetailFixture())},`,
));
console.log(destination);
