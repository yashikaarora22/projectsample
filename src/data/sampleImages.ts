import agricultureImg from '../assets/images/satellite_agriculture_1789732427161.jpg';
import coastalImg from '../assets/images/satellite_coastal_1789732449183.jpg';
import earthSpaceImg from '../assets/images/earth_space_globe_1789732403242.jpg';
import { SensorType } from '../types';

export interface SampleSatellitePhoto {
  id: string;
  title: string;
  sensor: SensorType;
  sensorBadge: string;
  resolution: string;
  imageSrc: string;
  defaultPrompt: string;
  description: string;
  tags: string[];
}

export const SAMPLE_SATELLITE_PHOTOS: SampleSatellitePhoto[] = [
  {
    id: 'sample-agri',
    title: 'Agricultural Crop Circles & River Basin',
    sensor: 'multispectral',
    sensorBadge: 'Multispectral NDVI',
    resolution: '10m Bands (B8-B4-B3)',
    imageSrc: agricultureImg,
    defaultPrompt: 'What land cover is visible and calculate chlorophyll vegetation health index?',
    description: 'Irrigation pivot fields bordering a sediment-rich river, captured during peak harvest cycle.',
    tags: ['Agriculture', 'Vegetation', 'Irrigation'],
  },
  {
    id: 'sample-coastal',
    title: 'Coastal Archipelago & Urban Port',
    sensor: 'optical',
    sensorBadge: 'Optical Sentinel-2',
    resolution: '10m True Color (RGB)',
    imageSrc: coastalImg,
    defaultPrompt: 'Segment the built-up urban port and detect coastline water turbidity boundaries.',
    description: 'Deep ocean shipping channels, coastal development corridors, and barrier reefs.',
    tags: ['Water Quality', 'Urban Growth', 'Coastline'],
  },
  {
    id: 'sample-sar',
    title: 'SAR Radar All-Weather Ground Penetration',
    sensor: 'sar',
    sensorBadge: 'Sentinel-1 C-Band',
    resolution: 'VV + VH Polarimetric Backscatter',
    imageSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAchkMpvN2AzR-B4s4MCjCYOGCWPO93lCZWAhcGZRgVt3kKtUN9ndViKBBuYmzynUeZG9spy7Ai1fk0igtCIGg9my-toRWymyfOzEglbhLvbvkZ3oCoC1Xc4tigF9YdTNvLiqxXmbjVagw9Ow7GBmBsdl-ConY8nPphJIx6bKSNw_YuP2fsJvbzg_Vs_9wOczRvKOSaANngd3FR4XUuveMwSdfcJDprw97guo2W_I8ID4a4Kpr1g8vT',
    defaultPrompt: 'Identify metallic structures, surface roughness, and moisture gradients in this SAR radar swath.',
    description: 'Synthetic aperture radar penetrates nighttime and dense clouds to reveal terrain roughness.',
    tags: ['SAR Radar', 'Cloud Penetration', 'Surface Roughness'],
  },
  {
    id: 'sample-earth',
    title: 'Planetary Atmospheric Limb & Cyclone',
    sensor: 'optical',
    sensorBadge: 'Orbital MODIS / NOAA',
    resolution: 'Global 250m Synoptic',
    imageSrc: earthSpaceImg,
    defaultPrompt: 'Examine planetary weather patterns, atmospheric blue limb scattering, and cloud dynamics.',
    description: 'Full-disc orbital observation monitoring planetary climate shifts and storm tracks.',
    tags: ['Climate', 'Atmosphere', 'Planetary'],
  },
];
