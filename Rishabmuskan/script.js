const $=id=>document.getElementById(id);const audio=$('song');let playing=false;function setMusic(on){playing=on;$('music').querySelector('span').textContent=on?'Pause':'Play'}$('music').onclick=async()=>{if(playing){audio.pause();setMusic(false)}else{try{await audio.play();setMusic(true)}catch(e){setMusic(false)}}};audio.addEventListener('ended',()=>setMusic(false));$('open').onclick=()=>{const el=$('entrance');if(el.classList.contains('opening'))return;el.classList.add('opening');audio.play().then(()=>setMusic(true)).catch(()=>{});setTimeout(()=>{el.classList.add('gone');setTimeout(()=>el.remove(),800)},2250)};

const canvas=$('scratch'),ctx=canvas.getContext('2d');let down=false,revealed=false,marks=0;function paint(){const r=canvas.getBoundingClientRect(),d=window.devicePixelRatio||1;canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);ctx.setTransform(d,0,0,d,0,0);let g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,'#f9df85');g.addColorStop(.48,'#e5b84a');g.addColorStop(1,'#f6d879');ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle='#fff9d9';ctx.textAlign='center';ctx.font='18px Georgia';ctx.fillText('✧ Scratch to reveal ✧',r.width/2,r.height/2+6)}paint();function scratch(e){if(!down||revealed)return;const r=canvas.getBoundingClientRect();ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(e.clientX-r.left,e.clientY-r.top,26,0,Math.PI*2);ctx.fill();if(++marks>45)reveal()}canvas.addEventListener('pointerdown',e=>{down=true;canvas.setPointerCapture(e.pointerId);scratch(e)});canvas.addEventListener('pointermove',scratch);canvas.addEventListener('pointerup',()=>down=false);canvas.addEventListener('pointercancel',()=>down=false);$('scratchBtn').onclick=reveal;
function burst(){const root=$('confetti');for(let i=0;i<140;i++){const x=document.createElement('i');x.style.left=Math.random()*100+'%';x.style.background=['#d7a444','#d72e73','#f7b8c9','#fff1b0'][i%4];x.style.animationDelay=Math.random()*.9+'s';x.style.animationDuration=(2+Math.random()*2)+'s';root.appendChild(x);setTimeout(()=>x.remove(),5000)}}function reveal(){if(revealed)return;revealed=true;canvas.style.transition='opacity .6s';canvas.style.opacity=0;$('scratchBtn').disabled=true;setTimeout(()=>canvas.remove(),650);burst();setTimeout(()=>{$('popup').classList.add('show');$('popup').setAttribute('aria-hidden','false')},850)}function close(){ $('popup').classList.remove('show');$('popup').setAttribute('aria-hidden','true')} $('close').onclick=close;$('explore').onclick=()=>{close();$('families').scrollIntoView({behavior:'smooth'})};
// Events transcribed from the supplied wedding itinerary PDF (2026).
// Google Maps short links supplied by the family. Open links in a new tab.
const maps={
 residence:'https://maps.app.goo.gl/ohtWrsPg4vf21Dx69?g_st=ac',
 kalpataru:'https://maps.app.goo.gl/JPwVoQYdVoGn8cnr9',
 ss:'https://maps.app.goo.gl/ADAPAavKdo5unWiM7',
 vyasta:'https://maps.app.goo.gl/NRryXtDTAHdGd9dR7'
};
const itinerary=[
 {title:'Biyahaat',date:'2026-11-26',time:'11:01 AM onwards',venue:'Residence',address:'Villa 107, Sunrise Valley Villas',map:'residence',image:'Biyahaat.png'},
 {title:'Bhajan',date:'2026-11-28',time:'8:01 PM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'Shyam-Baba.png'},
 {title:'Mehandi',date:'2026-11-29',time:'11:01 AM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'sangeet.png'},
 {title:'Dholak Ke Geet',date:'2026-11-29',time:'7:01 PM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'Dholak-Ke-Geet.png'},
 {title:'Bhaat',date:'2026-11-30',time:'6:01 PM onwards',venue:'SS Convention',address:'Shamshabad, Hyderabad',map:'ss',image:'Bhaat.png'},
 {title:'Sagai',date:'2026-11-30',time:'7:31 PM onwards',venue:'SS Convention',address:'Shamshabad, Hyderabad',map:'ss',image:'sagai.png'},
 {title:'Haldi Carnival',date:'2026-12-01',time:'10:31 AM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'haldi.png'},
 {title:'Musical Program',date:'2026-12-01',time:'8:31 PM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'Indian-Musical.png'},
 {title:'Nikasi',date:'2026-12-02',time:'4:31 PM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'Ornate-Indian-Nikasi.png'},
 {title:'Wedding & Reception',date:'2026-12-02',time:'9:01 PM onwards',venue:'Vyasta Conventions',address:'Hyderabad',map:'vyasta',image:'Shaadi&Reception.png'},
 {title:'Check Out',date:'2026-12-03',time:'8:31 AM onwards',venue:'Kalpataru Convention',address:'Gaganpahad, Shamshabad, Hyderabad',map:'kalpataru',image:'palace.png'}
];
function safeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const calendar='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></svg>';
const pin='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>';
function formatDate(iso){return new Date(iso+'T12:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',weekday:'long'}).replace(/^(\w+), (.*)$/,'$2 · $1')}
$('events').innerHTML=itinerary.map(e=>`<article class="event"><img src="assets/${encodeURIComponent(e.image)}" alt="${safeText(e.title)} illustration" loading="lazy"><h4>${safeText(e.title)}</h4><p class="event-time">${safeText(e.time)}</p><div class="event-meta"><span class="meta-date">${calendar}${safeText(formatDate(e.date))}</span><a class="map-icon" href="${maps[e.map]}" target="_blank" rel="noopener noreferrer" aria-label="Open ${safeText(e.venue)} in Google Maps">${pin} Map</a></div><p class="event-venue">${safeText(e.venue)}<small>${safeText(e.address)}</small></p></article>`).join('');

// Physical page turn: next photo stays underneath the turning sheet.
(()=>{
 const images=['assets/gallery-1.webp','assets/gallery-2.webp','assets/gallery-3.webp'];
 const alts=['Rishab and Muskan on a balcony','Rishab and Muskan at an illuminated wedding pavilion','Rishab and Muskan at a heritage venue'];
 const book=document.querySelector('.gallery-book'),frame=document.querySelector('.gallery-photo-frame');
 const dots=[...document.querySelectorAll('.gallery-dots button')],lightbox=document.getElementById('gallery-lightbox'),full=document.getElementById('gallery-full');
 if(!book||!frame)return;
 const cover=frame.querySelector('.gallery-cover').outerHTML;
 const markup=i=>i===0?cover:`<img src="${images[i-1]}" alt="${alts[i-1]}" draggable="false">`;
 images.forEach(src=>{const img=new Image();img.src=src});
 frame.innerHTML='<div class="physical-base"></div><div class="physical-turn" aria-hidden="true"><div class="physical-front"></div><div class="physical-back"></div></div>';
 const base=frame.querySelector('.physical-base'),sheet=frame.querySelector('.physical-turn'),front=frame.querySelector('.physical-front'),back=frame.querySelector('.physical-back');
 let index=0,busy=false,queued=null;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const updateDots=()=>dots.forEach((d,i)=>{d.classList.toggle('active',i===index);if(i===index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current')});
 function render(i){index=i;base.innerHTML=markup(i);sheet.classList.remove('active','reverse');sheet.style.transform='';front.innerHTML='';back.innerHTML='';updateDots()}
 function show(i){i=Math.max(0,Math.min(images.length,i));if(busy){queued=i;return}if(i===index)return;
  if(reduced.matches){render(i);return}
  busy=true;const forward=i>index;
  // Keep a complete next page under the animated current page; never replace a photo at the midpoint.
  base.innerHTML=markup(i);front.innerHTML=markup(index);back.innerHTML=markup(i);
  sheet.classList.toggle('reverse',!forward);sheet.classList.add('active');
  sheet.style.transform=forward?'rotateY(0deg)':'rotateY(0deg)';
  const anim=sheet.animate([
   {transform:'rotateY(0deg)',filter:'brightness(1)'},
   {transform:`rotateY(${forward?-88:88}deg)`,filter:'brightness(.53)',offset:.53},
   {transform:`rotateY(${forward?-180:180}deg)`,filter:'brightness(.88)'}
  ],{duration:1050,easing:'cubic-bezier(.32,.05,.18,1)',fill:'forwards'});
  anim.onfinish=()=>{anim.cancel();render(i);busy=false;if(queued!==null){const n=queued;queued=null;show(n)}};
  anim.oncancel=()=>{if(busy){render(i);busy=false}};
 }
 render(0);
 document.querySelector('.gallery-prev').addEventListener('click',()=>show(index-1));
 document.querySelector('.gallery-next').addEventListener('click',()=>show(index+1));
 dots.forEach((d,i)=>d.addEventListener('click',()=>show(i)));
 function openLightbox(){if(busy)return;if(index===0){show(1);return}full.src=images[index-1];full.alt=alts[index-1];lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
 function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow=''}
 book.addEventListener('click',openLightbox);
 book.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}else if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}else if(e.key==='Enter')openLightbox()});
 document.querySelector('.gallery-lightbox-close').addEventListener('click',closeLightbox);
 function lightMove(dir){const next=Math.max(1,Math.min(images.length,index+dir));if(next===index)return;render(next);full.src=images[next-1];full.alt=alts[next-1]}
 document.querySelector('.gallery-lightbox-prev').addEventListener('click',()=>lightMove(-1));document.querySelector('.gallery-lightbox-next').addEventListener('click',()=>lightMove(1));
 lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open'))closeLightbox();else if(lightbox.classList.contains('open')&&e.key==='ArrowLeft')lightMove(-1);else if(lightbox.classList.contains('open')&&e.key==='ArrowRight')lightMove(1)});
 let startX=0;book.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});book.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>40){e.preventDefault();show(index+(dx<0?1:-1))}},{passive:false});
})();;
