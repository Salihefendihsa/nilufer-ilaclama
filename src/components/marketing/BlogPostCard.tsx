"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type BlogPostCardProps = {
  href: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  image: string;
  index: number;
};

export default function BlogPostCard({
  href,
  title,
  summary,
  category,
  date,
  image,
  index,
}: BlogPostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <Link href={href} className="flex flex-1 flex-col">
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <span className="absolute left-3 top-3 rounded-full bg-primary-green px-3 py-1 text-[11px] font-semibold text-white shadow-md">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-medium text-ink/40">{date}</p>
          <h2 className="mt-2 text-lg font-bold text-ink">{title}</h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
            {summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-green transition-colors group-hover:text-primary-red">
            Devamını Oku
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
