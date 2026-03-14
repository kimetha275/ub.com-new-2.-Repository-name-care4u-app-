-- ============================================
-- CARE4U DEMO ACCOUNTS SETUP
-- Run this AFTER the main database setup
-- ============================================

-- Note: User accounts will be created through the Supabase Auth UI or app signup
-- This script creates the care recipient and sample data

-- Create Demo Care Recipient
INSERT INTO care_recipients (full_name, date_of_birth, medical_notes, emergency_contact_name, emergency_contact_phone)
VALUES (
  'Dorothy Davis',
  '1948-03-15',
  'Mild hypertension, takes daily medication. No known allergies.',
  'Michael Davis (Son)',
  '555-0123'
);

-- Get the recipient ID for use in other inserts
-- (In practice, you'll use the actual UUID from the insert)

-- Sample Daily Activities (you can add these after creating demo user accounts)
-- INSERT INTO daily_activities (recipient_id, caregiver_id, activity_type, notes)
-- VALUES 
--   ('[RECIPIENT_ID]', '[CAREGIVER_ID]', 'meal', 'Ate 80% of breakfast, good appetite'),
--   ('[RECIPIENT_ID]', '[CAREGIVER_ID]', 'medication', 'Took morning medications - blood pressure meds'),
--   ('[RECIPIENT_ID]', '[CAREGIVER_ID]', 'exercise', 'Walked around the garden for 15 minutes'),
--   ('[RECIPIENT_ID]', '[CAREGIVER_ID]', 'social', 'Enjoyed visit from grandson, very cheerful');

-- Sample Medications
-- INSERT INTO medications (recipient_id, medication_name, dosage, frequency, instructions)
-- VALUES
--   ('[RECIPIENT_ID]', 'Lisinopril', '10mg', 'Once daily', 'Take with breakfast'),
--   ('[RECIPIENT_ID]', 'Metformin', '500mg', 'Twice daily', 'Take with meals'),
--   ('[RECIPIENT_ID]', 'Vitamin D3', '1000 IU', 'Once daily', 'Take in the morning');

-- ============================================
-- DEMO ACCOUNT CREATION INSTRUCTIONS
-- ============================================

-- TO CREATE DEMO ACCOUNTS:
-- 1. Use the app signup form to create these accounts:

-- CAREGIVER DEMO:
--   Email: caregiver@care4u.demo
--   Password: Demo2024!
--   Name: Sarah Johnson
--   Type: Caregiver

-- FAMILY DEMO:
--   Email: family@care4u.demo
--   Password: Demo2024!
--   Name: Michael Davis
--   Type: Family

-- 2. After creating accounts, manually link them to the care recipient:

-- Get the user IDs from the profiles table, then:

-- Link caregiver to recipient:
-- INSERT INTO caregiver_assignments (caregiver_id, recipient_id)
-- VALUES ('[CAREGIVER_USER_ID]', '[RECIPIENT_ID]');

-- Link family member to recipient:
-- INSERT INTO family_connections (family_member_id, recipient_id, relationship)
-- VALUES ('[FAMILY_USER_ID]', '[RECIPIENT_ID]', 'son');

-- 3. Add sample activities using the caregiver account through the app

-- Success message
SELECT 'Demo data structure created! Now create user accounts through the app.' as status;
