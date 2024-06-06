import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import  mongoose  from "mongoose";
import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import Review from "@/lib/models/Review";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const reviews = await Review.find({
      product: params.productId,
    })
    .populate({ path: "customer", model: Customer, })
    .populate({ path: "order", model: Order, })

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.log("[reviewId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
  
  export const dynamic = "force-dynamic";