import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import Event from "@/lib/models/Event";

export const GET = async (
  req: NextRequest,
  { params }: { params: { eventId: string } }
) => {
  try {
    await connectToDB();

    const events = await Event.findById(params.eventId);

    if (!events) {
      return new NextResponse(JSON.stringify({ message: "Events not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.log("[eventId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { eventId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let event = await Event.findById(params.eventId);

    if (!event) {
      return new NextResponse("Event not found", { status: 404 });
    }

    const { title, date, time, location, funder, body, media, createdAt } =
      await req.json();

    if (!title || !media || !body) {
      return new NextResponse("Title, body and media are required", {
        status: 400,
      });
    }

    event = await Event.findByIdAndUpdate(
      params.eventId,
      { title, date, time, location, funder, body, media, createdAt },
      { new: true }
    );

    await event.save();

    return NextResponse.json(event, { status: 200 });
  } catch (err) {
    console.log("[eventId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { eventId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Event.findByIdAndDelete(params.eventId);

    return new NextResponse("Event is deleted", { status: 200 });
  } catch (err) {
    console.log("[eventId]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
