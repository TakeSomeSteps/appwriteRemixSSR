import sdk from 'node-appwrite';


// create an init function, that will hold the variables for the rest of the functions here
export type AppwriteServiceInitProps = {
  endpoint: string,
  projectId: string,
  secretKey: string,
}

export interface AppwriteServiceProps extends AppwriteServiceInitProps {
  isIntialized: boolean,
}

export class AppwriteServiceClass {
  public isInited = false
  protected aw_server_endpoint: string = ""
  protected aw_projectId: string = ""
  protected aw_databaseId: string = ""
  protected aw_secret: string = ""
  protected aw_client_secret: string = ""
  protected allowSelfSign: boolean = false

  private validateInited() {
    if (!this.isInited) {
      throw new Error("AppwriteServiceClass: not inited")
    }
    if (this.aw_server_endpoint === undefined || this.aw_projectId === undefined || this.aw_secret === undefined) {
      throw new Error("AppwriteServiceClass: aw_server_endpoint, aw_projectId, aw_secret are required")
    }
  }

  constructor(initVal?: AppwriteServiceInitProps) {
    if (!initVal) {
      return;
    }
    if (initVal.endpoint === undefined || initVal.projectId === undefined || initVal.secretKey === undefined) {
      throw new Error("AppwriteServiceClass: initVal.endpoint, initVal.projectId, initVal.secretKey are required")
    }
    this.init(initVal)
  }
  init(initVal: AppwriteServiceInitProps) {
    if (!initVal) {
      return;
    }
    if (initVal.endpoint === undefined || initVal.projectId === undefined || initVal.secretKey === undefined) {
      throw new Error("AppwriteServiceClass: initVal.endpoint, initVal.projectId, initVal.secretKey are required")
    }
    this.aw_server_endpoint = initVal.endpoint;
    this.aw_projectId = initVal.projectId;
    this.aw_secret = initVal.secretKey;
    this.isInited = true
  }

  async logout() {
    const client = this.getClientUser();
    const account = new sdk.Account(client);
    await account.deleteSession("current");
  }
  private checkInited() {
    if (this.aw_projectId !== "" || this.aw_secret !== "" || this.aw_server_endpoint !== "") {
      this.isInited = true;
    }
  }

  setSelfSignTrue() {
    this.allowSelfSign = true;
  }

  setEndpoint(endpoint: string) {
    this.aw_server_endpoint = endpoint;
    this.checkInited();
    return this;
  }
  setProjectId(projectId: string) {
    this.aw_projectId = projectId;
    this.checkInited();
    return this;
  }
  setDatabaseId(databaseId: string) {
    this.aw_databaseId = databaseId;
    this.checkInited();
    return this;
  }
  setClientSecret(clientSecret: string) {
    this.aw_client_secret = clientSecret;
    this.checkInited();
    return this;
  }
  setSecretKey(secretKey: string) {
    this.aw_secret = secretKey;
    this.checkInited();
    return this;
  }


  getClient(isInit: boolean = false): sdk.Client {
    // On each NEW interaction with the appwrite server, we need to create a new client

    this.validateInited();
    let client = new sdk.Client();
    client
      .setEndpoint(this.aw_server_endpoint) // Your API Endpoint
      .setProject(this.aw_projectId) // Your project ID

    if (isInit) {
      client.setKey(this.aw_secret) // Your secret API key
    }

    // TODO: IMPORTANT: Remove this line in production
    if (this.allowSelfSign) {
      client
        .setSelfSigned(true) // Use only on dev mode with a self-signed SSL cert
    }
    return client;
  }

  getClientUser(): sdk.Client {
    const client = this.getClient();
    if (this.aw_client_secret === "") {
      throw new Error("AppwriteServiceClass: aw_client_secret is required")
    }
    client.setSession(this.aw_client_secret)
    return client;
  }

  getAccount(): sdk.Account {
    const client = this.getClient();

    // Return the services you need

    return new sdk.Account(client);
  }
  getDatabaseId() {
    return this.aw_databaseId;
  }
  getEndpoint() {
    return this.aw_server_endpoint;
  }
  getProjectId() {
    return this.aw_projectId;
  }
  getSecretKey() {
    return this.aw_secret;
  }


  sdk: typeof sdk = sdk;

}
