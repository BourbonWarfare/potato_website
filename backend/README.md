## Description

The backend API for the new BW website, written in NestJS and typescript

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# debug mode
$ npm run start:debug

# hot reload
$ npm run start:devHot

# production mode
$ npm run start:prod
```

## Debugging / Dev mode

1. get vsCode (included is a vscode launch.json file)
2. use the terminal in vsCode to run debug mode
3. click the debug icon in vsCode, and in the dropdown menu, select 'Attach NestJS' and run

## ENV variables

create a .env file, and add the following:

```
PORT='[your port number that you are running the API on here]'
MONGO_URI='[your mongo URI here]'
```
