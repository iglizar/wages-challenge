# Wage Access Transaction Processor

Full-stack application built with TypeScript, Prisma, Express, and React. The entire application is containerized with Docker and uses Prisma in the backend as an ORM to connect to PostgreSQL database. The frontend is built with React and Tailwind CSS for UI. Includes employee management and wage data handling features with currency conversion.

## Project Overview

### Backend API
The backend API handles wage data and access requests. It calculates an employee's available balance and processes wage access requests considering the employee's available balance. The API uses JSON for input/output, which includes employee details and request statuses.

### Frontend Web Application
The frontend is a simple web application that allows employees to view their available balance and submit requests for wage access. The interface is user-friendly and responsive.

### Database Setup
The database schema is set up to store users, wage information, and requests. PostgreSQL is used as the database.

## Requirements
* Docker
* Git

### Containerization
The backend, frontend, and database are containerized using Docker. A `docker-compose` file is provided for easy local deployment.

## Setup Instructions

1. Clone this repository to your local machine.
```bash
git clone <repository_url>
```
2. Navigate to the cloned folder
```bash
cd wages-challenge
```
3. Run `docker-compose up --build` in the root directory and wait for the application to start.

4. Access the frontend application at `http://localhost:3000`. Alternative ports are:
	- Backend API: `http://localhost:3001` 
	- Database: `http://localhost:5432`