import { connectToDB } from "@/lib/mongoDB";
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import PublishNews from "@/lib/models/PublishNews";

export const POST = async (req: NextRequest) => {
    try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    await connectToDB()

    const { title, author, publisher, body, media, createdAt } = await req.json()

    const existingNews = await PublishNews.findOne({ title })

    if (existingNews) {
      return new NextResponse("News already exists", { status: 400 })
    }

    if (!title || !media || !body) {
      return new NextResponse("Title, body and media are required", { status: 400 })
    }

    const news = await PublishNews.create({
        title, author, publisher, body, media, createdAt 
    })

    await news.save()

    return NextResponse.json(news, { status: 200 })
  } catch (err) {
    console.log("[news_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const publishNews = await PublishNews.find().sort({ createdAt: "desc" })
    return NextResponse.json(publishNews, { status: 200 })
  } catch (err) {
    console.log("[publishNews_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";