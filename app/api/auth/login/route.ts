import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Get the user data including name
  const user = data.user;
  const userName = user.user_metadata?.name || "User";

  // Session cookie is already set by Supabase auth helpers
  return NextResponse.json({ 
    message: "Login successful", 
    user: {
      id: user.id,
      name: userName,
      email: user.email
    } 
  });
}