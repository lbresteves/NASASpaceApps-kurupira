import slide1 from '../assets/slide-1.webp';
import slide2 from '../assets/slide-2.webp';
import slide3 from '../assets/slide-3.webp';
import slide4 from '../assets/slide-4.webp';
import slide5 from '../assets/slide-5.webp';
import slide6 from '../assets/slide-6.webp';
import slide7 from '../assets/slide-7.webp';
import type { IPitchSlide } from '../types/IPitchSlide';

/** Exported from docs/pitch/Kurupira_Pitch_NASA_2026_EN_final.pptx at 1920 × 1080. */
export const SLIDE_WIDTH_PX = 1920;
export const SLIDE_HEIGHT_PX = 1080;

/** The slides are images, so each one carries its full text as alt text for screen readers. */
export const PITCH_SLIDES: IPitchSlide[] = [
  {
    src: slide1,
    alt: 'Kurupira. Where and when to step up monitoring? Satellite-based fire hotspot calendar. Cuiabá, Brazil. NASA Space Apps Challenge 2026.',
  },
  {
    src: slide2,
    alt: "Harmonization. Two sensors, one comparable record. MODIS and VIIRS differ in resolution and sensitivity; Kurupira calibrated the two sensors' counts to compare fire hotspot activity across Brazil. Common grid: NASA FIRMS detections for Brazil from 2012 to 2025 on a common 0.25° grid. Calibration: VIIRS counts adjusted to the MODIS scale by month and region, calibrated on 2012–2022 and validated on held-out 2023–2025 data. Integrated record: adjustments applied to daily records; the dataset includes experimental estimates of fire radiative power (FRP). Calibration reduces differences between sensors. The counts represent heat detections and may include multiple observations of the same fire.",
  },
  {
    src: slide3,
    alt: 'Persona and solution. Ana prepares for peak fire season. Ana, an environmental manager, needs to decide where to step up prevention and monitoring before the highest-risk months. An illustrative fire hotspot calendar with simulated levels shows May to October for 2023 to 2025, from low to critical peak. Her flow: Select an area and time period on the map; Compare seasons in the calendar and replay; Investigate anomalies and climate context; Decide where and when to monitor.',
  },
  {
    src: slide4,
    alt: 'Social impact and SDGs. Supporting teams that protect the land. SDG 13, Climate Action: help teams prepare for peak fire activity. SDG 15, Life on Land: support monitoring in areas important to biodiversity. A screenshot of the Kurupira prototype shows harmonized hotspots over Brazil and monthly counts from 2012 to 2025. Expected impact: faster analysis to guide where and when to step up monitoring.',
  },
  {
    src: slide5,
    alt: 'Value proposition. Scientific context on the map. For environmental managers, fire crews, and field teams who need to combine data from several sources, Kurupira is a web platform that helps them decide where and when to step up monitoring. Today, teams use separate tools for this analysis; Kurupira brings a harmonized MODIS–VIIRS calendar, historical replay, and research on local fire patterns into one place. A screenshot shows the Amazon rainforest insight card, citing Kumar et al. (2014): about 50% of detections were less than 1 km from roads or navigable rivers. MVP covers Brazil; expansion to other countries and regions is planned.',
  },
  {
    src: slide6,
    alt: 'Benchmarking. What sets Kurupira apart. NASA FIRMS: active fire detections, maps, and alerts. NASA Worldview: satellite imagery, date comparisons, and animations. INPE Queimadas Program: fire hotspots, historical statistics, and fire weather risk. MapBiomas Fogo: historical burned area and fire recurrence. Kurupira features: comparable historical data, a MODIS–VIIRS calendar with historical replay and local context; monthly forecasts, where a machine learning model forecasts hotspot counts for the coming months; and research downloads, with downloadable charts and data for further analysis.',
  },
  {
    src: slide7,
    alt: "The Kurupira team. Melody Rodrigues: business administrator and law graduate, working in contracts, procurement, technology, and innovation. Letícia Braga: Systems Engineering undergraduate at UFMG and software engineer. Gleiciane Soares: advertising professional with 15 years in communications, marketing, and business, with postgraduate training in Data Science and Big Data Analytics. Elaine Fortes: physicist with a PhD from UNESP, professor and researcher at UNIPAMPA, with research experience at NASA Goddard and INPE. Tiago Alves Pereira: physics graduate and master's student, with experience in data and backend development. Nicolas Fernandes: software development and electronics. From Space to Earth, Turning Data into Prevention.",
  },
];
