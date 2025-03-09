import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  role: "admin" | "user";
}

export default async function ServerAuth() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthPayload;
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
