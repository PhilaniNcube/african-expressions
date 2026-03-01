"use server";

import { db } from "../../../../db";
import { stores } from "../../../../db/schema";
import { redirect } from "next/navigation";

export type CreateStoreState = {
  success: boolean;
  error?: string;
};

export async function createStore(
  _prevState: CreateStoreState,
  formData: FormData
): Promise<CreateStoreState> {
  const name = formData.get("name") as string;
  const streetAddress = formData.get("streetAddress") as string;
  const city = formData.get("city") as string;
  const contact = (formData.get("contact") as string) || null;
  const website = (formData.get("website") as string) || null;
  const latRaw = formData.get("lat") as string;
  const longRaw = formData.get("long") as string;

  // Convert empty strings to null for real columns
  const lat = latRaw && latRaw.trim() !== "" ? parseFloat(latRaw) : null;
  const long = longRaw && longRaw.trim() !== "" ? parseFloat(longRaw) : null;

  if (!name || !streetAddress || !city) {
    return { success: false, error: "Name, street address, and city are required." };
  }

  if (lat !== null && isNaN(lat)) {
    return { success: false, error: "Latitude must be a valid number." };
  }

  if (long !== null && isNaN(long)) {
    return { success: false, error: "Longitude must be a valid number." };
  }

  try {
    await db
      .insert(stores)
      .values({ name, streetAddress, city, contact, website, lat, long });
  } catch (error) {
    console.error("Failed to create store:", error);
    return { success: false, error: "Failed to create store. Please try again." };
  }

  redirect("/admin/stores");
}
