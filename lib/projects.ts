import { externalLinks, repoLinks } from '@/lib/links'

export type SourceAvailability =
  | { type: 'public'; repoUrl: string }
  | { type: 'coursework' }

export const COURSEWORK_NOTE = 'Completed as part of university coursework. Source code is not publicly available.'

export interface ProjectSection {
  heading: string
  body: string[]
}

export interface MediaAsset {
  kind: 'gif' | 'image' | 'video'
  /** Planned path inside /public. The file may not exist yet; set `available` once it is added. */
  src: string
  available: boolean
  alt: string
  caption: string
  width: number
  height: number
  poster?: string
}

export interface Project {
  slug: string
  title: string
  subtitle?: string
  category: string
  summary: string
  tech: string[]
  sourceAvailability: SourceAvailability
  links?: { label: string; href: string }[]
  media?: MediaAsset
  sections?: ProjectSection[]
  status?: 'complete' | 'concept' | 'in-progress'
}

/* ---------------------------------- Data Lab --------------------------------- */

export const dataLabProjects: Project[] = [
  {
    slug: 'online-retail-ii',
    title: 'Online Retail II — Sales Analysis',
    category: 'Data Analysis',
    summary:
      'An exploratory analysis of online retail transactions examining customer revenue concentration, monthly sales trends, product category performance, cancellations, and geographic order distribution.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data visualization'],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.onlineRetail },
    links: [
      { label: 'Kaggle Notebook', href: externalLinks.onlineRetailKaggleNotebook },
    ],
    status: 'complete',
  },
  {
    slug: 'bellabeat',
    title: 'Bellabeat Case Study',
    subtitle: 'Fitbit activity and sleep analysis',
    category: 'Data Analysis',
    summary:
      'An analysis of Fitbit activity and sleep data to explore user behavior and potential opportunities for a wellness technology product.',
    tech: ['Python', 'Pandas', 'SQL', 'Tableau'],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.bellabeat },
    links: [
      { label: 'Kaggle Notebook', href: externalLinks.bellabeatKaggleNotebook },
      { label: 'Tableau Dashboard', href: externalLinks.bellabeatTableau },
    ],
    status: 'complete',
  },
]

export const getDataLabCaseStudyHref = (slug: string) => {
  if (slug === 'bellabeat') return '/data-lab/bellabeat'
  if (slug === 'online-retail-ii') return '/data-lab/online-retail-ii'
  return undefined
}

/* ----------------------------- Machine Learning Lab ---------------------------- */

export interface ModelResult {
  model: string
  config: string
  validationAccuracy: number
}

export const titanicProject: Project = {
  slug: 'titanic',
  title: 'Titanic Predictions',
  subtitle: 'Machine Learning Kaggle Competition',
  category: 'Machine Learning / Kaggle Competition',
  summary:
    'Binary classification on the Kaggle Titanic passenger dataset: predicting whether a passenger survived from their ticket class, sex, and family aboard. Compares a Random Forest baseline with an XGBoost classifier.',
  tech: ['Python', 'Pandas', 'scikit-learn', 'XGBoost', 'Jupyter / Kaggle Notebook'],
  sourceAvailability: { type: 'public', repoUrl: repoLinks.titanic },
  links: [{ label: 'Kaggle Notebook', href: externalLinks.titanicKaggleNotebook }],
  status: 'complete',
}

/** Values copied from the printed outputs in the repository notebook. */
export const titanicResults: ModelResult[] = [
  {
    model: 'RandomForestClassifier (scikit-learn)',
    config: 'n_estimators=100, max_depth=4, random_state=1',
    validationAccuracy: 0.776536312849162,
  },
  {
    model: 'XGBClassifier (XGBoost)',
    config: 'n_estimators=100, max_depth=4, random_state=1, eval_metric=logloss',
    validationAccuracy: 0.7932960893854749,
  },
]

export const titanicFeatures = [
  { name: 'Pclass', description: 'Ticket class (1st, 2nd, 3rd)' },
  { name: 'Sex', description: 'Passenger sex, one-hot encoded' },
  { name: 'SibSp', description: 'Number of siblings / spouses aboard' },
  { name: 'Parch', description: 'Number of parents / children aboard' },
]

export const tweetsProject: Project = {
  slug: 'tweets',
  title: 'Natural Language Processing with Disaster Tweets',
  subtitle: 'Machine Learning Kaggle Competition',
  category: 'Machine Learning / NLP / Kaggle Competition',
  summary:
    'Classifying whether tweets indicate a real disaster or not using Natural Language Processing, TenserFlow, and DistilBERT.',
  tech: ['Python', 'Pandas', 'scikit-learn', 'TenserFLow', 'DistilBERT', 'Jupyter / Kaggle Notebook'],
  sourceAvailability: { type: 'public', repoUrl: repoLinks.tweets },
  links: [{ label: 'Kaggle Notebook', href: externalLinks.tweetsKaggleNotebook }],
  status: 'complete',
}

export const tweetsResults: ModelResult[] = [
  {
    model: 'DistilBERT',
    config: 'sequence_length=160, num_classes=2, loss=SparseCategoricalCrossentropy(from_logits=True), optimizer=Adam(learning_rate=1e-5), batch_size=32, epochs=2',
    validationAccuracy: 0.8450,
  }
]

export const tweetsFeatures = [
  { name: 'text', description: 'Tweet about a potential disaster' },
]

export const futureMlExperiments = [
  'Additional Kaggle competitions',
  'Regularized regression experiments',
  'Neural network coursework projects',
]

/* -------------------------------- Engineering Bay ------------------------------- */

export const engineeringProjects: Project[] = [
  {
    slug: 'little-prince',
    title: 'The Little Prince Simulator',
    subtitle: 'Interactive Space Adventure',
    category: 'Game Development / Hackathon Project',
    summary:
      'An interactive story-driven space adventure inspired by The Little Prince. Players explore planets, make choices that shape their journey, and travel through space using NASA-based orbital trajectory calculations.',
    tech: ['Python', 'JavaScript/TypeScript', 'Phaser', 'FastAPI', 'NASA Lambert API',],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.littlePrince, },
    status: 'complete',
    links: [{ label: 'The Little Prince Simulator', href: externalLinks.littlePrince }],
    media: {
      kind: 'video',
      src: '/media/little-prince.mp4',
      available: true,
      alt: 'Gameplay demonstration of The Little Prince Simulator.',
      caption: 'Gameplay demo: interactive storytelling, planetary exploration, and space travel.',
      width: 1280,
      height: 720,
      poster: '/media/little-prince-thumbnail.png',
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A story-driven adventure inspired by The Little Prince, combining interactive storytelling with space exploration and orbital mechanics.',
          'Players travel between planets, interact with characters and objects, and make decisions that influence their experience. Play the game using the link above.',
        ],
      },
      {
        heading: 'Interactive storytelling',
        body: [
          'Branching dialogue and player choices create an interactive narrative experience.',
          'Players interact with the environment, including caring for the rose through actions such as watering.',
          'A heart-based scoring system reflects player decisions throughout the adventure.',
        ],
      },
      {
        heading: 'Planetary exploration',
        body: [
          'Players travel between planets including Earth, Mars, Venus, and Jupiter.',
          'Each planetary environment features its own visual design and interactive elements.',
          'Phaser manages scene transitions, animations, user input, and gameplay interactions.',
        ],
      },
      {
        heading: 'Orbital trajectory calculations',
        body: [
          'Integrates NASA-based trajectory calculations to connect the fictional adventure with real orbital mechanics.',
          'A Python FastAPI backend supports trajectory-related calculations and communicates with the TypeScript game frontend.',
          'Displays real time calculations, travel times, and distances for the best trajectories.',
        ],
      },
      {
        heading: 'Technical implementation',
        body: [
          'Built with Phaser and TypeScript for interactive 2D gameplay and scene management.',
          'Uses reusable game components for backgrounds, planetary environments, and interactive objects.',
          'Combines frontend gameplay with a Python backend for space trajectory calculations.',
        ],
      },
    ],
  },
  {
    slug: 'snake-game',
    title: 'Java Snake Game',
    category: 'Game Development',
    summary:
      'A classic Snake game in Java with real-time keyboard controls, growing-tail collision detection, random golden apple generation, and score tracking.',
    tech: ['Java', 'Object-oriented design', 'Game loop'],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.snakeGame },
    status: 'complete',
    media: {
      kind: 'gif',
      src: '/media/snake-game.gif',
      available: true,
      alt: 'Gameplay recording of the snake game showing the snake navigating the board, eating apples, and growing its tail.',
      caption: 'Gameplay demo: the snake navigates the board, eating apples, and growing its tail.',
      width: 95,
      height: 100,
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A desktop implementation of Snake: the player steers a snake around a grid, eating food to grow while avoiding walls and its own body.',
        ],
      },
      {
        heading: 'Implementation highlights',
        body: [
          'A fixed-interval game loop updates movement and redraws the board each tick.',
          'Collision checks against the board edges and the snake body determine when the game ends.',
          'User can select the color of the snake at the start of the game.',
          'Random golden apple generation ensures the game is challenging and fun.',
          'Score tracking is displayed in the top-left corner of the screen.',
        ],
      },
    ],
  },
  {
    slug: 'c-memory-allocator',
    title: 'C Memory Allocator',
    category: 'Systems Programming',
    summary:
      'A dynamic memory allocator in C implementing allocation and freeing on a managed heap, with attention to fragmentation and throughput.',
    tech: ['C', 'Memory management', 'Pointers'],
    sourceAvailability: { type: 'coursework' },
    status: 'complete',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Implements the core of a malloc/free-style allocator: requesting heap space, tracking which blocks are free or in use, and returning memory for reuse.',
        ],
      },
      {
        heading: 'Design considerations',
        body: [
          'Allocators trade off speed (how quickly a free block is found) against utilization (how little memory is wasted to fragmentation and metadata).',
          'Block metadata, alignment requirements, and coalescing of adjacent free blocks are central to keeping the heap healthy.',
        ],
      },
    ],
  },
  {
    slug: 'pathfinding-game',
    title: 'Pathfinding Game',
    category: 'Game AI',
    summary:
      'A game in which characters navigate a map with pathfinding and switch between behaviors such as chasing, retreating, and building health.',
    tech: ['Java', 'Pathfinding', 'Object-oriented design', 'Agent behaviors'],
    sourceAvailability: { type: 'coursework' },
    status: 'complete',
    media: {
      kind: 'gif',
      src: '/media/pathfinding-game.gif',
      available: true,
      alt: 'Gameplay recording of the pathfinding game showing characters navigating the map, chasing, retreating, and recovering health.',
      caption: 'Gameplay demo: enemies pathfind across the map and switch between chasing the character, retreating, and building health.',
      width: 600,
      height: 470,
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'Characters move across a grid-based map trying to get to the goal while avoiding enemies that are chasing it.',
        ],
      },
      {
        heading: 'Player behaviors',
        body: [
          'Moving: the player moves around the map to get to the goal using the keyboard. The player can move up, down, left, and right.',
          'Collision detection: the player collides with the enemies and the obstacles. When the player collides with an enemy, the player loses health.',
          'Collecting items: the player can collect items to gain health or use as projectile weapons against the enemies.', 
          'Accessing inventory: the player can cycle through the inventory using the TAB key and use the item by pressing the spacebar.',
          'Goal: the player reaches the goal to win the level.',
        ],
      },
      {
        heading: 'AI Enemy behaviors',
        body: [
          'Chasing: an enemy pursues the player by repeatedly computing a path toward it.',
          'Retreating: when threatened, an enemy moves away to a safer position to rebuild its health.',
          'Building health: enemies can recover health before re-engaging.',
        ],
      },
    ],
  },
  {
    slug: 'ocaml-interactive-fiction',
    title: 'OCaml Interactive Fiction Engine',
    category: 'Functional Programming',
    summary:
      'A text-adventure engine in OCaml that loads a game world, parses player commands, and updates game state immutably.',
    tech: ['OCaml', 'Functional programming', 'OUnit'],
    sourceAvailability: { type: 'coursework' },
    status: 'complete',
    sections: [
      {
        heading: 'Overview',
        body: [
          'Players explore rooms and interact with the world through typed commands. The engine interprets each command and produces a new game state.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Game state is represented with immutable data structures, and command parsing uses pattern matching over variant types.',
          'Behavior is verified with an OUnit test suite.',
        ],
      },
    ],
  },
  {
    slug: 'network-routing',
    title: 'Java Network Routing Algorithm',
    subtitle: 'Profit Optimization Under Bandwidth Constraints',
    category: 'Algorithms / Optimization',
    summary:
      'A network-routing algorithm using a modified version of Dijkstra’s algorithm to select routes that maximize profit while respecting bandwidth requirements.',
    tech: ['Java', 'Graph algorithms', 'Dijkstra’s algorithm', 'Constrained optimization'],
    sourceAvailability: { type: 'coursework' },
    status: 'complete',
    sections: [
      {
        heading: 'Overview',
        body: [
          'In a network, each link has a limited bandwidth and each route carries some profit. The task is to choose a route through the network that is as profitable as possible while every link on it can carry the required bandwidth.',
        ],
      },
      {
        heading: 'Algorithm',
        body: [
          'Conventional Dijkstra finds the path with the smallest total distance. This project adapts the same greedy, priority-queue-driven exploration to a different objective: the priority reflects route profit rather than distance, and links that cannot satisfy the bandwidth requirement are not considered.',
          'Exact implementation details (such as tie-breaking and how profit is accumulated per edge) are intentionally not reproduced here, because the coursework source is not public.',
        ],
      },
      {
        heading: 'Constraints and objective',
        body: [
          'Route profit: the value earned by sending traffic along a chosen path.',
          'Bandwidth requirement: the capacity a request needs on every link it uses.',
          'Feasibility: a route is feasible only if each of its links meets the bandwidth requirement.',
          'Selection: among feasible routes, the algorithm selects the one with the highest profit. When no feasible route exists, no route is selected for that request.',
        ],
      },
      {
        heading: 'Complexity and tradeoffs',
        body: [
          'With a binary-heap priority queue, standard Dijkstra runs in O((V + E) log V) time and O(V) space. Filtering infeasible edges does not change that bound.',
          'The tradeoff is that greedy, Dijkstra-style selection is only guaranteed optimal when the objective behaves monotonically along paths; changing the objective from distance to profit requires care to preserve correctness.',
        ],
      },
    ],
  },
]

/* --------------------------------- Design Studio -------------------------------- */

export const designProjects: Project[] = [
  {
    slug: 'olive-and-vine',
    title: 'Olive & Vine',
    category: 'Restaurant Website',
    summary:
      'A Mediterranean restaurant website built with Bootstrap, using a responsive grid, warm natural tones, and clear calls to action for the menu and reservations.',
    tech: ['HTML', 'CSS', 'Bootstrap', 'Responsive design'],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.oliveAndVine },
    status: 'complete',
    sections: [
      {
        heading: 'Responsive layout',
        body: ['Bootstrap’s grid and responsive utilities adapt the layout from mobile through desktop.'],
      },
      {
        heading: 'Design decisions',
        body: ['A Mediterranean palette and generous food imagery set the atmosphere of the restaurant.'],
      },
      {
        heading: 'Image carousel hero',
        body: ['Pages have a dynamic hero header that rotates through restaurant images and promotional items to keep users engaged.'],
      },
      {
        heading: 'Form validation',
        body: ['Ensures static form validation for booking a room or making a contact request.'],
      },
    ],
    links: [{ label: 'Olive & Vine Website', href: externalLinks.oliveAndVine }],
    media: {
      kind: 'image',
      src: '/media/olive-and-vine.png',
      available: true,
      alt: 'Olive and Vine homepage',
      caption: 'Preview: Olive & Vine Homepage',
      width: 1200,
      height: 750,
    },
  },
  {
    slug: 'mangata-and-gallo',
    title: 'Mangata & Gallo',
    category: 'Jewelry Brand Website',
    summary:
      'A responsive website for a luxury jewelry company specializing in engagement rings, wedding bands, and anniversary gifts.',
    tech: ['HTML5', 'CSS3', 'CSS Grid', 'Flexbox', 'CSS Animations', 'Google Fonts'],
    sourceAvailability: { type: 'public', repoUrl: repoLinks.mangataAndGallo },
    status: 'complete',
    sections: [
      {
        heading: 'Responsive design',
        body: ['The layout adapts across desktop, tablet, and mobile screens using CSS Grid and Flexbox.'],
      },
      {
        heading: 'Layout and typography',
        body: [
          'Elegant serif typography for headings pairs with a clean sans-serif for body text.',
          'Spacious layouts and large imagery showcase the jewelry pieces.',
        ],
      },
      {
        heading: 'Color and visual design',
        body: ['A neutral, luxury-inspired palette keeps attention on the products.'],
      },
      {
        heading: 'Front-end implementation',
        body: [
          'A hero banner with an automatic image slideshow, a promotional banner, and a navigation menu with hover effects.',
          'Product and service cards are laid out with CSS Grid, built without a JavaScript framework.',
        ],
      },
    ],
    links: [{ label: 'Mangata & Gallo Website', href: externalLinks.mangataAndGallo }],
    media: {
      kind: 'image',
      src: '/media/mangata-and-gallo.png',
      available: true,
      alt: 'Mangata and Gallo homepage',
      caption: 'Preview: Mangata & Gallo Homepage',
      width: 1200,
      height: 750,
    },
  },
  {
    slug: 'synergy',
    title: 'Synergy',
    subtitle: 'AI fitness app concept',
    category: 'Figma Concept',
    summary:
      'A concept for an AI-assisted fitness application, designed in Figma. This is a prototype, not a deployed product.',
    tech: ['Figma', 'UI design', 'Prototyping'],
    sourceAvailability: { type: 'coursework' },
    status: 'concept',
    sections: [
      {
        heading: 'Concept overview',
        body: ['Synergy explores how an AI coach could personalize workouts and track progress in a friendly mobile interface.'],
      },
      {
        heading: 'Key screens',
        body: ['Onboarding, a personalized dashboard, workout sessions, and progress tracking.'],
      },
      {
        heading: 'Visual system',
        body: ['A consistent set of colors, type styles, and reusable components defined in Figma.'],
      },
      {
        heading: 'User flow',
        body: ['Sign up, set goals, receive a suggested plan, complete sessions, and review progress.'],
      },
      {
        heading: 'Design rationale',
        body: ['Reduce friction for beginners by turning goals into a clear, guided plan.'],
      },
    ],
    media: {
      kind: 'image',
      src: '/media/synergy.png',
      available: true,
      alt: 'Synergy Overiew',
      caption: 'Overview: Synergy',
      width: 900,
      height: 750,
    },
  },
]

/** Synergy is a design concept, so it never renders source-code actions. */
export const isDesignConcept = (project: Project) => project.status === 'concept'
