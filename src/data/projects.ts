export interface Project {
  id: string
  title: string
  location: string
  year: string
  category: 'Residential' | 'Commercial' | 'Cultural' | 'Mixed-Use'
  image: string
  description: string
  images: string[]
  details: {
    client: string
    area: string
    status: string
    architect: string
    duration: string
  }
  stats: {
    label: string
    value: string
  }[]
}

export const projects: Project[] = [
  {
    id: 'vertex-tower',
    title: 'VERTEX TOWER',
    location: 'Eko Atlantic, Lagos',
    year: '2024',
    category: 'Commercial',
    image: '/images/img-25d88ca04a4a.webp',
    description:
      'A 72-storey commercial tower in Eko Atlantic providing 180,000 square metres of Grade A office space. The crystalline facade responds to Lagos’s solar orientation, while a triple-height lobby in Nigerian black granite and brushed bronze anchors the ground plane.',
    images: [
      '/images/img-fe1160a6b380.webp',
      '/images/img-e6d2428fe834.webp',
      '/images/img-1e9ec5eb7666.webp',
      '/images/img-983e9fc7304d.webp',
    ],
    details: {
      client: 'Vertex Holdings International',
      area: '180,000 m²',
      status: 'Completed 2024',
      architect: 'Arc Assured & Partners',
      duration: '48 months',
    },
    stats: [
      { label: 'Height', value: '312m' },
      { label: 'Floors', value: '72' },
      { label: 'Elevators', value: '42' },
      { label: 'Parking', value: '2,400' },
    ],
  },
  {
    id: 'onyx-residence',
    title: 'ONYX RESIDENCE',
    location: 'Banana Island, Lagos',
    year: '2023',
    category: 'Residential',
    image: '/images/img-d08e6dd0eb6b.webp',
    description:
      'A 4,200 square metre private residence on Banana Island, arranged as three interconnected pavilions that draw in the Atlantic breeze while screening the interiors from view. Indigenous ipe wood, Calacatta marble, and hand-burnished brass carry the material palette throughout.',
    images: [
      '/images/img-2cb55a2793c8.webp',
      '/images/img-88cd8e4ed186.webp',
      '/images/img-5d843307bef5.webp',
      '/images/img-214c7c8e6894.webp',
    ],
    details: {
      client: 'Private Commission',
      area: '4,200 m²',
      status: 'Completed 2023',
      architect: 'Arc Assured & Partners',
      duration: '36 months',
    },
    stats: [
      { label: 'Bedrooms', value: '8' },
      { label: 'Plot Size', value: '3,500m²' },
      { label: 'Pool Length', value: '25m' },
      { label: 'Staff Quarters', value: '12' },
    ],
  },
  {
    id: 'aurora-pavilion',
    title: 'AURORA PAVILION',
    location: 'Ikoyi, Lagos',
    year: '2024',
    category: 'Cultural',
    image: '/images/img-d96d09eba735.webp',
    description:
      'A cultural centre in Ikoyi dedicated to Nigerian art and performance. An undulating roof of sustainably harvested iroko wood ties together exhibition halls, performance venues, and contemplation gardens beneath a single continuous gesture.',
    images: [
      '/images/img-ef63220d4fea.webp',
      '/images/img-4b9440137c85.webp',
      '/images/img-f043adf84152.webp',
      '/images/img-68aa814ccd89.webp',
    ],
    details: {
      client: 'Lagos State Government',
      area: '28,000 m²',
      status: 'Completed 2024',
      architect: 'Arc Assured & Partners',
      duration: '42 months',
    },
    stats: [
      { label: 'Gallery Space', value: '8,500m²' },
      { label: 'Theater Seats', value: '850' },
      { label: 'Annual Visitors', value: '500K+' },
      { label: 'Artworks', value: '2,400' },
    ],
  },
  {
    id: 'meridian-complex',
    title: 'MERIDIAN COMPLEX',
    location: 'Lekki Phase 1, Lagos',
    year: '2023',
    category: 'Mixed-Use',
    image: '/images/img-0578415c0216.webp',
    description:
      'A 58-storey mixed-use development in Lekki combining 180 residences, a 200-key boutique hotel, 15,000 square metres of retail, and a series of sky gardens. The stacking strategy keeps residential, hospitality, and commercial uses distinct while sharing a common podium.',
    images: [
      '/images/img-cc2925191625.webp',
      '/images/img-68aa814ccd89.webp',
      '/images/img-e18c50d33769.webp',
      '/images/img-e6d2428fe834.webp',
    ],
    details: {
      client: 'Meridian Development Corporation',
      area: '95,000 m²',
      status: 'Completed 2023',
      architect: 'Arc Assured & Partners',
      duration: '54 months',
    },
    stats: [
      { label: 'Residences', value: '180' },
      { label: 'Hotel Keys', value: '200' },
      { label: 'Retail GLA', value: '15,000m²' },
      { label: 'Sky Gardens', value: '8' },
    ],
  },
  {
    id: 'marble-house',
    title: 'MARBLE HOUSE',
    location: 'Banana Island, Lagos',
    year: '2024',
    category: 'Residential',
    image: '/images/img-03cce23564de.webp',
    description:
      'A 2,800 square metre residence on Banana Island built around a restrained palette of Carrara marble and bespoke bronze. Panoramic lagoon views and a 25-metre infinity pool extend the interior toward the Atlantic horizon.',
    images: [
      '/images/img-f9d2f8154bd7.webp',
      '/images/img-0a9da66e54f5.webp',
      '/images/img-214c7c8e6894.webp',
      '/images/img-2cb55a2793c8.webp',
    ],
    details: {
      client: 'Private Commission',
      area: '2,800 m²',
      status: 'Completed 2024',
      architect: 'Arc Assured & Partners',
      duration: '30 months',
    },
    stats: [
      { label: 'Bedrooms', value: '6' },
      { label: 'Marble Slabs', value: '847' },
      { label: 'Pool Length', value: '25m' },
      { label: 'Art Collection', value: '45' },
    ],
  },
  {
    id: 'brutalist-tower',
    title: 'BRUTALIST TOWER',
    location: 'Victoria Island, Lagos',
    year: '2023',
    category: 'Commercial',
    image: '/images/img-d92adf09d6df.webp',
    description:
      'A commercial headquarters on Victoria Island in the modernist tradition, with exposed aggregate facades set against mahogany interiors and patinated brass. The board-marked concrete is expressed honestly, inside and out.',
    images: [
      '/images/img-983e9fc7304d.webp',
      '/images/img-19b62c974ec9.webp',
      '/images/img-e6d2428fe834.webp',
      '/images/img-fe1160a6b380.webp',
    ],
    details: {
      client: 'Atlantic Holdings Nigeria',
      area: '65,000 m²',
      status: 'Completed 2023',
      architect: 'Arc Assured & Partners',
      duration: '40 months',
    },
    stats: [
      { label: 'Floors', value: '45' },
      { label: 'Office Space', value: '52,000m²' },
      { label: 'Employees', value: '4,500' },
      { label: 'Green Rating', value: 'LEED Gold' },
    ],
  },
]
