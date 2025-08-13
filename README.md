# Hotel Booking Project

## Quick Start

1. Create Database: In MySQL create a database named `hotel_booking_project`.
2. Configure Backend: Edit `back-end/src/main/resources/application.properties` and set your MySQL URL, username, and password so the Spring Boot app can connect.
3. Install Frontend Dependencies: In the `front-end` folder run `npm install` to download required packages.
4. Run Backend: From `back-end` start the Spring Boot application (e.g. `./mvnw spring-boot:run`).
5. Run Frontend: From `front-end` run `npm run dev` to start the Vite dev server.
6. Open the App: Visit the URL shown by Vite (usually `http://localhost:5173`). The frontend will call the backend API (default `http://localhost:8080`).

## Notes

- Make sure MySQL is running before starting the backend.
- Adjust ports or credentials in `application.properties` if they differ on your machine.
- Start both backend and frontend simultaneously for full functionality.
