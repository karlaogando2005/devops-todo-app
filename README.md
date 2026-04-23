# devops-todo-app

Pipeline DevOps - Práctica Final



Aplicacion web de lista de tareas desarrollada como proyecto final del curso DevOps.



\## Tecnologias utilizadas



\- Frontend: HTML, CSS, JavaScript

\- Backend: Node.js + Express

\- Base de datos: SQLite

\- Contenedores: Docker + Docker Compose

\- CI/CD: GitHub Actions

\- Pruebas: Jest + Supertest



\## Requisitos previos



\- Node.js 20+

\- Docker Desktop

\- Git



\## Instalacion y uso



\### 1. Clonar el repositorio

git clone https://github.com/karlaogando2005/devops-todo-app.git

cd devops-todo-app



\### 2. Correr con Docker

docker-compose up --build



\- Frontend: http://localhost

\- Backend: http://localhost:3000/health



\### 3. Correr sin Docker

cd backend

npm install

npm start



Abrir frontend/index.html en el navegador.



\## Pruebas



cd backend

npm test



Pruebas incluidas:

\- GET /health retorna status ok

\- GET /tasks retorna una lista

\- POST /tasks crea una tarea nueva

\- POST /tasks sin titulo retorna error 400

\- PUT /tasks/:id cambia el estado de la tarea

\- DELETE /tasks/:id elimina la tarea



\## Pipeline CI/CD



El pipeline se ejecuta automaticamente en cada push a main y realiza:



1\. Pruebas automatizadas - Corre los 6 tests con Jest

2\. Build Docker - Construye la imagen del backend

3\. Analisis de codigo - Revisa calidad con ESLint



\## Monitoreo



\- Health check: GET http://localhost:3000/health

\- Logs: Se generan automaticamente en backend/app.log

\- Metricas: Uptime y timestamp disponibles en el endpoint /health



\## Estructura del proyecto



devops-todo-app/

├── frontend/          # HTML, CSS, JavaScript

├── backend/           # Node.js + Express + SQLite

│   ├── index.js       # Servidor principal

│   ├── app.test.js    # Pruebas automatizadas

│   └── Dockerfile     # Imagen Docker

├── tests/             # Carpeta de pruebas

├── .github/

│   └── workflows/

│       └── pipeline.yml  # Pipeline CI/CD

├── docker-compose.yml

└── README.md



\## Autor



Karla Ogando - karlaogando2005

