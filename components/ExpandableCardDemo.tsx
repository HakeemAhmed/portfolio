"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Badge } from "@/components/ui/badge";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {active.ctaLink &&(<motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-emerald-600 text-white"
                  >
                    {active.ctaText1}
                  </motion.a>)}
                </div>
                <div className="mb-4 px-4">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-gray-200 mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {active.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-gray-100 dark:bg-slate-700"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-slate-400/70 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left  text-xs tracking-tight md:text-sm"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400  md:text-left text-xs tracking-tight"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="-ml-14 md:-ml-0 px-4 py-2 text-sm rounded-full font-bold bg-emerald-600 hover:text-white  text-light-text dark:text-dark-text mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Google",
    title: "Google Ads Search Certification",
    src: "/googleAds.png?height=400&width=600",
    ctaText: "View Details",
    ctaText1: "View Credintials",
    skills: [
      "Data Analysis",
      "Social Media Strategy",
      "Social Media Marketing",
      "Media Strategy",
      "Performance Metrics",
    ],
    ctaLink:
      "https://drive.google.com/file/d/1u9tQpM6Uai6Rn2htT4B6K_lJ1cSz6GO_/view",
    content: () => {
      return (
        <p>
          Advanced proficiency in creating and optimizing Google Ads campaigns
          across Search, Display, and Video networks.
        </p>
      );
    },
  },
  {
    description: "Google",
    title: "Google Analytics for Beginners",
    src: "/certificate1.png?height=400&width=600",
    ctaText: "View Details",
    ctaText1: "View Credintials",
    skills: [
      "Social Media Advertising",
      "Media Trends",
      "Audience Targeting",
      "Pricing Strategy",
      "Business Strategy",
    ],
    ctaLink:
      "https://drive.google.com/file/d/1QHEPf8onCSX8TVcblIr26RooH6twv4HB/view",
    content: () => {
      return (
        <p>
          Expert-level knowledge in Facebook and Instagram advertising,
          including campaign strategy, audience targeting, and analytics.
        </p>
      );
    },
  },

  {
    description: "Google",
    title: "Fundamentals of Digital Marketing",
    src: "/gads.png?height=400&width=600",
    ctaText: "View Details",
    ctaText1: "View Credintials",
    skills: ["Content Strategy", "SEO", "Lead Generation", "Content Creation"],
    ctaLink:
      "https://drive.google.com/file/d/1trcriiC2rqcyeE-vdfxf99-9YCgqx_D5/view?usp=sharing",
    content: () => {
      return (
        <p>
          Comprehensive understanding of content marketing principles, strategy
          development, and implementation for business growth.
        </p>
      );
    },
  },
  {
    description: "TikTok For Business",
    title: "TikTok Ads  - Practical Expertise",
    src: "/tiktok.jpg?height=400&width=600",
    ctaText: "View Details",
    ctaText1: "View Credintials",
    skills: [
      "Short-form Video",
      "Trend Marketing",
      "Gen Z Targeting",
      "Creative Direction",
    ],
    ctaLink:
      "",
    content: () => {
      return (
        <p>
          Specialized knowledge in creating and managing high-performing TikTok
          advertising campaigns for brand awareness and conversions.
        </p>
      );
    },
  },
  {
    description: "Meta",
    title: "Meta Ads  - Practical Expertise",
    src: "/meta1.png?height=400&width=600",
    ctaText: "View Details",
    ctaText1: "View Credintials",
    skills: [
      "Data Analysis",
      "Conversion Tracking",
      "User Behavior Analysis",
      "Reporting",
    ],
    ctaLink: "",
    content: () => {
      return (
        <p>
          Advanced proficiency in analyzing website traffic, user behavior, and
          marketing campaign performance using Google Analytics.
        </p>
      );
    },
  },
];
