# OSO ROJO V7 — verificación

## Comprobaciones ejecutadas

- Se analizó la V6 original disponible en el ZIP y se partió de su `index.html`, `privacy.html` y scripts originales.
- Identidad en portada, navegación, formularios, pie, SEO, social y WhatsApp actualizada a **Oso Rojo**; concepto **OSO ERP**. No aparece el signo de marca registrada ®.
- Se reemplazaron ambos logos embebidos del mono por una referencia al PNG original del oso suministrado; se eliminaron los activos antiguos del mono.
- El archivo de marca de agua roja conserva las líneas del oso y tiene fondo transparente; se comprobó su canal alfa y una composición sobre fondo negro.
- CSS comprobado en navegador: marca de agua fija y roja, con opacidad discreta y sin interacción; los cinco selectores del laboratorio están presentes.
- En Chromium se comprobaron anchos de **1440, 768, 390 y 320 px** (sin desbordamiento horizontal ni errores JavaScript), utilizando una vista de prueba con los mismos HTML/CSS/JS y recursos visuales reducidos únicamente para superar restricciones de navegación del entorno.
- En Chromium: 12 ventas × $2,500 = $30,000; agregar $1,000 produce 13 ventas / $31,000. Se agregó un producto con 3 unidades y el indicador de existencias bajas aumentó; IVA 16% sobre $4,500 = $5,220, e IVA 0% = $4,500. La simulación llega al estado PROCESO COMPLETADO.
- Se verificaron referencias de `assets/`, rutas técnicas de `/monorojo/` y destinos `wa.me/523325138810`, incluido el texto de Oso Rojo en el laboratorio.
- El formulario conserva `https://formsubmit.co/jonamoralesflores@gmail.com` y su envío mediante JavaScript en `assets/sitio.js`.

## Pendientes externos

- No se ha publicado en el repositorio real de GitHub ni probado una respuesta HTTP del sitio después del despliegue V7.
- No se realizó envío de correo real con FormSubmit ni confirmación de recepción: requiere prueba con la página pública, activación/autorización de FormSubmit y consulta del buzón.
- No se inició una conversación real de WhatsApp ni se puede confirmar el funcionamiento de la app del destinatario.
- La vista social depende de que el sitio publicado sirva el archivo y que las redes refresquen su caché.
- No se hizo una auditoría de rendimiento de red real ni revisión en teléfonos físicos.
