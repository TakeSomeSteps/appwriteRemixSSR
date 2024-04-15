// // app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import { envAllVars, envBackendVars, envPublicVars } from "~/backend/envVars";
import { JWT_SESSION_COOKIE_NAME } from "~/constants/constants_names";

type SessionData = {
  [JWT_SESSION_COOKIE_NAME]: string;
  [key: string]: string;
};

type SessionFlashData = {
  error: string;
};

const envVars = envAllVars;
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: JWT_SESSION_COOKIE_NAME,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: [envVars.sessionSecret],
        // session is saved for one day
        // JWT token is valid for 15 minutes. 
        // need to generate a new one after that
        // should be done in the client
        // as long as the session is active :)
        expires: new Date(Date.now() + (60 * 60 * 24 * 1000)),
        // domain: envVars.currentDomain,
        // httpOnly: true,
        // secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };

