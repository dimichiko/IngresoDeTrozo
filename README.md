# Ingreso de Trozo - Sistema de Conteo de Troncos

Proyecto ASP.NET Web Forms para registrar y gestionar el ingreso de troncos en una empresa forestal.

---

## 🚦 Flujo General

`login.aspx` → `inicio.aspx` → `ingreso.aspx` → `contartrozos.aspx` → `resumen.aspx`

---

## 📦 Estructura del Proyecto

Ingresodetrozo/
├── login.aspx                 # Página de acceso con validación
├── inicio.aspx                # Página de inicio con acceso a módulos
├── ingreso.aspx               # Registro de datos del camión
├── contartrozos.aspx          # Conteo de troncos por diámetro
├── resumen.aspx               # Edición y resumen de los datos
├── Web.config                 # Configuración general del proyecto
├── Global.asax                # Configuración global ASP.NET
├── favicon.ico                # Ícono de la empresa en pestaña del navegador

├── /JS
│   ├── login.js               # Validación de login
│   ├── inicio.js              # (Vacío, reservado para lógica futura)
│   ├── ingreso.js             # Validación y sessionStorage
│   ├── contartrozos.js        # Lógica de conteo
│   ├── resumen.js             # Edición y validación final
│   ├── cargar-empresas.js     # Lógica para cargar proveedores
│   └── comun.js               # Funciones reutilizables

├── /CSS
│   ├── login.css
│   ├── inicio.css
│   ├── ingreso.css
│   ├── contartrozos.css
│   └── resumen.css

├── /Scripts                   # Librerías externas (ej: jQuery)
│   └── jquery-3.7.1.js

├── /Content                   # Logo e imágenes estáticas
├── /xml                       # Configuraciones o datos en XML

</pre>

---

## 🧪 Funcionalidad

### 1. `login.aspx`
- Campo de usuario y contraseña con validación.
- Simulación o conexión real con base de datos.
- Redirige a `inicio.aspx` tras validación exitosa.

### 2. `inicio.aspx`
- Muestra logo corporativo.
- Dos botones: acceso a "Contador de Trozos" y "Almacén".
- Botón de "Salir" que vuelve a `login.aspx`.

### 3. `ingreso.aspx`
- Formulario dividido en acordeón.
- Registra proveedor, origen y transporte.
- Valida campos requeridos.
- Guarda en `sessionStorage`.

### 4. `contartrozos.aspx`
- Registro y suma de troncos por diámetro.
- Cálculo de volumen total.
- Edición rápida.

### 5. `resumen.aspx`
- Vista consolidada de todos los datos.
- Edición del conteo.
- Validación antes de finalizar.

---

## ✅ Recomendaciones

- Usar `Ctrl+Shift+R` para evitar caché de JS.
- Puedes cambiar versión de script: `<script src="archivo.js?v=2">`
- Asegurar favicon con: `<link rel="icon" href="favicon.ico">`

---

## ✍️ Autor

**Dimitris** — Práctica profesional en *Alto Horizonte*
