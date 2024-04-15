// THIS COMPONENT IS NOT USED IN THE APP
// ITS NOT READY YET!!!
import { Form, useSubmit } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { validateEmail, validateMinimumLength } from '~/functions/inputValidators';
import { authenticatorError } from '~/auth/auth.server';
import Loading from './general/Loading';


type LoginFormPostBackendProps = {
  postError: authenticatorError | null;
  routeToPost: string;
};

export default function LoginFormPostBackend({ postError, routeToPost }: LoginFormPostBackendProps) {
  const submit = useSubmit();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [isAllValid, setIsAllValid] = useState(false)
  const [error, setError] = useState<string>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(e);
  }


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const email = formData.email;
    const password = formData.password;

    try {

      submit({
        email,
        password
      }, {
        // action: `/${window.location.pathname}`,
        action: `/${routeToPost}`,
        method: "POST",

      });
      setLoading(true);
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    }
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

  useEffect(() => {
    console.log("postError", postError)
    setLoading(false)
    if (postError !== null) {
      setError(postError.message)
    };

  }, [postError])

  // if (loading) {
  //   return <h2 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trying to login...</h2>
  // }

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-4 dark:text-gray-200">Login</h2>

      <Form onSubmit={handleSubmit}
        method="POST"
        action='/login'
        className="mt-8 space-y-6"
        navigate={false}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
            disabled={loading}
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
            disabled={loading}
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
          disabled={!isAllValid || loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {loading ? <Loading /> : "Login"}

        </button>
      </Form>
    </>

  );
}