# Changelog

Todos los cambios notables del proyecto se registran aquí.

## [1.3.0] - 2025-05-05
### Mejorado
- Se mejoró el diseño visual de la tabla FSC, Bancos, Destino y Largo para alinearse con el resto del formulario.
- Estilos unificados para `select` e `input` con mismo tamaño y espaciado.
- Se corrigió el alineamiento horizontal y la integración visual con los campos `.fila`.
- Se mantuvo el uso de `<table>` por razones estructurales, pero se adaptó visualmente al diseño general.

---

## [1.2.0] - 2025-05-02
### Mejorado
- Se rediseñó visualmente el resumen final para que las secciones de Proveedor, Origen y Transporte usen acordeones desplegables.
- Se mejoró la visualización de la sección Totales, manteniéndola visible y clara.
- Se cambió el título de “Total Final” a “Total Troncos” para mayor consistencia.
- Corrección de validaciones XHTML5: eliminados duplicados de id y etiquetas no permitidas dentro de <summary>.
- Ajustes de estilo responsive para mejorar visualización en dispositivos móviles.

---

## [1.1.0] - 2025-05-02
### Mejorado
- Los botones "Volver" y "Siguiente" ahora se actualizan correctamente según el banco actual.
- Soporte para múltiples sliders (bancos) con navegación dinámica.
- Eliminación del atributo `onclick` en HTML para control total desde JavaScript.
- Preparado para integración visual de versión desde `version.xml` (pendiente en interfaz).

---

## [1.0.0] - 2025-04-15
### Agregado
- Página `contartrozos.aspx` funcional para contar troncos.
- Página `resumen.aspx` muestra resumen y permite editar.
- Guardado de datos en `localStorage`.
- Navegación básica entre bancos.
- Estructura organizada de carpetas (`/JS`, `/Content`, `/xml`, etc.).