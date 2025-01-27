"use server";

export async function registerAction(prevState: unknown, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  return {
    status: "success",
    message: "Register success!",
  };
}
