export const RESUME_PDF = '/takia-tahmid-resume.pdf'

export const resumeSummary =
  'Third-year Computer Science student at the University at Buffalo and Data Science Research Assistant with experience in software development, web development, machine learning, data engineering and analysis.'

export const education = {
  school: 'University at Buffalo, SUNY',
  degree: 'BS in Computer Science',
  gpa: '4.0',
  expected: 'Expected 2028',
  coursework: [
    'Data Structures',
    'Algorithms',
    'Statistics',
    'STEM Communications',
    'Software Engineering',
    'Systems Programming',
    'Probability',
    'Computer Organization',
    'Programming Languages',
  ],
}

export interface Experience {
  role: string
  org: string
  dates: string
  bullets: string[]
}

export const experience: Experience[] = [
  {
    role: 'Data Science Research Assistant',
    org: "Dr. Zhuang's Research Group",
    dates: 'Aug 2026 – Present',
    bullets: [
      'Clean, transform, and analyze government macroeconomic datasets to develop risk insights.',
      'Apply mathematical modeling and machine learning to develop, train, and refine predictive models for evaluating international trade risk and predicting disruptions in global supply chains.',
      'Collaborate with researchers to investigate decision risk and communicate findings during weekly meetings.',
    ],
  },
  {
    role: 'UB Math Place Tutor',
    org: 'University at Buffalo',
    dates: 'Aug 2026 – Present',
    bullets: ['Provide tutoring to help students develop mathematical reasoning and problem-solving skills.'],
  },
  {
    role: 'Teaching Assistant',
    org: 'Department of Computer Science, University at Buffalo',
    dates: 'Jan 2026 – May 2026',
    bullets: [
      'Prepared and led weekly recitation sessions reinforcing topics including proofs and graph theory.',
      'Proctored exams and graded assignments with accuracy, collaborating often with faculty.',
    ],
  },
]

export const resumeProjects: { name: string; description: string }[] = [
  {
    name: 'Pathfinding and AI System',
    description:
      'Implemented pathfinding algorithms in a game and simple AI using object-oriented programming for state-based enemy behavior.',
  },
  {
    name: 'Graph-Based Network Routing Algorithm',
    description: 'Developed a routing algorithm to optimize packet delivery and profit in a simulated network.',
  },
  {
    name: 'Retail Sales Analysis',
    description:
      'Exploratory data analysis with Python and SQL on sales data, with Matplotlib visualizations to communicate business recommendations.',
  },
  {
    name: 'Olive & Vine Restaurant Website',
    description: 'Responsive multi-page site with custom layouts, navigation, and animations using HTML, Bootstrap, JavaScript, and CSS.',
  },
  { name: 'Snake Game', description: 'Object-oriented Java game with controls, collision detection, and scores.' },
  { name: 'Dynamic Memory Allocator', description: 'Custom dynamic memory allocator in C to manage heap allocations.' },
  {
    name: 'Message Serialization System',
    description: 'Chat-server message serialization in C, parsing user commands and packing data into network packets.',
  },
  { name: 'Text Adventure Game', description: 'Interactive game built with functional programming in OCaml.' },
]

export const resumeSkills: { label: string; items: string[] }[] = [
  {
    label: 'Languages',
    items: ['Python & Django', 'SQL (PostgreSQL, MySQL)', 'Java', 'C', 'JavaScript (React.js, Next.js, Node.js)', 'Go', 'HTML', 'CSS & Tailwind CSS'],
  },
  {
    label: 'Tools',
    items: ['Git', 'AWS', 'BeautifulSoup', 'TensorFlow', 'Microsoft 365', 'Excel', 'Tableau', 'Power BI', 'Figma', 'SSH', 'Linux'],
  },
  {
    label: 'Skills',
    items: [
      'Data Cleaning & Analysis',
      'Data Engineering',
      'Web Scraping',
      'Front-end',
      'Back-end',
      'Cloud Services',
      'OOP',
      'Machine Learning',
      'Functional Programming',
      'CI/CD',
      'ETL/ELT',
      'Research',
      'Communication',
      'Leadership',
    ],
  },
]

export const accomplishments = [
  'Grace Capen Award',
  'Empowering Advancement Scholar',
  'Pride of NY Scholarship',
  "Dean's List",
  'High School Valedictorian',
]
