import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Bot,
  Code2,
  KeyRound,
  Smartphone,
  Receipt,
  Globe,
  Music,
  Cloud,
  CheckSquare,
  ShieldCheck,
  BellRing,
  FileCode,
  QrCode,
  LucideIcon
} from 'lucide-react';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
}

export interface FamilyCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'coming-soon';
  tools: ToolItem[];
}

export const FAMILIES: FamilyCategory[] = [
  {
    id: 'legal-admin',
    title: 'Legal, Contracts & Admin',
    description: 'Evidență contracte, generare documente și alerte de expirare.',
    icon: FileText,
    status: 'active',
    tools: [
      {
        id: 'creator-guard',
        title: 'Creator Guard',
        description: 'Protect and manage your creative digital assets & contracts.',
        href: 'https://github.com/u8730576247-bot/killkit-releases/releases/download/v1.0.0/creator-guard.apk',
        badge: 'MOBILE APP',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        icon: ShieldCheck,
      },
      {
        id: 'doc-reminder',
        title: 'Doc Reminder',
        description: 'Never miss a document expiration or renewal deadline.',
        href: 'https://github.com/u8730576247-bot/killkit-releases/releases/download/v1.0.0/doc-reminder.apk',
        badge: 'MOBILE APP',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        icon: BellRing,
      },
    ],
  },
  {
    id: 'pdf-suite',
    title: 'PDF Suite',
    description: 'Unelte rapide pentru organizarea și unirea fișierelor PDF.',
    icon: FileSpreadsheet,
    status: 'active',
    tools: [
      {
        id: 'pdf-merger',
        title: 'PDF Merger',
        description: 'Combina mai multe PDF-uri intr-un singur document.',
        href: '/pdf-merger',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: FileCode,
      },
      {
        id: 'pdf-organizer',
        title: 'PDF Organizer',
        description: 'Rearanjeaza, roteste si sterge pagini din PDF.',
        href: '/pdf-organizer',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: FileCode,
      },
    ],
  },
  {
    id: 'image-lab',
    title: 'Image & Design Lab',
    description: 'Conversie, curățare metdate EXIF și optimizare SVG.',
    icon: ImageIcon,
    status: 'active',
    tools: [
      {
        id: 'exif-cleaner',
        title: 'EXIF Cleaner',
        description: 'Elimina metadatele si locatia din fotografiile tale.',
        href: '/exif-cleaner',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: ImageIcon,
      },
      {
        id: 'image-converter',
        title: 'Image Converter',
        description: 'Schimba formatul imaginilor rapid si fara pierderi.',
        href: '/image-converter',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: ImageIcon,
      },
      {
        id: 'svg-optimizer',
        title: 'SVG Optimizer',
        description: 'Comprima si curata fisierele vectoriale SVG.',
        href: '/svg-optimizer',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: ImageIcon,
      },
    ],
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    description: 'Procesare vocală, text și automatizări bazate pe AI.',
    icon: Bot,
    status: 'active',
    tools: [
      {
        id: 'vox-rex-lex',
        title: 'Vox Rex Lex',
        description: 'Procesare vocala si analiza inteligenta a textului.',
        href: '/vox-rex-lex',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: Bot,
      },
    ],
  },
  {
    id: 'dev-code',
    title: 'Developer & Code',
    description: 'Convertor JSON, formatare cod și utilitare pentru developeri.',
    icon: Code2,
    status: 'active',
    tools: [
      {
        id: 'json-converter',
        title: 'JSON Converter',
        description: 'Valideaza, formateaza si transforma date JSON.',
        href: '/json-converter',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: Code2,
      },
    ],
  },
  {
    id: 'security-encryption',
    title: 'Security & Encryption',
    description: 'Generatoare QR, criptare și protecția datelor.',
    icon: KeyRound,
    status: 'active',
    tools: [
      {
        id: 'qr-key-generator',
        title: 'QR Key Generator',
        description: 'Genereaza coduri QR securizate pentru chei si parole.',
        href: '/qr-key-generator',
        badge: 'WEB TOOL',
        badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        icon: QrCode,
      },
    ],
  },
  {
    id: 'mobile-system',
    title: 'Mobile & System',
    description: 'Pachete mobile Android și kit-uri de instalare.',
    icon: Smartphone,
    status: 'active',
    tools: [],
  },
  {
    id: 'finance-invoicing',
    title: 'Finance & Invoicing',
    description: 'Calculatoare de taxe, estimatoare de costuri și profit.',
    icon: Receipt,
    status: 'coming-soon',
    tools: [],
  },
  {
    id: 'web-seo',
    title: 'Web & SEO Tools',
    description: 'Meta tag-uri, analiză headers și inspecție web.',
    icon: Globe,
    status: 'coming-soon',
    tools: [],
  },
  {
    id: 'audio-media',
    title: 'Audio & Media',
    description: 'Editoare audio rapide, convertoare și inversoare.',
    icon: Music,
    status: 'coming-soon',
    tools: [],
  },
  {
    id: 'cloud-api',
    title: 'Cloud & API Kit',
    description: 'Testere pentru Webhook, playground API și stocare.',
    icon: Cloud,
    status: 'coming-soon',
    tools: [],
  },
  {
    id: 'productivity',
    title: 'Productivity & Notes',
    description: 'Timere de lucru, note rapide și management al sarcinilor.',
    icon: CheckSquare,
    status: 'coming-soon',
    tools: [],
  },
];