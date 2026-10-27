/* Funciones comerciales V5: reutiliza el frontend existente, sin dependencias. */
(()=>{'use strict';
 const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
 const sectors={
  restaurantes:['Menús digitales','Reservaciones','Pedidos en línea','Control de inventario'],
  comercios:['Tiendas en línea','Sistemas de ventas','Catálogos interactivos','Seguimiento de pedidos'],
  empresas:['Gestión de proveedores','Control de compras','Cotizadores','Paneles administrativos'],
  profesionales:['Páginas corporativas','Portafolios','Reservaciones','Formularios inteligentes'],
  operaciones:['Automatización de reportes','Flujos de aprobación','Dashboards','Integraciones empresariales']
 };
 const tabs=$$('.sector-tab');
 function selectSector(tab){tabs.forEach(t=>t.setAttribute('aria-pressed',String(t===tab)));$('#sector-items').replaceChildren(...sectors[tab.dataset.sector].map(label=>{const sp=document.createElement('span');sp.textContent=label;return sp;}));}
 tabs.forEach(t=>t.addEventListener('click',()=>selectSector(t)));
 // Real FormSubmit AJAX. Success means provider accepted the submission, not email delivered.
 const form=$('#contact-form'),status=$('#form-status'),submit=$('button[type="submit"]',form);
 form.addEventListener('submit',async e=>{
  if(!form.checkValidity())return;
  e.preventDefault();
  const original=submit.textContent;submit.disabled=true;submit.textContent='ENVIANDO…';submit.setAttribute('aria-busy','true');
  status.hidden=false;status.textContent='Enviando tu solicitud mediante FormSubmit…';
  try{
   const data=new FormData(form);
   // A named reply-to is supported by FormSubmit; do not add private credentials.
   data.set('_replyto',String(data.get('email')||''));
   const response=await fetch('https://formsubmit.co/ajax/jonamoralesflores@gmail.com',{
    method:'POST',body:data,headers:{'Accept':'application/json'},mode:'cors'
   });
   const result=await response.json();
   if(!response.ok || !(result.success===true||result.success==='true')){
    throw Error(typeof result.message==='string'?result.message:'El proveedor no confirmó el envío.');
   }
   status.textContent='FormSubmit aceptó tu solicitud. La entrega al correo depende de que el formulario esté activado; si lo prefieres, escríbenos por WhatsApp.';
   form.reset();
  }catch(err){
   status.textContent='No se pudo confirmar el envío. Prueba de nuevo o escríbenos por WhatsApp / correo. '+(err?.message||'');
  }finally{submit.disabled=false;submit.textContent=original;submit.removeAttribute('aria-busy');}
 });
})();
