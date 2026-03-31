import Link from "next/link";
import React from "react";
import { FooterListType } from "./footer-list.types";

interface FooterListProps {
  list: FooterListType;
}

export default function FooterList({ list }: FooterListProps) {
  return (
    <div className="lg:col-span-2">
      <h3 className="font-semibold text-lg mb-5">{list.title}</h3>
      <ul className="space-y-3">
        {list.links.map((link) => (
          <li key={link.name}>
            <Link
              className="text-gray-400 font-medium hover:text-primary-400 transition-colors text-sm"
              href={`${link.href}`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
