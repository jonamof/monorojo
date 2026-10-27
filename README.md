# MONO ROJO® — V6 / Evolución comercial

**Diseño que impacta. Tecnología que resuelve.**

Esta actualización se preparó sobre la V5 del proyecto existente, sin rediseñar la arquitectura HTML/CSS/JavaScript. Conserva cuatro servicios, la navegación, el logo original, la marca de agua fija, animaciones, responsive, el laboratorio completo y el formulario de contacto. Las funciones nuevas funcionan sin APIs de pago.

## Cambios realizados

- Los cinco encabezados de sección ya no llevan numerales entre paréntesis: usan un punto minimalista en el estilo existente. Se conservan numerales funcionales, pasos y etiquetas de las demos.
- Se eliminó el bloque visible con correo y teléfono de la sección de contacto. Los destinos de `mailto:` y `wa.me` siguen dentro de enlaces y configuración técnica. El aviso de privacidad también muestra un enlace «escríbenos por correo» en lugar de imprimir la dirección.
- La banda roja conserva su inclinación y se mueve con **dos grupos idénticos** para repetir de forma continua: Innovación, Tecnología, Soluciones a medida, Negocios que evolucionan, Sistemas inteligentes e Ideas sin límites. Se inmoviliza con `prefers-reduced-motion`.
- La sección Nosotros resalta el entendimiento de operaciones empresariales, sin limitarlo a compras o inventarios. Preserva la frase «Más que código. Entendemos negocios.».
- Software a medida presenta el alcance desde módulos a medida hasta posibles plataformas ERP integrales. Se muestran áreas de negocio sin fingir clientes o implantaciones.
- La categoría Software de la sección Soluciones incluye **11 áreas empresariales** y aclara que son posibilidades de desarrollo, no trabajos ejecutados.
- El laboratorio incorpora el rótulo **MONO ERP — Experiencia interactiva** y un diagrama de relación conceptual entre ventas, inventarios e indicadores. **No se implementó un traspaso ficticio de datos**: cada demostración mantiene sus datos independientes.
- Metadatos Open Graph, Twitter y canonical apuntan a la dirección pública existente `https://jonamof.github.io/monorojo/`. Al migrar a dominio propio hay que actualizarlos.

## Archivos del proyecto

- `index.html` — Página principal y estilos complementarios V6.
- `assets/experiencias.css` — Estilos existentes de las demostraciones; sin modificaciones funcionales.
- `assets/laboratorio.js` — Ventas, inventarios, cotizador y automatización local; conservado de V5.
- `assets/sitio.js` — Filtros comerciales y envío FormSubmit; conservado de V5.
- `assets/logo-original-mono-rojo.png` y `assets/mono-rojo-simbolo-transparente.png` — Identidad original y marca de agua.
- `assets/favicon-mono-rojo.png`, `assets/mono-rojo-social.png` — Favicon y miniatura social.
- `privacy.html` — Información de privacidad; se conservó el medio de contacto, pero se ocultó la dirección como texto.
- `.nojekyll` — Archivo oculto necesario para respetar la configuración de GitHub Pages.
- `PRUEBAS.md` — Qué se comprobó realmente y qué sigue pendiente.

## Actualizar GitHub Pages

1. Descarga el ZIP de V6 y **extráelo**, no subas el ZIP directamente.
2. Abre https://github.com/jonamof/monorojo y asegúrate de estar en la rama `main` y en la raíz del repositorio.
3. Haz clic en **Add file → Upload files**.
4. Desde el Explorador de Windows, selecciona todo el **contenido de la carpeta** extraída: `index.html`, `privacy.html`, `README.md`, `PRUEBAS.md`, la carpeta `assets` y, si Windows lo muestra, `.nojekyll`. Arrastra la selección a la pantalla de GitHub. Mantén las rutas internas de `assets/`.
5. Comprueba que GitHub muestre `assets/experiencias.css`, `assets/laboratorio.js`, `assets/sitio.js` y las imágenes; además, `index.html` y `privacy.html` en la raíz. **No borres el repositorio actual.**
6. Escribe el comentario `Mono Rojo V6 - mejora comercial y ERP conceptual`, selecciona **Commit directly to the main branch** y haz clic en **Commit changes**.
7. Comprueba https://jonamof.github.io/monorojo/ . Si ves la versión anterior, actualiza con `Ctrl + F5` o abre una ventana privada después del despliegue.
8. Si Github Pages no publica, revisa **Settings → Pages**. El despliegue debe tomar la rama `main` y la carpeta `/(root)`, si usas la publicación directa desde rama.

**Importante:** si el repositorio ya contiene `index.html`, GitHub sustituye ese archivo al guardar la carga; no renombres el nuevo index.

## Contacto y verificación externa

El formulario sigue configurado para `jonamoralesflores@gmail.com` mediante FormSubmit; el envío AJAX apunta a `https://formsubmit.co/ajax/jonamoralesflores@gmail.com` y el formulario HTML a `https://formsubmit.co/jonamoralesflores@gmail.com`. **El destinatario debe estar en el código para que FormSubmit funcione**, pero no se muestra como bloque de texto en la interfaz. Los botones comerciales y flotante abren WhatsApp mediante `https://wa.me/523325138810`, con los mensajes prellenados que ya existían.

**No se ha realizado un envío real desde la versión V6 publicada.** Comprueba que FormSubmit esté activado y que recibas un mensaje de prueba en la bandeja de entrada (o spam). Sin esa comprobación no puede asegurarse la entrega. El aviso de privacidad sigue siendo informativo y debe revisarse jurídicamente para uso definitivo.

## Limitaciones

- Las cuatro demostraciones son locales: no comparten registros ni inventarios entre ellas, ni utilizan base de datos. El flujo MONO ERP es una representación conceptual, no un ERP implementado.
- Google Fonts y FormSubmit son servicios externos ya existentes, pero esta versión **no requiere suscripciones nuevas** ni consumo de APIs de IA.
- Después de migrar a un `.com` o `.mx`, modifica los enlaces `canonical`, `og:url`, `og:image` y `twitter:image` en `index.html`.
