# Video Stream API

## Roadmap 🗺

#### General
- [ ] Set up Jest for testing
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

- [ ] Create [GET] - `/user/` route to return user token
- [ ] Create [POST] - `/stream?token=USER_TOKEN` route to return stream identifier
- [ ] Create [PATCH] - `/stream/{streamId}?token=USER_TOKEN` route to keep alive stream i.e. heartbeat
- [ ] Create [DELETE] - `/stream/{streamId}?token=USER_TOKEN` route to invalidates streamId allowing new ones to be added.

----
## Purpose 🔎

WIP

## Installation 🎯

WIP

## Usage 🚀

WIP

## Testing 🏋️‍♀️

WIP

