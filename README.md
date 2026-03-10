# 🐾 PawStore – Pet Supplies E-Commerce Platform

**Student Name:** R.A.N.Y.Ranasinghe
**Index Number:** FC221028

A full-stack pet store web application built with **React** (frontend) and **Spring Boot** (backend). 
This platform allows users to browse products for dogs, cats, and birds, manage a shopping cart, and perform authentication (login/signup).


## Features
- Add new products
- Delete products
- Update product price
- View all products

## Tech Stack
- Frontend: React
- Backend: Spring Boot
- Database: MySQL

## Installation

### Backend
1. Clone the repo
2. Navigate to `petstore-backend`
3. Run `mvn spring-boot`
4. Configure `application.properties` for your MySQL
5. Run `PetstoreBackendApplication.java`

### Frontend
1. Navigate to `petstore-frontend`
2. Run `npm install`
3. Run `npm run dev'

## API Endpoints

| Method | Endpoint               | Description          |
|--------|------------------------|--------------------|
| GET    | /api/products          | Get all products   |
| GET    | /api/products/{id}     | Get product by ID  |
| POST   | /api/products          | Add product        |
| PUT    | /api/products/{id}     | Update product     |
| DELETE | /api/products/{id}     | Delete product     |
