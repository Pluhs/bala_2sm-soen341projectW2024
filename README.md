# Project README: bala_2sm-soen341projectW2024

## Car-rental Web Application

### Team Name: bala 2sm

### Team Members and Roles:
- Mohammed Al Assad (ID: 40252007) -> Project Manager
- Elias Hannoun (ID: 40246643) -> Product Manager
- Domat AlKhoury (ID: 40246644) -> Backend Developer
- Abdelmalek Mouhamou (ID: 40255934) -> Backend Developer
- Caline Batal (ID: 40250222) -> Frontend Developer
- Rawda Waez (ID: 40139173) -> Frontend Developer

### Repository: [REPOSITORY](https://github.com/Pluhs/bala_2sm-soen341projectW2024)

---

## Project Description:

The Car-rental Web Application is designed to simplify the vehicle rental process for short periods. It acts as an intermediary between customers, customer service representatives (CSR), and system administrators.

---

## User Types and Main Use Cases:

### 1. Customer
- **1.1 Browse vehicles for rent:** Access a catalog of available rental vehicles.
- **1.2 Start a reservation:** Select location, pickup/return date, and view matching vehicles.
  - 1.2.1 Add extra equipment during reservation.
- **1.3 View/Modify/Cancel reservation**
- **1.4 Find a branch:** Locate the nearest branch using postal code or airport.
- **1.5 Rating and review:** Provide feedback and ratings for rented vehicles and the rental experience.

### 2. Customer Service Representative
- **2.1 Check-in process:** For customers with or without reservations.
  - 2.1.1 Create a new reservation if no prior reservation exists.
  - 2.1.2 Confirm reservation, review rental agreement, process payment if reserved.
- **2.2 Check-out process:** Physically inspect the vehicle, review rental agreement, process billing, and confirm return.

### 3. System Administrator
- **3.1 CRUD operations:** On vehicles, user accounts, and reservations.

---

## How to Run the Project:

To run the project locally, follow these steps:

### Prerequisites
Before running the project, ensure you have the following installed:
- **Java JDK 17**: Required for Spring Boot. Download and install from [Oracle JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or [OpenJDK](https://adoptopenjdk.net/).
- **Maven**: Necessary for building and running Spring Boot applications. Download and install Maven from [Apache Maven Project](https://maven.apache.org/download.cgi).
- **Node.js**: For running the Node.js parts of the project. Download and install Node.js from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Download MongoDB Compass GUI from [MongoDB's official website](https://www.mongodb.com/try/download/compass) for database setup. Please Enter the following URL to access the database: `mongodb+srv://domat:MGHT1fguDhkjV3ru@cluster0.orye76q.mongodb.net/`.

### Steps to Run
1. **Clone the Repository**: 
```
git clone https://github.com/Pluhs/bala_2sm-soen341projectW2024
```
2. **Navigate to the Project Directory**: 
 ```
cd bala_2sm-soen341projectW2024
 ```
3. **Install Node.js Dependencies**: Run this in the directory where `package.json` is located: 
 ```
npm install
npm install --save google-maps-react --force
 ```
4. **Run Maven Build**: This step is crucial for Spring Boot projects. In the root directory of the Spring Boot application (where the `pom.xml` file is located), execute: 
 ```
mvn clean install
 ```
If Maven is installed correctly, this command will download all the required dependencies specified in your `pom.xml` file and build your project.

5. **Set Up Your Database**: Ensure MongoDB is running and set up according to the provided schema. 

6. **Configure Environment Variables**: Set necessary environment variables, such as database connection strings.

7. **Run the Application**:
- For Spring Boot (Backend), execute:
  ```
  mvn spring-boot:run
  ```
- For Node.js (Frontend), in the directory containing the frontend code (this will also launch the website), execute:
  ```
  npm start
  ```

---
demo video link for sprint 2:

https://drive.google.com/file/d/1AFjW-U4HNFzqbH6ykzYOARBt_YSvvV1M/view?usp=sharing
---

## Additional Notes:

- Make sure to adhere to the team rules and management guidelines outlined in the [wiki](https://github.com/Pluhs/bala_2sm-soen341projectW2024/wiki).
- Use the [task breakdown](https://docs.google.com/spreadsheets/d/1ECiNgExHn8Vs0-0Dh2Ej9bAQoWyZKQoUq7Es1rcfddY/edit#gid=0) to manage and assign tasks efficiently.

---

This README serves as a comprehensive guide for understanding the project, its functionalities, and how to set it up for development and usage. If you have any further questions or need assistance, please refer to the [wiki](https://github.com/Pluhs/bala_2sm-soen341projectW2024/wiki) or reach out to the project team members.
