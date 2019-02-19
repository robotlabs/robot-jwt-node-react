JWT Node + react example.

Backend have a list of users, or user can create a temporary (only for the session) user.
Once the user is logged, the server return the jwt, that will be used to access protected routes. 

Frontend simply store in localstorage the result of the logging process, and use everytime it calls a protected api, in the header