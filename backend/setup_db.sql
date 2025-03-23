-- SCRIPT COMPLETO PARA INICIAR LA BASE DE DATOS
-- Incluye: usuarios, conciertos, tipos de entrada, imágenes actualizadas, y tablas necesarias

-- Eliminar tablas si ya existen
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS tipos_entrada;
DROP TABLE IF EXISTS conciertos;
DROP TABLE IF EXISTS usuarios;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE,
  ubicacion VARCHAR(100),
  rol ENUM('user','admin') DEFAULT 'user'
);

-- Tabla de conciertos
CREATE TABLE conciertos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  artista VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  ubicacion VARCHAR(100) NOT NULL,
  imagen TEXT
);

-- Tipos de entrada para cada concierto
CREATE TABLE tipos_entrada (
  id INT AUTO_INCREMENT PRIMARY KEY,
  concierto_id INT,
  tipo VARCHAR(50), -- Ej: VIP, Premium, Básica
  precio DECIMAL(10,2),
  FOREIGN KEY (concierto_id) REFERENCES conciertos(id) ON DELETE CASCADE
);

-- Tabla de compras
CREATE TABLE compras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  tipo_entrada_id INT,
  cantidad INT,
  total DECIMAL(10,2),
  fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  nombre_comprador VARCHAR(100),
  email VARCHAR(100),
  telefono VARCHAR(30),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (tipo_entrada_id) REFERENCES tipos_entrada(id) ON DELETE CASCADE
);

-- Insertar usuarios
INSERT INTO usuarios (nombre, email, password, fecha_nacimiento, ubicacion, rol) VALUES
('Admin', 'admin@admin.com', '$2y$10$xU0ZbkJQtgTtLVQw8DxxNOpOhTHoxCg0RDZm3bMyoDmyfR.9WXgju', '1990-01-01', 'Madrid', 'admin'),
('Usuario', 'user@user.com', '$2y$10$xU0ZbkJQtgTtLVQw8DxxNOpOhTHoxCg0RDZm3bMyoDmyfR.9WXgju', '2000-05-10', 'Valencia', 'user');

-- Insertar conciertos
INSERT INTO conciertos (nombre, artista, fecha, ubicacion) VALUES
('Post Malone Tour Europe', 'Post Malone', '2025-06-15', 'O2 Arena, Londres'),
('BLACKPINK World Tour', 'BLACKPINK', '2025-07-22', 'Wanda Metropolitano, Madrid'),
('TWICE 5TH WORLD TOUR', 'TWICE', '2025-08-03', 'Accor Arena, París'),
('The Weeknd Live 2025', 'The Weeknd', '2025-09-10', 'San Siro, Milán'),
('Stray Kids World Tour', 'Stray Kids', '2025-10-05', 'Palau Sant Jordi, Barcelona');

-- Insertar tipos de entradas para cada concierto
INSERT INTO tipos_entrada (concierto_id, tipo, precio) VALUES
(1, 'Básica', 55.00),
(1, 'Premium', 85.00),
(1, 'VIP', 120.00),
(2, 'Básica', 60.00),
(2, 'Premium', 90.00),
(2, 'VIP', 130.00),
(3, 'Básica', 50.00),
(3, 'Premium', 80.00),
(3, 'VIP', 110.00),
(4, 'Básica', 70.00),
(4, 'Premium', 100.00),
(4, 'VIP', 150.00),
(5, 'Básica', 65.00),
(5, 'Premium', 95.00),
(5, 'VIP', 140.00);

-- Actualizar imágenes de conciertos
UPDATE conciertos
SET imagen = 'https://dynamicmedia.livenationinternational.com/t/q/z/80cffafd-47cb-4a07-a44d-d677bc8efab9.jpg?format=webp&width=3840&quality=75'
WHERE id = 1;

UPDATE conciertos
SET imagen = 'https://networksites.livenationinternational.com/networksites/1t0bdi3t/bp-ticketmaster-2426x1365.jpg?format=webp&width=3840&quality=75'
WHERE id = 2;

UPDATE conciertos
SET imagen = 'https://dynamicmedia.livenationinternational.com/s/v/e/011ee5fc-c1ce-4849-842b-a43755f4cd1c.jpg'
WHERE id = 3;

UPDATE conciertos
SET imagen = 'https://dynamicmedia.livenationinternational.com/d/x/x/527f6551-d55c-4c97-be2b-90a38c88057e.jpg?format=webp&width=3840&quality=75'
WHERE id = 4;

UPDATE conciertos
SET imagen = 'https://blog.ticketmaster.es/wp-content/uploads/2024/11/Static_TM-ArtistImage_2426x1365_StrayKids_2025_National-v2.jpg'
WHERE id = 5;
