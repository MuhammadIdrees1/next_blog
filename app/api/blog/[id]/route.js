import db from "@/app/lib/db";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";
import { verifyJwtToken } from "@/app/lib/jwt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await db.connect();
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate("authorId")
      .select("-password");
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};

export const PUT = async () => {
  await db.connect();
  const id = req.params.id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);
  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { msg: "unauthorized (wrong or expires token)" },
      { status: 403 }
    );
  }
  try {
    const body = await req.json();
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "only author can update his blog" },
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};

export const Delete = async () => {
  await db.connect();
  const id = req.params.id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);
  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      { msg: "unauthorized (wrong or expires token)" },
      { status: 403 }
    );
  }

  try {
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return NextResponse.json(
        { msg: "only author can delete his blog" },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      { msg: "Successfully deleted Blog" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
