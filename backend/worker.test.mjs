import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
const request=path=>new Request('https://example.test'+path);
test('health only reports presence, never secret values',async()=>{const r=await worker.fetch(request('/api/health'),{TFWM_APP_ID:'private-id',TFWM_APP_KEY:'private-key'},{});const s=await r.text();assert.equal(JSON.parse(s).tfwmConfigured,true);assert.ok(!s.includes('private'));});
test('invalid stop IDs cannot escape fixed provider paths',async()=>{const r=await worker.fetch(request('/api/arrivals?stopId=../../foo'),{},{});assert.equal(r.status,400);});
test('missing credentials are explicit',async()=>{const r=await worker.fetch(request('/api/stops?q=Selly'),{},{});assert.equal(r.status,503);});
test('provider errors do not leak credentials',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>{throw new Error('private-key');};try{const r=await worker.fetch(request('/api/stops?q=Selly'),{TFWM_APP_ID:'id',TFWM_APP_KEY:'private-key'},{});assert.equal(r.status,502);assert.ok(!(await r.text()).includes('private-key'));}finally{globalThis.fetch=original;}});
test('station search is normalized',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({matches:[{id:'123',name:'Selly Oak'}]});try{const r=await worker.fetch(request('/api/stops?q=Selly'),{TFWM_APP_ID:'id',TFWM_APP_KEY:'key'},{});assert.equal((await r.json()).items[0].name,'Selly Oak');}finally{globalThis.fetch=original;}});
