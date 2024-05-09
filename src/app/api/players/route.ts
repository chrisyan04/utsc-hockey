import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/config";
import Player from "@/db/models/player";

let submission = {
  name: "",
  number: 0,
  position: "",
  hometown: "",
  height: "",
  weight: "",
  shoots: "",
  dob: "",
  stats: [
    {
      year: 0,
      points: 0,
      goals: 0,
      assists: 0,
      pim: 0,
      gamesPlayed: 0,
    },
  ],
};

export async function POST(request: NextRequest) {
  try {
    connectDB();

    submission = await request.json();

    await new Player({ ...submission }).save();

    return NextResponse.json(
      {
        message: `${submission.name} created successfully as a player!`,
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

    const players = await Player.find({});

    return NextResponse.json(players, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { number, ...updatedDetails } = await request.json();
    const player = await Player.findOneAndUpdate(
      { number: number },
      updatedDetails,
      {
        new: true,
      }
    );
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Player details updated successfully!` },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}