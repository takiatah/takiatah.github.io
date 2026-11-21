export const GITHUB_USERNAME = 'takiatah'

const repo = (name: string) => `https://github.com/${GITHUB_USERNAME}/${name}`

export const profileLinks = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: 'https://www.linkedin.com/in/takia-tahmid-195900349/',
} as const

export const repoLinks = {
  onlineRetail: repo('online-retail-data-sales-analysis'),
  bellabeat: repo('bellabeat-fitness-data-analysis'),
  snakeGame: repo('snake-game'),
  littlePrince: repo('little-prince-simulator'),
  oliveAndVine: repo('olive-and-vine-website'),
  titanic: repo('Titanic-Predictions---Machine-Learning-Kaggle-Competition'),
  tweets: repo('NLP-with-Disaster-Tweet-Predictions---Machine-Learning-Kaggle-Competition'),
  mangataAndGallo: repo('mangata-and-gallo-website'),
} as const

export const externalLinks = {
  littlePrince: 'https://little-prince-simulator.vercel.app/',
  onlineRetailKaggleNotebook: 'https://www.kaggle.com/code/takia2006/e-commerce-sales-analysis',
  titanicKaggleNotebook: 'https://www.kaggle.com/code/takia2006/titanic-machine-learning-predictions',
  tweetsKaggleNotebook: 'https://www.kaggle.com/code/takia2006/disaster-tweets',
  bellabeatKaggleNotebook: 'https://www.kaggle.com/code/takia2006/bellabeat-case-study-using-python-and-sql',
  bellabeatTableau:
    'https://public.tableau.com/views/FitbitActivityAnalysisDashboards/ActivitybyHourandDayoftheWeekDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  fitbitDataset: 'https://www.kaggle.com/datasets/arashnic/fitbit',
  gprDataset: 'https://www.matteoiacoviello.com/gpr.htm',
  oliveAndVine: 'https://takiatah.github.io/olive-and-vine-website/',
  mangataAndGallo: 'https://takiatah.github.io/mangata-and-gallo-website/',
} as const
