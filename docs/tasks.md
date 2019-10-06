# Tasks 🔨

### General

- [x] Set up Jest for testing
- [x] Add dotEnv lib and create `.env.example` file
- [x] Add code coverage, aim for 90%+

### Testing
  - [x] Unit Tests
    - [x] Controllers
    - [x] Middlewares
    - [x] Models

  - [x] Integration Tests
    - [x] Controllers
    - [x] Middlewares
    - [x] Models
    - [x] Routes

### Future Considerations

- [x] Add Api docs
- [x] Add postman api endpoints export
- [ ] Package into docker container for easy installation
- [ ] Create seeder file for dummy data
- [ ] Create command to seed
- [ ] Create command to clear db

### Persistance

- [x] Use mongo to store data
- [x] Set up mongodb-memory-server for in memory testing
- [x] Create model for user tokens
- [x] Create model for stream identifier

### Functionality

- [x] Add way to check if user can still stream and has not reached limit
- [x] Add way to remove expired streams
- [x] Add way to get stream count
- [x] Add way to check stream is valid and has not expired
- [x] Add way to keep stream alive

### Middlewares

- [x] Create CheckUserTokenMiddleware
  - [x] Check user token exists and is valid
  
- [x] Create CheckStreamIdentfierMiddleware 
  - [x] Check stream identifer exists and is valid

- [x] Create CheckUserCanStreamMiddleware
  - [x] Check if user is not over alloted MAX_STREAM_COUNT

### API Routes

- [x] Create [GET] - `/user/` route
  - [x] add logic to return user token

- [x] Create [GET] - `/user/{token}` route
  - [x] add logic to return all streams for user

- [x] Create [GET] - `/stream/user/{token}` route 
  - [x] add logic to return new stream identifier if allowed

- [x] Create [PATCH] - `/stream/{streamId}/user/{token}` route 
  - [x] add logic to keep alive stream i.e. heartbeat

- [x] Create [DELETE] - `/stream/{streamId}/user/{token}` route 
  - [x] add logic to invalidate stream allowing new ones to be added
