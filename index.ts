export type UserType = 'caregiver' | 'family' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  user_type: UserType
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CareRecipient {
  id: string
  full_name: string
  date_of_birth: string | null
  profile_photo_url: string | null
  medical_notes: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  created_at: string
}

export interface DailyActivity {
  id: string
  recipient_id: string
  caregiver_id: string
  activity_type: string
  activity_date: string
  notes: string | null
  created_at: string
}

export interface Medication {
  id: string
  recipient_id: string
  medication_name: string
  dosage: string | null
  frequency: string | null
  instructions: string | null
  is_active: boolean
  created_at: string
}

export interface Photo {
  id: string
  recipient_id: string
  uploaded_by: string
  photo_url: string
  caption: string | null
  created_at: string
}
