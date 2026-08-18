import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./Button.jsx";
import {
  images,
  processSteps,
  collections as guestCollections,
} from "../data.js";
import airbnbLogo from "../assets/logos/airbnb.svg";
import bookingLogo from "../assets/logos/bookingdotcom.svg";
import airdnaLogo from "../assets/logos/airdna.svg";
import airbticsLogo from "../assets/logos/airbtics.webp";
import smoobuLogo from "../assets/logos/smoobu.svg";
import guessworkIcon from "../assets/guesswork-icon.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import { usePageReveal } from "../hooks/usePageReveal.js";

const costlyMistakes = [
  {
    title: "Guesswork At Every Turn",
    text: "Selecting furniture based on personal taste, not guest data.",
    icon: guessworkIcon,
    variant: "cream",
  },
  {
    title: "Months Of Chaos",
    text: "Losing 3-6 months of potential revenue while going through the hassle of sourcing and staging.",
    icon: icon2,
    variant: "sage",
  },
  {
    title: "Poor Reviews",
    text: "Below 4.7 stars, the algorithm buries you. The small things owners skip are the exact things that win five stars or quietly kill the listing.",
    icon: icon3,
    variant: "oat",
  },
  {
    title: "Lower Nightly Rates",
    text: "The result is a property that earns less than it should.",
    icon: icon5,
    variant: "butter",
  },
];

const dataSources = [
  { name: "Airbnb", logo: airbnbLogo },
  { name: "Booking.com", logo: bookingLogo },
  { name: "Rabbu" },
  { name: "AirDNA", logo: airdnaLogo },
  { name: "AirROI" },
  { name: "Airbtics", logo: airbticsLogo },
  { name: "PriceLabs" },
  { name: "Smoobu", logo: smoobuLogo },
];

const homeCollections = guestCollections.filter((collection) =>
  ["urban", "shore"].includes(collection.slug),
);

const backgroundScenes = [
  {
    selector: ".hero",
    bg: "#746f4f",
    bg2: "#746f4f",
    accent: "rgba(173, 138, 95, 0.06)",
    line: "rgba(255, 248, 232, 0.02)",
    fabBg: "#c8c1a8",
  },
  {
    selector: ".intro",
    bg: "#746f4f",
    bg2: "#746f4f",
    accent: "rgba(229, 235, 216, 0.04)",
    line: "rgba(255, 248, 232, 0.02)",
    fabBg: "#c8c1a8",
  },
  {
    selector: ".mistakes",
    bg: "#efe5d2",
    bg2: "#efe5d2",
    accent: "rgba(116, 111, 79, 0.12)",
    line: "rgba(51, 55, 33, 0.1)",
    fabBg: "#746f4f",
  },
  {
    selector: ".collections",
    bg: "#fbf0df",
    bg2: "#eadbc2",
    accent: "rgba(154, 85, 62, 0.1)",
    line: "rgba(51, 55, 33, 0.08)",
    fabBg: "#746f4f",
  },
  {
    selector: ".strategy",
    bg: "#e4ead8",
    bg2: "#f8f1df",
    accent: "rgba(116, 111, 79, 0.13)",
    line: "rgba(51, 55, 33, 0.1)",
    fabBg: "#746f4f",
  },
  {
    selector: ".craft",
    bg: "#fff8e8",
    bg2: "#ead8c3",
    accent: "rgba(173, 138, 95, 0.16)",
    line: "rgba(51, 55, 33, 0.08)",
    fabBg: "#746f4f",
  },
];

export function Home() {
  const pageRef = usePageReveal();
  const heroRef = useRef(null);
  const [activeCollection, setActiveCollection] = useState(0);
  const slideCollection = (direction) => {
    setActiveCollection(
      (current) =>
        (current + direction + homeCollections.length) % homeCollections.length,
    );
  };

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      heroRef.current?.classList.remove("hero__switchline--intro");
      gsap.set(
        heroRef.current?.querySelectorAll(
          ".hero__switch-idle, .hero__switch-strike",
        ),
        { autoAlpha: 0 },
      );
      gsap.set(heroRef.current?.querySelector(".hero__actions"), {
        autoAlpha: 1,
        y: 0,
        pointerEvents: "auto",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const setBackground = (scene, immediate = false) => {
        gsap.to(pageRef.current, {
          "--home-bg": scene.bg,
          "--home-bg-2": scene.bg2,
          "--home-accent": scene.accent,
          "--home-line": scene.line,
          duration: immediate ? 0 : 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(document.documentElement, {
          "--fab-bg": scene.fabBg || "#746f4f",
          duration: immediate ? 0 : 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      setBackground(backgroundScenes[0], true);

      const switchline = heroRef.current?.querySelector(".hero__switchline");
      const prefix = heroRef.current?.querySelector(".hero__switch-prefix");
      const idle = heroRef.current?.querySelector(".hero__switch-idle");
      const strike = heroRef.current?.querySelector(".hero__switch-strike");
      const earn = heroRef.current?.querySelector(".hero__switch-earn");
      const metricsTitle = heroRef.current?.querySelector(
        ".hero__title--metrics",
      );
      const metricsLines = gsap.utils.toArray(
        ".hero__title--metrics > span",
        heroRef.current,
      );
      const metricsIcons = gsap.utils.toArray(
        ".hero__title-icon",
        heroRef.current,
      );
      const heroActions = heroRef.current?.querySelector(".hero__actions");

      gsap.set([prefix, idle], {
        autoAlpha: 0,
        y: "0.38em",
        filter: "blur(6px)",
      });
      gsap.set(strike, { autoAlpha: 0, scaleX: 0 });
      gsap.set(earn, {
        autoAlpha: 0,
        filter: "blur(6px)",
        x: "0.22em",
        y: "0.28em",
        scale: 0.85,
      });
      gsap.set(metricsTitle, { display: "none", autoAlpha: 0 });
      gsap.set(heroActions, { autoAlpha: 0, y: 15, pointerEvents: "none" });

      const revealTitle = () => {
        gsap.set(metricsTitle, { display: "grid", autoAlpha: 1 });
        if (metricsLines.length > 0) {
          gsap.fromTo(
            metricsLines,
            { autoAlpha: 0, y: 15 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.1,
              ease: "power3.out",
            },
          );
        }
        if (heroActions) {
          gsap.to(heroActions, {
            autoAlpha: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.8,
            ease: "power3.out",
            delay: 0.18,
          });
        }
        const heroExtras = heroRef.current?.querySelectorAll(
          ".hero__eyebrow, .hero__copy, .hero__aside",
        );
        if (heroExtras && heroExtras.length > 0) {
          gsap.from(heroExtras, {
            autoAlpha: 0,
            y: 60,
            duration: 1.1,
            stagger: 0.1,
            ease: "power3.out",
          });
        }
        if (metricsIcons.length > 0) {
          gsap.from(metricsIcons, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(2.4)",
            delay: 0.5,
          });
        }
      };

      gsap.delayedCall(2.4, () => {
        gsap
          .timeline({
            onComplete: () => {
              gsap.delayedCall(0.3, () => {
                switchline?.classList.remove("hero__switchline--intro");
                gsap.delayedCall(0.7, revealTitle);
              });
            },
          })
          .to(
            prefix,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.48,
              ease: "power2.out",
            },
            0,
          )
          .to(
            idle,
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.46,
              ease: "power2.out",
            },
            0.18,
          )
          .to(
            strike,
            { autoAlpha: 1, scaleX: 1, duration: 0.16, ease: "power2.out" },
            0.7,
          )
          .to(
            [idle, strike],
            { autoAlpha: 0, duration: 0.38, ease: "power1.in" },
            1.35,
          )
          .to(
            earn,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.62,
              ease: "power2.out",
            },
            1.4,
          );
      });

      backgroundScenes.forEach((scene) => {
        const trigger = document.querySelector(scene.selector);
        if (!trigger) return;
        ScrollTrigger.create({
          trigger,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setBackground(scene),
          onEnterBack: () => setBackground(scene),
        });
      });

      if (heroRef.current?.querySelector(".hero__image")) {
        gsap.from(".hero__image", {
          clipPath: "inset(12% 12% 12% 12%)",
          scale: 1.08,
          duration: 1.8,
          ease: "power4.out",
          delay: 0.55,
        });
        gsap.to(".hero__image img", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      const craftLine = pageRef.current?.querySelector(".craft__line span");
      if (craftLine) {
        gsap.to(craftLine, {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".craft",
            start: "top 70%",
            end: "bottom 55%",
            scrub: true,
          },
        });
      }
      const introImg = pageRef.current?.querySelector(".intro-photo img");
      if (introImg) {
        gsap.to(introImg, {
          scale: 1.04,
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-photo",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      const galleryImages = gsap.utils.toArray(
        ".project figure img, .material-card figure img, .product-gallery-shot img",
        pageRef.current,
      );
      if (galleryImages.length > 0) {
        galleryImages.forEach((image) => {
          if (image) {
            gsap.to(image, {
              scale: 1.08,
              yPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: image.closest("figure") || image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }
    }, pageRef);

    return () => {
      ctx.revert();
      document.documentElement.style.setProperty("--fab-bg", "#746f4f");
    };
  }, [pageRef]);

  return (
    <main className="page page--home" ref={pageRef}>
      <div className="home-bg" aria-hidden="true" />
      <section className="hero" ref={heroRef}>
        <div className="hero__image" data-cursor="Strategy">
          <img
            src={images.hero}
            alt="A fully furnished short term rental living room, staged and ready for guests"
          />
        </div>
        <div className="hero__content">
          <p
            className="hero__switchline hero__switchline--intro"
            aria-label="Spaces that sit idle become earn"
          >
            <span className="hero__switch-prefix">Spaces That</span>
            <span className="hero__switch-slot">
              <span className="hero__switch-idle">
                SIT IDLE
                <span className="hero__switch-strike" aria-hidden="true" />
              </span>
              <span className="hero__switch-earn">Earn.</span>
            </span>
          </p>

          <h1 className="hero__title hero__title--metrics">
            <span>
              More
              <img
                className="hero__title-icon hero__title-icon--more"
                src={icon4}
                alt=""
                aria-hidden="true"
              />
              Bookings.
            </span>
            <span>Higher Rates.</span>
            <span>
              Zero
              <img
                className="hero__title-icon hero__title-icon--zero"
                src={icon5}
                alt=""
                aria-hidden="true"
              />
              Guesswork.
            </span>
          </h1>
          <div className="hero__actions">
            <Button to="/collections">View collections</Button>
          </div>
        </div>
        <a
          className="hero__scroll"
          href="#intro"
          aria-label="Scroll to brand introduction"
        >
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </section>
      <section className="trust-strip" data-reveal>
        <div className="trust-strip__inner">
          <p className="trust-strip__label">Built on data from</p>
          <div
            className="trust-strip__logos"
            aria-label="Built on data from Airbnb, Booking.com, Rabbu, AirDNA, AirROI, Airbtics, PriceLabs, and Smoobu."
          >
            {dataSources.map((source) => (
              <span className="trust-strip__logo" key={source.name}>
                {source.logo ? (
                  <img src={source.logo} alt={source.name} loading="lazy" />
                ) : (
                  source.name
                )}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="intro section" id="intro">
        <div className="intro__story">
          <div className="intro__text" data-reveal>
            <p className="section-label">DATA BEATS TASTE</p>
            <h2>
              <span>Made To</span>
              <span>Perform</span>
            </h2>
            <p className="intro__subcopy">
              We are not decorators. We are your revenue partners.
            </p>
          </div>
          <div className="intro__copy" data-reveal>
            <p>
              In the same building, one unit earns triple another. Same
              location. Same size. The difference is the setup, and the setup is
              a choice. Most owners leave that to taste and guesswork. OBÉ
              treats it as what it is, a performance decision, made once and
              made right, from data instead of opinion.
            </p>
          </div>
          <div className="intro__media-stack" data-reveal>
            <figure
              className="intro__media intro__media--primary"
              data-image-reveal
            >
              <img
                src={images.madeToPerform1}
                alt="A neutral toned living room set up for short term rental guests"
              />
            </figure>
            <figure
              className="intro__media intro__media--float"
              data-image-reveal
            >
              <img
                src={images.madeToPerform2}
                alt="A warm toned bedroom furnished and styled for a short term rental listing"
              />
            </figure>
          </div>
        </div>

        <span className="section-word" aria-hidden="true">
          Purpose
        </span>

        <figure className="intro-photo">
          <img
            src={images.madeToPerform1}
            alt="A completed short term rental furniture setup with seating and warm lighting"
          />
        </figure>
      </section>
      <section className="mistakes section" id="mistakes">
        <div className="mistakes__heading" data-reveal>
          <h2>Costly Mistakes</h2>
        </div>
        <div className="mistakes__grid">
          {costlyMistakes.map((item) => (
            <article
              className={`mistake-card mistake-card--${item.variant}`}
              key={item.title}
              data-cursor="Avoid"
            >
              <div className="mistake-card__icon" aria-hidden="true">
                <img src={item.icon} alt="" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="mistakes__swipe-hint" aria-hidden="true">
          Swipe to see more
          <ArrowRight size={16} aria-hidden="true" />
        </p>
      </section>
      <section className="collections section" id="collections">
        <div className="collections__editorial" data-reveal>
          <p className="section-label">The Collections</p>
          <h2>Made For Your Ideal Guest</h2>
          <p className="collections__intro-copy">
            Two collections. Each designed around a specific guest, and the
            exact things that make that guest leave five stars.
          </p>
        </div>
        <div className="collections__duo collections__slider" data-reveal>
          {homeCollections.map((collection, index) => {
            const offset =
              (index - activeCollection + homeCollections.length) %
              homeCollections.length;
            const position = offset === 0 ? "active" : "next";

            return (
              <Link
                to={`/collections/${collection.slug}`}
                className={`collection-choice collection-choice--${collection.slug}`}
                data-position={position}
                key={collection.slug}
                data-cursor="View"
                onClick={(event) => {
                  if (position !== "active") {
                    event.preventDefault();
                    setActiveCollection(index);
                  }
                }}
              >
                <img
                  className="collection-choice__image"
                  src={collection.image}
                  alt={`${collection.name} furnished short term rental interior`}
                />
                <span className="collection-choice__index">0{index + 1}</span>

                <div className="collection-choice__body">
                  <p>{collection.tagline}</p>
                  <h3>{collection.name}</h3>
                </div>
              </Link>
            );
          })}
          <div
            className="collections__slider-controls"
            aria-label="Collection slider controls"
          >
            <button
              type="button"
              onClick={() => slideCollection(-1)}
              aria-label="Previous collection"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => slideCollection(1)}
              aria-label="Next collection"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
      <section className="strategy section">
        <div className="strategy__heading" data-reveal>
          <p className="section-label">THE OBÉ DIFFERENCE</p>
          <h2>A short term rental engineered to earn at its full potential.</h2>
        </div>
        <div className="strategy__body">
          <p data-reveal>
            That's why we created OBÉ. A product standard built from STR
            performance data where every decision has one job: get you more
            booking at a higher rate.
          </p>
          <div className="strategy__statement" data-reveal>
            <div className="strategy__points">
              <p>
                <strong>You Don't Guess.</strong> The decisions that decide
                performance are already made, from data. From the sofa till the
                cutlery, you skip the guesswork completely.
              </p>
              <p>
                <strong>You Don't Wait.</strong> 30 days from signature to a
                listing ready for guests. Guaranteed, or we rebate ten percent
                of our fee.
              </p>
              <p>
                <strong>You Don't Coordinate.</strong> One point of contact
                handles every vendor, delivery, and detail. Zero hassle on your
                end.
              </p>
              <p>
                <strong>You Don't Manage Us.</strong> We furnish to a standard
                and step back. No conflict over how your property runs.
              </p>
            </div>
            <aside>
              <span>From empty to live in</span>
              <strong>30 days</strong>
            </aside>
          </div>
        </div>
        <span
          className="section-word section-word--strategy"
          aria-hidden="true"
        >
          Strategy
        </span>
      </section>
      <section className="craft section" id="craft">
        <div className="craft__sticky" data-reveal>
          <p className="section-label">The Path to Revenue</p>
          <h2>From Empty To Booked</h2>
          <p>You hand it over once. We take it from empty to earning.</p>
          <Button href="/#contact" variant="light">
            Get Your Free Estimate
          </Button>
        </div>
        <div className="craft__line" aria-hidden="true">
          <span />
        </div>
        <div className="craft__steps">
          {processSteps.map((step) => (
            <article className="craft-step" key={step.number} data-reveal>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
