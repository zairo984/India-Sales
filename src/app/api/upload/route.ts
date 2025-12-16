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
    await axios.put(
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

    // Generate the public image URL using jsDelivr CDN (more reliable than raw.githubusercontent.com)
    const imageUrl = `https://cdn.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}@${BRANCH}/${filePath}`;

    return NextResponse.json({ status: 200, message: "Image uploaded!", imageUrl });
  } catch (err: unknown) {
	const error = new Error((err as Error).toString());
	return NextResponse.json({ error: error.message }, { status: 500 });
}
}
