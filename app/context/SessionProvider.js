"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => (
  console.log(session, "session"),
  (<SessionProvider session={session}>{children}</SessionProvider>)
);

export default Provider;
