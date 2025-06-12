import { NextResponse } from "next/server"

interface QuotableResponse {
  _id: string
  content: string
  author: string
  tags: string[]
  authorSlug: string
  length: number
  dateAdded: string
  dateModified: string
}

export async function GET() {
  try {
    const response = await fetch("https://api.quotable.io/random", {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: QuotableResponse = await response.json()

    return NextResponse.json({
      id: data._id,
      text: data.content,
      author: data.author,
    })
  } catch (error) {
    console.error("Error fetching quote from external API:", error)

    // Return a fallback quote if the external API fails
    return NextResponse.json({
      id: Date.now().toString(),
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    })
  }
}
