import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"
import connectDB from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// POST: Save a new parameter preset
export async function POST(req: NextRequest) {
  await connectDB()
  
  // Get user session
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  
  const { parameters, name, category, year } = await req.json()
  
  if (!parameters || !name) {
    return NextResponse.json({ success: false, error: "Missing parameters or preset name" }, { status: 400 })
  }
  
  try {
    // Sanitize the name to avoid MongoDB key issues (e.g., keys can't contain dots)
    const sanitizedName = name.replace(/\./g, '_');
    
    // Find user and update their saved_presets
    const updatePath = `saved_presets.${sanitizedName}`;
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { 
          [updatePath]: {
            weights: parameters,
            category,
            year
          }
        }
      },
      { new: true, upsert: true }
    )
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        preset: {
          name,
          weights: parameters,
          category,
          year
        }
      }
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}

// GET: Retrieve all user parameter presets
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
      // User not found, but this is not an error
      return NextResponse.json({ success: true, data: { saved_presets: {} } })
    }
    
    // Ensure the saved_presets object exists
    const saved_presets = user.saved_presets || {}
    
    return NextResponse.json({ 
      success: true, 
      data: { 
        saved_presets
      }
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}

// DELETE: Remove a saved parameter preset
export async function DELETE(req: NextRequest) {
  await connectDB()
  
  // Get user session
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  
  const { name } = await req.json()
  
  if (!name) {
    return NextResponse.json({ success: false, error: "Missing preset name" }, { status: 400 })
  }
  
  try {
    // Escape periods in the name if present (MongoDB key issue)
    const sanitizedName = name.replace(/\./g, '\\u002e');
    const updatePath = `saved_presets.${sanitizedName}`;
    
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { $unset: { [updatePath]: "" } },
      { new: true }
    )
    
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Preset "${name}" deleted successfully`
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
