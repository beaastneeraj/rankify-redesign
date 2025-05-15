import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Ranking from "@/models/Ranking";

const REGIONS = {
  North: [
    "Delhi","Haryana","Himachal Pradesh","Jammu and Kashmir",
    "Punjab","Uttarakhand","Uttar Pradesh","Chandigarh","Ladakh",
  ],
  South: [
    "Andhra Pradesh","Karnataka","Kerala","Tamil Nadu",
    "Telangana","Puducherry","Lakshadweep",
  ],
  East: [
    "Bihar","Jharkhand","Odisha","West Bengal",
    "Andaman and Nicobar Islands",
  ],
  West: [
    "Goa","Gujarat","Maharashtra","Rajasthan",
    "Dadra and Nagar Haveli","Daman and Diu",
  ],
  Central: ["Chhattisgarh","Madhya Pradesh"],
  Northeast: [
    "Arunachal Pradesh","Assam","Manipur","Meghalaya",
    "Mizoram","Nagaland","Sikkim","Tripura",
  ],
} as const;

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const year      = Number(p.get("year"));
  const category  = p.get("category")?.toLowerCase() ?? "";
  if (!year || !category) {
    return NextResponse.json(
      { success: false, message: "year and category are required", data: null },
      { status: 400 },
    );
  }

  const state  = p.get("state");
  const region = p.get("region");

  // weight params (accept rpc|rpp, pr|perc)
  const tlrP = p.get("tlr");
  const rpcP = p.get("rpc") ?? p.get("rpp");
  const goP  = p.get("go");
  const oiP  = p.get("oi");
  const prP  = p.get("pr")  ?? p.get("perc");

  const tlrW = tlrP ? Number(tlrP) : 0;
  const rpcW = rpcP ? Number(rpcP) : 0;
  const goW  = goP  ? Number(goP)  : 0;
  const oiW  = oiP  ? Number(oiP)  : 0;
  const prW  = prP  ? Number(prP)  : 0;

  const isCustom = tlrP && rpcP && goP && oiP && prP;

  await connectDB();

  // build Mongo query
  const query: any = { year };
  query.category =
    category === "engineering" || category === "eng"
      ? { $in: ["engineering","eng"] }
      : category;

  if (region && region !== "All" && REGIONS[region as keyof typeof REGIONS]) {
    query.state = { $in: REGIONS[region as keyof typeof REGIONS] };
  } else if (state && state !== "All") {
    query.state = state;
  }

  const docs = await Ranking.find(query);
  if (!docs.length) {
    return NextResponse.json(
      { success: false, message: "No institutions found", data: null },
      { status: 404 },
    );
  }

  /* ---------- custom weighting --------------------------------------- */
  if (isCustom) {
    const total = tlrW + rpcW + goW + oiW + prW;

    const scored = docs.map((d: any) => {
      const tlr = Number(d.TLR) || 0;
      const rpc = Number(d.RPC) || 0;
      const go  = Number(d.GO)  || 0;
      const oi  = Number(d.OI)  || 0;
      const pr  = Number(d.PR)  || 0;

      const w =
        (tlr * tlrW/total) +
        (rpc * rpcW/total) +
        (go  * goW /total) +
        (oi  * oiW /total) +
        (pr  * prW /total);

      return {
        _id: d._id,
        id:  d._id.toString(),
        insId: d.insId,
        name:  d.name,
        city:  d.city,
        state: d.state,
        rank:  d.rank,
        score: Number(d.score) || 0,       // original
        calculatedScore: Number(w.toFixed(2)),
        pdf: d.pdf,
        img: d.img,
        newRank: 0
      };
    });

    scored.sort((a,b) => b.calculatedScore - a.calculatedScore);
    scored.forEach((d,i) => (d.newRank = i + 1));

    return NextResponse.json({
      success: true,
      message: "parameters applied successfully",
      data: scored,
    });
  }

  /* ---------- default (raw) ------------------------------------------ */
  const mapped = docs.map((d: any) => ({
    _id: d._id,
    id:  d._id.toString(),
    insId: d.insId,
    name:  d.name,
    city:  d.city,
    state: d.state,
    rank:  d.rank,
    score: d.score,
    TLR:   d.TLR,
    RPC:   d.RPC,
    GO:    d.GO,
    OI:    d.OI,
    PR:    d.PR,
    pdf:   d.pdf,
    img:   d.img,
    year:  d.year,
    category: d.category,
  }));

  return NextResponse.json({
    success: true,
    message: "rankings retrieved",
    data: mapped,
  });
}
