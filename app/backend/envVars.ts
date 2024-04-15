export const getPublicEnvFunc = () => {
  const aw_server_endpoint = process.env.APPWRITE_ENDPOINT || "DEFINE_ME_IN_ENV_FILE";
  const aw_projectId = process.env.APPWRITE_PROJECT_ID || "DEFINE_ME_IN_ENV_FILE";
  const databaseID = process.env.APPWRITE_DATABASE_ID || "DEFINE_ME_IN_ENV_FILE";
  const adminUiUrl = process.env.ADMIN_UI_URL || "DEFINE_ME_IN_ENV_FILE";
  return {
    aw_server_endpoint,
    aw_projectId,
    databaseID,
    adminUiUrl,
  }
}

export const getPrivateEnvFunc = () => {
  const sessionSecret = process.env.SESSION_SECRET || "s3cret1";
  const aw_secret_key = process.env.APPWRITE_API_AUTH_KEY || "s3cret1";
  return {
    sessionSecret,
    aw_secret_key,
  }
}


// So that the reading of the ENV will happen only once
// i split it into few params so that it will be easier to use

// this is for the public env
export const envPublicVars = {
  ...getPublicEnvFunc(),
}

// this is for the private env
export const envBackendVars = {
  ...getPrivateEnvFunc(),
}

// this is for all of the env
export const envAllVars = {
  ...envBackendVars,
  ...envPublicVars,
}