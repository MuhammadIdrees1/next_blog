import db from "@/app/lib/db";
import { verifyJwtToken } from "@/app/lib/jwt";
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await db.connect();
  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId");
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  await db.connect();

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);
  console.log(decodedToken, token, "to");
  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { msg: "unauthorized (wrong or expires token)" },
      { status: 403 }
    );
  }
  try {
    const body = await req.json();
    console.log(body);
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
