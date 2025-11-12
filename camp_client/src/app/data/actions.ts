"use server";

import z from "zod";
import { subscribeService } from "./services";

const subscribeSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export async function subscribeAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const validatedFields = subscribeSchema.safeParse({
    email: email,
  });

  if (!validatedFields.success) {
    console.dir(validatedFields.error.issues, { depth: null });

    return {
      ...prevState,
      zodErrors: validatedFields.error.issues,
      strapiErrors: null,
    };
  }

  const responsisData = await subscribeService(validatedFields.data.email);
  if (!responsisData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "oops!, something is wrong, please try again",
    };
  }

  if (responsisData.error) {
    return {
      ...prevState,
      strapiErrors: responsisData.error,
      zodErrors: null,
      message: "Failed to subscribe",
    };
  }

  return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    message: "Successfully Subscribe",
  };
}
