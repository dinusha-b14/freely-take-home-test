Freely Code Test
===========================================================

## Setup

* Ensure you have installed the latest version of Node v14.x (lts/fermium). We recommend using Node Version Manager (NVM) to install different versions of Node.

`nvm install lts/fermium`

* After cloning this repo, use the following command to switch to the correct Node version:

`nvm use`

* Next run the following to install the required Node Modules

`npm install`

## Compiling the code

* Run the following to compile the code from Typescript to standard Javascript (ES6/7):

`npm run build`

* Alternatively, you can run the following to compile the code in real-time whilst modifying code:

`npm run watch`

## TODOS (Items I couldn't do)

* Subscription to new messages via WebSocket
* Test coverage
* More validations including uniqueness validations for things like emails and message topics
* Swagger specs for the APIs so that payloads and parameters are more clearly defined
