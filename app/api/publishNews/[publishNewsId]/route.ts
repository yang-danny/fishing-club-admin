import { connectToDB } from "@/lib/mongoDB";
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import PublishNews from "@/lib/models/PublishNews";


export const GET = async (
    req: NextRequest,
    { params }: { params: { publishNewsId: string } }
  ) => {
    try {
      await connectToDB();
  
      const publishNews = await PublishNews.findById(params.publishNewsId);
  
      if (!publishNews) {
        return new NextResponse(
          JSON.stringify({ message: "Publish News not found" }),
          { status: 404 }
        );
      }
  
      return NextResponse.json(publishNews, { status: 200 });
    } catch (err) {
      console.log("[publishNewsId_GET]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
  export const POST = async (
    req: NextRequest,
    { params }: { params: { publishNewsId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      let publishNews = await PublishNews.findById(params.publishNewsId);
  
      if (!publishNews) {
        return new NextResponse("Publish News not found", { status: 404 });
      }
  
      const { title, author, publisher, body, media, createdAt  } = await req.json();
  
      if (!title || !media || !body) {
        return new NextResponse("Title, body and media are required", { status: 400 });
      }
  
      publishNews = await PublishNews.findByIdAndUpdate(
        params.publishNewsId,
        { title, author, publisher, body, media, createdAt },
        { new: true }
      );
  
      await publishNews.save();
  
      return NextResponse.json(publishNews, { status: 200 });
    } catch (err) {
      console.log("[collectionId_POST]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  
  export const DELETE = async (
    req: NextRequest,
    { params }: { params: { publishNewsId: string } }
  ) => {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      await connectToDB();
  
      await PublishNews.findByIdAndDelete(params.publishNewsId);
      
      return new NextResponse("Publish News is deleted", { status: 200 });
    } catch (err) {
      console.log("[collectionId_DELETE]", err);
      return new NextResponse("Internal error", { status: 500 });
    }
  };