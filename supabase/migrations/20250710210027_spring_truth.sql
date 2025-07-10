/*
  # Add dummy profiles for testing

  1. New Data
    - 10 dummy profiles (5 studying abroad, 5 in India)
    - Realistic Indian names and universities
    - Diverse course fields and countries
    - Engaging bios for each profile

  2. Profile Distribution
    - 5 students currently abroad (USA, Canada, UK, Australia, Germany)
    - 5 students in India looking to study abroad
    - Mix of undergraduate and graduate students
    - Various fields: Engineering, Business, Medicine, Arts, etc.
*/

-- Insert dummy profiles for students currently abroad
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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
  gen_random_uuid(),
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