JWT Node + react example.

Backend have a list of users (user: robot, passw: 0000), or user can create a temporary (only for the session) user.
Once the user is logged, the server return the jwt, that will be verified in order to give results from protected routes. 

Frontend simply store in localstorage the result of the logging process, and use everytime it calls a protected api, in the header

**
private and public key are in the git, but in a real example should be part of the environment and not in the repo.