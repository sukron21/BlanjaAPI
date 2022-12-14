<br />
<p align="center">

  <h3 align="center">Blanja API</h3>
  <p align="center">
    <image align="center" width="200" src='./public/blanja_logo.png' />
  </p>
  <p align="center">
    <a href="https://blanja-yakusadi.up.railway.app">View API Demo</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Project Structure](#project-structure)
  * [Package Modules](#package-modules)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [Related Project](#related-project)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

Blanja API is a RESTful API used in [Blanja Aplication](https://blanja-yksd.vercel.app). This API handle user management (customer & seller), get lists of products, product detail, and order operation (mybag, checkout, & myorder).

### Project Structure
```
|── BlanjaAPI
   |── public                           # Public assets
   |── src                              # Project source code
       |── config                       # Database configuration
       |── controller                   # Request controller
       |── helper                       # Cloudinary setting, Env setting, JWT generation and response
       |── middleware                   # Middleware configuration
       |── model                        # Database query model
       |── routes                       # API Endpoint routes
       |── socket                       # Socket model
   |── .env                             # Environment variables   
   |── .gitignore                       # Files that should be ignored  
   |── Blanja.postman_collection.json   # Postman Documentation
   |── db.sql                           # SQL database creation
   |── index.js                         # Index file
   |── README.md                        # Readme
```

### Package Modules

Below are lists of modules used in this API:

* [Node JS](https://nodejs.org/en/docs/)
* [Express JS](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Socket.IO](https://socket.io/)
* [Cloudinary](https://cloudinary.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [CORS](https://www.npmjs.com/package/cors)
* [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Multer](https://www.npmjs.com/package/multer)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Pg](https://www.npmjs.com/package/pg)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of things you need to use the application and how to install them.

* [node.js](https://nodejs.org/en/download/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/sukron21/BlanjaAPI.git
```
2. Install NPM packages
```sh
npm install
```
3. Add .env file at your backend root folder project, and add the following
```sh
DB_USERNAME = your_db_username
DB_HOST = your_db_host
DB_DATABASE = your_db_database_name
DB_PASSWORD = your_db_password
DB_PORT = your_db_port
PORT = 3001
JWT_SECRET = your_token_secret
CLOUD_NAME = your_cloudinary_name
API_KEY = your_cloudinary_api_key
API_SECRET = your_cloudinary_api_secret
```




<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b your/branch`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/yourbranch`)
5. Open a Pull Request



<!-- RELATED PROJECT -->
## Related Project
[Deploy APP](https://blanja-yksd.vercel.app/) used in this application.
* [Frontend](https://github.com/sukron21/BlanjaApp)


<!-- CONTACT -->
## Contact

Contributors name and contact info

* FULLSTACK TEAM (Backend & Frontend)
  * Muhammad Rhefa Farizi [@reijiren](https://github.com/reijiren)
  * Rahmat Furqon [@sukron21](https://github.com/sukron21)

* FRONTEND TIM
  * Ainur Ridwan [@ainurcoding](https://github.com/ainurcoding)
  * Ichsan Ramadhan Mokodompit [@IchsanR](https://github.com/IchsanR)
  * Muhamad Iqbal Aprido [@Iqbalapredo](https://github.com/Iqbalapredo)
