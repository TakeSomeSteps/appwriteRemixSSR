// import { Client, Account, ID, Databases, Query } from 'appwrite'

import { Client, Account } from 'appwrite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '~/appwrite/appwirteService';
import Cookies from 'js-cookie';
import useAuth from '~/context/useAuth';
import { validateEmail, validateMinimumLength } from '~/functions/inputValidators';
import { useLoaderData, useSubmit } from "@remix-run/react";


export default function LoginForm(props: { envAllVars: any }) {
  const { envAllVars } = props;
  console.log("envAllVars FORM ", envAllVars)
  let navigate = useNavigate();
  const submit = useSubmit();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(true)
  const [isAllValid, setIsAllValid] = useState(false)
  const [error, setError] = useState<string>()

  const { setAuthStatus } = useAuth()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(e);
  }

  const appwriteLogout = async () => {
    // delete all cookies
    setLoading(true);
    const client = new Client()
      .setEndpoint(envAllVars.aw_server_endpoint) // Your API Endpoint
      .setProject(envAllVars.aw_projectId);                 // Your project ID

    const account = new Account(client);
    await account.deleteSessions('current')
    setLoginSuccess(false);
    setLoading(false);

  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    // get the email and password from the form
    const email = formData.email;
    const password = formData.password;
    // const client: Account | undefined = appwriteService.getAccount();
    //validate that i got the account from appwrite



    const client = new Client()
      .setEndpoint(envAllVars.aw_server_endpoint) // Your API Endpoint
      .setProject(envAllVars.aw_projectId);                 // Your project ID

    const account = new Account(client);
    const promise = account.createEmailPasswordSession(email, password);
    promise.then((response) => {
      console.log("LOGIN SUCCESS!!", response);
      account.createJWT().then((jwtResponse) => {
        console.log("GENERATED JWT", jwtResponse.jwt)
        setLoading(false)
        setLoginSuccess(true);
      }).catch((error) => {
        console.log("JWT GENERATE ERROR", error);
        setLoading(false)
        setError(error.message)
      });
    }).catch((error) => {
      console.log("LOGIN ERROR", error);
      setLoading(false)
      setError(error.message)
    });

  }

  const validateInfo = () => {
    if (formData.email.length === 0 && formData.password.length === 0) {
      setError("");
      setIsAllValid(false)
      return;
    }
    if (validateEmail(formData.email) === false) {
      setError("Please enter a valid email")
      setIsAllValid(false)
      return;
    }
    if (validateMinimumLength(formData.password, 8) === false) {
      setError("Password should be at least 8 characters")
      setIsAllValid(false)
      return;
    }
    setError("")
    setIsAllValid(true)
  }

  useEffect(() => {
    validateInfo();

  }, [formData])

  if (loading) {
    return <h2 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Loading...</h2>
  }

  // i'm too lazy to split this one..
  if (loginSuccess) {
    return (<>
      <h2 className="text-xl font-bold text-center mb-4 dark:text-gray-200 m-3">Login Client SUCCESS</h2>
      <button
        type="button"
        onClick={appwriteLogout}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

        logout
      </button>
    </>)
  }


  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4 dark:text-gray-200">Login Client</h2>

      <form onSubmit={handleSubmit} action='/index' method='POST' className="mt-8 space-y-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address :)</label>
          <input
            type="email"
            id="email"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <a href="/forgotPassword"
            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
            Password?</a>
        </div>
        {/* <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
        </div>
      </div> */}
        <div className="text-red-500 text-center">
          {error}
        </div>
        <button
          type="submit"
          // disabled={isAllValid === false}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Login
        </button>
      </form>
    </>

  );
}