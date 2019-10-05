# Video Stream API

[![Build Status](https://travis-ci.org/rahman95/video-stream-api.svg?branch=master)](https://travis-ci.org/rahman95/video-stream-api)
[![Coverage Status](https://coveralls.io/repos/github/rahman95/video-stream-api/badge.svg?branch=master)](https://coveralls.io/github/rahman95/video-stream-api?branch=master)

## Roadmap 🗺

#### General

- [x] Set up Jest for testing
- [x] Add dotEnv lib and create `.env.example` file

#### Future Considerations

- [ ] Add Api docs
- [ ] Package into docker container for easy installation
- [ ] Add postman api endpoints export

#### Persistance

- [x] Use mongo to store data
- [x] Set up mongodb-memory-server for in memory testing
- [x] Create store for user tokens
- [x] Create store for stream identifier
- [ ] Create seeder file for dummy data
- [ ] Create command to seed
- [ ] Create command to clear db

#### Middlewares

- [x] Create CheckUserTokenMiddleware
  - [ ] Check user token exists and is valid
  
- [x] Create CheckStreamIdentfierMiddleware 
  - [ ] Check stream identifer exists and is valid

- [x] Create CheckUserCanStreamMiddleware
  - [ ] Check if user is not over alloted MAX_STREAM_COUNT

#### API Routes

- [x] Create [GET] - `/user/` route
  - [x] add logic to return user token

- [x] Create [GET] - `/user/{token}` route
  - [x] add logic to return all streams for user

- [x] Create [GET] - `/stream/user/{token}` route 
  - [ ] add logic to return new stream identifier if allowed

- [x] Create [PATCH] - `/stream/{streamId}/user/{token}` route 
  - [ ] add logic to keep alive stream i.e. heartbeat

- [x] Create [DELETE] - `/stream/{streamId}/user/{token}` route 
  - [ ] add logic to invalidate stream allowing new ones to be added

---- 
## Purpose 🔎

WIP

## Installation 🎯

WIP

## Usage 🚀

WIP

## Testing 🏋️‍♀️

WIP

