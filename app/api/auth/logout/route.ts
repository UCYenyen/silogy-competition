import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Return success response
  return NextResponse.json({ message: "Logged out successfully" });
}