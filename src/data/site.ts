// ─────────────────────────────────────────────────────────────────────────
// Canonical site content & config — now per-locale.
// Edit copy, navigation, and labels here once; pages and components derive
// from this via t(locale). (The journey content — trips, tips, bikes, and
// service records — lives in content collections under src/content and
// src/data/services.yaml, with localized fields.)
// ─────────────────────────────────────────────────────────────────────────

export type Locale = 'en' | 'pt';
export type BikeStatus = 'owned' | 'past' | 'wishlist';

export const locales: Locale[] = ['en', 'pt'];
export const defaultLocale: Locale = 'en';
export const localeName: Record<Locale, string> = { en: 'EN', pt: 'PT' };

export interface NavLink {
  label: string;
  href: string;
}
export interface PageMeta {
  title: string;
  description: string;
  heading: string;
}

// Language-neutral site identity.
export const site = {
  name: 'Moto Journey',
  brand: 'moto journey',
};

interface Dict {
  description: string;
  footerTagline: string;
  footerBuilt: string;
  nav: NavLink[];
  home: {
    heading: string;
    intro: string;
    latestTripsCount: number;
    trips: { title: string; link: string };
    bikes: { title: string; link: string };
  };
  pages: Record<'trips' | 'tips' | 'bikes', PageMeta>;
  bikeStatusLabel: Record<BikeStatus, string>;
  bikeGroups: { status: BikeStatus; label: string }[];
  ui: {
    overview: string;
    specs: string;
    modifications: string;
    tripsOnBike: string;
    serviceHistory: string;
    noService: string;
    ownedSince: string;
    ridden: string;
    backToGarage: string;
    backToTrips: string;
    backToTips: string;
    tableDate: string;
    tableMileage: string;
    tableWork: string;
  };
}

const dict: Record<Locale, Dict> = {
  en: {
    description: 'Trips, tips, a bike catalog and service logs from the road.',
    footerTagline: 'documenting the ride',
    footerBuilt: 'built with Astro',
    nav: [
      { label: 'Trips', href: '/trips' },
      { label: 'Tips', href: '/tips' },
      { label: 'Bikes', href: '/bikes' },
    ],
    home: {
      heading: 'Documenting the ride.',
      intro:
        "Trips, hard-won tips, the bikes in the garage, and every wrench turned — logged so I don't have to remember it all.",
      latestTripsCount: 2,
      trips: { title: 'Latest trips', link: 'all trips →' },
      bikes: { title: 'The garage', link: 'bike catalog →' },
    },
    pages: {
      trips: { title: 'Trips', description: 'Ride reports from the road.', heading: 'Trips' },
      tips: {
        title: 'Tips',
        description: 'Tips and tricks from the saddle and the garage.',
        heading: 'Tips & tricks',
      },
      bikes: {
        title: 'Bikes',
        description: 'The bike catalog — owned, past, and wished-for.',
        heading: 'The garage',
      },
    },
    bikeStatusLabel: { owned: 'Owned', past: 'Previously owned', wishlist: 'Wishlist' },
    bikeGroups: [
      { status: 'owned', label: 'In the garage' },
      { status: 'past', label: 'Previously owned' },
      { status: 'wishlist', label: 'On the wishlist' },
    ],
    ui: {
      overview: 'Overview',
      specs: 'Specs',
      modifications: 'Modifications',
      tripsOnBike: 'Trips on this bike',
      serviceHistory: 'Service history',
      noService: 'No service records yet.',
      ownedSince: 'owned since',
      ridden: 'Ridden on',
      backToGarage: '← the garage',
      backToTrips: '← all trips',
      backToTips: '← all tips',
      tableDate: 'Date',
      tableMileage: 'Mileage',
      tableWork: 'Work',
    },
  },
  pt: {
    description: 'Viagens, dicas, um catálogo de motos e registos de manutenção da estrada.',
    footerTagline: 'a documentar a viagem',
    footerBuilt: 'feito com Astro',
    nav: [
      { label: 'Viagens', href: '/trips' },
      { label: 'Dicas', href: '/tips' },
      { label: 'Motos', href: '/bikes' },
    ],
    home: {
      heading: 'A documentar a viagem.',
      intro:
        'Viagens, dicas suadas, as motos na garagem e cada chave dada — registado para não ter de me lembrar de tudo.',
      latestTripsCount: 2,
      trips: { title: 'Últimas viagens', link: 'todas as viagens →' },
      bikes: { title: 'A garagem', link: 'catálogo de motos →' },
    },
    pages: {
      trips: { title: 'Viagens', description: 'Relatos de viagens na estrada.', heading: 'Viagens' },
      tips: {
        title: 'Dicas',
        description: 'Dicas e truques da estrada e da garagem.',
        heading: 'Dicas e truques',
      },
      bikes: {
        title: 'Motos',
        description: 'O catálogo de motos — atuais, antigas e desejadas.',
        heading: 'A garagem',
      },
    },
    bikeStatusLabel: { owned: 'Atual', past: 'Antiga', wishlist: 'Lista de desejos' },
    bikeGroups: [
      { status: 'owned', label: 'Na garagem' },
      { status: 'past', label: 'Motos antigas' },
      { status: 'wishlist', label: 'Lista de desejos' },
    ],
    ui: {
      overview: 'Resumo',
      specs: 'Especificações',
      modifications: 'Modificações',
      tripsOnBike: 'Viagens nesta moto',
      serviceHistory: 'Histórico de manutenção',
      noService: 'Ainda sem registos de manutenção.',
      ownedSince: 'na garagem desde',
      ridden: 'Conduzida na',
      backToGarage: '← a garagem',
      backToTrips: '← todas as viagens',
      backToTips: '← todas as dicas',
      tableDate: 'Data',
      tableMileage: 'Quilómetros',
      tableWork: 'Trabalho',
    },
  },
};

export function t(locale: Locale): Dict {
  return dict[locale] ?? dict[defaultLocale];
}
