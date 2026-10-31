export function londonEpoch(day,time){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!/^\d{2}:\d{2}$/.test(time))return null;
 const base=Date.parse(day+'T'+time+':00Z');if(!Number.isFinite(base))return null;
 const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 const matches=[];for(let offset=-120;offset<=120;offset+=60){const epoch=base+offset*60000,p=Object.fromEntries(fmt.formatToParts(epoch).map(x=>[x.type,x.value]));if(`${p.year}-${p.month}-${p.day}`===day&&`${p.hour}:${p.minute}`===time)matches.push(epoch);}
 return matches.length===1?matches[0]:null; // Reject missing/ambiguous DST wall times.
}
export function departurePlan(start,duration,arrivalBuffer,rainBuffer=0){
 if(!Number.isFinite(start)||![duration,arrivalBuffer,rainBuffer].every(v=>Number.isFinite(v)&&v>=0)||duration===0)return null;
 return start-(duration+arrivalBuffer+rainBuffer)*60000;
}
export function due({now,start,leave,lead=5,snoozeUntil=0,ignored=false}){return !ignored&&now<start&&now>=snoozeUntil&&now>=leave-lead*60000;}
