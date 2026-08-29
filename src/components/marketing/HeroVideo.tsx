"use client";

const HERO_VIDEO_SRC = "/videos/hero.mp4";

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 z-0 hidden bg-ink sm:block">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
