// import conf from "~/conf/config";
import { Client, Account, ID, Databases, Query } from 'appwrite'


interface LoginUserAccount {
  email: string,
  password: string,
}

interface CreateUserAccount extends LoginUserAccount {
  name: string,
}

export class AppwriteServiceClass {
  public isInited = false
  protected client: Client | undefined
  protected account: Account | undefined
  protected database: Databases | undefined
  protected aw_server_endpoint: string | undefined
  protected projectId: string | undefined
  protected databaseId: string | undefined

  getClient(): Client | undefined {
    return this.client
  }

  getAccount(): Account | undefined {
    return this.account
  }
  setEndpoint(aw_server_endpoint: string) {
    this.aw_server_endpoint = aw_server_endpoint
    return this;
  }
  setProjectId(projectId: string) {
    this.projectId = projectId;
    return this;
  }
  setDatabaseId(databaseId: string) {
    this.databaseId = databaseId;
    return this;
  }

  async initAppwrite() {
    console.log("AppwriteServiceClass initAppwrite", this.projectId, this.aw_server_endpoint)
    if (this.aw_server_endpoint !== undefined && this.projectId !== undefined) {
      this.client = new Client();
      this.client.setEndpoint(this.aw_server_endpoint).setProject(this.projectId);

      this.account = new Account(this.client);
      this.database = new Databases(this.client)
      this.isInited = true
    }
  }
  //create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      if (this.isInited === false || this.account === undefined) {
        throw new Error("Appwrite Service not inited")
      }
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if (userAccount) {
        return this.login({ email, password })
      } else {
        return userAccount
      }
    } catch (error: any) {
      throw error
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {

      if (this.isInited === false || this.account === undefined) {
        throw new Error("Appwrite Service not inited")
      }
      return await this.account.createEmailSession(email, password)
    } catch (error: any) {
      throw error
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data)
    } catch (error) { }

    return false
  }

  async getCurrentUser() {
    try {
      if (this.isInited === false || this.account === undefined) {
        throw new Error("Appwrite Service not inited")
      }
      return this.account.get()
    } catch (error) {
      console.log("getcurrentUser error: " + error)

    }

    return null
  }

  async logout() {
    try {
      if (this.isInited === false || this.account === undefined) {
        throw new Error("Appwrite Service not inited")
      }
      return await this.account.deleteSession("current")
    } catch (error) {
      console.log("logout error: " + error)
    }
  }
}

const appwriteService = new AppwriteServiceClass()

export default appwriteService