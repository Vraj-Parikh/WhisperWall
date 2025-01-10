import { NextResponse } from "next/server";

export default function SendResponseApi(
  success: boolean,
  message: string,
  status: number,
  extraInfo?: object
) {
  return NextResponse.json(
    {
      success,
      message,
      ...extraInfo,
    },
    {
      status,
    }
  );
}
