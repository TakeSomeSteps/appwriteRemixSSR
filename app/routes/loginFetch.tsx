import { type MetaFunction, json, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import LoginFormPostBackend from "~/components/LoginFormPostBackend";
import { authenticator, authenticatorError } from "~/auth/auth.server";
import { commitSession, getSession } from "~/auth/session.server";
import { API_FETCH_AUTH_NAME_PASS_STRATEGY } from "~/auth";


export const meta: MetaFunction = () => {
  return [
    { title: "FETCH Login" },
    { name: "description", content: "Login To change the future!" },
  ];
};


export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("POSTING LOGIN INFO")


  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        message: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const authResponse = await authenticator.authenticate(API_FETCH_AUTH_NAME_PASS_STRATEGY, request, {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    // throwOnError: true,
  });

  return authResponse;
};



export const loader = async ({ request }: { request: Request }) => {

  console.log("index loader")
  // If logged in redirect to dashboard
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });


  let session = await getSession(request.headers.get("cookie"));

  let error = session.get(authenticator.sessionErrorKey);
  if (error && error.message) {
    return json({ ...error }, {
      headers: {
        'Set-Cookie': await commitSession(session) // You must commit the session whenever you read a flash
      }
    });
  } else {
    return null;
  }

};

export default function Index() {
  const loaderData: authenticatorError | null = useLoaderData();
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Login using FETCH API</h1>
      <LoginFormPostBackend postError={loaderData} routeToPost="loginFetch" />
    </>
  );
}
