import { useState, useEffect, useRef } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BadgeCheck, CalendarDays, ChevronLeft, ChevronRight, Headphones, Info, Truck } from "lucide-react";
import { collections } from "../data.js";
import { usePageReveal } from "../hooks/usePageReveal.js";
import { RequestPackageModal } from "./RequestPackageModal.jsx";

const furnitureBenefits = [
  {
    icon: BadgeCheck,
    title: "Guest-ready standard",
    text: "Chosen for comfort, durability, and five-star first impressions."
  },
  {
    icon: CalendarDays,
    title: "30-day setup",
    text: "Delivered, staged, and shot for your listing timeline."
  },
  {
    icon: Truck,
    title: "White-glove install",
    text: "Delivery, assembly, placement, and styling handled for you."
  },
  {
    icon: Headphones,
    title: "One contact",
    text: "One team coordinates every vendor and detail."
  }
];

const featuredSlugs = ["urban", "shore"];

function parseUpgradePrice(label) {
  const match = label.match(/,\s*(?:from\s*)?([\d,]+)\s*EGP/i);
  if (!match) return 0;
  return parseInt(match[1].replace(/,/g, ""), 10) || 0;
}

function UpgradesMultiSelect({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const toggleOption = (option) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  const label = selected.length
    ? `${selected.length} upgrade${selected.length > 1 ? "s" : ""} selected`
    : "Optional Upgrades";

  return (
    <div className="collection-detail__select collection-detail__multiselect" ref={rootRef}>
      <button
        type="button"
        className="collection-detail__multiselect-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{label}</span>
      </button>

      {open && (
        <div className="collection-detail__multiselect-panel" role="listbox">
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <label className="collection-detail__multiselect-option" key={option}>
                <input type="checkbox" checked={checked} onChange={() => toggleOption(option)} />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function CollectionDetail() {
  const { slug } = useParams();
  const collection = collections.find((item) => item.slug === slug);
  const pageRef = usePageReveal();

  const [activePackage, setActivePackage] = useState(0);
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeRoomImage, setActiveRoomImage] = useState(0);
  const [requestOpen, setRequestOpen] = useState(false);
  const [selectedBedroom, setSelectedBedroom] = useState(collection?.bedroomOptions?.[0]);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (slug) {
      document.body.setAttribute("data-page-handle", slug);
    }
    return () => {
      document.body.removeAttribute("data-page-handle");
    };
  }, [slug]);

  useEffect(() => {
    setSelectedBedroom(collection?.bedroomOptions?.[0]);
    setSelectedUpgrades([]);
  }, [slug]);

  useEffect(() => {
    if (!featuredSlugs.includes(slug)) return undefined;
    const mediaEl = mediaRef.current;
    const contentEl = contentRef.current;
    if (!mediaEl || !contentEl) return undefined;

    const applyHeight = () => {
      const gapPx = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.75;
      mediaEl.style.height = `${contentEl.offsetHeight + gapPx * 2}px`;
    };

    applyHeight();
    const observer = new ResizeObserver(applyHeight);
    observer.observe(contentEl);
    window.addEventListener("resize", applyHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", applyHeight);
      mediaEl.style.height = "";
    };
  }, [slug]);

  useEffect(() => {
    if (collection?.rooms) {
      collection.rooms.forEach((r) => {
        if (r.images) {
          r.images.forEach((imgUrl) => {
            const img = new Image();
            img.src = imgUrl;
          });
        }
      });
    }
  }, [collection]);

  if (!collection) {
    return <Navigate to="/" replace />;
  }

  const isFeatured = featuredSlugs.includes(slug);
  const pkg = collection.packages[activePackage];
  const bedroomPrice = collection.bedroomPricing?.[selectedBedroom];
  const upgradesTotal = selectedUpgrades.reduce((sum, option) => sum + parseUpgradePrice(option), 0);
  const basePriceNumber = collection.bedroomPricing
    ? bedroomPrice
    : parseInt((pkg.price || "").replace(/[^\d]/g, ""), 10) || null;
  const displayedPrice = basePriceNumber
    ? `EGP ${(basePriceNumber + upgradesTotal).toLocaleString()}`
    : (collection.bedroomPricing ? "Contact us for pricing" : pkg.price);
  const roomPackages = collection.rooms || [];
  const room = roomPackages[activeRoom] || roomPackages[0];
  const roomImages = room?.images?.length ? room.images : [collection.image];

  const changeRoomImage = (direction) => {
    setActiveRoomImage((current) => (current + direction + roomImages.length) % roomImages.length);
  };

  const packageSelector = (
    <div className="collection-detail__package-inner">
      <p className="collection-detail__price">{displayedPrice}</p>

      <label className="collection-detail__select collection-detail__select--compact">
        <select value={selectedBedroom} onChange={(event) => setSelectedBedroom(event.target.value)}>
          {collection.bedroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <UpgradesMultiSelect
        options={collection.addOns}
        selected={selectedUpgrades}
        onChange={setSelectedUpgrades}
      />

      <button type="button" className="collection-detail__cta" onClick={() => setRequestOpen(true)}>
        <span>Request This Package</span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>

      <p className="collection-detail__notice">
        <Info size={16} aria-hidden="true" />
        Available items and prices may vary
      </p>
    </div>
  );

  return (
    <main className={`page collection-page${isFeatured ? " collection-page--featured" : ""}`} ref={pageRef}>
      {/* 1. Hero image + title block */}
      <section className={`collection-detail${isFeatured ? " collection-detail--featured" : ""}`}>
        <figure className="collection-detail__media" data-image-reveal ref={mediaRef}>
          <img src={collection.image} alt={`${collection.name} furnished living room`} />
        </figure>

        <div className="collection-detail__content" ref={contentRef} data-lenis-prevent>
          <Link className="back-link" to="/collections" data-cursor="Back">
            <ArrowLeft size={18} aria-hidden="true" />
            Collections
          </Link>

          <p className="section-label">{collection.tagline}</p>
          <h1>{collection.name}</h1>
          <p className="collection-detail__desc">{collection.text}</p>

          {isFeatured && packageSelector}
        </div>
      </section>

      {/* 2. Benefits strip */}
      <section className="collection-detail-benefits" aria-label="Furniture service benefits">
        <div className="furniture-benefits">
          {furnitureBenefits.map(({ icon: Icon, title, text }) => (
            <article className="furniture-benefit" key={title}>
              <span className="furniture-benefit__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Room packages — tabs above image, arrows inside image */}
      {roomPackages.length > 0 && (
        <section className="room-tabs-section room-package-section">

          {/* Tab buttons — outside the image container, no z-index conflict */}
          <div className="room-tabs" role="tablist" aria-label="Rooms">
            {roomPackages.map((option, index) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={index === activeRoom}
                className={`room-tab ${index === activeRoom ? "room-tab--active" : ""}`}
                onClick={() => {
                  setActiveRoom(index);
                  setActiveRoomImage(0);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Image viewer — pre-rendered image stack for instant 0ms switching */}
          <div className="room-package room-package--image-only">
            <figure className="room-package__image">
              {roomPackages.flatMap((r, rIdx) => {
                const imgs = r.images?.length ? r.images : [collection.image];
                return imgs.map((imgSrc, imgIdx) => {
                  const isActive = rIdx === activeRoom && imgIdx === (activeRoomImage % imgs.length);
                  return (
                    <img
                      key={`${r.id}-${imgIdx}`}
                      src={imgSrc}
                      alt={`${r.label} package preview`}
                      decoding="async"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        opacity: isActive ? 1 : 0,
                        visibility: isActive ? "visible" : "hidden",
                        transition: "opacity 240ms cubic-bezier(0.22, 1, 0.36, 1)",
                        pointerEvents: "none"
                      }}
                    />
                  );
                });
              })}
            </figure>
            <div className="room-package__arrows" aria-label={`${room?.label} images`}>
              <button type="button" className="room-package__arrow room-package__arrow--prev" onClick={() => changeRoomImage(-1)} aria-label="Previous image">
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button type="button" className="room-package__arrow room-package__arrow--next" onClick={() => changeRoomImage(1)} aria-label="Next image">
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="room-details">
            {roomPackages.map((option, index) => (
              <article
                className={`room-detail-box ${index === activeRoom ? "room-detail-box--active" : ""}`}
                key={option.id}
                data-reveal
                onClick={() => {
                  setActiveRoom(index);
                  setActiveRoomImage(0);
                }}
              >
                <span className="room-detail-box__num">{String(index + 1).padStart(2, "0")}</span>
                <h3>{option.label}</h3>
                <p>{option.description}</p>
                <ul>
                  {option.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}


      {/* 4. Package selector + CTA — below room packages for non-featured collections */}
      {!isFeatured && (
        <section className="collection-detail__package-selector">
          {packageSelector}
        </section>
      )}

      <RequestPackageModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        collectionName={collection.name}
        bedroomLabel={selectedBedroom}
        price={displayedPrice}
        upgrades={selectedUpgrades}
      />
    </main>
  );
}