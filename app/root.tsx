// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { AuthProvider } from "~/context/authContext";
import type { BackendAddr } from "~/context/authContext";
import { envAllVars, envPublicVars } from "./backend/envVars";
// import conf from "./conf/config";
import { appwrite } from "./auth/index.js";
// import { appwriteCoreInstance } from "./willBePack";


export const links: LinksFunction = () => [

  { rel: "stylesheet", href: stylesheet }

];


export const loader = async () => {
  appwrite.setEndpoint(envAllVars.aw_server_endpoint);
  appwrite.setProjectId(envAllVars.aw_projectId);
  appwrite.setSecretKey(envAllVars.aw_secret_key);
  // check if dev mode
  if (process.env.NODE_ENV === "development") {
    console.log("APPWRITE SELF SIGN!!!")
    appwrite.setSelfSignTrue();
  }

  return envPublicVars;

}



export default function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const backendInfo = useLoaderData<typeof loader>();

  const backendAddr: BackendAddr = {
    aw_server_endpoint: String(backendInfo.aw_server_endpoint),
    aw_projectId: String(backendInfo.aw_projectId),
    databaseID: String(backendInfo.databaseID)
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider value={{ authStatus, setAuthStatus, backendAddr }}>
          <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

