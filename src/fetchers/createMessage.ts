import { CreateMessageData } from '../models/CreateMessageData'
import { supabase } from '../supabaseClient'

export const createMessage = async (message: CreateMessageData) => {
    try {
        await supabase
            .from('messages')
            .insert(message, { returning: 'minimal' })
    } catch (err) {
        alert(err.message)
    }
}