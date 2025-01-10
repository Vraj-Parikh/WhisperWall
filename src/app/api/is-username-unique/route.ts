import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      //removes space like %20
      username: decodeURIComponent(searchParams.get("username") || ""),
    };
    const { username } = queryParam;
    const user = await UserModel.findOne({ name: username, isVerified: true });
    if (user) {
      return Response.json(
        {
          success: false,
          message: "username already exists",
          verifiedUserExist: true,
        },
        { status: 200 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "username available",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
