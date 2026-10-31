(()=>{
 const en=document.documentElement.lang==='en',t=(zh,enText)=>en?enText:zh,$=id=>document.getElementById(id);
 function init(){
 const form=$('commute');if(!form||!document.querySelector('.gg-app'))return false;
 const grid=form.parentElement;grid.classList.add('travel-workspace');form.classList.add('travel-inputs');const result=$('advice').parentElement;result.classList.add('travel-results');
 const fields=document.createElement('div');fields.className='travel-fields';
 const move=id=>{const label=$(id)?.closest('label');if(label)fields.append(label);};
 const extra=document.createElement('details');extra.className='travel-extra';const summary=document.createElement('summary');summary.textContent=t('更多偏好与演示设置','More preferences & demo settings');extra.append(summary);
 const notes=document.createElement('details');notes.className='travel-notes';const ns=document.createElement('summary');ns.textContent=t('地点与入口说明','Location & entrance notes');notes.append(ns);
 Array.from(form.children).filter(el=>el.tagName==='P'&&!el.classList.contains('eyebrow')).forEach(el=>notes.append(el));
 const service=form.querySelector('details'); // Existing editable service scenarios.
 ['area','building','commuteDate','classStart','preference'].forEach(move);
 const sky=$('sky').closest('label'),accessible=$('accessible').closest('label');extra.append(sky,accessible);if(service)extra.append(service);extra.append(notes);
 form.querySelector('.two-col')?.remove();const submit=form.querySelector('button[type=submit],button.primary');form.insertBefore(fields,submit);form.insertBefore(extra,submit);
 const tag=document.createElement('span');tag.className='travel-demo-tag';tag.textContent=t('模拟方案','SCENARIO PLANNER');form.querySelector('h2').after(tag);
 const routes=$('routes');const heading=document.createElement('div');heading.className='travel-options-heading';heading.innerHTML=`<h3>${t('对比通勤方案','Compare the options')}</h3><span>${t('示例时长 · 非实时班次','Illustrative times · not live services')}</span>`;routes.before(heading);
 const other=document.createElement('details');other.className='travel-more-routes';const os=document.createElement('summary');os.textContent=t('展开其余 4 种方案','View 4 more options');const otherGrid=document.createElement('div');otherGrid.className='travel-secondary-options';other.append(os,otherGrid);routes.after(other);
 function arrange(){otherGrid.replaceChildren();const cards=Array.from(routes.children);cards.forEach((card,i)=>{card.classList.add('travel-option');const b=card.querySelector('b');if(b){const label=document.createElement('span');label.className='travel-option-index';label.textContent=String(i+1).padStart(2,'0');card.prepend(label);}if(i>=2)otherGrid.append(card);});os.textContent=t(`展开其余 ${Math.max(cards.length-2,0)} 种方案`,`View ${Math.max(cards.length-2,0)} more options`);other.hidden=cards.length<=2;}
 function addSelection(){document.querySelectorAll('.travel-option').forEach(card=>{const mode=card.dataset.mode;if(!mode)return;const button=document.createElement('button');button.type='button';button.className='outline';button.textContent=t('选择并衔接校园步行 →','Choose & connect campus walk →');button.disabled=card.dataset.unavailable==='true';button.onclick=()=>{document.querySelectorAll('.travel-option button').forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');window.dispatchEvent(new CustomEvent('greengo:mode-selected',{detail:{mode}}));document.querySelector('#arrivalFlow nav button:nth-child(3)')?.click();};card.append(button);});}
 const observer=new MutationObserver(()=>{observer.disconnect();arrange();addSelection();observer.observe(routes,{childList:true});});
 arrange();addSelection();observer.observe(routes,{childList:true});
 return {routes,arrange};
 }
 function start(){const r=init();if(!r)return false;return true;}
 if(!start()){const wait=new MutationObserver(()=>{if(start())wait.disconnect();});wait.observe(document.body,{childList:true,subtree:true});}
})();
