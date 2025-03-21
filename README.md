# Conciertos M7

¡Bienvenido/a! Este es un proyecto **full-stack** que combina:
- **Backend (PHP)** con autenticación JWT, CRUD de conciertos y endpoints para usuarios.
- **Frontend (React + Vite + Tailwind)** para la interfaz de usuario y consumo de la API.

---

## Índice
1. [Requisitos](#requisitos)
2. [Clonar el proyecto](#clonar-el-proyecto)
3. [Configurar el Backend (PHP)](#configurar-el-backend-php)
4. [Configurar el Frontend (React + Vite)](#configurar-el-frontend-react--vite)
5. [Probar la aplicación](#probar-la-aplicación)
6. [Uso de la API en Postman (Opcional)](#uso-de-la-api-en-postman-opcional)
7. [Troubleshooting](#troubleshooting)
8. [Contribución](#contribución)
9. [Licencia](#licencia)

---

## Requisitos

- **PHP** \(\>= 8.0\) con extensiones `pdo_mysql`, `mbstring`, `openssl`, etc.
- **Composer** (para instalar dependencias de PHP).
- **Node.js** \(\>= 14\) y **npm** (o **yarn**).
- **MySQL** (puedes usar Laragon, XAMPP, WAMP, etc.).

---

## Clonar el proyecto

1. Abre tu terminal en la ubicación deseada en tu nuevo PC.
2. Ejecuta:

   ```bash
   git clone https://github.com/alexiaruegut/concerts_m7.git
   cd concerts_m7
Verás dos carpetas principales en el repositorio:

Copiar
Editar
concerts_m7/
├── backend/
└── frontend/
Configurar el Backend (PHP)
Entra a la carpeta backend:

bash
Copiar
Editar
cd backend
Instala las dependencias con Composer:

bash
Copiar
Editar
composer install
Crea un archivo .env en backend/ (basado en tu configuración de MySQL). Por ejemplo:

dotenv
Copiar
Editar
DB_HOST=localhost
DB_NAME=conciertos_db
DB_USER=root
DB_PASS=
JWT_SECRET=supersecreto123
DB_HOST: Host de la base de datos.
DB_NAME: Nombre de la base de datos.
DB_USER: Usuario de la base de datos.
DB_PASS: Contraseña de la base de datos.
JWT_SECRET: Clave secreta para firmar tokens JWT.
Crea la base de datos en MySQL.

Puedes importar un script .sql (si existe en el proyecto) o crear manualmente las tablas con un script como crear_base_datos_conciertos.sql.
Verifica que el nombre en tu .env (DB_NAME) coincida con la BD creada.
Inicia el servidor PHP de forma rápida con:

bash
Copiar
Editar
php -S localhost:8000 -t src
Tu API estará disponible en:

arduino
Copiar
Editar
http://localhost:8000/
Alternativamente, puedes usar Laragon/XAMPP y apuntar DocumentRoot a la carpeta backend/src.

Configurar el Frontend (React + Vite)
Regresa a la carpeta raíz y entra a frontend:

bash
Copiar
Editar
cd ../frontend
Instala las dependencias de Node:

bash
Copiar
Editar
npm install
O bien:

bash
Copiar
Editar
yarn install
Crea un archivo .env en frontend/ con la ruta del backend. Por ejemplo:

dotenv
Copiar
Editar
VITE_API_URL=http://localhost:8000
Inicia el servidor de desarrollo con Vite:

bash
Copiar
Editar
npm run dev
Normalmente, se abrirá en:

arduino
Copiar
Editar
http://localhost:5173/
Probar la aplicación
Backend:
Ve a http://localhost:8000/concerts/list.php en tu navegador.
Deberías ver un JSON con conciertos o un mensaje.

Frontend:
Ve a http://localhost:5173/ en tu navegador.
Deberías ver la página de inicio con el carrusel de conciertos.

Uso de la API en Postman (Opcional)
Registro
http
Copiar
Editar
POST http://localhost:8000/auth/register.php
Login
http
Copiar
Editar
POST http://localhost:8000/auth/login.php
Lista de conciertos
http
Copiar
Editar
GET http://localhost:8000/concerts/list.php
Crear/Editar/Borrar conciertos
Necesitas token de admin en el header:

css
Copiar
Editar
Authorization: Bearer {TOKEN}
Crear

http
Copiar
Editar
POST http://localhost:8000/concerts/create.php
Editar

http
Copiar
Editar
PUT http://localhost:8000/concerts/update.php
Borrar

http
Copiar
Editar
DELETE http://localhost:8000/concerts/delete.php
Troubleshooting
CORS:
Si obtienes un error de CORS ("No 'Access-Control-Allow-Origin' header is present"), agrega las cabeceras CORS en tu servidor PHP o configura .htaccess.

Errores de MySQL:
Asegúrate de que tus credenciales en el .env del backend coincidan con tu servidor MySQL.

Dependencias faltantes:
Asegúrate de haber ejecutado:

bash
Copiar
Editar
composer install
npm install
Ramas Git:
Comprueba si estás en la rama main o master y haz git push -u origin main según tu configuración.

Contribución
Haz un Fork de este repositorio.
Crea una rama con tu feature o fix:
bash
Copiar
Editar
git checkout -b feature/nueva-funcionalidad
Haz Commit y Push a tu Fork.
Abre un Pull Request a la rama principal.
