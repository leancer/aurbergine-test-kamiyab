
# CRUD Operations


> ### Simple CRUD Express App


## Getting Started

### Prerequisites

To install the dependency, you'll need Node.js version 20; follow these commands to proceed. :

```shell
nvm use 20
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
You can prefer .env.example file

Here are the required ones:
```
PORT  =  3000
MONGODB_URL  =
JWT_SECRET  =

AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_BUCKET=
AWS_BUCKET_FOLDER=
```

### Run the project

Run the following command to run the project:

```shell
npm run dev
```

### Build the project

The project is built with typescript so to run javascript version you have to create build:
```shell
npm run build
npm start
```
