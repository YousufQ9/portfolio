// ============================================================================
// EXPERIENCE DATA
// ----------------------------------------------------------------------------
// Each entry powers one block on the Experience page timeline.
// "highlights" should be concrete, evidence-backed bullet points.
// Add a new job by copying an existing object and editing the fields —
// the Experience page will render it automatically, most recent first.
// ============================================================================

export const experience = [
  {
    id: "upwork",
    role: "Freelance Data Analyst",
    organization: "Upwork",
    location: "Remote",
    dates: "June 2026 – Present",
    type: "Freelance",
    summary:
      "Providing data analysis services to clients on a project basis while pursuing full-time analytics roles.",
    highlights: [
      "Delivering client data analysis engagements sourced through the Upwork platform.",
    ],
    tools: ["Python", "SQL", "Excel"],
  },
  {
    id: "gatech-consultant",
    role: "Student Analytics Consultant",
    organization: "Georgia Institute of Technology — Applied Analytics Practicum",
    location: "Atlanta, GA (Remote practicum)",
    dates: "January 2026 – May 2026",
    type: "Academic / Industry Practicum",
    summary:
      "Semester-long industry practicum with Lufthansa Group's Pricing Europe division (SWISS International Air Lines) under NDA, investigating whether social media signals can predict surges in European flight bookings.",
    highlights: [
      "Led Pipeline 1 (Reddit Signal Analysis & Relevance Scoring) on a three-person team, working directly with ~45 million rows of proprietary Lufthansa booking data across ~8,000 European city-pairs.",
      "Built an NLP pipeline (VADER sentiment + spaCy NER) across 5 travel subreddits, resolving destination mentions to ISO country codes via a 4-stage RapidFuzz fuzzy-matching system that matched 41 of 221 destinations (41.9% of Reddit rows).",
      "Discovered that ~60% of the raw Reddit–booking correlation was spurious shared seasonality; applying STL deseasonalization isolated genuine 7–28-day leading signals, with Granger causality confirmed in 7 of 41 markets.",
      "Developed and evaluated 3 composite relevance-scoring approaches; the best achieved AUC = 0.842 on high-signal markets and a 9× lift in booking-spike prediction probability over baseline.",
    ],
    tools: ["Python", "pandas", "VADER", "spaCy", "RapidFuzz", "scikit-learn", "STL Decomposition", "Granger Causality"],
    projectSlug: "lufthansa-reddit-signals",
  },
  {
    id: "jbk-controls",
    role: "Estimation Engineer — Fire Protection Systems",
    organization: "JBK Controls",
    location: "Qatar",
    dates: "September 2020 – May 2024",
    type: "Full-time",
    summary:
      "Cost estimation and technical bid support across sprinkler, deluge, pre-action, foam, and clean-agent (FM200 & NOVEC) fire suppression systems.",
    highlights: [
      "Forecasted material and labor costs for fire suppression projects using Excel-based cost models, referencing historical project data and supplier pricing.",
      "Extracted and structured quantity take-off data from AutoCAD drawings into detailed Excel cost templates, ensuring accuracy across multiple system types.",
      "Analyzed and compared multi-vendor supplier quotations to identify cost-optimal procurement options, balancing pricing against technical compliance requirements.",
      "Prepared technical and commercial bid documentation and site visit reports, coordinating with suppliers and site engineers to keep proposal data consistent, and liaised with clients post-tender for technical clarifications.",
    ],
    tools: ["Excel", "AutoCAD", "Cost Modeling", "Vendor Analysis"],
  },
];

// Earlier / supporting experience — shown in a condensed "Also" list on the
// Experience page rather than as full timeline entries, since these predate
// the analytics career pivot but still show relevant research/ops experience.
export const earlierExperience = [
  {
    role: "Community Development Assistant",
    organization: "Qatar Foundation",
    location: "Doha, Qatar",
    dates: "Aug 2019 – Aug 2020",
  },
  {
    role: "Undergraduate Student Researcher (Out-pipe Inspection Robots)",
    organization: "Texas A&M University at Qatar",
    location: "Doha, Qatar",
    dates: "Feb 2019 – May 2019",
  },
  {
    role: "Summer Intern",
    organization: "QAPCO — Qatar Petrochemical Company",
    location: "Doha, Qatar",
    dates: "May 2019 – Jul 2019",
  },
  {
    role: "Undergraduate Student Researcher (3D-Printed Vehicle Lightweighting)",
    organization: "Texas A&M University at Qatar",
    location: "Doha, Qatar",
    dates: "Aug 2019 – May 2020",
  },
];
