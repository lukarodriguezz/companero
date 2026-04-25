# 🤝 Compañero UNCo — Bienestar Estudiantil

PWA de soporte emocional para estudiantes de la **Universidad Nacional del Comahue**.
Sin IA, sin backend, sin datos en la nube. Todo vive en el dispositivo del estudiante.

---

## Características

| Módulo | Descripción |
|---|---|
| **Chat con árbol de decisiones** | Flujos conversacionales predefinidos con burbujas múltiples y typing animado |
| **Post-fracaso / anti-abandono** | Ruta específica para "desaprobé", con pacto de 48 hs y derivación a Bienestar |
| **Triage de examen** | Divide por urgencia: hoy / esta semana / falta mucho — con técnica de control de entorno |
| **Brain dump** | Textarea para externalizar el agobio + identificar 1 tarea de 5 minutos |
| **Pacto de 5 minutos** | Timer interactivo con SVG animado para vencer la procrastinación |
| **Técnica de respiración 4-7-8** | Animación SVG con fases inhalá / retené / exhalá |
| **Técnica 5 sentidos** | Guía paso a paso anclada al presente |
| **Desafío de pensamientos (TCC)** | Registro de 4 pasos basado en Terapia Cognitivo-Conductual |
| **Intervención física en crisis** | Nodo de hielo/agua fría antes de mostrar recursos en picos de ansiedad |
| **Mood Tracker** | Registro diario con barchart de 14 días, historial y notas |
| **Recursos UNCo** | Teléfonos y emails de Bienestar UNCo + líneas nacionales de crisis |
| **Botón 🆘 Ayuda** | Accesible desde cualquier pantalla, siempre visible |
| **IndexedDB (Dexie.js)** | Persistencia robusta — datos nunca salen del dispositivo |
| **Persistencia del chat** | Si cerrás el navegador, volvés exactamente al mismo punto |
| **Dark mode** | Respeta `prefers-color-scheme` automáticamente |
| **PWA** | Instalable como app, funciona offline |

---


## Instalación y uso local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy en Vercel (recomendado)

```bash
# Opción A — via CLI
npm install -g vercel
vercel

# Opción B — conectar el repo en vercel.com
# Build command:  npm run build
# Output dir:     dist
```

## Deploy en Netlify

```bash
npm run build
# Subir carpeta dist/ o conectar el repo
# El netlify.toml ya tiene la configuración lista
```

---

## Cómo editar el bot

### Cambiar un número de teléfono o email
Editá `src/config/resources.js`. No hace falta recompilar — ese archivo es la única fuente de verdad para todos los recursos.

### Agregar un nuevo flujo en el árbol
Editá `src/data/decisionTree.js`. Cada nodo tiene esta forma:

```js
mi_nodo_nuevo: {
  id: 'mi_nodo_nuevo',
  botMessage: ['Primera burbuja.', 'Segunda burbuja.'],   // array = burbujas separadas
  options: [
    { label: 'Opción A', next: 'otro_nodo' },
    { label: 'Opción B', next: 'start' },
  ],
},
```

Luego referencialo desde otro nodo con `next: 'mi_nodo_nuevo'`.

---

## Recursos configurados

| Recurso | Contacto |
|---|---|
| Centro de Asistencia al Suicida (CAS) | 135 — gratuito 24hs |
| SAME Neuquén | 107 |
| Ministerio de Salud Neuquén | 0800-222-1002 |
| Secretaría de Bienestar UNCo | +54 299 449-0300 |
| Email Bienestar UNCo | secretaria.bienestar@central.uncoma.edu.ar |

---

Notas de seguridad

- El chatbot NO usa IA ni hace requests externos
- No recolecta datos personales
- Todo se almacena localmente en el dispositivo del usuario
-  Las derivaciones a profesionales siempre están disponibles


---

## Stack

- **React 18** + **Vite 5**
- **Dexie.js** — IndexedDB wrapper (sin backend, sin servidor)
- **vite-plugin-pwa** — service worker + manifiesto automáticos
- CSS Variables para theming automático light/dark
- Sin dependencias de UI externas
