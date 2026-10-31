import {test} from 'node:test';import assert from 'node:assert/strict';
import {londonEpoch,departurePlan,due} from '../dist/reminder-rules.mjs';
test('UK summer and winter conversions',()=>{assert.equal(londonEpoch('2026-07-01','10:00'),Date.parse('2026-07-01T09:00Z'));assert.equal(londonEpoch('2026-11-01','10:00'),Date.parse('2026-11-01T10:00Z'));});
test('DST ambiguous and missing times rejected',()=>{assert.equal(londonEpoch('2026-10-25','01:30'),null);assert.equal(londonEpoch('2026-03-29','01:30'),null);});
test('rain moves departure earlier',()=>{const start=Date.parse('2026-11-01T10:00Z');assert.equal(departurePlan(start,35,10,5),Date.parse('2026-11-01T09:10Z'));});
test('snooze, ignore and expired courses suppress alerts',()=>{const args={now:90,start:200,leave:100,lead:1};assert.equal(due(args),true);assert.equal(due({...args,snoozeUntil:95}),false);assert.equal(due({...args,ignored:true}),false);assert.equal(due({...args,now:200}),false);});
