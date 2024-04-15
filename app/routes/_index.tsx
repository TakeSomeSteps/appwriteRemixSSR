import { type MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator, authenticatorError } from "~/auth/auth.server";
import { commitSession, getSession } from "~/auth/session.server";


export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Login To change the future!" },
  ];
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
      <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Login</h1>
      <div className="flex flex-col">
        <Link to="/loginFetch" className="text-white mb-6">
          Login using SSR Fetch API
        </Link>

        <Link to="/loginSdk" className="text-white mb-6 ">
          Login using SSR SDK
        </Link>
        <Link to="/loginClient" className="text-white mb-6 ">
          Login using CLIENT sdk
        </Link>
      </div>
    </>
  );
}
