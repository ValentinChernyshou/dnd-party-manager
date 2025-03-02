# User Management App

## Overview
This is a single-page application (SPA) built with Angular and NestJS that provides authentication and user management functionality. The application supports two types of users: **admins** and **regular users**. Regular users can view a list of users, while admins have additional privileges to edit user details.

## Tech Stack
- **Frontend:** Nx, Angular, PrimeNG, NgRx/store, NgRx/effects
- **Backend:** Node.js, NestJS, PostgreSQL
- **Package Manager:** pnpm

## Features
- User authentication (login screen on initial load)
- User roles: **Admin** and **Regular User**
- **Admin:** Can view and edit all users
- **Regular User:** Can only view the user list
- Editable user list for admins with a modal dialog
- Pre-seeded admin user in the database

## Installation
### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16+ recommended)
- **pnpm** (latest version)
- **PostgreSQL** (running on Neon)

### Clone the Repository
```sh
git clone https://github.com/ValentinChernyshou/user-manager.git
cd user-manager
```

### Install pnpm
```sh
npm install -g pnpm
```

### Install Dependencies
```sh
pnpm install
```

### Start the Application
To start both the backend and frontend in parallel, run:

```sh
pnpx nx run-many --target=serve --projects=backend,frontend --parallel
```

## Running the Application
- The frontend will be available at `http://localhost:4200`
- The backend API will be available at `http://localhost:3000`

## Usage
### Login Credentials
By default, the application is seeded with an admin user:

- **Admin User:**
  - Email: `admin@example.com`
  - Password: `admin`

### User Roles
- **Admin:** Can view and edit all users.
- **Regular User:** Can only view the user list.