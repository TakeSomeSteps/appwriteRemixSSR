// import sdk from 'node-appwrite';
import { Client } from "node-appwrite";
import { envAllVars } from "~/backend/envVars";


// let client = new Client();



// for a case somewhere else in the code, i need to set the client
// export const appwriteBackendClient = client;

// for most cases, i'll just use the inited one.
export const appwriteBackendInited = () => {
  let client = new Client();
  client
    .setEndpoint(envAllVars.aw_server_endpoint) // Your API Endpoint
    .setProject(envAllVars.aw_projectId) // Your project ID
    .setKey(envAllVars.aw_secret_key) // Your secret API key

  if (process.env.NODE_ENV === "development") {
    client.setSelfSigned(true) // Use only on dev mode with a self-signed SSL cert
  }
  return client;
};
