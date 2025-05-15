import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET - Fetch user parameters
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be logged in" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Parameters retrieved successfully",
      data: user.parameters || {},
    });
  } catch (error) {
    console.error("Error fetching user parameters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch parameters" },
      { status: 500 }
    );
  }
}

// POST - Save user parameters
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be logged in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { parameters, name } = body;

    if (!parameters || typeof parameters !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid parameters" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // If it's a named preset, save it to the user's parameters collection
    if (name) {
      // Initialize saved_presets if it doesn't exist
      if (!user.parameters.saved_presets) {
        user.parameters.saved_presets = {};
      }
      
      // Save the preset with its name
      user.parameters.saved_presets[name] = parameters;
    } else {
      // Save as the default parameters
      user.parameters = {
        ...user.parameters,
        default: parameters,
      };
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: name ? "Parameter preset saved successfully" : "Parameters saved successfully",
      data: user.parameters,
    });
  } catch (error) {
    console.error("Error saving user parameters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save parameters" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a saved parameter preset
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be logged in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const presetName = searchParams.get('name');

    if (!presetName) {
      return NextResponse.json(
        { success: false, message: "Preset name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if preset exists
    if (!user.parameters?.saved_presets?.[presetName]) {
      return NextResponse.json(
        { success: false, message: "Preset not found" },
        { status: 404 }
      );
    }

    // Delete the preset
    delete user.parameters.saved_presets[presetName];
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Parameter preset deleted successfully",
      data: user.parameters,
    });
  } catch (error) {
    console.error("Error deleting user parameters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete parameter preset" },
      { status: 500 }
    );
  }
}
