import { NextResponse } from "next/server";

export default function SendResponseApi(
  success: boolean,
  message: string,
  status: number,
  extraInfo?: Object
) {
  return NextResponse.json(
    {
      success,
      message,
      ...extraInfo,
    },
    { status }
  );
}
