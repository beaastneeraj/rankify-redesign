import { type NextRequest, NextResponse } from "next/server"
import connectDB from '@/lib/mongodb';
import Ranking from '@/models/Ranking';

const REGIONS = {
  North: [
    'Delhi', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Punjab', 'Uttarakhand', 'Uttar Pradesh', 'Chandigarh', 'Ladakh'
  ],
  South: [
    'Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana', 'Puducherry', 'Lakshadweep'
  ],
  East: [
    'Bihar', 'Jharkhand', 'Odisha', 'West Bengal', 'Andaman and Nicobar Islands'
  ],
  West: [
    'Goa', 'Gujarat', 'Maharashtra', 'Rajasthan', 'Dadra and Nagar Haveli', 'Daman and Diu'
  ],
  Central: [
    'Chhattisgarh', 'Madhya Pradesh'
  ],
  Northeast: [
    'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const year = Number(searchParams.get('year'));
  const category = searchParams.get('category')?.toLowerCase();
  const state = searchParams.get('state');
  const region = searchParams.get('region');
  const tlr = Number(searchParams.get('tlr')) || null;
  const rpp = Number(searchParams.get('rpp')) || null;
  const go = Number(searchParams.get('go')) || null;
  const oi = Number(searchParams.get('oi')) || null;
  const perc = Number(searchParams.get('perc')) || null;

  if (!year || !category) {
    return NextResponse.json({
      success: false,
      message: 'Year and category are required',
      data: null
    });
  }

  await connectDB();

  // Build query
  const query: any = { year, };
  if (category === 'engineering' || category === 'eng') {
    query.category = { $in: ['engineering', 'eng'] };
  } else {
    query.category = category;
  }
  if (region && region !== 'All' && REGIONS[region as keyof typeof REGIONS]) {
    query.state = { $in: REGIONS[region as keyof typeof REGIONS] };
  } else if (state && state !== 'All') {
    query.state = state;
  }

  // Fetch all matching institutions
  const institutions = await Ranking.find(query);
  if (!institutions.length) {
    return NextResponse.json({
      success: false,
      message: 'No institutions found for the given criteria',
      data: null
    }, { status: 404 });
  }

  // If parameter weights are provided, recalculate scores
  if (tlr !== null && rpp !== null && go !== null && oi !== null && perc !== null) {
    const totalWeight = tlr + rpp + go + oi + perc;
    let updatedInstitutions = institutions.map((inst: any) => {
      const tlrScore = Number(inst.TLR) || 0;
      const rpScore = Number(inst.RP) || 0;
      const goScore = Number(inst.GO) || 0;
      const oiScore = Number(inst.OI) || 0;
      const prScore = Number(inst.PR) || 0;
      const newScore = (
        (tlrScore * (tlr / totalWeight)) +
        (rpScore * (rpp / totalWeight)) +
        (goScore * (go / totalWeight)) +
        (oiScore * (oi / totalWeight)) +
        (prScore * (perc / totalWeight))
      );
      const calculatedScore = Number.isFinite(newScore) ? Number(newScore.toFixed(2)) : Number(inst.score) || 0;
      return {
        _id: inst._id,
        name: inst.name || inst.institution,
        institution: inst.name || inst.institution,
        city: inst.city || '',
        state: inst.state || '',
        score: Number(inst.score) || 0,
        rank: Number(inst.rank) || 0,
        calculatedScore
      };
    });
    updatedInstitutions.sort((a: any, b: any) => b.calculatedScore - a.calculatedScore);
    updatedInstitutions = updatedInstitutions.map((inst: any, index: number) => ({
      ...inst,
      calculatedRank: index + 1
    }));
    return NextResponse.json({
      success: true,
      message: 'Parameters applied successfully',
      data: updatedInstitutions
    });
  }

  // Map the institutions to ensure consistent field names
  const mappedInstitutions = institutions.map((inst: any) => ({
    id: inst._id.toString(),
    institution: inst.name || inst.institution,
    name: inst.name || inst.institution,
    city: inst.city,
    state: inst.state,
    rank: inst.rank,
    score: inst.score,
    TLR: inst.TLR || 0,
    RP: inst.RP || 0,
    GO: inst.GO || 0,
    OI: inst.OI || 0,
    PR: inst.PR || 0,
    year: inst.year,
    category: inst.category
  }));
  return NextResponse.json({
    success: true,
    message: 'Rankings retrieved successfully',
    data: mappedInstitutions
  });
}
