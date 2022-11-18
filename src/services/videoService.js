import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://cfaqkjiuqitollahyfjv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYXFraml1cWl0b2xsYWh5Zmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg2MDIzNzYsImV4cCI6MTk4NDE3ODM3Nn0.Fum-nhKaMFZ4ezvpmZ5tUzyeAHe2Xzf34m9KBWYJ-T0";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}