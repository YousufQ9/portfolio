// ============================================================================
// PROJECTS DATA - the reusable project system
// ----------------------------------------------------------------------------
// This is the single source of truth for every project on the site: the
// summary cards on /projects AND the expanded case-study content shown when
// a card is opened.
//
// HOW TO ADD A NEW PROJECT
// 1. Copy any object in the `projects` array below (from its opening `{` to
//    its closing `},`) and paste it at the end of the array.
// 2. Give it a unique `slug` (lowercase, hyphens, no spaces).
// 3. Fill in whichever fields you have. Every section on the case-study card
//    is OPTIONAL - if you leave a field as `null` or `[]`, that section
//    simply will not render. You never need to delete unused fields.
// 4. Add a thumbnail image to /public/images/projects/ and point `thumbnail`
//    at it, e.g. "/images/projects/my-project-thumb.jpg". If you don't have
//    one yet, leave it as null - a generated placeholder pattern is shown
//    instead, so nothing breaks.
// 5. Save the file. The new card appears automatically on the Projects page.
//
// FIELD REFERENCE
//   slug             string    unique id, used as the React key - required
//   title            string    project name - required
//   shortDescription string    1–2 sentences for the card - required
//   category         string[]  one or more tags from `categories` below
//   tools            string[]  technologies used
//   period           string    when it was done, e.g. "Fall 2025"
//   context          string    course / employer / team framing
//   keyResult        string    one-line standout metric shown on the card
//   thumbnail        string|null  path under /public, or null for a
//                                 generated placeholder
//   links            object    { github, dashboard, report, dataset } -
//                               any key can be omitted or null
//   problem          string    the business/analytical question
//   data             object    { source, size, variables[], limitations }
//   methodology      string[]  ordered pipeline steps
//   dataCleaning     string|null  prose description of cleaning performed
//   analysis         string[]  paragraphs describing the analysis
//   findings         string[]  key findings, bullet list
//   recommendations  string[]|null  bullet list (optional - analytical-only
//                                   projects can leave this null)
//   results          string    measurable impact OR analytical outcome
//   screenshots      array     [{ src, caption }] - optional
// ============================================================================

export const categories = [
  "All",
  "Time Series & Forecasting",
  "Machine Learning",
  "NLP",
  "Business Intelligence",
  "Database Systems",
  "Deep Learning",
  "Simulation",
  "AI / LLM Engineering",
];

export const projects = [
  // ==========================================================================
  // 1. Lufthansa Reddit Signals (industry practicum, NDA)
  // ==========================================================================
  {
    slug: "lufthansa-reddit-signals",
    title: "Social Media Signals for Flight Booking Surges",
    shortDescription:
      "An NDA industry practicum with Lufthansa Group testing whether Reddit travel chatter can predict European flight booking surges - and uncovering that most of the raw signal was actually seasonality.",
    category: ["NLP", "Time Series & Forecasting", "Machine Learning"],
    tools: ["Python", "pandas", "VADER", "spaCy", "RapidFuzz", "scikit-learn", "STL Decomposition", "Granger Causality"],
    period: "Spring 2026",
    context: "Georgia Tech Applied Analytics Practicum · Industry partner: Lufthansa Group (SWISS International Air Lines) · NDA project, 3-person team, pipeline lead",
    keyResult: "AUC = 0.842 on high-signal markets, 9× lift over baseline",
    thumbnail:  "images/projects/socialmediathumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/reddit-flight-demand-signals",
      dashboard: null,
      report: "reports/reportredacted.pdf",
      dataset: null,
    },
    problem:
      "Lufthansa's Pricing Europe division wanted to know whether the rise of \"viral travel\" content on social media could give them an earlier, more adaptive read on booking demand than their existing pipeline - specifically, whether Reddit engagement and sentiment around a destination could predict a surge in bookings to that destination before it showed up in the transaction data.",
    data: {
      source: "Proprietary Lufthansa daily flight transaction data (under NDA) + Reddit post histories from 5 travel subreddits, sourced via Academic Torrents",
      size: "~45 million rows of booking data across ~8,000 European city-pairs, Dec 2024–Dec 2025; Reddit posts from r/Travel, r/EuropeTravel, r/SoloTravel, r/UKTravel, r/Backpacking, Jan 2024–Dec 2025",
      variables: [
        "Daily bookings by origin–destination city-pair",
        "Reddit post text, upvotes, comments, cross-posts, timestamps",
        "VADER compound sentiment score per post",
        "spaCy-extracted destination entity mentions",
      ],
      limitations:
        "The official Reddit API rejected institutional credentials and scraping was rate-limited, so historical data had to be sourced from Academic Torrents instead. Free-text destination mentions only matched to 41 of 221 unique destinations (41.9% of Reddit rows) after fuzzy matching, since sub-national or ambiguous place names couldn't be reliably resolved.",
    },
    methodology: [
      "Business question: can social media activity predict flight booking surges?",
      "Data collection: Lufthansa booking data (NDA) + Reddit post histories from Academic Torrents",
      "NLP processing: VADER sentiment scoring + spaCy NER for destination extraction",
      "Entity resolution: 4-stage RapidFuzz fuzzy matching to ISO country codes",
      "Feature engineering: 68 rolling/lag features at 7, 14, 28-day windows",
      "Deseasonalization: STL decomposition to isolate genuine signal from shared seasonality",
      "Causality testing: Granger causality across 41 markets",
      "Relevance scoring: 3 composite scoring approaches, evaluated by AUC",
    ],
    dataCleaning:
      "Reddit posts were run through VADER for sentiment and spaCy NER for destination mentions, which produced free-text place names that needed to be mapped onto the ISO country codes used in the Lufthansa dataset. A four-stage RapidFuzz fuzzy-matching pipeline (using pycountry as a reference list) handled this resolution, successfully matching 41 of 221 unique destinations - representing 41.9% of all Reddit rows. From there, three engagement/sentiment metrics were computed per destination per day (a log-transformed weighted engagement score, a weighted sentiment score, and a consistent-sentiment score), and 68 total lag and rolling-window features were engineered at 7/14/21/28-day offsets to capture different temporal dynamics.",
    analysis: [
      "The first pass looked strong: raw Spearman correlation between Reddit engagement and flight bookings sat at r = 0.71–0.79. But that raw correlation was nearly identical across every tested lag window (7 to 28 days) - a pattern that's inconsistent with a genuine leading relationship, since a real predictive signal should decay as the lag increases.",
      "That inconsistency was the trigger to test for shared seasonality. Applying per-country STL deseasonalization to strip out weekly booking cycles dropped the correlation substantially (7-day rolling engagement sum: r = 0.779 → 0.201) - confirming that roughly 60% of the original correlation was both series simply peaking in summer and on similar days of the week, not Reddit predicting bookings.",
      "Critically, after deseasonalization the correlation began decaying with lag, which is the signature of a real temporal leading relationship. Mean daily sentiment collapsed to r = 0.018 (no predictive value), while a 'consistent sentiment' metric (share of positive days × 28-day mean sentiment) held at r = 0.147 across all lag windows.",
      "Three relevance-scoring approaches were then built and evaluated under two frameworks. Under a strict spike-prediction framework (booking z-score > 2.0), an engagement-momentum approach was the only one to beat random chance. Under a more realistic framework - predicting whether a market would land in its top third of booking days within the next 28 days - a weighted-linear approach using deseasonalized correlations performed best: AUC = 0.613 across all 41 matched countries, rising to AUC = 0.842 when restricted to the eight highest-signal markets (Portugal, Italy, Spain, Croatia, Greece, France, Albania, Ireland).",
    ],
    findings: [
      "~60% of the apparent Reddit–bookings correlation was shared seasonality, not a genuine leading signal - a methodological trap that would have produced a badly overconfident model if left unchecked.",
      "After correcting for seasonality, Granger causality tests confirmed statistically significant Reddit-to-bookings causality in 7 of 41 countries, with Spain and Finland showing clean 7-day predictive windows and France a 3–4-week response cycle.",
      "Following a Reddit engagement spike, the probability of a booking spike within 14 days was 15.2% - a 9× increase over the 1.7% baseline rate.",
      "Raw sentiment score carried almost no predictive value on its own (r = 0.018 after deseasonalization); a smoothed 'consistent sentiment' measure performed far better, suggesting momentum and persistence matter more than any single post's tone.",
    ],
    recommendations: [
      "Deploy the relevance-scoring model selectively on the eight high-signal markets identified (Portugal, Italy, Spain, Croatia, Greece, France, Albania, Ireland), where AUC = 0.842, rather than as a blanket signal across all European routes.",
      "Any future social-signal model for demand planning should deseasonalize before evaluating correlation - the raw correlation figures alone would have overstated the signal by roughly 3–4×.",
      "Prioritize engagement-based features over raw sentiment in any production scoring model, given the far larger predictive gap between the two after deseasonalization.",
    ],
    results:
      "The final relevance-scoring approach achieved AUC = 0.842 on the eight highest-signal markets and produced a 9× lift in booking-spike prediction probability over the 1.7% base rate - while the project's most valuable output was arguably methodological: catching that 60% of the naive correlation was spurious before it could mislead a pricing decision. Because the underlying data is proprietary Lufthansa booking data under NDA, no dashboard or dataset can be shared publicly; the codebase for the Reddit-side pipeline is available on GitHub.",
    screenshots: [],
  },

  // ==========================================================================
  // 2. Tariff CPI Tableau Dashboard
  // ==========================================================================
  {
    slug: "tariff-impact-dashboard",
    title: "Evaluating the Inflationary Impact of Tariffs on the USA",
    shortDescription:
      "A five-person team project forecasting how U.S. import tariffs pass through to consumer prices, packaged into an interactive Tableau dashboard with a live CPI simulator, published to Tableau Public.",
    category: ["Time Series & Forecasting", "Business Intelligence"],
    tools: ["R", "Tableau", "ARIMAX", "ETS / Holt-Winters", "ADF Testing", "BIC Model Selection"],
    period: "Fall 2025",
    context: "CSE 6242 - Data and Visual Analytics, Georgia Tech · 5-person team course project",
    keyResult: "4.56 / 5 average user rating across 18 responses, 130+ public dashboard views",
    thumbnail:  "images/projects/dashboardthumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/tariff_impact_dashboard",
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "No single interactive tool existed that let a general user dynamically explore how U.S. tariff changes pass through to consumer prices, or simulate hypothetical tariff scenarios and see the likely inflationary effect. The team set out to build that tool for three industries with different tariff exposure: electronics, food, and apparel.",
    data: {
      source: "U.S. Bureau of Labor Statistics (CPI), Federal Reserve Economic Data / FRED (PPI), and U.S. International Trade Commission DataWeb (tariff rates)",
      size: "10 years of historical CPI, PPI, and tariff data",
      variables: [
        "Consumer Price Index (CPI) by industry",
        "Producer Price Index (PPI)",
        "Tariff rates by Harmonized Tariff Schedule (HTS) code",
        "Country and year",
      ],
      limitations:
        "Tariffs were classified into industries via keyword matching against HTS codes, which is an approximation rather than an official industry taxonomy. Electronics and food forecasts were also affected by pandemic-era supply chain volatility that the models could only partially account for.",
    },
    methodology: [
      "Business question: how do tariff changes pass through to consumer prices by industry?",
      "Data collection: BLS, FRED, and USITC DataWeb sources merged by year, country, and HS code",
      "Data cleaning: linear interpolation of missing CPI values, IQR-based outlier removal",
      "Exploration: correlation matrix of CPI, PPI, and tariff data; ADF and ACF stationarity checks",
      "Modeling: Holt-Winters (ETS) baseline vs. ARIMAX with tariff rate as exogenous variable",
      "Visualization: 4-component interactive Tableau dashboard published to Tableau Public",
      "Evaluation: RMSE/MAPE backtesting plus an 18-response structured user survey",
    ],
    dataCleaning:
      "Tariff records were classified into the food, electronics, and apparel industries using keyword matching against Harmonized Tariff Schedule (HTS) codes (e.g. terms like 'meat', 'fruit', and 'vegetable' mapped to food). CPI series had missing values filled via linear interpolation, and the three datasets were merged by year, country, and HS code. Outliers were removed using the interquartile range (IQR) method. Stationarity was checked with Augmented Dickey-Fuller (ADF) tests and ACF plots, which showed every series was non-stationary in its raw form - so log transformation and differencing were applied before any modeling.",
    analysis: [
      "A correlation matrix built in R's base library confirmed meaningful relationships between tariff rates and both CPI and PPI movement across the three industries, providing the statistical justification for an exogenous-variable forecasting approach.",
      "Two forecasting methods were built for comparison. Holt-Winters Exponential Smoothing (ETS) served as an interpretable trend/seasonality baseline, projecting tariff rates and CPI independently. The primary model was ARIMAX - ARIMA with tariff rate included as an exogenous regressor - with industry-specific parameter orders selected by Bayesian Information Criterion (BIC): ARIMA(0,1,2) for apparel, ARIMA(0,2,3) for food, ARIMA(5,2,2) for electronics, and ARIMA(0,2,4) for overall CPI.",
      "Models were trained on data through 2023 and backtested against 2024 actuals. ARIMAX clearly outperformed ETS for apparel (MAPE 0.50% vs. 1.02%), while food and electronics results were more mixed - a limitation attributable to supply chain volatility and coarser data granularity in those categories.",
      "All model outputs were exported as CSVs and connected to Tableau as live data sources, powering four dashboard components: an Industry Metrics Explorer, Tariff–PPI/Tariff–CPI relationship charts, a global tariff heat map by country, and a Forecast-Based CPI Simulator that lets a user pick a month, industry, and hypothetical tariff rate and see the model's predicted CPI instantly.",
    ],
    findings: [
      "ARIMAX with tariff rate as an exogenous variable clearly beat the ETS baseline for apparel forecasting (0.50% MAPE vs. 1.02%), the cleanest of the three industries analyzed.",
      "Food and electronics tariff pass-through was noisier and less predictable - a reflection of real supply-chain and data-granularity constraints rather than a modeling failure.",
      "The interactive CPI simulator was the standout feature in user feedback, rated 4.56/5 for helpfulness alongside a 4.61/5 ease-of-navigation score.",
    ],
    recommendations: [
      "Treat apparel tariff pass-through forecasts with the highest confidence, given the strongest backtested accuracy; food and electronics forecasts should be presented with wider uncertainty bands.",
      "Future iterations could incorporate supply-chain indicators directly as additional exogenous variables to improve the food and electronics models specifically.",
    ],
    results:
      "The published Tableau Public dashboard received 130+ views and an 18-response user survey reported 4.56/5 overall satisfaction, 4.61/5 ease of navigation, and 4.56/5 helpfulness of the tariff simulator specifically - validating both the forecasting approach and the interactive design as genuinely useful to a general audience, not just to the team.",
    screenshots: [],
  },

  // ==========================================================================
  // 3. Vehicle Supply & Demand - XGBoost + multi-framework time series
  // ==========================================================================
  {
    slug: "vehicle-supply-demand",
    title: "Passenger Vehicle Supply & Demand Analysis",
    shortDescription:
      "Team-lead project benchmarking four forecasting frameworks against 25 years of U.S. automotive economic indicators, with a dedicated XGBoost model reaching 2.67% MAPE on vehicle sales.",
    category: ["Time Series & Forecasting", "Machine Learning"],
    tools: ["R", "XGBoost", "FRED Data", "Feature Engineering", "Time-Series Cross-Validation"],
    period: "Fall 2025",
    context: "ISYE 6402 - Time Series Analysis, Georgia Tech · 3-person team, team lead",
    keyResult: "2.67% MAPE forecasting total vehicle sales over a 2-year holdout",
    thumbnail:  "images/projects/vehiclesalesthumb.jpg",
    links: {
      github: null,
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "The U.S. passenger vehicle market is shaped by a tangle of supply and demand indicators - production, transit ridership, gas prices, new orders - that shift in relative importance over time, especially through the pandemic-era volatility of 2020–2022. The project set out to build and benchmark a multi-framework forecasting system across four key indicators rather than relying on a single model type.",
    data: {
      source: "Federal Reserve Bank of St. Louis (FRED)",
      size: "11 monthly economic time series, Jan 2000 – Dec 2024 (292 observations per series)",
      variables: [
        "Vehicle Miles Traveled (VMT)",
        "Manufacturer's New Orders (AMVPNO)",
        "Public Transit Ridership (TRANSIT)",
        "Total Vehicle Sales (TOTALSA)",
        "Domestic/foreign vehicle sales, production, exports, gas prices, natural gas consumption, inventory-to-sales ratios",
      ],
      limitations:
        "The pandemic period introduced sharp structural breaks in vehicle sales and supply chains that are difficult for any single time-series model to capture cleanly, which is part of why the project benchmarked multiple modeling frameworks rather than committing to one.",
    },
    methodology: [
      "Business question: which forecasting approach best captures U.S. vehicle supply/demand dynamics?",
      "Data collection: 11 monthly series from FRED, 2000–2024",
      "Preprocessing: Z-score normalization, Box-Cox transforms, ADF stationarity testing, first-order differencing",
      "Correlation analysis: post-transformation correlation matrix to guide variable selection",
      "Modeling: four benchmarked frameworks, including a dedicated XGBoost model for total vehicle sales",
      "Feature engineering: autoregressive lags, exogenous lags, calendar features, YoY growth",
      "Tuning: grid search with time-series cross-validation and early stopping",
      "Evaluation: RMSE, MAE, MAPE on a 2-year holdout; feature importance via gain/cover/frequency",
    ],
    dataCleaning:
      "All 11 series were normalized using Z-scores to allow comparative visualization on a single scale. Box-Cox transformations addressed skewness, and Augmented Dickey-Fuller (ADF) tests confirmed non-stationarity across most series, which required first-order differencing before modeling. A post-transformation correlation matrix was built specifically on the differenced (rate-of-change) series to identify genuine linear relationships rather than ones inflated by shared trend.",
    analysis: [
      "Because Total Vehicle Sales (TOTALSA) is both the most economically important series and the most affected by pandemic-era volatility, it received a dedicated modeling framework: an XGBoost regressor rather than a classical time-series model, to better capture non-linear interactions between predictors.",
      "Feature engineering was extensive: autoregressive lags of TOTALSA itself at 1, 2, 3, 6, and 12 months; lagged values of all exogenous indicators at 1, 3, and 6 months; calendar features (month, quarter); and a year-over-year sales growth variable.",
      "Hyperparameters were tuned via grid search with time-series cross-validation and early stopping, converging on a learning rate of 0.05, max depth of 3, and 546 boosting rounds.",
      "Feature importance analysis (by gain) showed the 1-month lag of TOTALSA itself accounted for 77.7% of total model gain - confirming vehicle sales are strongly autoregressive month-to-month - while manufacturer new orders, gas prices, and production metrics contributed smaller but meaningful secondary signal.",
    ],
    findings: [
      "The tuned XGBoost model achieved a test RMSE of 0.54, MAE of 0.42, and MAPE of 2.67% over a 2-year holdout - strong accuracy for a macroeconomic series marked by pandemic-era structural breaks.",
      "Vehicle sales are dominated by their own recent momentum: the 1-month lag alone explained 77.7% of the model's total predictive gain.",
      "Manufacturer new orders, gas prices, and production metrics added real but secondary predictive value beyond the autoregressive signal.",
    ],
    recommendations: [
      "For short-horizon vehicle-sales forecasting, prioritize recent-lag features over longer exogenous indicators, given how dominant the 1-month autoregressive signal proved to be.",
      "Continue monitoring gas prices and manufacturer new orders as secondary indicators, since they contributed measurable - if smaller - predictive value on top of the autoregressive baseline.",
    ],
    results:
      "The dedicated XGBoost framework for Total Vehicle Sales reached 2.67% MAPE on a genuine 2-year holdout period, a strong result for a series this exposed to macroeconomic shocks, and the feature importance analysis produced a clear, actionable takeaway about which indicators actually drive short-term forecasting accuracy versus which are secondary.",
    screenshots: [],
  },

  // ==========================================================================
  // 4. Chest X-Ray Report Generation - LSTM vs Transformer
  // ==========================================================================
  {
    slug: "chest-xray-report-generation",
    title: "From LSTM to Transformer: Clinical Accuracy in Chest X-Ray Report Generation",
    shortDescription:
      "A deep learning research project comparing three decoder architectures for automated radiology report generation, isolating the exact mechanism behind a measurable fluency–clinical accuracy trade-off.",
    category: ["Deep Learning", "NLP"],
    tools: ["Python", "PyTorch", "DenseNet-121", "Transformers", "pycocoevalcap", "CheXbert"],
    period: "Spring 2026",
    context: "CS 7643 - Deep Learning, Georgia Tech · 3-person team",
    keyResult: "+43% CIDEr and +23% CheXbert F1 from clinically guided decoding vs. vanilla Transformer",
    thumbnail:  "images/projects/lstmthumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/dl-cxr-report-gen",
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "Automatically generating radiology reports from chest X-rays raises a specific tension: a model can be tuned to write fluent, natural-sounding reports, or to be clinically precise about findings - but can it do both at once? The project set out to test three decoder architectures under a shared pipeline to find out whether linguistic fluency and clinical correctness trade off against each other, and if so, why.",
    data: {
      source: "Indiana University Chest X-Ray (IU X-Ray) dataset, using the canonical R2Gen train/val/test split",
      size: "2,069 / 296 / 590 studies (train/val/test), 5,910 images total",
      variables: [
        "Frontal and lateral chest X-ray images (224×224, ImageNet-normalized)",
        "Free-text radiology reports (lowercased, SEP-tokenized, truncated to 60 tokens)",
        "975-token vocabulary built from the training split (min. frequency 3)",
      ],
      limitations:
        "IU X-Ray is a relatively small dataset for deep generative modeling, which limited how much the LSTM baseline in particular could learn to produce long, specific reports.",
    },
    methodology: [
      "Research question: is there an inherent trade-off between linguistic fluency and clinical accuracy in generated reports?",
      "Data preparation: dual-view (frontal + lateral) encoding, DenseNet-121 image features, 60-token report truncation",
      "Baseline: hierarchical LSTM with soft spatial co-attention (Jing et al. 2018 architecture)",
      "Comparison models: vanilla 6-layer Transformer decoder and a clinically guided Transformer variant",
      "Clinical guidance mechanisms: weighted cross-entropy loss + bias-constrained decoding",
      "Evaluation: linguistic metrics (BLEU, METEOR, CIDEr, ROUGE-L) and clinical metrics (CheXbert F1, hallucination rate)",
      "Ablation study across 11 configurations to isolate which guidance mechanism mattered most",
    ],
    dataCleaning:
      "Images were resized to 224×224 and normalized with ImageNet statistics for compatibility with the pretrained DenseNet-121 encoder. Reports were lowercased, tokenized with a custom SEP-boundary scheme to separate sentences, and truncated to 60 tokens. A 975-token vocabulary was built from the training split using a minimum frequency threshold of 3 to exclude rare, noisy tokens.",
    analysis: [
      "My contribution was implementing the hierarchical LSTM baseline, reproducing the two-level recurrent architecture from Jing et al. (2018) with three adaptations: swapping the original VGG encoder for DenseNet-121 (for consistency with the other models in the comparison), adding dual-view encoding for frontal and lateral X-rays, and unifying the dataloader with the shared 5-tuple batch format used across all three models. After hyperparameter tuning across hidden size, dropout, learning rate, and training schedule, the LSTM reached a final validation BLEU-1 of 0.286 - a 33% improvement over its default configuration.",
      "I also built the full evaluation module used across all three models: linguistic metrics (BLEU-1 through BLEU-4, METEOR, CIDEr, ROUGE-L via pycocoevalcap) and clinical metrics (CheXbert F1, hallucination rate, missed finding rate).",
      "All three architectures were trained under a shared pipeline (AdamW, cosine learning-rate decay, mixed-precision, early stopping) so comparisons were fair. The LSTM trailed both Transformer variants decisively on linguistic metrics (BLEU-4 of 0.034 vs. 0.103 for the vanilla Transformer) - a hierarchical recurrent decoder simply struggles to generate long, specific reports from a dataset this size.",
      "The single most impactful change across the entire study wasn't architecture choice - it was whether the image encoder was frozen or trained jointly. Unfreezing DenseNet-121 for the vanilla Transformer raised validation BLEU-4 from near zero to 0.13 and extended average report length from 10–15 tokens to 30–50.",
      "The clinically guided Transformer added two mechanisms on top of the vanilla Transformer: weighted cross-entropy loss that penalized mistaken clinical-term predictions more heavily, and bias-constrained decoding that nudged the output distribution toward clinical vocabulary at inference time. This model won decisively on clinical metrics (CIDEr 0.507 vs. 0.354, +43%; CheXbert macro-F1 0.233 vs. 0.189, +23%) - confirming the fluency–specificity trade-off the project set out to test.",
      "An 11-configuration ablation study isolated which guidance mechanism actually mattered: soft guidance consistently beat hard guidance, loss weighting alone was the single most cost-effective mechanism, and - notably - applying decoding bias without loss weighting actively hurt performance by pulling the output distribution off the model's learned manifold.",
    ],
    findings: [
      "Jointly training (not freezing) the image encoder was the single biggest lever in the entire study - bigger than any decoder architecture choice.",
      "There is a measurable, real fluency–clinical accuracy trade-off: the vanilla Transformer wrote more linguistically fluent reports, while the clinically guided variant was meaningfully more clinically accurate (+43% CIDEr, +23% CheXbert F1).",
      "Decoding-time bias correction only helps when paired with loss-level guidance during training - applied alone, it actively degrades output quality.",
      "A hierarchical LSTM decoder is not competitive with Transformer-based decoders for this task at this dataset scale.",
    ],
    recommendations: [
      "For any similar report-generation system, prioritize unfreezing and jointly training the image encoder before investing further effort in decoder architecture.",
      "If clinical precision matters more than narrative fluency (the more likely priority in an actual clinical deployment), use weighted loss guidance rather than decoding-time bias correction alone.",
    ],
    results:
      "The clinically guided Transformer improved CIDEr by 43% and CheXbert macro-F1 by 23% over the vanilla Transformer baseline, directly answering the research question: yes, a measurable fluency–clinical accuracy trade-off exists, and it can be partially controlled through training-time guidance choices rather than architecture alone.",
    screenshots: [],
  },

  // ==========================================================================
  // 5. Café Sales Forecasting & Payment Classification
  // ==========================================================================
  {
    slug: "cafe-sales-forecasting",
    title: "Café Sales Analysis - Forecasting & Payment Method Classification",
    shortDescription:
      "A two-part project on a deliberately 'dirty' 10,000-row café transactions dataset: an ARIMA sales forecast accurate to within 1.4% RMSE, and a Random Forest classifier predicting how customers will pay.",
    category: ["Time Series & Forecasting", "Machine Learning"],
    tools: ["Python", "pandas", "scikit-learn", "statsmodels", "ARIMA", "Random Forest"],
    period: "Spring 2025",
    context: "ISYE 6740 - Computational Data Analysis, Georgia Tech · Individual course project",
    keyResult: "ARIMA forecast MAE of 1.24% (RMSE 1.40%) on monthly café sales",
    thumbnail:  "images/projects/cafesalesthumb.jpg",
    links: {
      github: null,
      dashboard: null,
      report: null,
      dataset: "Kaggle café sales dataset",
    },
    problem:
      "A real-world café transactions dataset, sourced from Kaggle specifically because it was 'dirty,' offered two separate analytical questions: could monthly sales be forecast accurately enough to inform staffing and inventory decisions, and could a customer's payment method be predicted from what they bought, opening up potential marketing applications?",
    data: {
      source: "Kaggle café sales dataset",
      size: "10,000 transaction records across 8 features",
      variables: ["Item purchased", "Quantity", "Price", "Payment method", "Location", "Transaction date"],
      limitations:
        "Missing and erroneous values were spread across nearly every column, and 4.6% of rows had no transaction date at all with no logical basis for imputing one, so those rows were dropped rather than guessed at.",
    },
    methodology: [
      "Business questions: (1) can monthly café sales be forecast reliably? (2) can payment method be predicted from purchase details?",
      "Data cleaning: multi-step imputation using dictionary lookups, group-mode imputation, and targeted row drops",
      "Feature engineering: month and day-of-week extraction from transaction dates",
      "Part 1 - EDA and ARIMA(2,0,1) forecasting with 80/20 train-test split",
      "Part 2 - Random Forest classification of payment method with feature importance analysis",
    ],
    dataCleaning:
      "Missing and erroneous values touched nearly every column, so a multi-step imputation strategy was used instead of simple mean/mode fills. Item prices and missing item names were recovered through dictionary mapping against the known menu (reverse lookup by price). Where items were ambiguous because multiple menu items shared a price, month and day-of-week were extracted from the transaction date and used as additional grouping features, with the mode imputed per price/quantity/temporal group. Missing payment method and location values were imputed using the most frequent value for that item-quantity combination. Rows with missing transaction dates (4.6% of the data) were dropped after confirming there was no reliable basis for imputing them.",
    analysis: [
      "Exploratory analysis on the cleaned data revealed clear item-level and monthly sales trends: salads were the consistently top-selling item, cookies consistently the lowest.",
      "An ARIMA(2,0,1) model was fit to forecast monthly sales, with the Augmented Dickey-Fuller test confirming stationarity and the (p,d,q) parameters manually tuned to minimize RMSE on an 80/20 train-test split. The final model produced a 3-month forward forecast with 90% confidence intervals - intended as actionable input for inventory and staffing decisions.",
      "For the second half of the project, a Random Forest classifier was trained to predict payment method from item, quantity, and location (all label-encoded). Feature importance analysis showed the item being purchased was the dominant predictor - a specific, actionable finding for a business considering incentives to steer customers toward preferred payment channels.",
    ],
    findings: [
      "The final ARIMA(2,0,1) model achieved a MAE of $88.75 (1.24%) and RMSE of $100.29 (1.40%) - accurate enough to support real staffing and inventory planning.",
      "The Random Forest payment-method classifier reached 57.79% test accuracy, meaningfully above the majority-class baseline for this problem.",
      "Item purchased was the single strongest predictor of payment method - stronger than quantity or location - suggesting certain menu items are disproportionately associated with a given payment type.",
    ],
    recommendations: [
      "Use the 3-month ARIMA forecast with its 90% confidence intervals directly for near-term inventory and staffing decisions, given the low backtested error.",
      "Investigate which specific items drive the payment-method association, since that item-level pattern is the most actionable lever for any targeted payment-channel promotion.",
    ],
    results:
      "The forecasting model reached a 1.40% RMSE on held-out data, and the classification model identified a clear, business-relevant driver (item purchased) behind payment method choice - both outcomes were validated on a genuinely messy, real-world dataset rather than a pre-cleaned one, which was the point of the exercise.",
    screenshots: [],
  },

  // ==========================================================================
  // 6. Stevie's Dog Sanctuary - Full-Stack Database Application
  // ==========================================================================
  {
    slug: "dog-sanctuary-database",
    title: "Stevie's Dog Sanctuary - Full-Stack Database Application",
    shortDescription:
      "A complete database application lifecycle for a fictional dog rescue: ER modeling, relational schema design, and a working React + Django + MySQL app with role-based access and five executive reports.",
    category: ["Database Systems"],
    tools: ["MySQL", "SQL", "Django", "React", "ER Modeling", "Schema Design"],
    period: "Spring 2025",
    context: "CS 6400 - Database Systems Concepts and Design, Georgia Tech · Team project (Team 028)",
    keyResult: "Full CRUD application with role-based access control and 5 executive reports",
    thumbnail: "images/projects/dbthumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/database_stevies_dog_sanctuary",
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "A fictional dog rescue organization needed a system to manage its full operational lifecycle - intake, expenses, adoptions, volunteer management, and reporting - with two distinct user roles that required different levels of access, and business rules (tiered adoption fees, editability restrictions, duplicate-expense prevention) complex enough to require careful schema design rather than an off-the-shelf tool.",
    data: {
      source: "Application-managed relational data (dogs, expenses, adoptions, volunteers) - not an external dataset, since this was a from-scratch application build",
      size: null,
      variables: [
        "Dog records (breed, sex, age, adoptability status, alteration/microchip status)",
        "Expense records (vendor, date, amount, dog)",
        "Adoption applications and approvals",
        "Volunteer and Executive Director accounts",
      ],
      limitations: null,
    },
    methodology: [
      "Requirements analysis for two user roles: Volunteer and Executive Director",
      "Entity-relationship modeling and relational schema design",
      "Business rule encoding directly into the schema (tiered fees, editability constraints, duplicate prevention)",
      "Full-stack implementation: React frontend, Django backend, MySQL database",
      "Role-based access control via session-validated permissions at the application and query level",
      "Five executive-only reports with SQL joins, grouping, and drill-down detail views",
    ],
    dataCleaning: null,
    analysis: [
      "The data model had to encode a surprising amount of real-world business logic directly into the schema: a configurable sanctuary capacity, conditional editability (breed only updatable from Unknown/Mixed, sex only if Unknown, alteration/microchip status only before adoption), duplicate-expense prevention per vendor per date per dog, and a tiered adoption fee calculation - 125% of recorded expenses for standard dogs, 10% for rescue-network surrenders, with a special waiver condition for Pointer-breed dogs named Stevie or Stephanie. Multi-breed dogs were stored relationally and dynamically concatenated into alphabetically ordered, slash-separated strings for display.",
      "Role-based access control was implemented via session variables set at login and validated against the database on every sensitive operation - not just hidden in the UI, but enforced at the query level so a Volunteer account genuinely could not perform Executive Director actions even with a modified request.",
      "The full CRUD interface included a filterable Dog Dashboard (breed, sex, age range, adoptability), an Add Dog form with dynamic dropdowns populated from database-managed lookup tables, a Dog Detail screen with grouped/totalled expenses, a duplicate-validated Add Expense form, and a complete adoption workflow from last-name search through fee-calculation confirmation.",
      "Five reports were built exclusively for the Executive Director role: a rolling 7-month Rescue Network Report with clickable drill-downs, a 12-month Monthly Adoption Report broken down by breed (covering surrenders, adoptions, expenses, fees, and net profit), an Expense Analysis report aggregating spend by vendor, a case-insensitive Volunteer Lookup, and a Volunteer Anniversaries report that flags milestone years.",
    ],
    findings: [
      "Encoding business rules (tiered fees, conditional editability, duplicate prevention) directly into the schema and application layer - rather than leaving them as unenforced conventions - proved essential to making the reports and workflows trustworthy.",
      "Session-validated, query-level access control (rather than UI-only role gating) was necessary to make the Executive Director/Volunteer separation actually secure.",
    ],
    recommendations: null,
    results:
      "The result was a fully working full-stack application - not a mockup - covering the complete lifecycle from ER modeling through a deployed React/Django/MySQL system with role-based access, five executive reports, and complex business rules enforced at the database level. This was a database design and implementation exercise rather than a live business, so there are no adoption or revenue figures to report; the demonstrated outcome is the working system itself.",
    screenshots: [],
  },

  // ==========================================================================
  // 7. Pakistan T20I Cricket Performance Analysis
  // ==========================================================================
  {
    slug: "pakistan-t20i-cricket-analysis",
    title: "Pakistan Men's T20I Performance Analysis (2021–2024)",
    shortDescription:
      "An end-to-end exploratory analysis of Pakistan's T20 international cricket performance, using K-Means clustering to segment batting roles and quantify each player's contribution to wins.",
    category: ["Machine Learning"],
    tools: ["Python", "pandas", "NumPy", "matplotlib", "scikit-learn", "K-Means Clustering"],
    period: "Fall 2024",
    context: "CSE 6040 - Computing for Data Analysis, Georgia Tech · Extra credit project",
    keyResult: "K-Means segmentation of batting roles + individual win-contribution scoring",
    thumbnail: "images/projects/cricketthumb.jpg",
    links: {
      github: null,
      dashboard: null,
      report: null,
      dataset: "ESPNcricinfo match and player statistics",
    },
    problem:
      "Three concrete questions structured the analysis of Pakistan's T20I team from 2021–2024: does playing at home provide a measurable advantage, can batting roles within the team be identified and evaluated objectively rather than by reputation, and who was the team's most valuable player over the period based on actual contribution to wins?",
    data: {
      source: "ESPNcricinfo match and player statistics",
      size: "Multi-team dataset filtered down to Pakistan-specific T20I matches, 2021–2024",
      variables: ["Match results", "Venue", "Batting statistics per player per match", "Win/loss outcome"],
      limitations:
        "Home/away classification relied on known Pakistani venues, and matches with no result were removed, which slightly reduces the sample compared to the full fixture list.",
    },
    methodology: [
      "Business questions: home advantage, batting role identification, most valuable player",
      "Data ingestion: filtering a multi-team dataset to Pakistan-specific matches",
      "Cleaning: removing no-result games, engineering home/away classification from known venues",
      "Analysis: win/loss ratio computation and visualization (overall, home, away)",
      "Modeling: K-Means clustering on batting statistics to segment player roles",
      "Scoring: individual contribution metrics to identify the most impactful players in wins",
    ],
    dataCleaning:
      "The raw dataset covered multiple international teams and was filtered down to Pakistan-specific matches only. Games with no result (rain-outs, abandoned matches) were removed, and a home/away feature was engineered by cross-referencing match venues against a list of known Pakistani grounds.",
    analysis: [
      "Win/loss ratios were computed and visualized with pie charts across three splits - overall, home matches, and away matches - to directly address the home-advantage question.",
      "K-Means clustering (scikit-learn) was applied to player batting statistics to segment the squad into distinct roles, such as anchors versus aggressive hitters, without relying on subjective or media-driven role labels.",
      "Individual contribution metrics were computed per player to identify who contributed most to match wins specifically, rather than just who had the highest raw batting average - a distinction that matters for a genuinely evidence-based 'most valuable player' assessment.",
    ],
    findings: [
      "Win/loss splits by venue provided a direct, data-based answer to whether Pakistan held a measurable home advantage over the period.",
      "K-Means clustering successfully separated batters into distinct statistical roles (e.g. anchors vs. aggressive hitters) purely from their batting numbers, without needing predefined role labels.",
      "Contribution scoring identified specific players whose statistical impact on wins stood out from the raw batting average leaderboard.",
    ],
    recommendations: null,
    results:
      "The analysis delivered a clear, evidence-based answer to all three original questions - home advantage, role segmentation, and player value - built entirely from public ESPNcricinfo data in a self-contained Jupyter notebook, without relying on subjective cricket punditry for any of the conclusions.",
    screenshots: [],
  },

  

  // ==========================================================================
  // 9. Yahtzee Monte Carlo Simulation
  // ==========================================================================
  {
    slug: "yahtzee-monte-carlo-simulation",
    title: "Single-Player Yahtzee Strategy Comparison via Monte Carlo Simulation",
    shortDescription:
      "A from-scratch Yahtzee game engine and Monte Carlo simulation comparing three playing strategies across 100,000 games each, quantifying the real risk/reward gap between a greedy and a high-variance strategy.",
    category: ["Simulation"],
    tools: ["Python", "Monte Carlo Simulation", "matplotlib"],
    period: "Spring 2025",
    context: "ISYE 6644 - Simulation & Modeling, Georgia Tech · Individual course project",
    keyResult: "Greedy strategy: 157.86 avg score (SD 53.55) vs. Random: 45.98 avg, across 100,000 simulated games",
    thumbnail:  "images/projects/yahtzeethumb.jpg",
    links: {
      github: null,
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "Yahtzee strategy advice is usually qualitative ('go for the big hands when you can'). The project set out to quantify that advice directly: build a complete, accurate game engine from scratch and run large-scale Monte Carlo simulation to measure exactly how much three different strategies differ in expected score, variance, and ceiling outcomes.",
    data: {
      source: "Simulated data - generated entirely by the custom-built game engine, not an external dataset",
      size: "100,000 simulated games per strategy (300,000 total), plus a sensitivity check at 1,000 and 10,000 runs",
      variables: ["Turn-by-turn dice rolls and rerolls", "Scoring category selections", "Final score per game"],
      limitations: null,
    },
    methodology: [
      "Build a complete Yahtzee game engine from scratch: all 13 scoring categories, upper-section bonus, Yahtzee bonuses, two-reroll-per-turn mechanic",
      "Implement three strategies: Random (baseline), Spamming Yahtzee (high-risk/high-reward), Greedy (maximize current-turn score)",
      "Run 100,000 simulated games per strategy",
      "Analyze average score, standard deviation, min/max scores, Yahtzee rates, and bonus frequencies",
      "Sensitivity analysis across 1,000 / 10,000 / 100,000 runs to confirm estimate stability",
    ],
    dataCleaning: null,
    analysis: [
      "Three strategies were implemented with genuinely different decision logic. The Random Strategy used Python's randint() to make every decision with no logic, serving purely as a baseline. The Spamming Yahtzee Strategy prioritized five-of-a-kind every turn, keeping the majority die value and rerolling everything else - a deliberately high-risk, high-reward approach. The Greedy Strategy maximized the current turn's score: pursuing Yahtzee when three-plus matching dice already appeared, otherwise targeting straights, and always picking the highest-scoring available category.",
      "After 100,000 iterations per strategy, results were compared across average score, standard deviation, highest/lowest scores, Yahtzee rates, and bonus frequencies, visualized with bar charts and histograms.",
      "A sensitivity analysis at 1,000, 10,000, and 100,000 runs confirmed the estimates had stabilized by 100,000 iterations, validating that sample size was sufficient for the headline comparison.",
    ],
    findings: [
      "The Greedy Strategy achieved the highest average score (157.86) with the lowest variability among the two non-random strategies (SD: 53.55).",
      "The Spamming Yahtzee Strategy was only marginally behind on average (156.14) but showed meaningfully higher variance and a much higher ceiling (734 vs. 616 max score) - confirming its high-risk, high-reward character quantitatively rather than just anecdotally.",
      "The Random Strategy scored dramatically lower (45.98 average), demonstrating just how much value even simple rule-based decision-making adds over no strategy at all.",
    ],
    recommendations: [
      "For consistent scoring, the Greedy per-turn-maximization strategy is the better default given its higher average and lower variance.",
      "For scenarios where a single high score matters more than consistency (e.g. needing to beat a specific target), the Spamming Yahtzee approach's higher ceiling makes it the better choice despite the higher variance.",
    ],
    results:
      "The simulation precisely quantified what had previously been informal strategy intuition: a ~1.7-point average score difference between the top two strategies, alongside a large and measurable gap in variance and ceiling outcome - turning 'play it safe vs. go for broke' into an actual, numbers-backed trade-off.",
    screenshots: [],
  },

  // ==========================================================================
  // 10. SafeDoc QA - RAG Pipeline with Guardrails (AI / LLM Engineering)
  // ==========================================================================
  {
    slug: "safedoc-qa-rag-pipeline",
    title: "SafeDoc QA - RAG Pipeline with Guardrails & Observability",
    shortDescription:
      "An end-to-end retrieval-augmented generation system built from scratch, with an LLM-as-judge guardrail architecture and full request-level tracing - going beyond a typical RAG demo to address grounding and safety directly.",
    category: ["AI / LLM Engineering"],
    tools: ["Python", "LangChain", "ChromaDB", "sentence-transformers", "FastAPI", "Langfuse", "Groq API"],
    period: "May 2026",
    context: "Independent project",
    keyResult: "Full input/output guardrail architecture with per-request observability tracing",
    thumbnail: "images/projects/safedocthumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/safedoc-qa",
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "Most RAG demos stop at 'retrieve chunks, ask an LLM.' This project asked a harder question: how do you build a document Q&A system where you can trust that (a) it won't answer questions it has no business answering, and (b) every answer it does give is actually grounded in the retrieved source material rather than hallucinated - and how do you make both of those properties observable, not just assumed?",
    data: {
      source: "User-uploaded PDF documents (system is document-agnostic by design)",
      size: null,
      variables: null,
      limitations:
        "As an infrastructure/systems project rather than a data analysis project, there is no dataset in the traditional sense - the 'data' is whatever PDF a user ingests at runtime.",
    },
    methodology: [
      "Ingestion: PDF parsing with recursive character chunking",
      "Embedding: local sentence-transformer embeddings (all-MiniLM-L6-v2) - no external embedding API dependency",
      "Retrieval: ChromaDB vector store with Maximal Marginal Relevance (MMR) retrieval",
      "Generation: grounding-constrained LLM chain using Groq's free-tier Llama 3.1",
      "Guardrails: LLM-as-judge input rail (blocks off-topic/injected queries) + output rail (checks answer grounding against retrieved context)",
      "Serving & observability: FastAPI endpoint with full Langfuse tracing (retrieval, prompt, tokens, latency per request)",
    ],
    dataCleaning: null,
    analysis: [
      "The retrieval layer uses local sentence-transformer embeddings rather than a paid embedding API, keeping the pipeline self-hostable, paired with ChromaDB and MMR retrieval specifically to reduce redundant near-duplicate chunks being returned for a single query.",
      "The core design decision was building guardrails as two separate LLM-as-judge checks rather than one. An input rail evaluates each incoming query before retrieval even happens, blocking off-topic or prompt-injection attempts. A separate output rail then checks the generated answer against the retrieved context specifically for grounding - catching cases where the LLM's answer drifts from what the source documents actually support, independent of whether the input was legitimate.",
      "Every request is traced through Langfuse at the span level - retrieval, prompt construction, token usage, and latency are all logged per request, which turns 'is this system behaving correctly' from a manual spot-check into something that can be monitored systematically.",
    ],
    findings: [
      "Separating guardrails into an input-side relevance check and an output-side grounding check catches two genuinely different failure modes that a single combined check would likely miss.",
      "Full per-request tracing (retrieval, prompt, tokens, latency) is straightforward to add with Langfuse and materially changes how debuggable a RAG system is in practice.",
    ],
    recommendations: null,
    results:
      "The system is a complete, working RAG pipeline with observable guardrails rather than a proof-of-concept notebook - it runs as a FastAPI service, is traced end-to-end, and specifically targets the grounding and safety gaps that typical RAG tutorials skip over. Code is available on GitHub.",
    screenshots: [],
  },

  // ==========================================================================
  // 11. AnalystAgent - Multi-Agent Research Assistant (AI / LLM Engineering)
  // ==========================================================================
  {
    slug: "analyst-agent-multi-agent-research",
    title: "AnalystAgent - Multi-Agent Research Assistant",
    shortDescription:
      "A 3-node LangGraph research pipeline (Planner → Researcher → Synthesiser) with confidence-based self-correction, human-in-the-loop checkpoints, and a live Streamlit frontend.",
    category: ["AI / LLM Engineering"],
    tools: ["Python", "LangGraph", "ChromaDB", "Tavily API", "FastAPI", "Langfuse", "Streamlit"],
    period: "May 2026",
    context: "Independent project",
    keyResult: "Automated confidence-based retry loop when synthesis confidence falls below 0.7",
    thumbnail: "images/projects/analystthumb.jpg",
    links: {
      github: "https://github.com/YousufQ9/analyst-agent",
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "A single-shot LLM call to 'research and summarize a topic' has no way to notice when its own answer is weak, and no mechanism to try again with a different approach. This project set out to build a multi-agent pipeline that plans its own research, retrieves from two different sources, and - critically - can recognize low-confidence output and automatically retry before handing an answer to the user.",
    data: {
      source: "Dual retrieval at query time: live web search (Tavily API) + a ChromaDB RAG index",
      size: null,
      variables: null,
      limitations:
        "As an agentic systems project, output quality is bounded by the reliability of the underlying web search and LLM calls at query time rather than by a fixed, evaluable dataset.",
    },
    methodology: [
      "Architecture: 3-node LangGraph pipeline - Planner, Researcher, Synthesiser",
      "State management: typed shared state via Python TypedDict across all nodes",
      "Retrieval: dual per-subquery retrieval combining Tavily web search and ChromaDB RAG",
      "Self-correction: confidence-based conditional retry edge that re-runs the Researcher node when synthesis confidence falls below 0.7",
      "Human oversight: interrupt_before checkpoint with MemorySaver for human-in-the-loop review",
      "Observability: per-node Langfuse spans plus token cost tracking across all LLM calls",
      "Serving: FastAPI REST endpoint with UUID-per-request state isolation, Streamlit frontend showing live pipeline status",
    ],
    dataCleaning: null,
    analysis: [
      "The pipeline is structured as three distinct LangGraph nodes with a typed shared state (TypedDict) passed between them: a Planner that breaks the research question into subquestions, a Researcher that retrieves evidence per subquestion from both a live web search (Tavily) and a local ChromaDB RAG index, and a Synthesiser that combines everything into a final answer.",
      "The distinguishing feature is a confidence-based conditional retry edge: when the Synthesiser's confidence in its own output falls below a 0.7 threshold, the graph automatically routes back to the Researcher node to gather more evidence before trying synthesis again - rather than simply returning a weak answer.",
      "A human-in-the-loop checkpoint was implemented using LangGraph's interrupt_before mechanism with MemorySaver, allowing a human reviewer to pause and inspect the pipeline's state mid-run rather than only seeing the final output.",
      "The system is fully observable: per-node Langfuse spans and token-cost tracking cover every LLM call in the pipeline, and it's served as a FastAPI REST endpoint with UUID-based state isolation per request, paired with a Streamlit frontend that shows live pipeline status as it runs.",
    ],
    findings: [
      "A confidence-gated retry edge is a practical way to give a multi-agent pipeline a form of self-awareness about its own output quality, without needing a separate evaluation model.",
      "Typed shared state (TypedDict) across LangGraph nodes made the multi-node pipeline substantially easier to reason about and debug than an untyped state dictionary would have been.",
    ],
    recommendations: null,
    results:
      "The result is a working multi-agent research pipeline with automated self-correction and human oversight built in from the start, served as both an API and an interactive frontend - the kind of production-shaped agentic system that goes beyond a single LangChain call. Code is available on GitHub.",
    screenshots: [],
  },

  // ==========================================================================
  // 8. Hajj Crowd Safety Analytics Case Study
  // ==========================================================================
  {
    slug: "hajj-crowd-analytics-case-study",
    title: "Using Analytics to Safely Manage Large-Scale Crowds at the Hajj",
    shortDescription:
      "A case study proposing a four-model analytics pipeline - clustering, design of experiments, simulation, and real-time logistic regression - for crowd safety at an event of up to 4 million people.",
    category: ["Simulation", "Machine Learning"],
    tools: ["Clustering", "Design of Experiments", "Stochastic Simulation", "Logistic Regression"],
    period: "Fall 2024",
    context: "ISYE 6501 - Introduction to Analytics Modeling, Georgia Tech · Individual course project",
    keyResult: "A four-step integrated analytics pipeline spanning pre-event planning to real-time deployment",
    thumbnail: null,
    links: {
      github: null,
      dashboard: null,
      report: null,
      dataset: null,
    },
    problem:
      "The Hajj pilgrimage brings up to 4 million people to Makkah, Saudi Arabia, each year, creating one of the world's hardest large-scale crowd safety problems. This was a proposal-style case study requiring independent analytical reasoning - choosing and justifying which models to combine, rather than researching what is actually implemented on the ground.",
    data: {
      source: "Hypothetical / illustrative - this was a proposal exercise, not an analysis of a real operational dataset",
      size: null,
      variables: ["Historical crowd movement / GPS data (proposed)", "Live crowd density and flow rate (proposed)"],
      limitations:
        "As a proposal-style case study, the project reasoned about what data would be required and how models should be sequenced, rather than fitting models to an actual crowd dataset.",
    },
    methodology: [
      "Step 1 - Clustering: identify high-density crowd 'hotspots' from historical movement/GPS data as a spatial risk baseline",
      "Step 2 - Design of Experiments: fractional factorial DOE to efficiently test intervention combinations (signage, diversions, announcements, staff, notifications)",
      "Step 3 - Stochastic Simulation: model crowd-behavior randomness (e.g. via Arena) to validate interventions before the event",
      "Step 4 - Real-time Logistic Regression: live model updating every few minutes on crowd density/flow to predict overcrowding or stampede probability",
    ],
    dataCleaning: null,
    analysis: [
      "The proposed pipeline was structured as four sequential steps, each feeding the next. Clustering on historical movement and GPS data would identify high-density hotspots, forming a spatial risk baseline before any interventions are designed.",
      "A fractional factorial Design of Experiments approach was proposed to test combinations of crowd-control interventions - signage, diversions, announcements, on-ground staff, push notifications - across diverse pilgrim demographics, without the impossible cost of exhaustively testing every combination.",
      "Stochastic simulation (using a tool such as Arena) was proposed to model the inherent randomness of human crowd behavior and validate the chosen intervention strategies under multiple scenarios before the actual event takes place.",
      "For live deployment during the event itself, a logistic regression model updating every few minutes on real-time crowd density and flow-rate data was proposed to predict the probability of overcrowding or stampede incidents and trigger proactive responses.",
      "Beyond just proposing four models, the report specifically reasoned through data requirements, collection methods, and refresh cadence for each step, and articulated how the four stages integrate into one coherent, operationally viable system rather than four disconnected analyses.",
    ],
    findings: [
      "Different modeling techniques are suited to different timescales of the same safety problem: clustering and DOE for pre-event planning, simulation for pre-event validation, and logistic regression for real-time in-event response.",
      "A workable crowd-safety analytics system needs to combine spatial, experimental, and real-time modeling approaches - no single model type addresses the full problem.",
    ],
    recommendations: [
      "Sequence the four proposed models as a pipeline (clustering → DOE → simulation → real-time regression) rather than deploying any single model in isolation.",
      "Prioritize the real-time logistic regression component for operational value during the event itself, since it's the only stage that can trigger a proactive live response.",
    ],
    results:
      "This was an analytical reasoning exercise rather than a deployed system, so there is no live performance metric to report. The demonstrated outcome is the coherence and technical soundness of the proposed four-model pipeline and the report's reasoning about data requirements and model refresh cadence at each stage.",
    screenshots: [],
  },
];
