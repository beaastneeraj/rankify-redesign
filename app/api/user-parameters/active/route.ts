import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import connectDB from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// POST: Set the last active parameter preset
export async function POST(req: NextRequest) {
  await connectDB()
  
  // Get user session
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  
  const { preset_name } = await req.json()
  
  if (!preset_name) {
    return NextResponse.json({ success: false, error: "Missing preset name" }, { status: 400 })
  }
  
  try {
    // Update user's last active preset
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { last_active_preset: preset_name }
      },
      { new: true }
    )
    
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Active preset set to "${preset_name}"`
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}

// GET: Retrieve the user's last active preset
export async function GET(req: NextRequest) {
  await connectDB()
  
  // Get user session
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  
  try {
    const user = await User.findOne({ email: session.user.email }).lean()
    
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        last_active_preset: user.last_active_preset || null
      }
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
