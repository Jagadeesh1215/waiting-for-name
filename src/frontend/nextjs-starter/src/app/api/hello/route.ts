import { NextResponse } from "next/server";
import type { HelloResponse } from "@/types/api";

export async function GET(): Promise<NextResponse<HelloResponse>> {
  const response: HelloResponse = {
    message: "Hello from Next.js API!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  return NextResponse.json(response);
}
