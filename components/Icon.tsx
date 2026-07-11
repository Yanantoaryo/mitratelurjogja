import {
  BadgePercent,
  Leaf,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/**
 * Whitelist eksplisit, bukan lookup dinamis ke seluruh lucide: nama ikon datang
 * dari input owner di Studio, dan mengimpor barrel penuh akan menarik ribuan
 * ikon ke dalam bundle.
 */
const ICONS: Record<string, LucideIcon> = {
  "badge-percent": BadgePercent,
  leaf: Leaf,
  "message-circle": MessageCircle,
  "package-check": PackageCheck,
  "shield-check": ShieldCheck,
  truck: Truck,
};

export default function Icon({
  name,
  className,
  size = 22,
}: {
  name?: string;
  className?: string;
  size?: number;
}) {
  const Cmp = (name && ICONS[name]) || Sparkles;
  return <Cmp size={size} className={className} aria-hidden />;
}

export const ICON_NAMES = Object.keys(ICONS);
