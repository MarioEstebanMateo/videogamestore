# Video Games Store by Mario

Una tienda de videojuegos moderna construida con Vite, React y Tailwind CSS.

## Características

- 🎮 Catálogo de videojuegos con búsqueda en TheGamesDB
- 🛒 Carrito de compras completamente funcional
- 👥 Sistema de autenticación y autorización
- 🖼️ Panel de administración para gestionar juegos
- 🌙 Modo oscuro/claro
- 📱 Diseño completamente responsive
- 💾 Base de datos local con localStorage

## Configuración

### 1. Obtener API Key de TheGamesDB

1. Ve a [https://www.thegamesdb.net/api](https://www.thegamesdb.net/api)
2. Regístrate o inicia sesión
3. Genera una API Key (es gratis)
4. Copia la API Key

### 2. Configurar la API Key

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_GAMES_DB_API_KEY=TU_API_KEY_AQUI
```

Reemplaza `TU_API_KEY_AQUI` con tu API key real.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

## Credenciales de Prueba

**Admin:**
- Usuario: `admin`
- Contraseña: `admin`

## Estructura del Proyecto

```
src/
├── components/
│   ├── admin/         # Componentes del panel de administración
│   ├── auth/          # Componentes de autenticación
│   ├── cart/          # Componentes del carrito
│   ├── common/        # Componentes reutilizables
│   └── store/         # Componentes de la tienda
├── pages/             # Páginas principales
├── services/          # Servicios (BD, autenticación, API)
├── hooks/             # React hooks personalizados
├── context/           # React Context para estado global
└── index.css          # Estilos globales
```

## Datos de Juegos

- **Búsqueda**: Se obtienen de TheGamesDB en tiempo real
- **Almacenamiento**: Se guardan en localStorage con datos completos:
  - Imagen real del juego
  - Desarrollador
  - Editor
  - Plataformas
  - Fecha de lanzamiento
  - Información de jugadores
  - Co-op disponible

## Admin Features

1. **Buscar juegos**: Búsqueda en TheGamesDB con imagen y detalles
2. **Configurar juegos**: Establecer stock y precio
3. **Publicar juegos**: Agregar a la tienda
4. **Gestionar juegos**: Editar, eliminar, cambiar stock/precio
5. **Juegos publicados**: Listar todos los juegos activos

## Build

```bash
npm run build
```

## Notas

- Todos los datos se almacenan en localStorage del navegador
- No hay backend servidor (localStorage es la BD)
- Las imágenes se descargan desde TheGamesDB
- Admin tiene acceso completo al panel

---

**Desarrollado con ❤️ usando Vite + React + Tailwind CSS**
