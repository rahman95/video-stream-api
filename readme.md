# Video Stream API

[![Build Status](https://travis-ci.org/rahman95/video-stream-api.svg?branch=master)](https://travis-ci.org/rahman95/video-stream-api)
[![Coverage Status](https://coveralls.io/repos/github/rahman95/video-stream-api/badge.svg?branch=master)](https://coveralls.io/github/rahman95/video-stream-api?branch=master)

> An API prototype trying to tackle streaming and handling of concurrent streams.

| [Tasks](./docs/tasks.md) |
| ---------------------------------- |

## Background 🔎

#### Stack

This API is built in node using the following libraries:  `express`, `mongoose`, `dayjs` and `dotenv`. The application is quite lightweight and doesnt have any other dependencies. I feel like these are all the tools needed to achieve an ideal solution.

The web server is using `express`, the reason for using this library is that it is has good community support, its trusted and its also fast.

For persistance of data i decied to use `Mongo`, it can be used directly in node but i prefer the use of a library called mongoose. `Mongoose` makes mongo operations painless and simple. It also comes with a lot of nice features such as schemas, validation and references which allow a type of relationship between models that we usually find in relational databases.

For convienience and not wanting to re-invent the wheel I used dayjs and dotenv. `Dayjs` is a super lightweight momentJs alternative that follows a similiar api for its methods. I needed a library to parse, manipulate and compare dates for my tests and models to ensure data is correct and valid etc. `DotEnv` is a great library for setting enviroment variables in a safe manner. I used it to store several variables such as my `NODE_ENV`, `DB_CONN_URI` and server `PORT`.

#### Approach

The brief mentioned that users would be limited to a number of maximum concurrent streams, I made this configurable by adding it into a config file. It allows users to increase or decrease that limit very easily. 

The way the concurrent streams are handled is via a middleware that is attached to all stream routes which will ensure whether or not the user has access to a stream or not, and that will depend on how many existing concurrent streams they have open. Streams are associated to a user, and each stream has an `updatedAt` field which is supposed to be updated atleast every 90 seconds to keep it active. If the stream is no longer kept alive it will eventually expire and be removed.

This keep alive approach is my way of making sure a user is still consuming a particular stream. So if a user was to go away and no longer use the stream the `updatedAt` would not be updated hence leaving the stream expired to eventually be removed.

```
streams": {
  "keepAlive": {
    "requestInterval": 60,
    "maxInterval": 90
  },
  "maxConcurrent": 3
}
```
Above is a snippet of the config allowing the whole keep alive functionality I mentioned to be fully customisable.

## Installation 🎯

The API is very simple to setup;

  - clone this repo `git clone https://github.com/rahman95/video-stream-api.git`
  - install dependencies `npm install`
  - copy env file `cp .env.example .env`
  - set up env file with required values

## Usage 🚀

Once application has been setup, it can be started by running `npm run start`. This will set up the api server allowing it to be consumed.

##### Endpoints

- GET `/user` - UserCreate
- GET `/user/{token}` - UserShow
- GET `/stream/user/{token}` - StreamCreate
- PATCH `/stream/{strem}/user/{token}` - StreamPersist
- DELETE `/stream/{strem}/user/{token}` - StreamDelete

```
"router": {
  "prefix": "/api/v1"
},
```
I have also made it very easy and configurable to set route prefixes to the above endpoints. This can all be customised via the config file in the root of the project.

More information on these endpoints can be found by starting the server up and visiting the `/docs` endpoint. The endpoint contains a `swagger/openApi` interface with details about each endpoint.

I have also gone through the trouble of creating a postman collection export, which can be imported into `postman` and will make it easier for you to test each endpoint. This export can be found in the `api` folder in the root of the project.

## Testing 🏋️‍

This whole project was built using a TDD approach, i tried to stick to it as much as possible. I used `jest` for my testing library and tried to split tests into unit and integration. All unit tests are quite basic and make sure the application is set up as expect. The integration tests are a lot more intense and actually test the functionality as a whole. I have tested every controller, middleware, model and route. This has allowed me to reach a very good code coverage percentage, at the time of writting this it was around `99%`. To run these tests simply run `npm run test`.

I have also automated tests and coverage generation by using `TravisCI` to build, run my tests and generate coverage.

