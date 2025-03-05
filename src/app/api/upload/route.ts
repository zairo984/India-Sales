import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Store in .env
const REPO_OWNER = "zairo984"; // Your GitHub username
const REPO_NAME = "India-Sales"; // Your repo name
const BRANCH = "main"; // Change if needed

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileContent } = await req.json();

    // Ensure filename is safe
    const safeFileName = `${Date.now()}-${fileName.replace(/\s+/g, "-")}`;
    const filePath = `uploads/${safeFileName}`; // GitHub file path

    // Upload to GitHub
    const response = await axios.put(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`,
      {
        message: "Upload image via API",
        content: fileContent, // Base64 content
        branch: BRANCH,
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    // Generate the public image URL
    const imageUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filePath}`;

    return NextResponse.json({ status: 200, message: "Image uploaded!", imageUrl });
  } catch (error: any) {
    console.error("GitHub upload error:", error.response?.data || error.message);
    return NextResponse.json({ status: 500, message: "Error uploading image" });
  }
}
