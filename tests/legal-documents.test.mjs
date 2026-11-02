import assert from 'node:assert/strict';
import test from 'node:test';
import { legalDocuments, getLegalDocument, getPublishedLegalDocuments, legalContentDigest } from '../lib/content/legal-documents.ts';
import { getEligiblePages } from '../lib/seo/eligible-pages.ts';
import { approvedLegalFixture } from './fixtures/legal-document.mjs';

test('empty legal slots have no publication, links or sitemap eligibility',()=>{
  assert.deepEqual(legalDocuments.map(d=>d.kind),['privacy','terms','cookies']);
  assert.deepEqual(getPublishedLegalDocuments(),[]);
  for(const kind of ['privacy','terms','cookies','unknown']) assert.equal(getLegalDocument(kind),undefined);
  assert.ok(getEligiblePages().every(page=>!['/privacy','/terms','/cookies'].includes(page.path)));
});
test('only complete, justified, version-approved bilingual documents enter eligibility',()=>{
  for(const kind of ['privacy','terms','cookies']) {
    const d=approvedLegalFixture(kind);
    assert.ok(getLegalDocument(kind,[d]));
    assert.ok(getEligiblePages({legal:[d]}).some(page=>page.path===`/${kind}`));
    assert.equal(getLegalDocument(kind,[d,d]),undefined);
  }
  for(const change of [d=>{d.publicationStatus='draft';},d=>{d.applicability='not-required';},d=>{d.justification='';},d=>{d.approval.status='draft';},d=>{d.approval.completeBilingualContent=false;},d=>{delete d.approval.legal;},d=>{d.approval.owner.evidenceReference='';},d=>{d.approval.editorial.reviewedAt='2999-01-01';},d=>{delete d.content.ar;},d=>{d.content.en.sections=[];},d=>{d.content.ar.sections[0].paragraphs=[''];}]) {
    const d=approvedLegalFixture();change(d);
    // Re-sign incomplete text to show digest alone cannot publish a policy.
    if(d.approval)d.approval.contentDigest=legalContentDigest(d);
    assert.equal(getLegalDocument('privacy',[d]),undefined);
  }
  const stale=approvedLegalFixture();stale.content.ar.sections[0].paragraphs.push('تغيير');
  assert.equal(getLegalDocument('privacy',[stale]),undefined);
});
const base=process.env.TEST_BASE_URL;
for(const locale of ['en','ar']) test(`${locale}: unapproved legal routes are real noindex 404s and absent from baseline links`,{skip:!base},async()=>{
  for(const kind of ['privacy','terms','cookies']) {
    const response=await fetch(`${base}/${locale}/${kind}`);assert.equal(response.status,404);
    assert.match(response.headers.get('x-robots-tag'),/noindex/);
    const html=await response.text();
    assert.match(html,/<meta name="robots" content="[^"]*noindex/);
    assert.doesNotMatch(html, /<link\b[^>]*rel="(?:canonical|alternate)"/);
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotMatch(JSON.stringify(JSON.parse(match[1])), /\/(?:en|ar)\/(?:privacy|terms|cookies)(?:["#?]|$)/);
    }
  }
  for(const suffix of ['', '/about','/services','/doctors','/contact']) {
    const response=await fetch(`${base}/${locale}${suffix}`);assert.equal(response.status,200);
    const html=await response.text();assert.doesNotMatch(html, /href="\/(?:en|ar)\/(?:privacy|terms|cookies)"/);
    assert.ok(!html.includes('PRIVATE SYNTHETIC LEGAL REVIEW EVIDENCE'));
    assert.doesNotMatch(html, /<link\b[^>]*rel="(?:canonical|alternate)"/);
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotMatch(JSON.stringify(JSON.parse(match[1])), /\/(?:en|ar)\/(?:privacy|terms|cookies)(?:["#?]|$)/);
    }
  }
  assert.equal((await fetch(`${base}/tests/fixtures/legal-document.mjs`)).status,404);
  const sitemap=await(await fetch(`${base}/sitemap.xml`)).text();assert.ok(!/\/(privacy|terms|cookies)</.test(sitemap));
});
const fixture=process.env.TEST_LEGAL_FIXTURE_URL;
for(const locale of ['en','ar']) test(`${locale}: isolated nonlegal layout renders approved copy, safe links and noindex without internal evidence`,{skip:!fixture},async()=>{
  assert.ok(['localhost','127.0.0.1'].includes(new URL(fixture).hostname));
  const response=await fetch(`${fixture}/${locale}/privacy`);assert.equal(response.status,200);
  assert.match(response.headers.get('x-robots-tag'),/noindex/);
  const html=await response.text();
  assert.match(html, /<meta name="robots" content="noindex, follow"/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes(`href="/${locale==='en'?'ar':'en'}/privacy"`));
  assert.ok(html.includes(`href="/${locale}/privacy"`));
  assert.ok(html.includes(`href="/${locale}/contact"`));
  assert.ok(html.includes('href="mailto:mail@baghdadmedicalcenter.ae"'));
  assert.ok(html.includes('id="legal-section-1"'));
  assert.ok(!html.includes('PRIVATE SYNTHETIC LEGAL REVIEW EVIDENCE'));
  assert.ok(!html.includes('Software layout reviewer'));
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(html.includes(`dir="${locale==='ar'?'rtl':'ltr'}"`));
  for(const kind of ['terms','cookies']) assert.equal((await fetch(`${fixture}/${locale}/${kind}`)).status,404);
});
