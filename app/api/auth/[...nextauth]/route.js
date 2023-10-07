// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import db from "@/app/lib/db";

// import User from "@/app/models/User";
// import { signJwtToken } from "@/app/lib/jwt";
// import bcrypt from "bcrypt";
// import { NextResponse } from "next/server";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "text",
//           placeholder: "john@gmail.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials;
//         console.log(credentials);
//         await db.connect();

//         const user = await User.findOne({ email });

//         if (!user) {
//           return NextResponse.json("Invalid Input");
//         }

//         const comparePass = bcrypt.compare(password, user.password);

//         if (!comparePass) {
//           return NextResponse.json("Invalid Input");
//         } else {
//           const { password, ...currentUser } = user._doc;
//           const accessToken = signJwtToken(currentUser, { expiresIn: "6d" });

//           return { ...currentUser, accessToken };
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   async jwt(token, user) {
//     if (user) {
//       token.accessToken = user.accessToken;
//       token._id = user._id;
//     }
//     return token;
//   },
//   async session(session, token) {
//     if (token) {
//       session.user._id = token._id;
//       session.user.accessToken = token.accessToken;
//     }
//     return session;
//   },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import { signJwtToken } from "@/app/lib/jwt";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db.connect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid input");
        }

        // 2 parameters ->
        // 1 normal password -> 123123
        // 2 hashed password -> dasuytfygdsaidsaugydsaudsadsadsauads
        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser } = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "6d" });

          return {
            ...currentUser,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
