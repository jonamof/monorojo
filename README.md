# MONO ROJO® — V5 / EXPERIENCIA INTERACTIVA

**Diseño que impacta. Tecnología que resuelve.**

Versión construida **sobre V4**, manteniendo su estructura general, identidad, animaciones, símbolo original, marca de agua fija, menú, scroll y secciones existentes. Sin frameworks, sin chatbot, sin IA en ejecución, sin APIs de pago y sin backend propio.

## Archivos

- `index.html`: página principal; contiene estructura HTML, estilo y comportamiento heredados de V4.
- `assets/laboratorio.js`: demostraciones 100% locales de ventas, inventarios, cotización y automatización.
- `assets/sitio.js`: filtros por giro y envío AJAX real del formulario (FormSubmit).
- `assets/experiencias.css`: estilos adicionales adaptados a los componentes y colores anteriores.
- `assets/mono-rojo-simbolo-transparente.png`: símbolo de líneas **original** extraído, usado como marca de agua fija.
- `assets/logo-original-mono-rojo.png`: archivo original de referencia, sin redibujar.
- `assets/mono-rojo-social.png`: imagen 1200 × 630 para vista previa de redes.
- `assets/favicon-mono-rojo.png`: favicon basado en el símbolo original.
- `privacy.html`: aviso de privacidad preliminar, debe revisarse jurídicamente para uso definitivo.
- `.nojekyll`: compatibilidad con GitHub Pages.

## Publicar o actualizar en GitHub Pages

1. Descomprime el ZIP. Sube **el CONTENIDO de la carpeta**, no la carpeta exterior, a la raíz de tu repositorio `monorojo`: deben quedar `index.html`, `privacy.html` y `assets/` en la raíz.
2. En GitHub, selecciona **Settings → Pages → Deploy from a branch → main → /(root)**.
3. Revisa `https://TU-USUARIO.github.io/monorojo/` usando tu usuario real. Los links a los recursos son relativos y no dependen de estar publicados en la raíz del dominio.
4. Abre cada pestaña del laboratorio y prueba los botones personalizados de WhatsApp, el menú, las FAQ y el filtro por giro. El formulario debe probarse en la URL publicada, NO abriendo `index.html` como archivo local.

### Una configuración SEO necesaria cuando conozcas la URL pública

No recibí el usuario real de GitHub Pages ni un dominio propio. **No inventé una URL ni un dominio.** Para una vista previa consistente en WhatsApp/Instagram/Facebook, edita `index.html` después de publicarlo:

- Cambia `<meta property="og:image" content="assets/mono-rojo-social.png">` por una **URL HTTPS absoluta**: `https://TU-USUARIO.github.io/monorojo/assets/mono-rojo-social.png`.
- Cambia `<meta name="twitter:image" content="assets/mono-rojo-social.png">` de la misma forma.
- La etiqueta `<link rel="canonical" href="/monorojo/">` funciona como dirección de proyecto bajo `/monorojo/`, pero se recomienda sustituirla por la URL HTTPS definitiva: `https://TU-USUARIO.github.io/monorojo/`.
- **Opcional:** agrega `<meta property="og:url" content="https://TU-USUARIO.github.io/monorojo/">` usando la URL real.

Una imagen Open Graph con dirección relativa puede no ser interpretada por todos los robots sociales, por eso se documenta la sustitución. Cuando se cambie a un dominio `.com` o `.mx`, sustituye las URLs anteriores, actualiza canonical y publica el sitemap bajo ese dominio si lo necesitas. **No incluimos sitemap.xml ni robots.txt** porque el sitio aún no tiene una dirección de dominio absoluta identificada; además, un `robots.txt` dentro de un subdirectorio `/monorojo/` no sustituye el archivo robots de la raíz del host.

## Laboratorio: cuatro demostraciones reales (datos ficticios)

**00. Web conceptual:** se conserva el concepto visual que existía en V4, ahora etiquetado como tal.

**01. Ventas:** inicia con 12 ventas de $2,500 MXN = $30,000 MXN. Se pueden agregar, editar o eliminar. Indicadores y gráfica cambian automáticamente. Hay botón de reinicio.

**02. Inventarios:** productos ficticios, altas, búsqueda, modificación de cantidades, entradas/salidas, alertas cuando existencias <= 5, eliminación, reinicio e indicadores.

**03. Cotizaciones:** catálogo de conceptos ficticios, altas y bajas, edición de cantidades y precios, IVA entre 0 y 30%, subtotal y total calculado en centavos para evitar errores comunes con decimales. Los importes son **ejemplos**, no tarifas comerciales.

**04. Automatización:** solicitud ficticia, paso a paso y estados de avance. **No** envía correos, notificaciones ni datos a servicios externos.

Los datos de las demostraciones viven en la memoria del navegador y se reinician al refrescar. Las demostraciones no comparten datos con el formulario de contacto. Los botones bajo el Laboratorio abren WhatsApp con el nombre de la solución explorada.

## Contacto: FormSubmit gratis

Configurado para enviar solicitudes a **jonamoralesflores@gmail.com**, con nombre, correo, servicio, descripción y consentimiento de privacidad. Usa el endpoint `https://formsubmit.co/ajax/jonamoralesflores@gmail.com` mediante POST, con el formulario HTML normal como alternativa si JavaScript está desactivado. No incluye credenciales, tokens privados ni falsos envíos de correo.

**Activación y verificación pendientes:**

1. Publica el sitio en GitHub Pages.
2. Completa el formulario con datos de prueba.
3. Revisa `jonamoralesflores@gmail.com`, incluido spam, y **confirma el correo de activación** que envía FormSubmit.
4. Envía otra solicitud real desde la página publicada y verifica que **llegue al buzón**. Hasta hacerlo, nadie puede garantizar la recepción.
5. Si falla, el visitante verá un mensaje de error, tendrá a mano WhatsApp y correo para contactar directamente.

El código distingue el `success: "true"` del `success: "false"` en la respuesta AJAX; un HTTP 200 no significa por sí solo que el envío fue aceptado. Un resultado exitoso significa solo que FormSubmit lo aceptó, **no** que se haya comprobado el correo recibido. FormSubmit anuncia formularios y envíos ilimitados para su servicio base; su API opcional de archivo histórico se limita a **5 accesos por día** y el historial se conserva **30 días**. Las reglas de servicio pueden cambiar. Ver: https://formsubmit.co/documentation y https://formsubmit.co/help.

### Privacidad

Incluimos aceptación explícita y enlace a `privacy.html` con el alcance conocido del formulario y FormSubmit. Es un borrador informativo, **no una validación jurídica**. Verifica su adecuación a tu régimen legal y datos del responsable antes de campañas de difusión.

## Comprobaciones realizadas

- Sintaxis de ambos archivos JavaScript evaluada con Node sin errores.
- Render e interacciones probados en Chromium en tamaños **320, 390, 768 y 1440 px**: sin errores de JavaScript ni scroll horizontal después de la optimización.
- Ventas iniciales **12 / $30,000**, nueva venta, edición, eliminación y reinicio: probados.
- Inventario inicial, alerta de existencias, nuevo producto, búsqueda, entrada y reinicio: probados.
- Cotizador: subtotal, IVA del 16%, IVA 0%, agregado de líneas y reinicio: probados.
- Automatización: secuencia de las cuatro etapas hasta **PROCESO COMPLETADO**: probada.
- Filtros por sector: interacción probada.
- Formulario: validaciones HTML y respuesta simulada de aceptación AJAX probadas. No se realizó un envío externo real; FormSubmit no fue activado por nosotros.

### Pendiente de pruebas externas

- Confirmación de activación y **recepción efectiva** del correo en Gmail.
- Vista previa social tras actualizar las URL absolutas de Open Graph.
- Indexación real en Google después de publicar.
- Revisión legal definitiva del aviso de privacidad.
- Validación en Safari/iPhone y Android físicos (se probó Chromium con viewports móviles, no dispositivos reales).

## Diseño y costes

Mantiene las fuentes Archivo Black + DM Sans (Google Fonts), scroll, banda animada, interfaz desplegable, efectos del logo, marca de agua con transparencia y WhatsApp fijo. Los scripts locales no hacen solicitudes de red. Google Fonts y FormSubmit son servicios externos, pero no hay funciones de IA de pago ni suscripciones que nosotros hayamos contratado. Todas las demos funcionan offline una vez cargado el HTML y recursos.
