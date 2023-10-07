import db from "@/app/lib/db";
import Blog from "@/app/models/Blog";
import { verifyJwtToken } from "@/app/lib/jwt";
import { NextResponse } from "next/server";

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
    const blog = await Blog.findById(id);

    if (blog.likes.includes(decodedToken._id)) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== decodedToken._id.toString()
      );
    } else {
      blog.likes.push(decodedToken._id);
    }
    await blog.save();

    return NextResponse.json(
      { msg: "Successfully interacted with the blog" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
