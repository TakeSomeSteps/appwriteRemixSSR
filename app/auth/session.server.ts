import { createCookieSessionStorage } from "@remix-run/node";

// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({

  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    domain: process.env.NODE_ENV === "production" ? ".cockpit.management" : "localhost", // set your domain
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["sadf324dsa234vfdam"], // replace this with an actual secret
    secure: process.env.NODE_ENV === "production", // enable this in prod only
    maxAge: 60 * 60 * 24 * 1000, // 24 hours
  },
});

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;