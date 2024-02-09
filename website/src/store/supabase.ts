import { createClient } from "@supabase/supabase-js"
import { defineStore } from "pinia";

export const useSupabaseStore = defineStore("supabase", () => {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL as string,
        import.meta.env.VITE_SUPABASE_KEY as string
    )

    
        
    return {
        supabase,
    }
})