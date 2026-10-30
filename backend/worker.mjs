let diagnosticUsed=false;
const ORIGINS=new Set(['https://dawsen1208.github.io','https://greengo-uob-commute.dawsen1208.workers.dev']);
export default {
 async fetch(request,env,ctx){
  const url=new URL(request.url),origin=request.headers.get('Origin');
  if(!url.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
  const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Vary':'Origin'};
  if(origin&&ORIGINS.has(origin))headers['Access-Control-Allow-Origin']=origin;
  const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers});
  if(origin&&!ORIGINS.has(origin))return reply({error:'origin_not_allowed'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, OPTIONS'}});
  if(request.method!=='GET')return reply({error:'method_not_allowed'},405);
  const configured=Boolean(env.TFWM_APP_ID&&env.TFWM_APP_KEY);
  if(url.pathname==='/api/health')return reply({ok:true,tfwmConfigured:configured,version:'http-diagnostic-v2'});
  let upstreamPath;
  if(url.pathname==='/api/stops'){
   const q=(url.searchParams.get('q')||'').trim();
   if(q.length<2||q.length>80||! /^[\p{L}\p{N} .,'()-]+$/u.test(q))return reply({error:'invalid_query'},400);
   upstreamPath='/StopPoint/Search/'+encodeURIComponent(q);
  }else if(url.pathname==='/api/arrivals'){
   const stop=url.searchParams.get('stopId')||'';
   if(!/^[a-zA-Z0-9_-]{3,64}$/.test(stop))return reply({error:'invalid_stop_id'},400);
   upstreamPath='/StopPoint/'+encodeURIComponent(stop)+'/Arrivals';
  }else return reply({error:'not_found'},404);
  if(!configured)return reply({error:'credentials_not_configured'},503);
  const cacheKey=new Request('https://greengo-cache.invalid'+upstreamPath),cache=globalThis.caches?.default;
  const cached=await cache?.match(cacheKey);if(cached)return reply(await cached.json());
  const diagnostic=url.searchParams.get('diagnostic')==='http-once' && url.pathname==='/api/stops' && url.searchParams.get('q')==='Selly Oak';
  if(diagnostic&&(diagnosticUsed||Date.now()>1793359700185))return reply({error:'diagnostic_expired_or_used'},409);
  if(diagnostic)diagnosticUsed=true;
  const target=new URL(upstreamPath,diagnostic?'http://api.tfwm.org.uk':'https://api.tfwm.org.uk');
  target.searchParams.set('app_id',env.TFWM_APP_ID);target.searchParams.set('app_key',env.TFWM_APP_KEY);target.searchParams.set('formatter','json');
  if(url.pathname==='/api/stops')target.searchParams.set('maxResults','15');
  try{
   const response=await fetch(target,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(10000),redirect:'error'});
   if(!response.ok)return reply({error:response.status===401||response.status===403?'provider_auth_failed':'provider_unavailable',providerStatus:response.status},502);
   const raw=await response.json();
   const candidates=Array.isArray(raw)?raw:raw.matches??raw.stopPoints??raw.arrivals;
   if(!Array.isArray(candidates))return reply({error:'unexpected_provider_response'},502);
   const clean=v=>String(v??'').slice(0,200);
   const items=url.pathname==='/api/stops'?candidates.slice(0,15).map(s=>({id:clean(s.id??s.naptanId),name:clean(s.name??s.commonName),lat:s.lat??null,lon:s.lon??null})).filter(s=>s.id):candidates.slice(0,40).map(a=>({line:clean(a.lineName??a.lineId),destination:clean(a.destinationName??a.towards),expectedArrival:clean(a.expectedArrival),timeToStation:Number.isFinite(a.timeToStation)?a.timeToStation:null}));
   const body={source:'TfWM',fetchedAt:new Date().toISOString(),items};
   if(cache)ctx.waitUntil(cache.put(cacheKey,new Response(JSON.stringify(body),{headers:{'Cache-Control':`public, max-age=${url.pathname==='/api/stops'?300:30}`}})));
   return reply(body);
  }catch{return reply({error:'provider_unavailable'},502);}
 }
};
