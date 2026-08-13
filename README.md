# Car Rental Platform

A full-stack car-rental web application built as a Concordia University SOEN 341 team project.

The system supports customer reservations, vehicle availability, branch lookup, check-in/check-out workflows, reviews, and administrative management.

## My role

I served as the **Project Manager** for the six-person team, coordinating sprint planning, task ownership, project tracking, and delivery across the frontend and backend workstreams.

## Tech stack

- Java 17
- Spring Boot
- JavaScript / Node.js
- MongoDB
- Maven
- Google Maps integration

## Main features

### Customers
- Browse available vehicles
- Create, modify, and cancel reservations
- Choose pickup and return locations and dates
- Add optional equipment
- Find nearby rental branches
- Leave ratings and reviews

### Customer service
- Handle customer check-in and check-out
- Create reservations for walk-in customers
- Review rental agreements and billing information

### Administration
- Manage vehicles
- Manage user accounts
- Manage reservations

## Running locally

### Prerequisites

- Java 17+
- Maven
- Node.js
- MongoDB

### Setup

```bash
git clone https://github.com/Pluhs/bala_2sm-soen341projectW2024
cd bala_2sm-soen341projectW2024
```

Install frontend dependencies from the directory containing `package.json`:

```bash
npm install
```

Build the Spring Boot backend:

```bash
mvn clean install
```

Configure your own MongoDB connection string and any other required environment variables locally. **No production credentials should be committed to the repository.**

Run the backend:

```bash
mvn spring-boot:run
```

Run the frontend from its application directory:

```bash
npm start
```

## Project context

This repository is retained as an academic team project and is not one of my current flagship projects. My more recent work focuses on backend systems, distributed execution, developer infrastructure, and applied ML tooling.
