import { createClient } from "@supabase/supabase-js"
import { defineStore } from "pinia";

export const useSupabaseStore = defineStore("supabase", () => {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL as string,
        import.meta.env.VITE_SUPABASE_KEY as string
    )


    async function getNote(id: any) {
        const { data } = await supabase.from('notes').select(`id, title, content, created_at, views, is_rtl`).eq('id', id).maybeSingle()
        return data
    }

    async function updateViewsCount(id: any, views: any) {
        return await supabase.from('notes').update({ views }).eq('id', id)
    }

    async function updatePublishedNote(note_id: any, note: any) {
        const { data, error } = await supabase.from('notes').update(note).eq('id', note_id).select()
        if (error) {
            console.error(error)
            return
        }
        if (data) {
            return data?.length > 0 ? data[0] : null
        }
    }

    async function publishNote(note: any) {
        const { data, error } = await supabase.from('notes').upsert(note).select()
        if (error) {
            console.error(error)
            return
        }
        if (data) {
            return data?.length > 0 ? data[0] : null
        }
    }

    async function deleteNote(note_id: any) {
        const { data, error } = await supabase.from('notes').delete().eq('id', note_id).select()
        if (error) {
            console.error(error)
            return
        }
        if (data) {
            return data?.length > 0 ? data[0] : null
        }
    }


    return {
        supabase,
        publishNote,
        getNote,
        updateViewsCount,
        updatePublishedNote,
        deleteNote
    }
})