# Video Games Store by Mario

Una tienda de videojuegos moderna construida con Vite, React y Tailwind CSS.

## Características

- 🎮 Catálogo de videojuegos con búsqueda en RAWG (la base de datos de juegos más completa)
- 🛒 Carrito de compras completamente funcional
- 👥 Sistema de autenticación y autorización
- 🖼️ Panel de administración para gestionar juegos
- 🌙 Modo oscuro/claro
- 📱 Diseño completamente responsive
- 💾 Base de datos local con localStorage

## Configuración

### 1. Obtener API Key de RAWG

1. Ve a [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Regístrate con tu email (es gratis)
3. Ve a tu perfil y copia tu API Key única
4. La API Key se genera automáticamente - solo cópiala

### 2. Configurar la API Key

Abre o crea un archivo `.env` en la raíz del proyecto:

```env
VITE_RAWG_API_KEY=TU_API_KEY_AQUI
```

Reemplaza `TU_API_KEY_AQUI` con tu API key real de RAWG.

### 3. Reiniciar el servidor

Después de agregar la API Key al archivo `.env`, reinicia el servidor de desarrollo:

```bash
npm run dev
```

**IMPORTANTE:** Asegúrate de reiniciar el servidor después de cambiar el `.env`, de lo contrario los cambios no se cargarán.

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

- **Búsqueda**: Se obtienen de RAWG en tiempo real
- **Almacenamiento**: Se guardan en localStorage con datos completos:
  - Imagen real del juego
  - Desarrollador
  - Editor/Publicador
  - Plataformas (Windows, Mac, Linux, PlayStation, Xbox, Nintendo, etc.)
  - Fecha de lanzamiento
  - Calificación (rating)
  - Géneros
  - información de co-op

## Admin Features

1. **Buscar juegos**: Búsqueda en RAWG con imagen y detalles completos
2. **Configurar juegos**: Establecer stock y precio
3. **Publicar juegos**: Agregar a la tienda (solo juegos publicados son visibles)
4. **Gestionar juegos**: Editar, eliminar, cambiar stock/precio
5. **Juegos publicados**: Listar todos los juegos activos en la tienda

## Build

```bash
npm run build
```

## Notas

- Todos los datos se almacenan en localStorage del navegador
- No hay backend servidor (localStorage es la BD)
- Las imágenes y datos de juegos se obtienen desde la API de RAWG
- Admin tiene acceso completo al panel

---

**Desarrollado con ❤️ usando Vite + React + Tailwind CSS**
