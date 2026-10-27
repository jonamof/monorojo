# MONO ROJO V6 — PRUEBAS Y PENDIENTES

## Comprobado (27 de octubre de 2026)

- Código de ambos JavaScript externos validado con `node --check`.
- HTML inspeccionado con BeautifulSoup: cinco encabezados sin `(01)`, `(02)` ni similares, cuatro servicios conservados, cinco pestañas de laboratorio conservadas, marca de agua fija presente, recursos locales existentes y destinos de FormSubmit intactos.
- Banda con dos secuencias de contenido idénticas y regla `prefers-reduced-motion`.
- No hay direcciones de correo ni número de teléfono **como texto visible** en la página principal ni en el aviso de privacidad. Se mantienen en rutas y enlaces técnicos necesarios.
- Renderizado de los archivos HTML/CSS/JS en Chromium mediante **inyección de los recursos locales en memoria**, ya que el acceso `file://` estaba bloqueado por la política del entorno. Viewports 320, 390, 768 y 1440 px: sin errores de JavaScript observados ni desbordamiento horizontal.
- Acordeón de Software a medida expande con sus áreas.
- Panel de ventas: total inicial $30,000.00; tras agregar una venta de $100, total $30,100.00.
- Inventarios: se creó un producto de prueba con 3 existencias.
- Cotizador: total inicial con IVA 16% $5,220.00; al pasar IVA a 0%, $4,500.00.
- Automatización: la simulación llegó a «PROCESO COMPLETADO».
- Se verificaron por inspección las rutas de los archivos y las cadenas técnicas de los enlaces WhatsApp. No se intentó enviar mensajes reales.
- `assets/laboratorio.js` y `assets/sitio.js` se conservaron de la V5 sin cambios funcionales.

## No comprobado externamente

- Activación de FormSubmit y entrega real en Gmail: requiere el envío real desde el sitio público y validación del destinatario.
- Apertura de WhatsApp en un teléfono físico y envío del mensaje precargado: requiere prueba del usuario.
- Caché y despliegue final de GitHub Pages después de sustituir V5 por V6: aún no se realizó.
- Generación de miniaturas por WhatsApp/Facebook e indexación de la versión V6 en buscadores: depende de la publicación y las cachés de cada plataforma.
- Safari/iOS y navegadores móviles físicos: se evaluaron viewports móviles en Chromium, no dispositivos reales.
