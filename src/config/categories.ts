import {
  FileText,
  Image,
  Code,
  Bot,
  ShieldCheck,
  Smartphone,
  Receipt,
  Globe,
  Cloud,
  Scissors,
  Layers,
  Minimize2,
  FileSpreadsheet,
  Braces,
  Binary,
  KeyRound,
  Hash,
  Link,
  Key,
  GitCompare,
  Regex,
  CaseSensitive,
  Palette,
  Maximize2,
  RefreshCw,
  FileCheck,
  FlipHorizontal,
  Type,
  Crop,
  FileJson,
  Database,
  Server,
  Network,
  Clock,
  Search,
  Terminal,
  Lock,
  QrCode,
  Calculator,
  SmartphoneIcon,
  FileImage,
  FileOutput,
  ImagePlus,
  Shield,
  Tags,
  Eye,
  Webhook,
  Code2,
  Container,
  Boxes,
  Globe2,
  Type as TextIcon,
  Sliders,
  Briefcase,
} from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: any;
}

export interface Family {
  id: string;
  title: string;
  icon: any;
  status: 'active' | 'coming-soon';
  tools: Tool[];
}

export const FAMILIES: Family[] = [
  {
    id: 'pdf-suite',
    title: 'PDF Suite',
    icon: FileText,
    status: 'active',
    tools: [
      {
        id: 'pdf-merger',
        title: 'PDF Merger',
        description: 'Unește mai multe PDF-uri',
        href: '/pdf-lab/merger',
        icon: Layers,
      },
      {
        id: 'pdf-split',
        title: 'PDF Splitter',
        description: 'Separă paginile unui PDF',
        href: '/pdf-lab/split',
        icon: Scissors,
      },
      {
        id: 'pdf-compress',
        title: 'PDF Compress',
        description: 'Reduce dimensiunea PDF-urilor',
        href: '/pdf-lab/compress',
        icon: Minimize2,
      },
      {
        id: 'pdf-organizer',
        title: 'PDF Organizer',
        description: 'Reordonează paginile PDF',
        href: '/pdf-lab/organizer',
        icon: Layers,
      },
      {
        id: 'pdf-to-images',
        title: 'PDF to Images',
        description: 'Transformă paginile PDF în imagini',
        href: '/pdf-lab/to-images',
        icon: FileImage,
      },
      {
        id: 'pdf-to-word',
        title: 'PDF to Word',
        description: 'Convertește PDF în Word',
        href: '/pdf-lab/to-word',
        icon: FileOutput,
      },
      {
        id: 'word-to-pdf',
        title: 'Word to PDF',
        description: 'Convertește Word în PDF',
        href: '/pdf-lab/word-to-pdf',
        icon: FileText,
      },
    ],
  },

  {
    id: 'api-tools',
    title: 'API & Web Tools',
    icon: Webhook,
    status: 'active',
    tools: [
      {
        id: 'curl-converter',
        title: 'cURL Converter',
        description: 'Convertește comenzi cURL',
        href: '/api-lab/curl-converter',
        icon: Terminal,
      },
      {
        id: 'jwt-debugger',
        title: 'JWT Debugger',
        description: 'Inspectează token-uri JWT',
        href: '/api-lab/jwt-debugger',
        icon: KeyRound,
      },
      {
        id: 'webhook-tester',
        title: 'Webhook Tester',
        description: 'Testează și inspectează webhook-uri',
        href: '/api-lab/webhook-tester',
        icon: Webhook,
      },
    ],
  },

  {
    id: 'css-design',
    title: 'CSS & Design',
    icon: Palette,
    status: 'active',
    tools: [
      {
        id: 'border-radius',
        title: 'Border Radius',
        description: 'Generator pentru border-radius',
        href: '/css-lab/border-radius',
        icon: Crop,
      },
      {
        id: 'gradient-generator',
        title: 'Gradient Generator',
        description: 'Creează gradient-uri CSS',
        href: '/css-lab/gradient-generator',
        icon: Palette,
      },
      {
        id: 'shadow-generator',
        title: 'Shadow Generator',
        description: 'Creează umbre CSS',
        href: '/css-lab/shadow-generator',
        icon: Layers,
      },
    ],
  },

  {
    id: 'data-tools',
    title: 'Data Tools',
    icon: FileSpreadsheet,
    status: 'active',
    tools: [
      {
        id: 'csv-json',
        title: 'CSV ↔ JSON',
        description: 'Convertește CSV și JSON',
        href: '/data-lab/csv-json',
        icon: FileJson,
      },
      {
        id: 'mock-data',
        title: 'Mock Data',
        description: 'Generează date de test',
        href: '/data-lab/mock-data',
        icon: Database,
      },
    ],
  },

  {
    id: 'database-tools',
    title: 'Database Tools',
    icon: Database,
    status: 'active',
    tools: [
      {
        id: 'connection-builder',
        title: 'Connection Builder',
        description: 'Construiește configurații de conexiune',
        href: '/db-lab/connection-builder',
        icon: Server,
      },
      {
        id: 'json-to-ts',
        title: 'JSON to TypeScript',
        description: 'Generează tipuri TypeScript din JSON',
        href: '/db-lab/json-to-ts',
        icon: Code2,
      },
      {
        id: 'sql-formatter',
        title: 'SQL Formatter',
        description: 'Formatează interogări SQL',
        href: '/db-lab/sql-formatter',
        icon: Database,
      },
    ],
  },

  {
    id: 'developer-tools',
    title: 'Developer Tools',
    icon: Code,
    status: 'active',
    tools: [
      {
        id: 'base64',
        title: 'Base64',
        description: 'Encodează și decodează Base64',
        href: '/dev-lab/base64',
        icon: Binary,
      },
      {
        id: 'hash-gen',
        title: 'Hash Generator',
        description: 'Generează hash-uri',
        href: '/dev-lab/hash-gen',
        icon: Hash,
      },
      {
        id: 'jwt',
        title: 'JWT',
        description: 'Lucrează cu JSON Web Tokens',
        href: '/dev-lab/jwt',
        icon: KeyRound,
      },
      {
        id: 'regex',
        title: 'Regex',
        description: 'Testează expresii regulate',
        href: '/dev-lab/regex',
        icon: Regex,
      },
    ],
  },

  {
    id: 'devops-tools',
    title: 'DevOps & Infrastructure',
    icon: Container,
    status: 'active',
    tools: [
      {
        id: 'cicd-generator',
        title: 'CI/CD Generator',
        description: 'Generează configurații CI/CD',
        href: '/devops-lab/cicd-generator',
        icon: RefreshCw,
      },
      {
        id: 'docker-generator',
        title: 'Docker Generator',
        description: 'Generează configurații Docker',
        href: '/devops-lab/docker-generator',
        icon: Container,
      },
      {
        id: 'k8s-generator',
        title: 'Kubernetes Generator',
        description: 'Generează manifest-uri Kubernetes',
        href: '/devops-lab/k8s-generator',
        icon: Boxes,
      },
      {
        id: 'nginx-configurator',
        title: 'Nginx Configurator',
        description: 'Construiește configurații Nginx',
        href: '/devops-lab/nginx-configurator',
        icon: Server,
      },
    ],
  },

  {
    id: 'image-tools',
    title: 'Image & Design Lab',
    icon: Image,
    status: 'active',
    tools: [
      {
        id: 'aspect',
        title: 'Aspect Ratio',
        description: 'Calculează și ajustează proporțiile',
        href: '/image-lab/aspect',
        icon: Crop,
      },
      {
        id: 'base64',
        title: 'Image Base64',
        description: 'Convertește imagini în Base64',
        href: '/image-lab/base64',
        icon: Binary,
      },
      {
        id: 'color',
        title: 'Color Tools',
        description: 'Lucrează cu culori',
        href: '/image-lab/color',
        icon: Palette,
      },
      {
        id: 'compress',
        title: 'Image Compressor',
        description: 'Comprimă imagini',
        href: '/image-lab/compress',
        icon: Minimize2,
      },
      {
        id: 'converter',
        title: 'Image Converter',
        description: 'Convertește formate de imagine',
        href: '/image-lab/converter',
        icon: RefreshCw,
      },
      {
        id: 'exif',
        title: 'EXIF Cleaner',
        description: 'Elimină metadatele EXIF',
        href: '/image-lab/exif',
        icon: FileCheck,
      },
      {
        id: 'favicon',
        title: 'Favicon Generator',
        description: 'Generează favicon-uri',
        href: '/image-lab/favicon',
        icon: ImagePlus,
      },
      {
        id: 'filter',
        title: 'Image Filter',
        description: 'Aplică filtre imaginilor',
        href: '/image-lab/filter',
        icon: Sliders,
      },
      {
        id: 'resizer',
        title: 'Image Resizer',
        description: 'Redimensionează imagini',
        href: '/image-lab/resizer',
        icon: Maximize2,
      },
      {
        id: 'svg',
        title: 'SVG Tools',
        description: 'Optimizează și transformă SVG',
        href: '/image-lab/svg',
        icon: Code,
      },
      {
        id: 'watermark',
        title: 'Watermark',
        description: 'Adaugă watermark imaginilor',
        href: '/image-lab/watermark',
        icon: Type,
      },
    ],
  },

  {
    id: 'math-tools',
    title: 'Math & Conversion',
    icon: Calculator,
    status: 'active',
    tools: [
      {
        id: 'base-converter',
        title: 'Base Converter',
        description: 'Convertește între baze numerice',
        href: '/math-lab/base-converter',
        icon: Binary,
      },
      {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Calculează procente',
        href: '/math-lab/percentage-calculator',
        icon: Calculator,
      },
      {
        id: 'unit-converter',
        title: 'Unit Converter',
        description: 'Convertește unități de măsură',
        href: '/math-lab/unit-converter',
        icon: RefreshCw,
      },
    ],
  },

  {
    id: 'media-tools',
    title: 'Media Tools',
    icon: Image,
    status: 'active',
    tools: [
      {
        id: 'color-palette',
        title: 'Color Palette',
        description: 'Generează palete de culori',
        href: '/media-lab/color-palette',
        icon: Palette,
      },
      {
        id: 'image-resizer',
        title: 'Image Resizer',
        description: 'Redimensionează imagini',
        href: '/media-lab/image-resizer',
        icon: Maximize2,
      },
      {
        id: 'qr-generator',
        title: 'QR Generator',
        description: 'Generează coduri QR',
        href: '/media-lab/qr-generator',
        icon: QrCode,
      },
      {
        id: 'svg-optimizer',
        title: 'SVG Optimizer',
        description: 'Optimizează fișiere SVG',
        href: '/media-lab/svg-optimizer',
        icon: Code,
      },
    ],
  },

  {
    id: 'mobile-tools',
    title: 'Mobile Systems',
    icon: Smartphone,
    status: 'active',
    tools: [
      {
        id: 'deeplink-tester',
        title: 'Deep Link Tester',
        description: 'Testează deep links',
        href: '/mobile-lab/deeplink-tester',
        icon: Link,
      },
      {
        id: 'icon-resizer',
        title: 'Icon Resizer',
        description: 'Pregătește icon-uri pentru mobile',
        href: '/mobile-lab/icon-resizer',
        icon: SmartphoneIcon,
      },
      {
        id: 'json-to-mobile',
        title: 'JSON to Mobile',
        description: 'Transformă structuri JSON pentru mobile',
        href: '/mobile-lab/json-to-mobile',
        icon: FileJson,
      },
      {
        id: 'viewport-simulator',
        title: 'Viewport Simulator',
        description: 'Simulează viewport-uri mobile',
        href: '/mobile-lab/viewport-simulator',
        icon: Smartphone,
      },
    ],
  },

  {
    id: 'network-tools',
    title: 'Network Tools',
    icon: Network,
    status: 'active',
    tools: [
      {
        id: 'http-status',
        title: 'HTTP Status',
        description: 'Verifică statusuri HTTP',
        href: '/network-lab/http-status',
        icon: Globe2,
      },
      {
        id: 'url-encoder',
        title: 'URL Encoder',
        description: 'Encodează și decodează URL-uri',
        href: '/network-lab/url-encoder',
        icon: Link,
      },
      {
        id: 'user-agent',
        title: 'User Agent',
        description: 'Analizează User-Agent',
        href: '/network-lab/user-agent',
        icon: Eye,
      },
    ],
  },

  {
    id: 'performance-tools',
    title: 'Performance Tools',
    icon: RefreshCw,
    status: 'active',
    tools: [
      {
        id: 'code-minifier',
        title: 'Code Minifier',
        description: 'Minifică HTML/CSS/JS',
        href: '/perf-lab/code-minifier',
        icon: Minimize2,
      },
      {
        id: 'critical-css',
        title: 'Critical CSS',
        description: 'Optimizează CSS critic',
        href: '/perf-lab/critical-css',
        icon: Code,
      },
      {
        id: 'image-compressor',
        title: 'Image Compressor',
        description: 'Optimizează imaginile pentru web',
        href: '/perf-lab/image-compressor',
        icon: Image,
      },
    ],
  },

  {
    id: 'security-tools',
    title: 'Security & Crypto',
    icon: ShieldCheck,
    status: 'active',
    tools: [
      {
        id: 'base64',
        title: 'Base64',
        description: 'Encodează și decodează Base64',
        href: '/security-lab/base64',
        icon: Binary,
      },
      {
        id: 'hash-generator',
        title: 'Hash Generator',
        description: 'Generează hash-uri',
        href: '/security-lab/hash-generator',
        icon: Hash,
      },
      {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        description: 'Decodează și inspectează JWT',
        href: '/security-lab/jwt-decoder',
        icon: KeyRound,
      },
      {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Generează parole sigure',
        href: '/security-lab/password-generator',
        icon: Lock,
      },
    ],
  },

  {
    id: 'seo-tools',
    title: 'Web & SEO',
    icon: Globe,
    status: 'active',
    tools: [
      {
        id: 'meta-tags',
        title: 'Meta Tags',
        description: 'Generează meta tag-uri',
        href: '/seo-lab/meta-tags',
        icon: Tags,
      },
      {
        id: 'og-preview',
        title: 'OG Preview',
        description: 'Previzualizează Open Graph',
        href: '/seo-lab/og-preview',
        icon: Eye,
      },
      {
        id: 'sitemap-generator',
        title: 'Sitemap Generator',
        description: 'Generează sitemap-uri',
        href: '/seo-lab/sitemap-generator',
        icon: Globe,
      },
    ],
  },

  {
    id: 'text-tools',
    title: 'Text Tools',
    icon: TextIcon,
    status: 'active',
    tools: [
      {
        id: 'case-converter',
        title: 'Case Converter',
        description: 'Transformă textul între stiluri',
        href: '/text-lab/case-converter',
        icon: CaseSensitive,
      },
      {
        id: 'diff',
        title: 'Text Diff',
        description: 'Compară două texte',
        href: '/text-lab/diff',
        icon: GitCompare,
      },
      {
        id: 'lorem',
        title: 'Lorem Ipsum',
        description: 'Generează text placeholder',
        href: '/text-lab/lorem',
        icon: TextIcon,
      },
      {
        id: 'markdown',
        title: 'Markdown',
        description: 'Editor și instrumente Markdown',
        href: '/text-lab/markdown',
        icon: FileText,
      },
    ],
  },

  {
    id: 'time-tools',
    title: 'Time Tools',
    icon: Clock,
    status: 'active',
    tools: [
      {
        id: 'cron-generator',
        title: 'Cron Generator',
        description: 'Construiește expresii cron',
        href: '/time-lab/cron-generator',
        icon: Clock,
      },
      {
        id: 'timestamp-converter',
        title: 'Timestamp Converter',
        description: 'Convertește timestamp-uri',
        href: '/time-lab/timestamp-converter',
        icon: RefreshCw,
      },
    ],
  },

  {
    id: 'mobile-qr',
    title: 'QR & Key Systems',
    icon: QrCode,
    status: 'active',
    tools: [
      {
        id: 'qr-key-generator',
        title: 'QR Key Generator',
        description: 'Generează coduri QR pentru chei și date',
        href: '/qr-key-generator',
        icon: QrCode,
      },
    ],
  },

  {
    id: 'legal-admin',
    title: 'Legal, Contracts & Admin',
    icon: Briefcase,
    status: 'active',
    tools: [
      {
        id: 'vox-rex-lex',
        title: 'Vox Rex Lex',
        description: 'Instrumente juridice și administrative',
        href: '/vox-rex-lex',
        icon: Shield,
      },
    ],
  },

  {
    id: 'ai-automation',
    title: 'AI & Automation Hub',
    icon: Bot,
    status: 'coming-soon',
    tools: [],
  },

  {
    id: 'finance-invoicing',
    title: 'Finance & Invoicing',
    icon: Receipt,
    status: 'coming-soon',
    tools: [],
  },

  {
    id: 'cloud-api',
    title: 'Cloud & API',
    icon: Cloud,
    status: 'coming-soon',
    tools: [],
  },
];