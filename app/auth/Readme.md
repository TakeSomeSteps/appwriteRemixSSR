# Make sure you dont send back the user!!!

after validating the user using 

```
  const userInfo = await authenticator.isAuthenticated(request, {

    failureRedirect: "/",
  })

```

You will have the secret-session-key - in order to be able to query the database. 
make sure, that if you return this data to the user for some reason, use the `new User(userInfo)`

This will make sure that no secrets will be leaked!
