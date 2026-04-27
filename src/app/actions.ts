"use server";

import { supabase } from "@/lib/supabase";

export async function submitWaitlist(formData: { name: string; phone: string; location: string }) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      { name: formData.name, phone: formData.phone, location: formData.location }
    ]);
    
  if (error) {
    console.error("Supabase insert error:", error);
    return { error: error.message };
  }
  return { success: true };
}

export async function getWaitlist(accessCode: string) {
  const correctCode = process.env.ADMIN_ACCESS_CODE || "admin123";
  if (accessCode !== correctCode) {
    return { error: "Unauthorized" };
  }
  
  const { data, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });
    
  if (error) {
    console.error("Supabase select error:", error);
    return { error: error.message };
  }
  
  return { data };
}

export async function deleteWaitlistEntry(id: number, accessCode: string) {
  const correctCode = process.env.ADMIN_ACCESS_CODE || "admin123";
  if (accessCode !== correctCode) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("waitlist")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase delete error:", error);
    return { error: error.message };
  }

  return { success: true };
}

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    console.error("Supabase site_settings fetch error:", error);
    return { error: error.message };
  }

  const settings: Record<string, string> = {};
  for (const row of data ?? []) {
    settings[row.key] = row.value;
  }
  return { data: settings };
}

export async function updateSiteSetting(key: string, value: string, accessCode: string) {
  const correctCode = process.env.ADMIN_ACCESS_CODE || "admin123";
  if (accessCode !== correctCode) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });

  if (error) {
    console.error("Supabase site_settings upsert error:", error);
    return { error: error.message };
  }

  return { success: true };
}
