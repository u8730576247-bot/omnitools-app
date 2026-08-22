'use client';

import Link from "next/link";
import "./KillKitNode.css";
import { LucideIcon } from "lucide-react";

interface KillKitNodeProps {
  title: string;
  description?: string;
  badge?: string;
  href?: string;
  icon: LucideIcon;
  onClick?: () => void;
  isComingSoon?: boolean;
}

export default function KillKitNode({
  title,
  description,
  badge,
  href,
  icon: Icon,
  onClick,
  isComingSoon = false,
}: KillKitNodeProps) {
  const nodeContent = (
    <div 
      onClick={onClick} 
      className={`kk-node ${isComingSoon ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
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

      {description && (
        <p className="kk-description">
          {description}
        </p>
      )}
    </div>
  );

  if (href && !isComingSoon) {
    const isExternal = href.startsWith('http');
    return isExternal ? (
      <a href={href} download className="block">
        {nodeContent}
      </a>
    ) : (
      <Link href={href} className="block">
        {nodeContent}
      </Link>
    );
  }

  return nodeContent;
}