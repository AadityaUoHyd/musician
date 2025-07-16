# musician (Frontend)
React with typescript as frontend. MERN stack microservice project for music streaming application (e.g. Spotify).

## Services
- user-service - User authentication and management.
- song-service - Song management.
- admin-service - Admin panel for managing users, songs, and albums.
- musician - Frontend in React with TypeScript and Tailwind CSS.

## Technologies used:
- Frontend: React, Tailwind CSS, React Router, React Icons, React Hot Toast
- Backend: Node.js, Express.js, TypeScript, Mongoose, dotenv, bcrypt, jsonwebtoken, cors, nodemon, concurrently
- Database: MongoDB (users), Redis(cache), PostgreSQL(songs & album)
- Authentication: JWT
- Deployment: Vercel/AWS

## How to run project
First clone the repository and navigate to the root directory (musician-app). Insert the environment variables in the .env file.

```
# From root directory (musician-app)
> cd musician
> npm install
> npm run dev

# From root directory (abc-musician)
> cd admin-service
> npm install
> npm run build
> npm start

# From root directory (abc-musician)
> cd song-service
> npm install
> npm run build
> npm start

# From root directory (abc-musician)
> cd user-service
> npm install
> npm run build
> npm start
```

## Demo Users

```
# Admin
Email: aadiraj48@gmail.com
Password: Password$123

# User
Email: santosh@yopmail.com
Password: Password#123
```


## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

# Developed by
- Aaditya B Chatterjee (linkedin: https://www.linkedin.com/in/aaditya-bachchu-chatterjee-0485933b/)