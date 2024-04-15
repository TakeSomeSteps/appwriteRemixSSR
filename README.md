
# General

Here is an implementation of appwrite SSR login with REMIX.run
There is a glitsch which i couldn't point out.
using the SDK to login, doesn't work as expected, while using FETCH works as expected.

Here are two working examples.

I have left many "console.log" to show this case. using the SDK - the server just stopps and freezes. 
it doesn't continue, and doesn't throw any error nor try-catch.

if Appwrite address is localhost, the SDK works like a charm.
if the Appwrite address is https on the web, it doesn't work.

make sure you have set up your .env file


```
# # LOCAL VARIABLES EXAMPLE
APPWRITE_ENDPOINT=http://localhost:3005/v1
APPWRITE_PROJECT_ID=some_project_id
APPWRITE_DATABASE_ID=some_database_id
APPWRITE_API_AUTH_KEY=some_auth_key

```

if you want an example remote server that the SSR node-appwrite SDK  doesn't work, contact me!

# just in case you're new here

1. clone the project (`git clone ...`)
2. run `npm install`
3. create a new file called `.env` - you can see `.env.example`
4. change these to your appwrite instance
5. run `npm run dev`
