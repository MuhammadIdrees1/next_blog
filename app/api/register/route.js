import db from "@/app/lib/db";
import bcrypt from "bcrypt";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await db.connect();
  try {
    const body = await req.json();
    const { username, email, password } = body;
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return NextResponse.json(
        { msg: "User is Already exists" },
        { status: 500 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const { newpassword, ...user } = newUser._doc;
    return NextResponse.json({ msg: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
