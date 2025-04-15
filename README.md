# Ingreso de Trozo - Sistema de Conteo de Troncos

Proyecto ASP.NET Web Forms para registrar y gestionar el ingreso de troncos en una empresa forestal.

<pre>
## 📦 Estructura del Proyecto

Ingresodetrozo/
├── ingreso.aspx               # Página para ingresar datos del camión
├── contartrozos.aspx          # Página para contar troncos
├── Resumen.aspx               # Página para editar y ver resumen
├── Web.config                 # Configuración general del proyecto
├── Global.asax                # Configuración global ASP.NET

├── /JS                        # Lógica frontend por página
│   ├── ingreso.js             # Validación y guardado de datos de ingreso
│   ├── contartrozos.js        # Función de conteo y eventos de botones
│   ├── cargar-empresas.js     # Carga empresas desde servicio web
│   ├── resumen.js             # Validación y edición del resumen
│   └── comun.js               # Funciones reutilizables (ej: Obtener_Parametros)

├── /CSS                       # Estilos separados por página
│   ├── ingreso.css
│   ├── contartrozos.css
│   └── resumen.css

├── /Scripts                   # Librerías externas (ej: jQuery)
│   └── jquery-3.7.1.js

├── /Content                   # Imágenes o archivos estáticos
├── /xml                       # Datos o configuraciones en XML

</pre>

## 🧪 Funcionalidad

### 1. `ingreso.aspx`
- Formulario para registrar proveedor, predio y transporte.
- Valida campos obligatorios.
- Guarda en `sessionStorage` para continuar el flujo.

### 2. `contartrozos.aspx`
- Cuenta troncos por diámetro.
- Permite sumar/restar unidades.
- Calcula volumen total automáticamente.
- Guarda datos temporalmente en `sessionStorage`.

### 3. `Resumen.aspx`
- Muestra los datos ingresados.
- Permite editar cantidades de cada diámetro.
- Valida que el total sea consistente antes de cerrar.

### 4. Web Service
- `comun.js` usa un servicio remoto para obtener datos de empresas.

## ✅ Recomendaciones

- Usar `Ctrl+Shift+R` para evitar caché de JS en desarrollo.
- Cambiar versión de script: `<script src="archivo.js?v=2">`
- Evitar `async: false` cuando sea posible.

## ✍️ Autor

Dimitris — Práctica profesional en Alto Horizonte
