# Restaurant Management System (RMS)

## Table of Contents

- [Overview](#overview)
- [Backend Architecture](#backend-architecture)
- [Core Functionalities](#core-functionalities)
- [Key Features](#key-features)
- [Challenges Faced](#challenges-faced)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Contributions](#contributions)

## Overview

The Restaurant Management System (RMS) is a web application designed to facilitate restaurant operations. It enables restaurant owners to manage menus, orders, and inventory, while offering customers an intuitive platform to browse, order, and track their orders in real-time.

## Backend Architecture

The backend of RMS is built using **Spring Boot** for robust service handling and **MySQL** for managing data storage. **JWT Authentication** is implemented to ensure secure user access. Key components include:

- **Spring Boot**: Powers the backend, handling user roles, orders, and inventory.
- **MySQL**: Manages user, order, and restaurant data efficiently.
- **JWT**: Ensures secure authentication for various user roles (Admin, Restaurant Owner, Customer).

## Core Functionalities

- **User Registration & Authentication**: Secure JWT-based registration and login for each role.
- **Restaurant Management**: Allows owners to manage restaurant profiles and menus.
- **Order Management**: Provides real-time order updates, including notifications.
- **Cart Management**: Customers can add, update, and remove items in their cart.

## Key Features

- **Role-Based Access Control**: Each user has specific access based on their role.
- **Responsive UI**: Optimized frontend for all screen sizes, built with **React**.
- **Real-Time Notifications**: Email notifications for order confirmations and updates.
- **Inventory Management**: Enables restaurant owners to manage stock availability.

## Challenges Faced

- **Database Setup**: Initial challenges with MySQL integration resolved by reconfiguring database schema.
- **Real-Time Updates**: Managing real-time order updates across various user roles required optimized backend handling.
- **JWT Integration**: Implemented secure authentication with JWT to protect sensitive data and restrict access based on user roles.

## Acknowledgements

We extend our gratitude to our professors and mentors for their guidance throughout this project. Special thanks to the open-source community for resources and libraries that enhanced our development.

## Authors

- **Ketan Ghungralekar**
- **Abhinav Kumar**
- **Pratham Chawdhry**
- **Soma Datta**

## Installation

### Clone the Repository

```bash
git clone "https://github.com/KetanGhungralekar/FeastFinder-Hub.git"
```
## For Frontend
```bash
cd /frontend
npm i
npm start
```

## For Backend
```bash
mvn clean install
java -jar target/Online-Food-Ordering-0.0.1-SNAPSHOT.jar
