# Changelog

Todos los cambios notables del proyecto se registran aquí.


## [1.8.0] - 2025-05-14
### Agregado
- Ordenamiento alfabético de la lista de proveedores en el resumen final.
- Mejora visual en la sección de información de proveedor para mayor claridad.

### Corregido
- Corrección en la validación de sesión en pantallas protegidas, incluyendo `ingreso.aspx`.

### Mejorado
- Presentación de datos del proveedor ajustada para mayor legibilidad.
- Código JS optimizado para validar sesión al cargar la página y mostrar alertas claras si expira.

---

## [1.7.0] - 2025-05-12
### Agregado
- Validación de login con feedback visual y control de sesión usando `sessionStorage`.
- Carga dinámica de empresas desde `AuthService.asmx`, con opción de mostrar solo "GYG".
- Restricción de caracteres en campos de texto para nombres (solo letras y espacios).
- Autoconversión a mayúsculas en campos de nombre (Despachador, Transportista, Conductor).

### Corregido
- Ya no se sobrescribe el input numérico de Nota Compra/Venta con el nombre del proveedor.
- Validación de campos numéricos limitada correctamente a 4 dígitos sin símbolos.

### Mejorado
- Revisión automática de sesión activa en todas las pantallas protegidas.
- Estructura JS modular y reutilizable para validar inputs y mostrar errores.

---

## [1.6.0] - 2025-05-08
### Mejorado
- Los bloques de resumen por banco ahora usan acordeones (`<details>`) con tablas por diámetro.
- Se permite editar la cantidad de troncos por diámetro, con validación visual.
- Se permite agregar más troncos que el total original, notificando la diferencia con SweetAlert.
- El total por banco, el total global y el resumen final se actualizan automáticamente.

---

## [1.5.0] - 2025-05-07
### Agregado
- Loader visual al navegar entre login, inicio, ingreso, contartrozos y resumen.
- Animación de carga reutilizable desde `loader.js`.
- Lectura automática de versión desde `version.xml` en login, inicio, contartrozos y resumen.

### Eliminado
- Función de recuperación de contraseña (no requerida para uso privado).

### Mejorado
- Validación más robusta en login.
- Diseño responsive mejorado en login.
- Centralización de funciones comunes para navegación (`navigateTo`, `limpiarCacheYRedirigir`).

---

## [1.4.0] - 2025-05-07
### Agregado
- Login funcional conectado a AuthService.asmx.
- Validación en frontend con JS moderno.
- Soporte para "recordar usuario" con localStorage.
- Sistema de sesiones con redirección y validación.

### Mejorado
- Estilos de login totalmente rediseñados y responsivos.
- Footer incluye número de versión cargado desde `xml/version.xml`.

---

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