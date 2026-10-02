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
  footerAbout: string;
  footerCoffee: string;
  nav: NavLink[];
  home: {
    heading: string;
    intro: string;
    latestTripsCount: number;
    stats: { rides: string; bike: string; bikes: string; farthest: string; ridden: string; saddle: string };
    mapCaption: string;
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
    crowFlies: string;
    themeToggle: string;
    sea: string;
    readTrip: string;
    mapZoomIn: string;
    mapZoomOut: string;
    mapReset: string;
    mapHintDesktop: string;
    mapHintTouch: string;
    ride: { distance: string; moving: string; elapsed: string; avg: string; max: string; climb: string; oneWay: string };
  };
}

const dict: Record<Locale, Dict> = {
  en: {
    description: 'Trips, tips, a bike catalog and service logs from the road.',
    footerTagline: 'Documenting the ride',
    footerAbout: 'About me',
    footerCoffee: 'Buy me a coffee',
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Trips', href: '/trips' },
      { label: 'Tips', href: '/tips' },
      { label: 'Bikes', href: '/bikes' },
    ],
    home: {
      heading: 'Every ride starts in Porto.',
      intro:
        "Trips, hard-won tips, the bikes in the garage, and every wrench turned — logged so I don't have to remember it all.",
      latestTripsCount: 2,
      stats: { rides: 'rides', bike: 'bike', bikes: 'bikes', farthest: 'farthest out', ridden: 'ridden', saddle: 'in the saddle' },
      mapCaption: 'Every ride as I actually rode it: the way out solid, the way back dashed. Pick a place to see the trip.',
      trips: { title: 'Latest rides', link: 'All trips' },
      bikes: { title: 'The garage', link: 'Bike catalog' },
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
      crowFlies: 'as the crow flies',
      themeToggle: 'Toggle light and dark theme',
      sea: 'Atlantic',
      readTrip: 'Read the trip',
      mapZoomIn: 'Zoom in',
      mapZoomOut: 'Zoom out',
      mapReset: 'Back to Porto',
      mapHintDesktop: 'Drag to explore, ⌘/Ctrl + scroll to zoom.',
      mapHintTouch: 'Use two fingers to move the map.',
      ride: { distance: 'Distance', moving: 'Moving', elapsed: 'Total time', avg: 'Avg speed', max: 'Top speed', climb: 'Climb', oneWay: 'one way only' },
    },
  },
  pt: {
    description: 'Viagens, dicas, um catálogo de motos e registos de manutenção da estrada.',
    footerTagline: 'A documentar a viagem',
    footerAbout: 'Sobre mim',
    footerCoffee: 'Paga-me um café',
    nav: [
      { label: 'Início', href: '/' },
      { label: 'Viagens', href: '/trips' },
      { label: 'Dicas', href: '/tips' },
      { label: 'Motos', href: '/bikes' },
    ],
    home: {
      heading: 'Todas as viagens começam no Porto.',
      intro:
        'Viagens, dicas suadas, as motos na garagem e cada chave dada — registado para não ter de me lembrar de tudo.',
      latestTripsCount: 2,
      stats: { rides: 'viagens', bike: 'moto', bikes: 'motos', farthest: 'a mais distante', ridden: 'percorridos', saddle: 'em cima da moto' },
      mapCaption: 'Cada viagem tal como a fiz: a ida a cheio, o regresso a tracejado. Escolhe um sítio para ver a viagem.',
      trips: { title: 'Últimas viagens', link: 'Todas as viagens' },
      bikes: { title: 'A garagem', link: 'Catálogo de motos' },
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
      crowFlies: 'em linha reta',
      themeToggle: 'Mudar entre tema claro e escuro',
      sea: 'Atlântico',
      readTrip: 'Ler a viagem',
      mapZoomIn: 'Aproximar',
      mapZoomOut: 'Afastar',
      mapReset: 'Voltar ao Porto',
      mapHintDesktop: 'Arrasta para explorar, ⌘/Ctrl + scroll para aproximar.',
      mapHintTouch: 'Usa dois dedos para mover o mapa.',
      ride: { distance: 'Distância', moving: 'Em movimento', elapsed: 'Tempo total', avg: 'Vel. média', max: 'Vel. máxima', climb: 'Subida', oneWay: 'só ida' },
    },
  },
};

export function t(locale: Locale): Dict {
  return dict[locale] ?? dict[defaultLocale];
}
