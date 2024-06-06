import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Event from "@/lib/models/Event";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { title, date, time, location, funder, body, media, createdAt } =
      await req.json();

    const existingEvent = await Event.findOne({ title });

    if (existingEvent) {
      return new NextResponse("Event already exists", { status: 400 });
    }

    if (!title || !media || !body) {
      return new NextResponse("Title, body and media are required", {
        status: 400,
      });
    }

    const event = await Event.create({
      title,
      date,
      time,
      location,
      funder,
      body,
      media,
      createdAt,
    });

    await event.save();

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.log("[Event_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const event = await Event.find().sort({ createdAt: "desc" });
    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.log("[Event_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
