# Video Games Store by Mario

Una tienda de videojuegos moderna construida con Vite, React y Tailwind CSS.

## Características

- 🎮 Catálogo de videojuegos con búsqueda en RAWG (la base de datos de juegos más completa)
- 🛒 Carrito de compras completamente funcional
- 👥 Sistema de autenticación y autorización
- 🖼️ Panel de administración para gestionar juegos
- 🌙 Modo oscuro/claro
- 📱 Diseño completamente responsive
- 💾 Base de datos Supabase (PostgreSQL) con usuarios y juegos

## Configuración

### 1. Obtener API Key de RAWG

1. Ve a [https://rawg.io/apidocs](https://rawg.io/apidocs)
2. Regístrate con tu email (es gratis)
3. Ve a tu perfil y copia tu API Key única
4. La API Key se genera automáticamente - solo cópiala

### 2. Configurar Supabase

1. Crea un proyecto en [https://supabase.com](https://supabase.com)
2. En tu proyecto, ve a **SQL Editor** y ejecuta este SQL para crear las tablas:

```sql
-- Games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  screenshot_url TEXT,
  developer TEXT,
  publisher TEXT,
  genres TEXT,
  platforms TEXT,
  rating DECIMAL,
  release_date TEXT,
  price DECIMAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Insert default admin user
INSERT INTO users (username, password_hash) VALUES ('admin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_games_is_published ON games(is_published);
```

3. Ve a **Settings** > **API** y copia:
   - Project URL
   - Anon/Public Key

### 3. Configurar la API Key

Abre o crea un archivo `.env` en la raíz del proyecto:

```env
VITE_RAWG_API_KEY=TU_API_KEY_DE_RAWG
VITE_SUPABASE_URL=TU_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
```

Reemplaza con tus valores reales de RAWG y Supabase.

### 4. Reiniciar el servidor

Después de agregar las claves al archivo `.env`, reinicia el servidor de desarrollo:

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
- **Almacenamiento**: Se guardan en Supabase con datos completos:
  - Imagen real del juego
  - Desarrollador
  - Editor/Publicador
  - Plataformas (Windows, Mac, Linux, PlayStation, Xbox, Nintendo, etc.)
  - Fecha de lanzamiento
  - Calificación (rating)
  - Géneros
  - Información de co-op
  - Stock y precio
  - Base de datos compartida entre usuarios

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

- Todos los datos se almacenan en Supabase (PostgreSQL en la nube)
- Las sesiones de usuarios se guardan en localStorage (el usuario actual)
- El carrito de compras se almacena en localStorage (no persiste entre dispositivos)
- Los usuarios se guardan en Supabase
- **Admin es automáticamente creado**: usuario `admin` con contraseña `admin`
- Las imágenes y datos de juegos se obtienen desde la API de RAWG
- Admin tiene acceso completo al panel de administración
- Los datos de usuarios y juegos publicados son compartidos entre todos los usuarios de la tienda
- No se guarda información de pedidos (solo se reduce el stock)

---

**Desarrollado con ❤️ usando Vite + React + Tailwind CSS**
