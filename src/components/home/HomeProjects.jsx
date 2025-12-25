import React from "react";
import { CheckCircle2, ArrowUpRight, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom"; // 1. Import Link
import projectsData from "../../assets/projects/projects.json";

// Import your grain texture image here
import grainImage from "../../assets/img/grain.jpg";

const HomeProjects = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* --- INLINED SECTION HEADER START --- */}
        <>
          <div className="flex justify-center">
            <p className="uppercase font-semibold tracking-wider bg-gradient-to-r from-emerald-300 to-sky-400 text-center bg-clip-text text-transparent">
              Real-world Results
            </p>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-6">
            Featured Projects
          </h1>
          <p className="text-center text-white/60 mt-4 md:text-lg lg:text-xl max-w-md mx-auto">
            See how I transformed concepts into engaging digital experiences.
          </p>
        </>
        {/* --- INLINED SECTION HEADER END --- */}

        <div className="flex flex-col gap-20 mt-10 md:mt-20">
          {projectsData.slice(0, 5).map((project, projectIndex) => (
            /* --- INLINED CARD START --- */
            <div
              key={project.id}
              // Merging base card styles with the specific sticky/padding styles
              className={twMerge(
                // 1. Base Card Styles
                "bg-gray-800 rounded-3xl relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none z-0 p-6",
                // 2. Specific styles for this section (Sticky effect + Padding)
                "px-8 pt-8 pb-0 md:px-12 md:pt-12 lg:pt-16 lg:px-16 z-0 sticky"
              )}
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`, // Stacking effect logic
              }}
            >
              {/* Background Grain Texture */}
              <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                  backgroundImage: `url(${grainImage})`,
                }}
              ></div>

              {/* Card Content */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                {/* Text Content */}
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">
                    {project.title}
                  </h3>

                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-white/50"
                      >
                        <CheckCircle2 className="size-5 md:size-6 text-emerald-400" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.link}
                    className="bg-white text-gray-950 h-12 px-6 rounded-xl font-semibold flex md:inline-flex justify-center items-center gap-2 mt-8 hover:bg-gray-200 transition-colors"
                  >
                    <span>Visit Live site</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>

                {/* Image Content */}
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none rounded-t-lg shadow-2xl"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top left",
                    }}
                  />
                </div>
              </div>
            </div>
            /* --- INLINED CARD END --- */
          ))}
        </div>

        {/* --- VIEW MORE BUTTON START --- */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-950 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>View All Projects</span>
            <ArrowRight className="size-5" />
          </Link>
        </div>
        {/* --- VIEW MORE BUTTON END --- */}
      </div>
    </section>
  );
};

export default HomeProjects;
