import { useLoaderData } from '@remix-run/react';
import LogoutButton from '~/components/general/LogoutButton';
import { authenticator } from '~/auth/auth.server';
import { User } from '~/auth';

export const loader = async ({ request }: { request: Request }) => {
  const userInfo = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });


  return {
    userInfo: new User(userInfo)
  }
}


export default function Dashboard() {
  const nextLinks = useLoaderData<typeof loader>();

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-3 dark:text-gray-200">You are logged in</h2>
      <div className="flex justify-center text-white m-3">
        let's party now...
      </div>
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </>
  );
}