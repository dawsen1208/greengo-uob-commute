const start=Date.UTC(2026,8,28),weekMs=7*86400000;
export function academicWeek(day){return Math.max(0,Math.floor((Date.parse(day+'T00:00:00Z')-start)/weekMs)+1);}
export function weekRange(week){if(week<1)return null;const first=start+(week-1)*weekMs;return [new Date(first).toISOString().slice(0,10),new Date(first+6*86400000).toISOString().slice(0,10)];}
