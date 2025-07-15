# Salas App Frontend

Interfaz para visualizar salas de juntas, ver su disponibilidad y gestionar reservas.

Construido con **Angular 17 (standalone components)**, **Bootstrap**, y **Angular Material**.

## Características
- Listado de salas con estado (disponible/reservada).
- Crear y liberar reservas fácilmente.
- Integración con el backend vía Axios.
- Confirmaciones visuales tras cada acción.
- Aplicación responsiva y rápida.
- Arquitectura basada en `features/`.

## Tecnologías
- Angular 17 standalone
- Bootstrap
- Angular Material
- Vite
- Axios
- Signals

## Instalación
```bash
git clone https://github.com/fabianreyesmn/salas-frontend
cd salas-frontend
npm install
```

## Configuración
En `src/environments/environment.ts`:
```
export const environment = {
  apiUrl: 'http://localhost:3000/api'
};
```

## Ejecutar
```
npm run dev
```
Abre `http://localhost:4200`

## Estructura
```
salas-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   │   ├── reservas/
│   │   │   │   ├── pages/
│   │   │   │   ├── routes.ts
│   │   │   └── salas/
│   │   │       ├── pages/
│   │   ├── shared/
│   │   │   ├── components/
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   ├── app.spec.ts
│   │   ├── app.ts
│   ├── environments/
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   ├── styles.scss
├── angular.json
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

