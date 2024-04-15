import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { getSession, destroySession } from "../backend/sessions";
import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import { authenticator } from "~/auth/auth.server";
import appwriteService from "~/appwrite/appwirteService";


export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("LOGOUT ACTION")
  console.log("APPWRITE ENDPOINT")
  return authenticator.logout(request, { redirectTo: "/" })
};

export const loader = async ({ request }: { request: Request }) => {
  console.log("LOGOUT LOADER")
  return authenticator.logout(request, { redirectTo: "/" })
};

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button>Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
