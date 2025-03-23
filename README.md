# ConcertHub

Proyecto **full-stack** que combina:
- **Backend (PHP)** con autenticación JWT, CRUD de conciertos y endpoints para usuarios.
- **Frontend (React + Vite + Tailwind)** para la interfaz de usuario (compra de entradas, calendario, etc.).

---

## Índice

1. [Requisitos](#requisitos)  
2. [Clonar el proyecto](#clonar-el-proyecto)  
3. [Configurar el Backend (PHP)](#configurar-el-backend-php)  
4. [Configurar el Frontend (React + Vite)](#configurar-el-frontend-react--vite)  
5. [Inicializar la base de datos](#inicializar-la-base-de-datos)  
6. [Probar la aplicación](#probar-la-aplicación)  
7. [Licencias y dependencias](#licencias-y-dependencias)

---

## Requisitos

- **PHP** >= 8.0  
- **Composer**  
- **Node.js** >= 14  
- **npm** o **yarn**  
- **MySQL**  
- Gestor como HeidiSQL o phpMyAdmin (opcional)

---

## Clonar el proyecto

```bash
git clone https://github.com/alexiaruegut/concerts_m7.git
cd concerts_m7
```

Estructura:

```bash
concerts_m7/
├── backend/
└── frontend/
```

---

## Configurar el Backend (PHP)

```bash
cd backend
composer install
```

Crear archivo `.env` con los datos de conexión:

```dotenv
DB_HOST=localhost
DB_NAME=conciertos_db
DB_USER=root
DB_PASS=
JWT_SECRET=supersecreto123
```

Levantar servidor:

```bash
php -S localhost:8000 -t src
```

---

## Configurar el Frontend (React + Vite)

```bash
cd frontend
npm install
```

Crear archivo `.env`:

```dotenv
VITE_API_URL=http://localhost:8000
```

Levantar servidor:

```bash
npm run dev
```

---

## Inicializar la base de datos

1. Abre tu gestor (HeidiSQL, phpMyAdmin...)
2. Crea base de datos `conciertos_db`
3. Ejecuta el script `setup_db.sql` (está en la carpeta `backend/`)

Este script:
- Crea todas las tablas necesarias (`usuarios`, `conciertos`, `compras`, etc.)
- Inserta datos iniciales (admin, conciertos, tipos de entradas)

---

## Probar la aplicación

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend/API: [http://localhost:8000](http://localhost:8000)

Puedes iniciar sesión con:

```text
Email: admin@conciertos.com
Password: admin123
```

---

## Licencias y dependencias

### Frontend:
- **React**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Lucide React** (iconos)
- **Axios**

### Backend:
- **PHP** con **PDO**
- **Composer**
- **firebase/php-jwt** (autenticación JWT)
- **vlucas/phpdotenv** (variables de entorno)
- Middleware CORS manual incluido
