import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { UserClientModel } from "./User";
import { AppwriteServiceClass } from "./appwrite.server";
import { SDK_AUTH_NAME_PASS_STRATEGY } from "../constants/constants";
import { FormStrategy } from "remix-auth-form";


export const appwrite = new AppwriteServiceClass()


// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<UserClientModel>(sessionStorage,);

export type authenticatorError = {
  message: string
}
// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {


    // throw new Error("Login failed because you are cute");

    console.log("------ Auth Strategy login START ------")
    let email = form.get("email");
    let password = form.get("password");

    try {
      console.log("-- STart --")
      const client = appwrite.getClient(true);
      console.log("client")
      console.log(client)
      const account = await new appwrite.sdk.Account(client);
      console.log("Login user")
      // console.log(email)
      const newSession = await account.createEmailPasswordSession(email as string, password as string)

      console.log("user new Session")
      console.log(newSession)
      console.log("... set session seceret ...")



      const newClient = appwrite.getClient();
      newClient.setSession(newSession.secret);
      console.log("OLD CLIENT")
      console.log(client)
      console.log("newClient")
      console.log(newClient)
      const userAccount = await new appwrite.sdk.Account(newClient);
      console.log("userAccount:")
      console.log(account)
      console.log("*** VS ***")
      console.log(userAccount)

      const sessionClient = appwrite.getClient(false);
      sessionClient.setSession(newSession.secret);
      const account22 = new appwrite.sdk.Account(sessionClient);

      console.log("--------- Get account info ---------------------------------------------------------------------")
      const user = await account22.get();
      console.log(user)

      console.log("SUCCESS !! SUCCESS !! SUCCESS !! SUCCESS !! SUCCESS !! SUCCESS !! SUCCESS !!  ")
      // const userPrefInfo = await account22.getPrefs()
      return {
        id: user.$id,
        ...user,
        secret: newSession.secret
      };

    } catch (e: any) {
      throw new Error("Login failed - " + e.message);
    }
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  SDK_AUTH_NAME_PASS_STRATEGY
);

