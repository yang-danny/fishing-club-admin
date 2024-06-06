import  Review from '@/lib/models/Review';
import { connectToDB } from "@/lib/mongoDB";
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }
  

    await connectToDB()

    const { product, customer, order,title, rating, media,body } = await req.json()

    if (!title || !body) {
      return new NextResponse("Title and review paragraph are required", { status: 400 })
    }

    const newReview = await Review.create({
        product, customer, order,title, rating, media,body
    })

    await newReview.save()

    return NextResponse.json(newReview, { status: 200,headers: {
      "Access-Control-Allow-Origin": `${process.env.FRONT_END_URL}`,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    }, })
  } catch (err) {
    console.log("[review_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
export const dynamic = "force-dynamic";