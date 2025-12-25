import React from "react";
import { ArrowDown, Star, Sparkle } from "lucide-react";
import HeroOrbit from "./HeroOrbit";

// Ensure these paths match your project structure
import memojiImage from "../../assets/img/memoji-computer.png";
import grainImage from "../../assets/img/grain.jpg";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="py-32 md:py-32 lg:py-48 relative z-0 overflow-x-clip"
    >
      {/* Background Mask & Grain */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage})`,
          }}
        ></div>

        {/* Rings - kept emerald as brand color, but you can change to theme-border if preferred */}
        <div className="hero-ring size-[620px]"></div>
        <div className="hero-ring size-[820px]"></div>
        <div className="hero-ring size-[1020px]"></div>
        <div className="hero-ring size-[1220px]"></div>

        {/* Orbits */}
        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-8 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-5 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-41}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-2 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-10 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <Star className="size-12 text-emerald-300 fill-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="3s"
        >
          <Star className="size-8 text-emerald-300 fill-emerald-300" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-2 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="3s"
        >
          <Sparkle className="size-14 text-emerald-300/20" />
        </HeroOrbit>
        <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
          <div className="size-3 rounded-full bg-emerald-300/20"></div>
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <Star className="size-28 text-emerald-300 fill-emerald-300" />
        </HeroOrbit>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center z-10 relative">
          <img
            className="size-[100px]"
            src={memojiImage}
            alt="Person peeking from behind laptop"
          />

          {/* Badge: Uses theme background and border variables */}
          <div className="bg-[var(--theme-bg)]/80 backdrop-blur-sm border border-[var(--theme-border)] px-4 py-1.5 inline-flex items-center gap-4 rounded-lg shadow-sm">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="text-sm font-semibold text-[var(--theme-text-main)]">
              Available for next project
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* H1: Uses theme text variable */}
            <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide capitalize text-[var(--theme-text-main)]">
              I build websites for <br /> businesses, Institutes and
              Organizations
            </h1>

            {/* Paragraph: Uses theme text variable with opacity */}
            <p className="mt-4 text-center md:text-lg text-[var(--theme-text-main)]/70">
              Hi, I am Md. Jamil Shikder. I specialize in building scalable,
              high-performance web solutions using the MERN Stack and WordPress.
              From pixel-perfect frontends to robust backends, I turn complex
              ideas into digital reality.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
            {/* Explore Button: Outline style using theme text color */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-[var(--theme-text-main)]/20 px-6 h-12 rounded-xl text-[var(--theme-text-main)] hover:bg-[var(--theme-text-main)]/5 transition-colors"
            >
              <span className="font-semibold">Explore My Work</span>
              <ArrowDown className="size-4" />
            </a>

            {/* Connect Button: Solid style. 
                Background = Theme Text Color
                Text = Theme Background Color
                (This ensures high contrast in both modes) */}
            <a
              href="https://www.facebook.com/jswebdevs"
              className="inline-flex items-center gap-2 bg-[var(--theme-text-main)] text-[var(--theme-bg)] rounded-xl h-12 px-6 hover:opacity-90 transition-opacity"
            >
              <span>👋</span>
              <span className="font-semibold">Let&apos;s Connect</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
