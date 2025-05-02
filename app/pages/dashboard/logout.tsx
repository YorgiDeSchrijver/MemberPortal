import { signOut } from "aws-amplify/auth";
import { redirect } from "react-router";

// THIS IS AN ACTION ROUTE
// This route is used to handle the logout action

export async function action() {
  try {
    await signOut();
    return redirect('/login');
  } catch (error) {
    return redirect('/dashboard');
  }
}