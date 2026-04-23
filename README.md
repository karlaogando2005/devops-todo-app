# DevOps To-Do App

Aplicacion web de lista de tareas desarrollada como proyecto final del curso DevOps.

## Tecnologias utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Base de datos: SQLite
- Contenedores: Docker + Docker Compose
- CI/CD: GitHub Actions
- Pruebas: Jest + Supertest

## Requisitos previos

- Node.js 20+
- Docker Desktop
- Git

## Instalacion y uso

### 1. Clonar el repositorio
git clone https://github.com/karlaogando2005/devops-todo-app.git

### 2. Correr con Docker
docker-compose up --build

### 3. Correr sin Docker
cd backend && npm install && npm start

## Pruebas

cd backend && npm test

## Pipeline CI/CD

1. Pruebas automatizadas con Jest
2. Build de imagen Docker
3. Analisis de codigo con ESLint

## Monitoreo

- Health check: http://localhost:3000/health
- Logs: backend/app.log
- Metricas: uptime y timestamp en /health

## Autor

Karla Ogando - karlaogando2005
