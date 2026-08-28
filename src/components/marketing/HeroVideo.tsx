"use client";

const HERO_VIDEO_SRC = "/videos/hero.mp4";

type HeroVideoProps = {
  posterSrc: string;
};

export default function HeroVideo({ posterSrc }: HeroVideoProps) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterSrc}
      className="absolute inset-0 z-0 hidden h-full w-full object-cover sm:block"
    >
      <source src={HERO_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
