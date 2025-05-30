﻿# Changelog

Todos los cambios notables del proyecto se registran aquí.

## [2.3.1] - 2025-05-28
### Agregado
- Mejora visual compacta y clara en la tabla de detalle de troncos usando DataTable.
- Aplicación de diseño con líneas suaves, alineación precisa y alto contraste sin exceso de espacio.
- Formato numérico refinado para volúmenes con `toFixed(3)` y alineación a la derecha.

### Mejorado
- Tabla de detalle más legible en dispositivos pequeños sin sacrificar densidad de datos.
- Estructura HTML optimizada para diferenciar filas sin usar espacio innecesario.

### Corregido
- Estilo de tabla mal renderizado en el modal corregido.
- Cálculo erróneo por unidades iguales en todos los diámetros ajustado.

---

## [2.3.0] - 2025-05-27
## Agregado
- Visualización múltiple de ingresos en movimientos.aspx usando Obtener_Ingreso_Trozo(0) para mostrar todos.
- Inclusión de botón “Ver detalle” con funcionalidad dinámica para cada ingreso.
- Soporte responsivo total en DataTables con responsive: true y estilo mejorado.
- Abreviación automática de títulos en pantallas pequeñas (<768px) mediante función JS.
- Detalle de troncos muestra cantidad y volumen calculado dinámicamente.

## Mejorado
- Consola ahora muestra logs detallados con correlativos solicitados y llamados a funciones clave.
- Mejora visual en botón de carga y mensajes de error con Swal.fire.
- Función verDetalle refactorizada para evitar errores por datos indefinido.

## Corregido
- Error ReferenceError: datos is not defined corregido con parámetro explícito de LargoTrozo.
- Bug donde solo el ingreso #0 se mostraba corregido: ahora se itera sobre todos los elementos del array.

---

## [2.2.0] - 2025-05-26
### Agregado
- Lógica para ofrecer opciones post-guardado: imprimir, nuevo ingreso o login.
- Nueva lógica que limpia `sessionStorage` y `localStorage` después de guardar.
- Generación de JSON local con nombre personalizado y timestamp completo.
- Detección y manejo de errores de inserción con mensajes claros desde el servidor.

### Mejorado
- Validación visual y semántica de los errores en consola y alertas.
- Flujo UX: permite imprimir antes de decidir si reiniciar o cerrar sesión.
- Modularidad del código `guardarDatos()` y `confirmarYPreguntarImpresion()`.

### Corregido
- Error por `resultado.GDE` no válido tras respuesta del backend.
- Referencia `mostrarPantallaFinal` faltante ahora correctamente definida en `window`.

---

## [2.1.0] - 2025-05-22
### Agregado
- Lógica para ofrecer opciones post-guardado: imprimir, nuevo ingreso o login.
- Nueva lógica que limpia `sessionStorage` y `localStorage` después de guardar.
- Generación de JSON local con nombre personalizado y timestamp completo.
- Detección y manejo de errores de inserción con mensajes claros desde el servidor.

### Mejorado
- Validación visual y semántica de los errores en consola y alertas.
- Flujo UX: permite imprimir antes de decidir si reiniciar o cerrar sesión.
- Modularidad del código `guardarDatos()` y `confirmarYPreguntarImpresion()`.

### Corregido
- Error por `resultado.GDE` no válido tras respuesta del backend.
- Referencia `mostrarPantallaFinal` faltante ahora correctamente definida en `window`.

---

## [2.0.0] - 2025-05-19
### Agregado
- Fecha de impresión y fecha de documento con formato consistente `dd-mm-yyyy`.
- Firma fija al pie de página en la impresión del PDF.

### Mejorado
- Diseño del título y metadata en el encabezado del PDF.
- Tabla de resumen global más clara y más pequeña.
- Sección de Información Transportista más compacta horizontalmente.
- Consistencia general del diseño para mejor presentación impresa.
- Validación de RUT más estricta (mínimo 1 millón + Mod11).
- SweetAlerts en lugar de alerts nativos para toda la validación de campos.

---

## [1.9.0] - 2025-05-15
### Agregado
- Ordenamiento alfabético de la lista de proveedores en el resumen final.
- Mejora visual en la sección de información de proveedor para mayor claridad.

### Corregido
- Corrección en la validación de sesión en pantallas protegidas, incluyendo `ingreso.aspx`.

### Mejorado
- Presentación de datos del proveedor ajustada para mayor legibilidad.
- Código JS optimizado para validar sesión al cargar la página y mostrar alertas claras si expira.

---

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