<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h2 align="center">Signals & Xrays API 🚀</h2>
<p align="center">IoT Data Management System with RabbitMQ, MongoDB and NestJS</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-16.x-green" alt="Node.js Version" />
  <img src="https://img.shields.io/badge/NestJS-9.x-red" alt="NestJS Version" />
  <img src="https://img.shields.io/badge/MongoDB-Database-success" alt="MongoDB" />
  <img src="https://img.shields.io/badge/RabbitMQ-Messaging-orange" alt="RabbitMQ" />
  <a href="http://localhost:3000/api" target="_blank">
    <img src="https://img.shields.io/badge/docs-Swagger-blue" alt="Swagger Docs" />
  </a>
</p>

## Description
Signals & Xrays API  
IoT Data Management System built with **NestJS**, **MongoDB**, and **RabbitMQ**.  
Includes full CRUD operations, Swagger API docs, and end-to-end tests.

## ⚙️ Project setup

```bash
# install dependencies
npm install

# run RabbitMQ with Docker
docker run -d --hostname my-rabbit --name rabbit \
  -p 5672:5672 -p 15672:15672 rabbitmq:3-management

# RabbitMQ UI
http://localhost:15672
username: guest
password: guest


## Compile and Run the Project

```bash
# start the app in development mode
npm run start
# start the app in watch mode (auto-restart on changes)
npm run start:dev
# start the app in production mode (after build)
npm run start:prod
# run unit tests (services & controllers)
npm run test
# run end-to-end tests (full CRUD for Signals & Xrays)
npm run test:e2e
# generate a coverage report
npm run test:cov

## Deployment

When deploying this application to production, make sure you:
- Build the project first:
```bash
npm run build
Run the app in production mode:
npm run start:prod

Ensure that RabbitMQ and MongoDB are properly configured and running.

Set environment variables (e.g. database URI, RabbitMQ connection URL, port) according to your server setup.

Use a process manager such as PM2 or Docker to keep the service running reliably in production.

Example: Run RabbitMQ with Docker
docker run -d --hostname my-rabbit --name rabbit \
  -p 5672:5672 -p 15672:15672 rabbitmq:3-management

RabbitMQ Management UI: http://localhost:15672
Username/Password: guest / guest
Once deployed, the API will be accessible and Swagger docs can be viewed at:
 http://<your-server-host>:3000/api

## Resources 
Here are some useful resources related to this project:

**API Documentation (Swagger):**  
  Once the project is running, Swagger docs are available at:  
 [http://localhost:3000/api](http://localhost:3000/api)

 **RabbitMQ Management UI:**  
  Manage messages and queues here:  
 [http://localhost:15672](http://localhost:15672)  
  **Username/Password:** `guest / guest`

 **Testing Commands:**  
  ```bash
  npm run test        # Unit tests
  npm run test:e2e    # E2E tests
  npm run test:cov    # Test coverage

 Project Structure:

src/signals/   → Signals management  
src/xrays/     → X-rays management  
src/rabbitmq/  → RabbitMQ module & consumers  
src/producer/  → Sample data producer  
src/seed/      → Initial seed data  

Author:
 Developed by azarjamil 

Tech Stack:
Node.js · NestJS · RabbitMQ · MongoDB
