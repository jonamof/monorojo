/* MONO ROJO LAB — simulaciones locales, sin servicios ni dependencias externas. */
(()=>{
'use strict';
const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>[...root.querySelectorAll(q)];
const names={web:'Sitio web',sales:'Panel de ventas',inventory:'Inventarios',quotes:'Cotizador digital',automation:'Automatización'};
const metadata={
 web:['Concepto / 00','Una web que habla por ti.','Explora un concepto de sitio web con diseño y mensaje claros.'],
 sales:['DEMO INTERACTIVA / 01','Tus ventas, claras.','Crea, modifica y elimina ventas. Los indicadores se actualizan al instante.'],
 inventory:['DEMO INTERACTIVA / 02','Inventario bajo control.','Registra productos, mueve existencias y detecta cantidades bajas.'],
 quotes:['DEMO INTERACTIVA / 03','Cotizaciones en segundos.','Arma una cotización ficticia y observa los cálculos en vivo.'],
 automation:['SIMULACIÓN LOCAL / 04','Menos pasos manuales.','Activa un flujo ficticio y observa cómo avanza cada etapa.']
};
const moneyCents=c=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(c/100);
const money=n=>moneyCents(Math.round(n*100));
function parseMoney(v){if(String(v).trim()==='')return null;const num=Number(v);return Number.isFinite(num)&&num>=0&&num<=100000000?Math.round(num*100):null}
const whole=v=>String(v).trim()===''?null:(Number.isSafeInteger(Number(v))&&Number(v)>=0&&Number(v)<=1000000?Number(v):null);
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function mock(title,contents){return `<div class="demo-frame mock"><div class="mock-top"><i></i><i></i><i></i><span>${escapeHTML(title)} · DATOS FICTICIOS</span></div><div class="demo-content">${contents}</div></div>`;}
const states={sales:Array.from({length:12},(_,i)=>({id:i+1,label:`Venta ${String(i+1).padStart(2,'0')}`,cents:250000})),saleNext:13,
 inventory:[{id:1,name:'Camisetas',qty:18},{id:2,name:'Tazas',qty:4},{id:3,name:'Libretas',qty:9},{id:4,name:'Bolsas',qty:2}],invNext:5,search:'',
 quotes:[{id:1,label:'Sitio informativo',qty:1,cents:450000}],quoteNext:2,vat:16};
let current='web', timers=[], flowId=0;
const menu=$$('.lab-tabs .tab');
function demoAction(){const url=new URL('https://wa.me/523325138810');url.searchParams.set('text',`Hola, estuve explorando la demostración de ${names[current]} en Mono Rojo y me gustaría cotizar una solución similar para mi negocio.`);const a=$('#lab-action');a.href=url.toString();a.setAttribute('aria-label',`Cotizar una solución similar a ${names[current]} por WhatsApp`);}
function switchTo(key,focus=false){
 if(!metadata[key])return;
 timers.forEach(clearTimeout);timers=[];flowId++;
 current=key;
 menu.forEach(t=>{const active=t.dataset.demo===key;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;if(active&&focus)t.focus();});
 const [code,title,desc]=metadata[key];$('#lab-code').textContent=code;$('#lab-title').textContent=title;$('#lab-desc').textContent=desc;
 const tab=$(`#tab-${key}`);$('#lab-preview').setAttribute('aria-labelledby',tab.id);
 const art=$('#lab-art');
 art.innerHTML=key==='web'?webMarkup:key==='sales'?salesLayout():key==='inventory'?inventoryLayout():key==='quotes'?quotesLayout():automationLayout();
 const legend=$('#lab-context');if(legend)legend.textContent=key==='web'?'CONCEPTO VISUAL · SIN DATOS REALES':'DEMO LOCAL · LOS DATOS SE REINICIAN AL RECARGAR';
 demoAction();renderCurrent();
}
const webMarkup=`<div class="mock"><div class="mock-top"><i></i><i></i><i></i><span>CONCEPTO — SITIO WEB</span></div><div class="webmock"><div><div class="mini-label">UNA NUEVA FORMA DE VENDER</div><h4>Hazlo<br>visible.</h4><p>Una buena idea merece una experiencia memorable.</p><span class="concept-button">Conoce más ↗</span></div><div class="product"><div class="circle"></div><div class="corner">↗</div></div></div></div>`;
function salesLayout(){return mock('PANEL DE VENTAS',`<div class="demo-kpis three"><div><small>Ventas</small><strong id="sales-count">12</strong></div><div><small>Importe total</small><strong id="sales-total">$30,000</strong></div><div><small>Promedio</small><strong id="sales-average">$2,500</strong></div></div><div class="demo-chart" id="sales-chart" aria-label="Gráfica de últimas seis ventas"></div><form class="demo-inline" id="sales-new"><label class="demo-label">Importe nueva venta (MXN)<input id="sale-amount" aria-label="Importe de venta" type="number" min="0.01" max="100000000" step="0.01" value="2500" required></label><button class="demo-btn" type="submit">+ AGREGAR</button></form><div class="demo-scroll" id="sales-list" aria-live="off"></div><div class="demo-actions"><button class="demo-secondary" type="button" id="sales-reset">Restablecer demo</button><span id="sales-status" class="demo-feedback" role="status"></span></div>`);}
function renderSales(){
 const list=$('#sales-list');if(!list)return;
 const total=states.sales.reduce((acc,s)=>acc+s.cents,0);
 $('#sales-count').textContent=states.sales.length.toLocaleString('es-MX');$('#sales-total').textContent=moneyCents(total);$('#sales-average').textContent=moneyCents(states.sales.length?Math.round(total/states.sales.length):0);
 list.innerHTML=states.sales.map(s=>`<div class="demo-record" data-sale="${s.id}"><span>${escapeHTML(s.label)}</span><label><span class="sr-only">Importe de ${escapeHTML(s.label)}</span><input class="sale-edit" type="number" min="0.01" max="100000000" step="0.01" value="${(s.cents/100).toFixed(2)}" aria-label="Importe de ${escapeHTML(s.label)}"></label><button type="button" class="demo-delete" data-del-sale="${s.id}" aria-label="Eliminar ${escapeHTML(s.label)}">×</button></div>`).join('')||'<p class="demo-empty">Aún no hay ventas. Agrega la primera.</p>';
 const recent=states.sales.slice(-6),max=Math.max(1,...recent.map(s=>s.cents));
 $('#sales-chart').innerHTML=recent.map(s=>`<div class="chart-col" title="${escapeHTML(s.label)}: ${moneyCents(s.cents)}"><i style="height:${Math.max(3,s.cents/max*100).toFixed(1)}%"></i><small>${escapeHTML(s.label.replace('Venta ',''))}</small></div>`).join('')||'<p class="demo-empty">Sin ventas para graficar</p>';
}
function inventoryLayout(){return mock('CONTROL DE INVENTARIO',`<div class="demo-kpis"><div><small>Productos</small><strong id="inv-products">4</strong></div><div><small>Unidades</small><strong id="inv-units">33</strong></div><div><small>Existencias bajas ≤ 5</small><strong id="inv-low">2</strong></div></div><form id="inv-new" class="demo-inline"><label class="demo-label">Producto<input id="inv-name" maxlength="45" placeholder="Nombre del producto" required></label><label class="demo-label short">Cantidad<input id="inv-qty" type="number" step="1" min="0" max="1000000" value="10" required></label><button type="submit" class="demo-btn">+ AGREGAR</button></form><label class="demo-label search-field">Buscar producto<input id="inv-search" type="search" placeholder="Ej. tazas" autocomplete="off"></label><div id="inv-list" class="demo-scroll"></div><div class="demo-actions"><button type="button" id="inv-reset" class="demo-secondary">Restablecer demo</button><span id="inv-status" class="demo-feedback" role="status"></span></div>`);}
function renderInventory(){const root=$('#inv-list');if(!root)return;const filtered=states.inventory.filter(x=>x.name.toLocaleLowerCase('es').includes(states.search));
 $('#inv-products').textContent=states.inventory.length;$('#inv-units').textContent=states.inventory.reduce((acc,x)=>acc+x.qty,0).toLocaleString('es-MX');$('#inv-low').textContent=states.inventory.filter(x=>x.qty<=5).length;
 root.innerHTML=filtered.map(x=>`<div class="demo-inv-row" data-inv="${x.id}"><div class="inv-name"><strong>${escapeHTML(x.name)}</strong>${x.qty<=5?'<span class="low-alert">BAJO</span>':'<span class="ok-alert">OK</span>'}</div><div class="inv-controls"><button type="button" class="demo-step" data-adjust="-1" aria-label="Salida de una unidad: ${escapeHTML(x.name)}">−</button><label class="sr-only" for="inv-edit-${x.id}">Existencias de ${escapeHTML(x.name)}</label><input id="inv-edit-${x.id}" class="inv-edit" type="number" min="0" max="1000000" step="1" value="${x.qty}"><button type="button" class="demo-step" data-adjust="1" aria-label="Entrada de una unidad: ${escapeHTML(x.name)}">+</button><button type="button" class="demo-delete" data-del-inv="${x.id}" aria-label="Eliminar ${escapeHTML(x.name)}">×</button></div></div>`).join('')||'<p class="demo-empty">No encontramos productos.</p>';
}
const catalog=[['Sitio informativo',450000],['Catálogo digital',320000],['Módulo de inventario',750000],['Panel administrativo',580000]];
function quotesLayout(){return mock('COTIZADOR DIGITAL',`<p class="demo-disclaimer">Precios exclusivamente ficticios para esta simulación; no son cotizaciones comerciales.</p><form id="quotes-new" class="demo-inline"><label class="demo-label">Solución<select id="quote-product">${catalog.map(([label,cents],i)=>`<option value="${i}">${escapeHTML(label)} · ${moneyCents(cents)}</option>`).join('')}</select></label><label class="demo-label short">Cantidad<input id="quote-add-qty" type="number" min="1" max="10000" step="1" value="1" required></label><button type="submit" class="demo-btn">+ AGREGAR</button></form><div class="demo-scroll" id="quotes-list"></div><div class="quote-foot"><label class="demo-label">IVA (%)<input id="quote-tax" type="number" min="0" max="30" step="0.5" value="16"></label><div class="quote-totals"><div><span>Subtotal</span><strong id="quote-subtotal"></strong></div><div><span>IVA</span><strong id="quote-tax-total"></strong></div><div class="final"><span>TOTAL</span><strong id="quote-total"></strong></div></div></div><div class="demo-actions"><button class="demo-secondary" id="quotes-reset" type="button">Restablecer demo</button><span class="demo-feedback" id="quotes-status" role="status"></span></div>`);}
function renderQuotes(){const root=$('#quotes-list');if(!root)return;root.innerHTML=states.quotes.map(x=>`<div class="quote-item" data-quote="${x.id}"><strong>${escapeHTML(x.label)}</strong><label class="demo-label short">Cantidad<input class="quote-edit-qty" type="number" min="1" max="10000" step="1" value="${x.qty}"></label><label class="demo-label">Unitario ($)<input class="quote-edit-price" type="number" min="0" max="100000000" step="0.01" value="${(x.cents/100).toFixed(2)}"></label><span class="quote-item-total">${moneyCents(x.qty*x.cents)}</span><button class="demo-delete" type="button" data-del-quote="${x.id}" aria-label="Quitar ${escapeHTML(x.label)}">×</button></div>`).join('')||'<p class="demo-empty">Selecciona un producto para empezar.</p>';
 renderTotals();}
function renderTotals(){if(!$('#quote-subtotal'))return;const subtotal=states.quotes.reduce((a,x)=>a+x.qty*x.cents,0);const tax=Math.round(subtotal*states.vat/100);$('#quote-subtotal').textContent=moneyCents(subtotal);$('#quote-tax-total').textContent=moneyCents(tax);$('#quote-total').textContent=moneyCents(subtotal+tax);}
function automationLayout(){return mock('FLUJO AUTOMATIZADO',`<p class="demo-disclaimer">Simulación visual: no envía solicitudes ni notificaciones reales.</p><form id="auto-start" class="auto-start"><label class="demo-label">Cliente ficticio<input id="auto-client" maxlength="45" placeholder="Ej. Negocio Demo" required value="Negocio Demo"></label><label class="demo-label">Solicitud<select id="auto-request"><option>Solicitar cotización</option><option>Registrar pedido</option><option>Solicitar atención</option></select></label><button class="demo-btn" type="submit">INICIAR SIMULACIÓN ↗</button></form><ol class="auto-steps" id="auto-steps"><li class="auto-step" data-step="0"><span>01</span><div><strong>SOLICITUD RECIBIDA</strong><small>El cliente completa el formulario</small></div><b>EN ESPERA</b></li><li class="auto-step" data-step="1"><span>02</span><div><strong>REGISTRO GENERADO</strong><small>Se crea un folio ficticio</small></div><b>EN ESPERA</b></li><li class="auto-step" data-step="2"><span>03</span><div><strong>NOTIFICACIÓN PREPARADA</strong><small>Aviso listo, sin envío externo</small></div><b>EN ESPERA</b></li><li class="auto-step" data-step="3"><span>04</span><div><strong>SEGUIMIENTO ACTUALIZADO</strong><small>Solicitud marcada para seguimiento</small></div><b>EN ESPERA</b></li></ol><div id="auto-summary" class="auto-summary" aria-live="polite">Pulsa iniciar para ejecutar el flujo.</div>`);}
function flash(id,message){const e=$('#'+id);if(e)e.textContent=message;}
function resetSales(){states.sales=Array.from({length:12},(_,i)=>({id:i+1,label:`Venta ${String(i+1).padStart(2,'0')}`,cents:250000}));states.saleNext=13;renderSales();}
function resetInventory(){states.inventory=[{id:1,name:'Camisetas',qty:18},{id:2,name:'Tazas',qty:4},{id:3,name:'Libretas',qty:9},{id:4,name:'Bolsas',qty:2}];states.invNext=5;states.search='';$('#inv-search').value='';renderInventory();}
function resetQuotes(){states.quotes=[{id:1,label:'Sitio informativo',qty:1,cents:450000}];states.quoteNext=2;states.vat=16;$('#quote-tax').value='16';renderQuotes();}
function renderCurrent(){if(current==='sales')renderSales();if(current==='inventory')renderInventory();if(current==='quotes')renderQuotes();}
$('#lab-art').addEventListener('submit',e=>{
 const form=e.target;if(!['sales-new','inv-new','quotes-new','auto-start'].includes(form.id))return;e.preventDefault();
 if(form.id==='sales-new'){const cents=parseMoney($('#sale-amount').value);if(cents===null||cents===0){flash('sales-status','Ingresa un importe mayor a cero.');return;}const id=states.saleNext++;states.sales.push({id,label:`Venta ${String(id).padStart(2,'0')}`,cents});renderSales();flash('sales-status','Venta registrada en esta demo.');}
 if(form.id==='inv-new'){const name=$('#inv-name').value.trim(),qty=whole($('#inv-qty').value);if(!name||qty===null){flash('inv-status','Revisa el nombre y la cantidad.');return;}states.inventory.push({id:states.invNext++,name,qty});$('#inv-name').value='';renderInventory();flash('inv-status','Producto agregado a la demo.');}
 if(form.id==='quotes-new'){const index=Number($('#quote-product').value),qty=whole($('#quote-add-qty').value);if(!catalog[index]||qty===null||qty<1||qty>10000){flash('quotes-status','La cantidad debe ser mayor que cero.');return;}const [label,cents]=catalog[index];states.quotes.push({id:states.quoteNext++,label,qty,cents});renderQuotes();flash('quotes-status','Concepto agregado.');}
 if(form.id==='auto-start'){
 const name=$('#auto-client').value.trim();if(!name)return;timers.forEach(clearTimeout);timers=[];const own=++flowId;const flow=$$('#auto-steps .auto-step');flow.forEach(el=>{el.classList.remove('done','active');$('b',el).textContent='EN ESPERA';});$('#auto-summary').textContent=`Preparando flujo para ${name}…`;
 const run=i=>{if(own!==flowId||current!=='automation')return;const li=flow[i];li.classList.add('active','done');$('b',li).textContent='LISTO ✓';if(i===3){$('#auto-summary').textContent=`PROCESO COMPLETADO · ${name} · ${$('#auto-request').value} · Sin envíos reales.`;return;}timers.push(setTimeout(()=>run(i+1),window.matchMedia('(prefers-reduced-motion: reduce)').matches?60:680));};run(0);
 }
});
$('#lab-art').addEventListener('input',e=>{
 const t=e.target;
 if(t.id==='inv-search'){states.search=t.value.trim().toLocaleLowerCase('es');renderInventory();return;}
 if(t.id==='quote-tax'){const n=Number(t.value);if(Number.isFinite(n)&&n>=0&&n<=30){states.vat=n;renderTotals();}return;}
 // On change, not input: preserve focus and allow users to finish typing decimals.
});
$('#lab-art').addEventListener('change',e=>{
 const t=e.target,row=t.closest('[data-sale], [data-inv], [data-quote]');if(!row)return;
 if(t.classList.contains('sale-edit')){const entry=states.sales.find(x=>x.id===Number(row.dataset.sale)),cents=parseMoney(t.value);if(entry&&cents!==null&&cents>0){entry.cents=cents;renderSales();flash('sales-status','Importe actualizado.');}else{renderSales();flash('sales-status','Se requiere un importe positivo.');}}
 if(t.classList.contains('inv-edit')){const entry=states.inventory.find(x=>x.id===Number(row.dataset.inv)),qty=whole(t.value);if(entry&&qty!==null){entry.qty=qty;renderInventory();}else{renderInventory();flash('inv-status','Cantidad no válida.');}}
 if(t.classList.contains('quote-edit-qty')||t.classList.contains('quote-edit-price')){const entry=states.quotes.find(x=>x.id===Number(row.dataset.quote));if(!entry)return;const isQty=t.classList.contains('quote-edit-qty');const val=isQty?whole(t.value):parseMoney(t.value);if(val!==null&&(!isQty||(val>0&&val<=10000))){if(isQty)entry.qty=val;else entry.cents=val;renderQuotes();}else{renderQuotes();flash('quotes-status','Revisa cantidad y precio.');}}
});
$('#lab-art').addEventListener('click',e=>{
 const target=e.target.closest('button');if(!target)return;
 if(target.id==='sales-reset'){resetSales();flash('sales-status','Ventas restablecidas.');}
 if(target.id==='inv-reset'){resetInventory();flash('inv-status','Inventario restablecido.');}
 if(target.id==='quotes-reset'){resetQuotes();flash('quotes-status','Cotización restablecida.');}
 const saleId=target.dataset.delSale;if(saleId){states.sales=states.sales.filter(x=>x.id!==Number(saleId));renderSales();flash('sales-status','Venta eliminada.');}
 const invId=target.dataset.delInv;if(invId){states.inventory=states.inventory.filter(x=>x.id!==Number(invId));renderInventory();flash('inv-status','Producto eliminado.');}
 const quoteId=target.dataset.delQuote;if(quoteId){states.quotes=states.quotes.filter(x=>x.id!==Number(quoteId));renderQuotes();flash('quotes-status','Concepto retirado.');}
 if(target.hasAttribute('data-adjust')){const row=target.closest('[data-inv]'),entry=states.inventory.find(x=>x.id===Number(row?.dataset.inv));if(entry)entry.qty=Math.max(0,Math.min(1000000,entry.qty+Number(target.dataset.adjust)));renderInventory();}
});
menu.forEach((tab,index)=>{tab.addEventListener('click',()=>switchTo(tab.dataset.demo));tab.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?menu.length-1:(index+(e.key==='ArrowRight'?1:-1)+menu.length)%menu.length;switchTo(menu[i].dataset.demo,true);});});
switchTo('web');
})();
