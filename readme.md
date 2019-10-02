# Video Stream API

[![Build Status](https://travis-ci.org/rahman95/video-stream-api.svg?branch=master)](https://travis-ci.org/rahman95/video-stream-api)

## Roadmap 🗺

#### General

- [x] Set up Jest for testing
- [x] Add dotEnv lib and create `.env.example` file
- [ ] Add Api docs
- [ ] Package into docker container for easy installation
- [ ] Create seeder file for dummy data

#### Persistance

- [ ] Use mongo to store data
- [ ] Create store for user tokens
- [ ] Create store for stream identifier

#### Middlewares

- [ ] Create CheckUserTokenMiddleware - check user token exists and is valid
- [ ] Create CheckStreamIdentfierMiddleware - check stream identifer exists and is valid
- [ ] Create CheckUserCanStreamMiddleware - check if user is not over alloted MAX_STREAM_COUNT

### API Routes

- [x] Create [GET] - `/user/` route to return user token
- [x] Create [GET] - `/user/{token}` route to return all streams for user
- [x] Create [GET] - `/stream/user/{token}` route to return new stream identifier if allowed
- [x] Create [PATCH] - `/stream/{streamId}/user/{token}` route to keep alive stream i.e. heartbeat
- [x] Create [DELETE] - `/stream/{streamId}/user/{token}` route to invalidates stream allowing new ones to be added.

---- 
## Purpose 🔎

WIP

## Installation 🎯

WIP

## Usage 🚀

WIP

## Testing 🏋️‍♀️

WIP

