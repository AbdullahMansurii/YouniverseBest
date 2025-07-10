/*
  # Add dummy profiles for testing

  1. New Users and Profiles
    - Creates 10 dummy users in auth.users table
    - Creates corresponding profiles for each user
    - 5 students currently abroad
    - 5 students in India looking to study abroad

  2. Security
    - All profiles follow existing RLS policies
    - Users have proper email confirmation status
*/

-- Insert dummy users into auth.users table first
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES
-- Students studying abroad
(
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'arjun.sharma@stanford.edu',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Arjun Sharma"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'priya.patel@utoronto.ca',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Priya Patel"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '33333333-3333-3333-3333-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'rahul.gupta@imperial.ac.uk',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Rahul Gupta"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '44444444-4444-4444-4444-444444444444',
  '00000000-0000-0000-0000-000000000000',
  'sneha.reddy@sydney.edu.au',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Sneha Reddy"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '55555555-5555-5555-5555-555555555555',
  '00000000-0000-0000-0000-000000000000',
  'vikram.singh@tum.de',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Vikram Singh"}',
  false,
  'authenticated',
  'authenticated'
),

-- Students in India looking to study abroad
(
  '66666666-6666-6666-6666-666666666666',
  '00000000-0000-0000-0000-000000000000',
  'ananya.krishnan@gmail.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Ananya Krishnan"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '77777777-7777-7777-7777-777777777777',
  '00000000-0000-0000-0000-000000000000',
  'rohan.mehta@outlook.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Rohan Mehta"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '88888888-8888-8888-8888-888888888888',
  '00000000-0000-0000-0000-000000000000',
  'kavya.nair@yahoo.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Kavya Nair"}',
  false,
  'authenticated',
  'authenticated'
),
(
  '99999999-9999-9999-9999-999999999999',
  '00000000-0000-0000-0000-000000000000',
  'aditya.joshi@hotmail.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Aditya Joshi"}',
  false,
  'authenticated',
  'authenticated'
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '00000000-0000-0000-0000-000000000000',
  'ishita.bansal@gmail.com',
  '$2a$10$dummy.encrypted.password.hash.for.demo.purposes.only',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Ishita Bansal"}',
  false,
  'authenticated',
  'authenticated'
);

-- Insert corresponding profiles
INSERT INTO profiles (
  user_id,
  full_name,
  email,
  current_country,
  status,
  destination_country,
  current_university,
  course_field,
  bio,
  created_at
) VALUES
-- Students studying abroad
(
  '11111111-1111-1111-1111-111111111111',
  'Arjun Sharma',
  'arjun.sharma@stanford.edu',
  'USA',
  'abroad',
  NULL,
  'Stanford University',
  'Computer Science',
  'Hey! I''m a CS grad student at Stanford. Happy to help with US university applications, especially for tech programs. I can share insights about the application process, campus life, and internship opportunities in Silicon Valley. Feel free to reach out!',
  '2024-01-15 10:30:00+00'
),
(
  '22222222-2222-2222-2222-222222222222',
  'Priya Patel',
  'priya.patel@utoronto.ca',
  'Canada',
  'abroad',
  NULL,
  'University of Toronto',
  'Business Administration',
  'MBA student at UofT Rotman. I can help with Canadian university applications, especially for business programs. Also happy to share tips about living in Toronto, part-time jobs, and the Canadian immigration process post-graduation.',
  '2024-01-20 14:15:00+00'
),
(
  '33333333-3333-3333-3333-333333333333',
  'Rahul Gupta',
  'rahul.gupta@imperial.ac.uk',
  'United Kingdom',
  'abroad',
  NULL,
  'Imperial College London',
  'Mechanical Engineering',
  'Final year MEng student at Imperial College. I''ve been in London for 3 years and love helping students navigate the UK education system. Can provide guidance on UCAS applications, student visas, and finding accommodation in London.',
  '2024-02-01 09:45:00+00'
),
(
  '44444444-4444-4444-4444-444444444444',
  'Sneha Reddy',
  'sneha.reddy@sydney.edu.au',
  'Australia',
  'abroad',
  NULL,
  'University of Sydney',
  'Medicine',
  'Medical student at USYD. The journey to study medicine abroad is challenging but rewarding! I can help with GAMSAT prep, university applications, and adjusting to life in Australia. Also happy to discuss the pathway to medical practice here.',
  '2024-02-10 16:20:00+00'
),
(
  '55555555-5555-5555-5555-555555555555',
  'Vikram Singh',
  'vikram.singh@tum.de',
  'Germany',
  'abroad',
  NULL,
  'Technical University of Munich',
  'Data Science',
  'Masters student in Data Science at TUM. Germany offers amazing opportunities for tech students with low tuition fees! I can help with German university applications, learning German, and finding student jobs. The tech scene here is booming!',
  '2024-02-15 11:10:00+00'
),

-- Students in India looking to study abroad
(
  '66666666-6666-6666-6666-666666666666',
  'Ananya Krishnan',
  'ananya.krishnan@gmail.com',
  'India',
  'in_india',
  'USA',
  NULL,
  'Computer Science',
  'Final year BTech student from IIT Delhi. Preparing for MS in CS applications to top US universities. Looking to connect with students already in the US to get insights about the application process, GRE prep, and campus life. Dream schools: MIT, Stanford, CMU!',
  '2024-03-01 08:30:00+00'
),
(
  '77777777-7777-7777-7777-777777777777',
  'Rohan Mehta',
  'rohan.mehta@outlook.com',
  'India',
  'in_india',
  'Canada',
  NULL,
  'Business Administration',
  'Working professional with 2 years experience in consulting. Planning to pursue MBA in Canada next year. Would love to connect with current MBA students in Canadian universities to understand the application process, GMAT requirements, and post-MBA opportunities.',
  '2024-03-05 12:45:00+00'
),
(
  '88888888-8888-8888-8888-888888888888',
  'Kavya Nair',
  'kavya.nair@yahoo.com',
  'India',
  'in_india',
  'United Kingdom',
  NULL,
  'Psychology',
  'Psychology graduate from Delhi University. Passionate about mental health research and want to pursue Masters in Clinical Psychology in the UK. Looking for guidance on university selection, application essays, and funding opportunities. Any insights would be helpful!',
  '2024-03-10 15:20:00+00'
),
(
  '99999999-9999-9999-9999-999999999999',
  'Aditya Joshi',
  'aditya.joshi@hotmail.com',
  'India',
  'in_india',
  'Australia',
  NULL,
  'Environmental Engineering',
  'Environmental Engineering student passionate about sustainability. Australia''s focus on renewable energy really appeals to me! Looking to connect with students in Australian universities to learn about the application process, scholarships, and research opportunities.',
  '2024-03-15 10:15:00+00'
),
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'Ishita Bansal',
  'ishita.bansal@gmail.com',
  'India',
  'in_india',
  'Germany',
  NULL,
  'Mechanical Engineering',
  'Mechanical Engineering student from NIT Trichy. Germany''s engineering programs and industry connections are incredible! Planning to apply for Masters programs. Would love to connect with Indian students in Germany to understand the application process and life there.',
  '2024-03-20 14:30:00+00'
);