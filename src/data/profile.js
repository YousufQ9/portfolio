// ============================================================================
// PROFILE DATA
// ----------------------------------------------------------------------------
// This file holds every piece of "about me" content used across the site:
// name, bio, contact links, skills, education, and certifications.
// Edit the values below to update your Home, Experience, and Certifications
// pages. Nothing here needs to touch component code.
// ============================================================================

export const profile = {
  name: "Mohammad Yousuf Qureshi",
  shortName: "Yousuf Qureshi",
  title: "Data Analyst",
  tagline: "M.S. Analytics, Georgia Tech",
  location: "Karachi, Pakistan",
  openTo: "Open to remote data analytics & data engineering roles",

  // Positioning statement — the first thing a recruiter reads.
  // Grounded in the actual project mix: real client data under NDA,
  // forecasting, and full-stack delivery — not a generic "I love data" line.
  heroGreeting: "Hi, I'm Yousuf Qureshi.",
  heroStatement:
    "I turn messy, real-world data into models and dashboards that hold up under scrutiny.",

  heroSubtext:
    "Data Analyst with an M.S. in Analytics from Georgia Tech, working across the full pipeline: SQL and Python for cleaning and modeling, ARIMAX and XGBoost for forecasting, Tableau and Power BI for the story at the end. Background in engineering estimation before this, which is why I default to checking whether a number is actually right before I present it.",

  email: "myousufq99@gmail.com",
  linkedin: "https://www.linkedin.com/in/yousufq9",
  linkedinLabel: "linkedin.com/in/yousufq9",
  github: "https://github.com/YousufQ9",
  githubLabel: "github.com/YousufQ9",

  // TO ACTIVATE THE RÉSUMÉ BUTTON:
  // 1. Export your résumé as a PDF.
  // 2. Place it at public/resume/Yousuf-Qureshi-Resume.pdf (or update the
  //    filename below to match whatever you name it).
  // 3. Set resumeAvailable to true. The "View résumé" button on the
  //    homepage will then appear automatically and open the PDF in a new tab.
  //
  // IMPORTANT: this path is intentionally written WITHOUT a leading slash
  // ("resume/..." not "/resume/..."). It gets combined with Vite's BASE_URL
  // in Home.jsx before being used as a link. A leading slash would make the
  // browser look for the file at the domain root (e.g.
  // yousufq9.github.io/resume/...) instead of under the GitHub Pages repo
  // path (yousufq9.github.io/portfolio/resume/...), which 404s.
  resumeUrl: "resume/Yousuf-Qureshi-Resume.pdf",
  resumeAvailable: true,

  phone: "+92 311 2563078",
};

// ----------------------------------------------------------------------------
// HIGHLIGHTS — verified numbers only, shown as KPI-style stats on the homepage.
// Every figure here is traceable to the source documents.
// ----------------------------------------------------------------------------
export const highlights = [
  { value: "11", label: "Applied analytics projects", sublabel: "Forecasting, ML, NLP, BI & databases" },
  { value: "3.83", label: "Graduate GPA", sublabel: "M.S. Analytics, Georgia Tech / 4.0" },
  { value: "0.84", label: "Best model AUC", sublabel: "Lufthansa booking-signal classifier, NDA project" },
  { value: "9", label: "Tools shipped end-to-end", sublabel: "SQL → Python → ML → Tableau / Power BI" },
];

// ----------------------------------------------------------------------------
// SKILLS — grouped by category. Only tools with real, demonstrated evidence
// in the CV / project write-ups are included. "Proficiency" labels reflect
// how central the tool was to the underlying project work, not a guess.
// ----------------------------------------------------------------------------
export const skillCategories = [
  {
    category: "Programming & Query Languages",
    skills: ["Python", "R", "SQL", "MySQL"],
  },
  {
    category: "Data Visualization & BI",
    skills: ["Tableau", "Power BI", "Streamlit", "Matplotlib", "Seaborn"],
  },
  {
    category: "Statistics & Forecasting",
    skills: [
      "ARIMA / ARIMAX",
      "Time Series Analysis",
      "Bayesian Inference",
      "Regression",
      "Hypothesis Testing (ADF, Granger causality)",
      "Design of Experiments",
    ],
  },
  {
    category: "Machine Learning",
    skills: ["Scikit-learn", "XGBoost", "Random Forest", "K-Means Clustering", "Statsmodels"],
  },
  {
    category: "Data Engineering",
    skills: [
      "Pandas",
      "NumPy",
      "ETL Pipelines",
      "Data Cleaning & Imputation",
      "Feature Engineering",
      "Schema Design & ER Modeling",
    ],
  },
  {
    category: "Cloud & Big Data",
    skills: ["PySpark", "Apache Spark", "Databricks", "AWS (S3, Athena)", "Google Cloud Platform"],
  },
  {
    category: "NLP",
    skills: ["VADER Sentiment Analysis", "spaCy (NER)", "RapidFuzz", "Text Preprocessing"],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "Jupyter", "Docker", "Excel"],
  },
];

// ----------------------------------------------------------------------------
// EDUCATION
// ----------------------------------------------------------------------------
export const education = [
  {
    institution: "Georgia Institute of Technology",
    degree: "M.S. in Analytics",
    field: "Computational Data Analytics Track",
    dates: "Aug 2024 – May 2026",
    detail: "CGPA: 3.83 / 4.0",
    coursework: [
      "Machine Learning",
      "Time Series Analysis",
      "Data & Visual Analytics",
      "Regression",
      "Bayesian Statistics",
      "NLP",
      "Database Systems",
      "Data Analytics in Business",
    ],
    degreeUrl: "education/gtechdegree.pdf",
    transcriptUrl: "education/gtechtranscript.pdf",
  },
  {
    institution: "Texas A&M University at Qatar",
    degree: "B.S. in Mechanical Engineering",
    field: null,
    dates: "Aug 2016 – May 2020",
    detail: "Magna Cum Laude · CGPA: 3.74 / 4.0",
    coursework: [
      "Thermodynamics",
      "Heat Transfer",
      "Control Systems",
      "Mechatronics",
      "Finite Element Analysis",
      "Materials in Design",
      "Geometric Modeling",
      "Ethics in Engineering",
    ],
    honors: ["Tau Beta Pi", "Pi Tau Sigma", "Dean's Honor Roll"],
    degreeUrl: "education/tamudegree.pdf",
    transcriptUrl: "education/tamutranscript.pdf",
  },
];

// ----------------------------------------------------------------------------
// CERTIFICATIONS
// ----------------------------------------------------------------------------
// Note: none of the source documents included credential IDs or verification
// URLs, so those fields are left null and the UI hides them gracefully.
// ----------------------------------------------------------------------------
export const certifications = [
  {
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "July 2026",
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Microsoft Azure Essentials — Professional Certificate",
    issuer: "Microsoft & LinkedIn Learning",
    date: "July 2026",
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Career Essentials in GitHub — Professional Certificate",
    issuer: "GitHub & LinkedIn Learning",
    date: "July 2026",
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn Learning",
    date: "July 2026",
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Practical GitHub Actions",
    issuer: "LinkedIn Learning",
    date: null,
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Learning Microsoft 365 Copilot for Work",
    issuer: "LinkedIn Learning",
    date: null,
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    date: null,
    credentialId: null,
    verifyUrl: null,
  },
  {
    name: "Your Top AI Questions Answered: AI Literacy for Everyone",
    issuer: "LinkedIn Learning",
    date: null,
    credentialId: null,
    verifyUrl: null,
  },
];
