import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://utekyldhjkqlwwxthtbk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODMyOTMwOCwiZXhwIjoxOTQzOTA1MzA4fQ.GPPKjAfWlP_90eK-NksoulKSwIqj6sEGgC4waoqj3_U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage as any
})