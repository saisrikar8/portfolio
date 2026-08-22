// ---------------------------------------------------------------------------
// Everything on the site is driven from this file.
//
// Research/project facts, metrics and links below were pulled from the public
// GitHub account `saisrikar8` (repo descriptions, READMEs and, for TERRA, the
// committed `evaluation_results/metrics_comparison.csv`).
//
// TWO VALUES ARE NOT DISCOVERABLE FROM GITHUB AND ARE MARKED `// TODO`:
// the LinkedIn URL and the public contact email. Change them here.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Sai Srikar Tummala',
  tagline: 'Data Science @ UC Berkeley. ML for space systems and geospatial modeling.',
  github: 'https://github.com/saisrikar8',
  githubHandle: '@saisrikar8',
  linkedin: 'https://www.linkedin.com/in/saisrikar8', // TODO: confirm your LinkedIn slug
  linkedinHandle: 'In/saisrikar',
  email: 'vibecoderly@proton.me', // TODO: swap for the address you want published
  year: 2026,
}

export const about = `I am a Data Science undergraduate at UC Berkeley, focusing on the intersection of statistical learning and physical systems. My work primarily addresses the challenges of deploying robust machine learning models in resource-constrained and high-stakes aerospace environments — fusing spacecraft telemetry with space-weather data, quantifying how much a safety-relevant prediction can be trusted, and benchmarking modern architectures against the physics-based simulators they aim to replace. Beyond publications, I am interested in building the open-source infrastructure necessary to make planetary data more accessible to the broader research community.`

export const research = [
  {
    id: 'hermes',
    venue: 'IEEE',
    date: 'Jan 2026',
    title:
      'HERMES: An XGBoost Approach to Detecting Low-Quality Radio Transmissions on Martian Missions',
    description:
      'A machine learning framework designed to mitigate signal degradation in deep space communication. HERMES fuses Mars Exploration Rover UHF link telemetry with ACE solar particle flux, reconstructing transmission geometry from NASA SPICE kernels, then classifies compromised packets before downstream data corruption occurs — a lightweight alternative to traditional signal processing.',
    href: 'https://github.com/saisrikar8/hermes',
    stats: [
      { label: 'Model', value: 'XGBoost' },
      { label: 'Accuracy', value: '87.5%' },
      { label: 'Recall', value: '0.931' },
    ],
    // Bars are the model's headline scores (accuracy, precision, recall, F1, AP)
    chart: [0.875, 0.86, 0.931, 0.894, 0.961],
  },
  {
    id: 'selene',
    venue: 'Springer Nature',
    date: 'Jul 2026',
    title: 'SELENE: A Deep Learning Model for Predicting Lunar Absorbed Radiation Dose Rates',
    description:
      'A data-driven alternative to Monte Carlo radiation simulators, trained on over 27,000 hours of spacecraft measurements. SELENE maps upstream ACE particle flux to the dose rate recorded by LRO/CRaTER, and uses Monte Carlo Dropout over 100 stochastic passes to report how much each prediction can be trusted — critical safety margin for prolonged human exploration.',
    href: 'https://github.com/saisrikar8/selene',
    stats: [
      { label: 'Arch', value: 'ANN + MC Dropout' },
      { label: 'R²', value: '0.834' },
      { label: 'MAE', value: '0.0043' },
    ],
    // Relative R² across the benchmarked models (SELENE, MC variant, LinReg, XGBoost, SAINT)
    chart: [0.834, 0.827, 0.388, 0.011, 0.02],
  },
]

export const projects = [
  {
    id: 'terra',
    status: 'In Progress',
    title: 'TERRA',
    description:
      'A high-resolution geospatial pipeline for terrain change modeling. TERRA benchmarks U-Net, plain CNN, ViT and ConvLSTM architectures against a Landlab physics simulation across 12.3M evaluated pixels, learning rainfall-driven erosion directly from multi-modal raster inputs. The ViT leads at R² = 0.891, cutting mean absolute error to roughly a quarter of the physically-motivated linear baseline.',
    href: 'https://github.com/saisrikar8/terrain-modeling',
    demo: {
      label: 'terrain-modeling-demo-client.vercel.app',
      href: 'https://terrain-modeling-demo-client.vercel.app',
    },
    hasVisual: true,
    // model comparison from evaluation_results/metrics_comparison.csv
    models: [
      { name: 'ViT', r2: 0.8913, mae: 5.34e-5 },
      { name: 'U-Net', r2: 0.8262, mae: 6.86e-5 },
      { name: 'Plain CNN', r2: 0.4771, mae: 1.253e-4 },
      { name: 'ConvLSTM', r2: 0.2826, mae: 1.72e-4 },
      { name: 'Linear', r2: 0.1566, mae: 1.806e-4 },
    ],
  },
  {
    id: 'rrpathplanner',
    status: 'Ongoing',
    title: 'RRPathPlanner',
    description:
      'An optimized trajectory generation tool for autonomous robotic navigation. It arc-length parameterizes each spline and builds a drive-time profile under velocity, acceleration and friction constraints, so simulated playback reflects how the robot actually moves — then exports ready-to-paste RoadRunner Java, currently deployed in competitive robotics environments.',
    href: 'https://github.com/saisrikar8/RRPathPlanner',
    link: { label: 'visualizer.ftcposeidon.com', href: 'https://rr-path-planner.vercel.app' },
  },
]
