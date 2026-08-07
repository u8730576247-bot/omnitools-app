import Link from "next/link";
import "./KillKitNode.css";
import { LucideIcon } from "lucide-react";

interface KillKitNodeProps {
  title: string;
  description: string;
  badge?: string;
  href: string;
  icon: LucideIcon;
}

export default function KillKitNode({
  title,
  description,
  badge,
  href,
  icon: Icon,
}: KillKitNodeProps) {
  return (
    <Link href={href} className="kk-node">

      <div className="kk-rings">
        <div className="kk-ring outer"></div>
        <div className="kk-ring middle"></div>
        <div className="kk-ring inner"></div>

        <div className="kk-core">
          <Icon size={28} strokeWidth={2} />
        </div>
      </div>

      {badge && (
        <div className="kk-badge">
          {badge}
        </div>
      )}

      <h3 className="kk-title">
        {title}
      </h3>

      <p className="kk-description">
        {description}
      </p>

    </Link>
  );
}