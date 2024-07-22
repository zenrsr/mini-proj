import { NextResponse } from "next/server";
import AWS from "aws-sdk";

export async function POST(request: Request) {
  const { bucketName, key } = await request.json();

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const s3 = new AWS.S3();

  try {
    const data = await s3.getObject({ Bucket: bucketName, Key: key }).promise();

    const headers = new Headers();
    headers.set("Content-Type", data.ContentType || "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filename=${key.split("/").pop()}`
    );

    return new NextResponse(data.Body as ReadableStream, {
      status: 200,
      headers: headers
    });
  } catch (error) {
    console.error("Error downloading from S3:", error);
    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 }
    );
  }
}
