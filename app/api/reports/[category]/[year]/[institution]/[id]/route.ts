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

  // Step 1: Try to fetch the static JSON report
  const folderName = `nirf_${year}_${category}_json`;
  const filePath = path.join(
    process.cwd(),
    "app",
    "api",
    "reports",
    "data",
    folderName,
    `${institution}.json`
  );

  let reportData = null;

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    reportData = JSON.parse(raw);
  } catch (err) {
    console.warn(`No file report for ${institution} found.`);
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
