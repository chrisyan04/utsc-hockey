import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/db/config";
import Admin from "@/db/models/admin";

let submission = {
  password: "",
};

export async function POST(request: NextRequest) {
  try {
    connectDB();

    submission = await request.json();

    // Hashing the password before saving it
    const hashedPassword = await bcrypt.hash(submission.password, 10);
    submission.password = hashedPassword;

    await new Admin({ ...submission }).save();

    return NextResponse.json(
      {
        message: `${submission.password} created successfully as admin password!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { type: "UnauthorizedError", error: "Invalid request" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    connectDB();

    const admins = await Admin.find({});

    return NextResponse.json(admins, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
