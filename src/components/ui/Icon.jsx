import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  Link,
  Mail,
  MapPin,
  Menu,
  Pencil,
  Phone,
  Printer,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Type,
  UserRound,
  WandSparkles,
  X,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const icons = {
  spark: Sparkles,
  arrow: ArrowUpRight,
  arrowUpRight: ArrowUpRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  check: Check,
  plus: Plus,
  file: FileText,
  brief: Briefcase,
  cap: GraduationCap,
  grid: LayoutGrid,
  user: UserRound,
  eye: Eye,
  download: Download,
  chev: ChevronDown,
  menu: Menu,
  close: X,
  edit: Pencil,
  save: Save,
  wand: WandSparkles,
  globe: Globe,
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: Mail,
  phone: Phone,
  print: Printer,
  pin: MapPin,
  link: Link,
  trash: Trash2,
  type: Type,
};

export default function Icon({ name, size = 18, ...props }) {
  const LucideIcon = icons[name] || CircleHelp;

  return (
    <LucideIcon
      aria-hidden="true"
      className="icon"
      focusable="false"
      size={size}
      strokeWidth={1.8}
      {...props}
    />
  );
}
