import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import connectDB from "@/lib/mongodb";
import Ranking from "@/models/Ranking";

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{
      category: string;
      year: string;
      institution: string;
      id: string;
    }>;
  }
) {
  console.log("Fetching report data...");

  // ✅ Await the params — yes, this is needed in some deep dynamic routes
  const { category, year, institution, id } = await context.params;


  // Step 1: Try to fetch the static JSON report from S3
  const bucketBaseUrl = "https://nsutai.s3.ap-south-1.amazonaws.com/data";
  const s3FileUrl = `${bucketBaseUrl}/nirf_${year}_${category}_json/${institution}.json`;

  let reportData = null;

  try {
    const response = await fetch(s3FileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    reportData = await response.json();
  } catch (err) {
    console.warn(`Could not fetch report from S3 for ${institution}:`, err);
  }

  // Step 2: Connect to DB and fetch from Mongo
  await connectDB();


  let mongoData = null;

  try {
    mongoData = await Ranking.findOne({ _id: id });
    if (!mongoData) {
      // Try finding by insId fallback
      mongoData = await Ranking.findOne({ insId: id });
    }
  } catch (err) {
    console.error("MongoDB error:", err);
  }

  if (!reportData && !mongoData) {
    return NextResponse.json(
      { success: false, message: "No data found for the specified institute" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Institute data retrieved",
    data: {
      fromFile: reportData ?? null,
      fromDB: mongoData ?? null,
    },
  });
}
