import assert from 'node:assert/strict';
import test from 'node:test';
import { readdir } from 'node:fs/promises';
import { legacyUrlPlan, classifyLegacyPath, legacyResponse } from '../lib/routing/legacy-urls.ts';

const request = (path, host = 'baghdadmedicalcenter.ae', method = 'GET') => new Request(`http://localhost${path}`, { method, headers: { host } });
const eligibleDestinations = ['/ar', '/ar/contact', '/en/contact'];
const options = { cutoverApproved: true, eligibleDestinations };
const approved = (path) => [{ ...classifyLegacyPath(path), approval: 'approved' }];

test('audited paths are unique, explicitly pending, and distinguish retired/proposed/unknown', () => {
  const paths = legacyUrlPlan.flatMap(rule => rule.paths);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(legacyUrlPlan.every(rule => rule.approval === 'pending'));
  assert.equal(classifyLegacyPath('/page/baghd-medical').disposition, 'replacement-proposed');
  assert.equal(classifyLegacyPath('/page/safaa-medical/').disposition, 'permanently-retired');
  assert.equal(classifyLegacyPath('/page/privacy-policy').disposition, 'decision-needed');
  for (const path of ['/unknown', '/dashboard/new', '/en', '/ar/contact', '/sitemap.xml', '/robots.txt', '/en/doctors/safaa']) assert.equal(classifyLegacyPath(path), undefined);
  for (const path of paths) assert.equal(legacyResponse(request(path), options), undefined);
});

test('isolated exact approvals produce direct 308s for both slash aliases, without locale detection or queries', () => {
  const rules = approved('/page/baghd-medical');
  for (const path of ['/page/baghd-medical', '/page/baghd-medical/']) {
    for (const method of ['GET', 'HEAD']) {
      const response = legacyResponse(request(`${path}?next=https://example.com`, undefined, method), { ...options, rules });
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), 'https://baghdadmedicalcenter.ae/ar/contact');
      assert.match(response.headers.get('cache-control'), /no-store/);
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
    }
  }
  // A synthetic English mapping stays English, independent of visitor language.
  const english = [{ paths: ['/en/old-contact'], disposition: 'replacement-proposed', approval: 'approved', action: {kind:'redirect',status:308,destination:'/en/contact'} }];
  assert.equal(legacyResponse(request('/en/old-contact'), {...options,rules:english}).headers.get('location'), 'https://baghdadmedicalcenter.ae/en/contact');
});

test('retirement approvals yield real 410 without a homepage Location or blanket ERP matching', () => {
  for (const path of ['/page/safaa-medical', '/dashboard', '/dashboard/login', '/dashboard/password-reset']) {
    const rules = approved(path);
    for (const alias of rules[0].paths) {
      const response = legacyResponse(request(`${alias}?next=/dashboard/`), {...options,rules});
      assert.equal(response.status,410); assert.equal(response.headers.get('location'),null);
    }
    assert.equal(legacyResponse(request(`${path}/unknown`), {...options,rules}),undefined);
  }
});

test('cutover, host, available destination, method, conflicts and approval revocation fail closed', () => {
  const path='/page/baghd-medical', rules=approved(path);
  for (const host of ['localhost','clinic-website-foundation.vercel.app','preview.vercel.app','www.baghdadmedicalcenter.ae','baghdadmedicalcenter.ae.evil']) assert.equal(legacyResponse(request(path,host), {...options,rules}),undefined);
  assert.equal(legacyResponse(request(path),{...options,rules,cutoverApproved:false}),undefined);
  assert.equal(legacyResponse(request(path),{...options,rules,eligibleDestinations:[]}),undefined);
  assert.equal(legacyResponse(request(path,undefined,'POST'),{...options,rules}),undefined);
  assert.equal(legacyResponse(request(path),{...options,rules:[...rules,...rules]}),undefined);
  rules[0].approval='pending';
  assert.equal(legacyResponse(request(path),{...options,rules}),undefined);
  assert.equal(legacyResponse(request('/'),options),undefined);
  for(const destination of ['//evil.com','/ar/contact?next=evil','/ar/contact#x','/ar/../en','/ar/contact/','/page/baghd-medical']) {
    const unsafe=approved(path);unsafe[0].action.destination=destination;
    assert.equal(legacyResponse(request(path),{...options,rules:unsafe,eligibleDestinations:[destination]}),undefined);
  }
});

const base=process.env.TEST_BASE_URL;
test('demo build has no active proposed redirect or retirement, including dotted and slash variants', {skip:!base}, async()=>{
  for(const path of legacyUrlPlan.flatMap(rule=>rule.paths).filter(path=>path!=='/')){
    const response=await fetch(new URL(path,base),{redirect:'manual'});
    // Existing Next/locale normalization may redirect; it must never apply a planned action.
    assert.notEqual(response.status,410,path);
    const target=response.headers.get('location');
    assert.ok(!target || !['/ar','/ar/contact','/en/contact'].includes(new URL(target,base).pathname),path);
    if(target) assert.equal(new URL(target,base).origin,new URL(base).origin,path);
    const final=await fetch(new URL(path,base));
    assert.equal(final.status,404,path);
    assert.match(final.headers.get('x-robots-tag'),/noindex/,path);
  }
  const root=await fetch(new URL('/',base),{redirect:'manual',headers:{'Accept-Language':'en'}});
  assert.ok([307,308].includes(root.status));
  assert.equal(new URL(root.headers.get('location'),base).pathname,'/en');
});

test('unknown legacy HTML paths return 404 rather than a server error', {skip:!base}, async()=>{
  for(const path of ['/page/unknown.html', '/dashboard/unknown.html', '/unknown-legacy.html', '/missing.css', '/missing.png', '/missing.json', '/unknown', '/en/missing.html', '/_next/missing.js']) {
    const response=await fetch(new URL(path,base));
    assert.equal(response.status,404,path);
    assert.match(await response.text(), /<meta name="robots" content="[^"]*noindex/, path);
  }
});


test('public assets and referenced Next image/JS/CSS/font resources bypass legacy handling', {skip:!base}, async()=>{
  async function publicFiles(directory, prefix='') {
    const paths=[];
    for(const entry of await readdir(directory,{withFileTypes:true})) {
      if(entry.name.startsWith('.')) continue; // Next does not serve OS metadata.
      const path=`${prefix}/${entry.name}`;
      if(entry.isDirectory()) paths.push(...await publicFiles(new URL(`${entry.name}/`,directory),path));
      else paths.push(path);
    }
    return paths;
  }
  const paths=await publicFiles(new URL('../public/',import.meta.url));
  const html=await (await fetch(new URL('/en',base))).text();
  const resources=[...new Set([...html.matchAll(/(?:src|href)="([^"<>]*\/_next\/[^"<>]+)"/g)].map(match=>match[1].replaceAll('&amp;','&')))];
  assert.ok(paths.length && resources.length);
  for(const path of [...paths,...resources]) {
    const response=await fetch(new URL(path,base),{redirect:'manual'});
    assert.equal(response.status,200,path);
    assert.equal(response.headers.get('location'),null,path);
  }
});
