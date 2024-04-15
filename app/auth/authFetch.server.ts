import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";
import { UserClientModel } from "./User";
// import { FormStrategy } from "remix-auth-form";
import { AppwriteServiceClass } from "./appwrite.server";
import { API_FETCH_AUTH_NAME_PASS_STRATEGY } from "../constants/constants";
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
    console.log(email,
      password)

    try {
      console.log("-- STart --")

      const newSession = await fetch(appwrite.getEndpoint() + "/account/sessions/email", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": appwrite.getProjectId(),
          "X-Appwrite-Key": appwrite.getSecretKey(),
        }

      }).then(res => res.json())
        .then(res => {
          if (res.code || !res.$id) {
            throw new Error(res.message || "Credentials are invalid - check your email and password")
          }
          return res
        }).catch(e => {
          throw new Error(e.message);
        });
      // const user = await account22.get();
      const user = await fetch(appwrite.getEndpoint() + "/account", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": appwrite.getProjectId(),
          "X-Appwrite-session": newSession.secret,
        }

      }).then(res => res.json()).then(res => {
        if (res.code || !res.$id) {
          console.log("EROOR LOGIN REALLY 222?")
          console.log(res)
          throw new Error("Credentials are invalid - check your email and password")
        }
        return res
      }).catch(e => {
        throw new Error(e.message);
      });
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
  API_FETCH_AUTH_NAME_PASS_STRATEGY
);


