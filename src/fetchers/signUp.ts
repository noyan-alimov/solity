import { supabase } from '../supabaseClient'

export const signUp = async (email: string, password: string) => {
    try {
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) throw error

        const user = supabase.auth.user()

        const updates = {
            id: user!.id,
            updated_at: new Date(),
            email: user?.email
        }

        await supabase.from('profiles').upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
        })

    } catch (error) {
        alert(error.error_description || error.message)
    }
}