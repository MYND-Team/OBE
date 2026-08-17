# OBÉ Web App — Client Edit Requests (Dev Documentation)

Source: client-annotated PDF markup on top of the current build.
Reference site: [https://obefurniture.edgeone.dev/](https://obefurniture.edgeone.dev/)

Each item below is written as: **Component** → **Current state** → **Requested change** → **Implementation notes**. Use this as a checklist / spec sheet for the code changes.

---

## 1. Collections Card (Shore / Urban carousel)

- **Current:** Card shows an eyebrow ("FOR THE GETAWAY GUEST" / "FOR THE CITY EXPLORER"), large title ("SHORE" / "URBAN"), and a description paragraph, over a background photo. Icons in the nav arrows are placeholder/generic.
- **Requested changes:**
  1. Replace the arrow icons with the **original icon set** (client says "solve icons (original ones)" — restore whatever custom icon asset was used before, not a generic chevron).
  2. **Remove the description paragraph** entirely from this card view (keep only eyebrow + title).
  3. **Fix vertical spacing:** the gap between the eyebrow ("FOR THE GATEWAY/CITY...") and the big title (SHORE/URBAN) should match the same gap used between the title and the paragraph text elsewhere — i.e. make spacing consistent/rhythmic between eyebrow→title and title→body across both card variants.
- **Implementation notes:** Likely a shared `CollectionCard` component with a `showDescription` prop or simply strip the paragraph from this card's template. Standardize a spacing token (e.g. `--card-eyebrow-gap`) and reuse it in both places.

---



## 2. "Strategy" Section (large watermark heading over bullet text)

- **Current:** Bold intro line ("You Don't Manage Us...") sits above a large faint watermark-style word ("STRATEGY").
- **Requested change:** **Keep the spacing "like purpose"** — i.e. match the vertical spacing/rhythm used in the "Purpose" section (an earlier/sibling section with the same layout pattern). This is a consistency fix, not a content change.
- **Implementation notes:** Find the "Purpose" section's spacing values (margin/padding between heading text and watermark word) and apply the same values here.

---



## 3. Process Steps List (Assess / Match / …)

- **Current:** Alternating rows — one dark olive row (numbered icon + title + description), one light cream row.
- **Requested change:** **Keep all rows using the same olive/dark color** ("keep all the morab3 with the zety colour" = keep all the *steps/rows* in the olive/dark green color), and the **number badge should stay white to match the text color** (i.e., don't let the "02" numeral use a different color than the row's body text — both should read in white/cream against the dark background).
- **Implementation notes:** Remove the alternating light/dark row variant; apply the dark olive background + white text style to every row in this list. Ensure the numeral badge text color is bound to the same text-color variable as the paragraph, not a separate accent color.

---



## 4. CTA Banner ("A seamless process built around taking it as it is.")

- **Current:** CTA button ("GET YOUR FREE ESTIMATE") uses a fixed olive/dark background color by default. A second reference screenshot shows a different (dynamic) button style ("Get Your Free Estimate" pill on olive background).
- **Requested change:** **Switch the default button color from the static olive ("zety") to the dynamic/theme-driven color** used elsewhere (i.e., button background should pull from the current section's dynamic color token rather than a hardcoded value).
- **Implementation notes:** Locate the hardcoded hex/color class on this CTA button and replace with the dynamic color variable (e.g. `var(--section-accent)` or equivalent) already used by other dynamic-colored elements on the page.

---



## 5. WhatsApp Floating Icon

- **Current:** Fixed dark circle background behind the WhatsApp icon, regardless of the section background behind it.
- **Requested change:** **Make the icon's background color dynamic**, i.e. derive it from the surrounding/section background color rather than a hardcoded dark fill.
- **Implementation notes:** Bind the WhatsApp button background to the same dynamic background-color variable used by the section it's currently overlapping, or compute a contrast-safe tint from the page's current theme color.

---



## 6. "Higher rates, better reviews." Heading

- **Current:** Very large highlighted/marker-style text.
- **Requested change:** **Reduce font size** (make it smaller) — keep the highlight/marker background styling, just scale down the type.
- **Implementation notes:** Adjust the heading's font-size (and possibly line-height) at the relevant breakpoint(s); no copy change.

---



## 7. Section Above Collections Grid

- **Current:** Highlighted line reads "Pick the guest your property should win — we furnish the rest."
- **Requested change:** **Delete this line entirely.**

---



## 8. Collection Copy — Urban & Shore (content to insert)

Add/confirm the following copy blocks under the respective collection cards (Urban and Shore):

**Urban**

- Eyebrow: `FOR THE CITY EXPLORER`
- Description: "For the international traveler here to see the city, dropping their bags between the sights, the museums, and a night out. Set up for apartments in the neighborhoods guests actually want to book."

**Shore**

- Eyebrow: `FOR THE GETAWAY GUEST`
- Description: "For families, couples, and friend groups on an escape to the coast, who want it to feel like a holiday the second they walk in. Set up for chalets, apartments, and villas by the sea."

*(Note: this is the same copy referenced in item #1 as removed from the carousel card — it should live on the **collection detail page**, not the top-level carousel card. See item #11.)*

---



## 9. Furnishing Standard Headline — Copy Swap

- **Current headline:** "A furnishing standard built to remove the expensive parts of guessing, waiting, coordinating, and managing."
- **Requested replacement:** "Shell furnishing. A standard built to remove…." *(client wrote "sheel" — confirm exact wording "Shell furnishing, a standard built to remove…" with the client before shipping; truncation with "…." looks intentional but worth a quick confirm.)*

---



## 10. Package Toggle Label

- **Current:** Toggle labeled **"Standard"** / "Tech-enabled".
- **Requested change:** **Remove "Standard"** as the bold/emphasized label shown elsewhere (leave "Tech-enabled" as the remaining/only emphasized label in that particular text instance — the toggle control itself still has both options; this edit is about a duplicated bold "Standard" text label near it, not the toggle UI).
- **Implementation notes:** Look for a standalone "**Standard**Tech-enabled" text string (concatenated in the PDF, meaning two separate labels sitting adjacent) and remove the redundant "Standard" text node, keeping the toggle control intact.

---



## 11. Collection Detail Card — Revert Layout

- **Requested change:** **Replace the current detail card layout with the old one** (reference screenshot shows: full-width room photo, right-aligned info panel with "← COLLECTIONS" back link, eyebrow, title, description, no pricing/package widget on this view).
- **Implementation notes:** This looks like a rollback of a more recent version (item #12, the pricing widget version) back to a simpler content-only panel. Confirm with client whether the **pricing/package selector panel should be removed from this specific view** or whether they want both views (simple info vs. full package builder) to coexist as separate pages/steps.

---



## 12. Package Selector Panel — CTA Copy

- **Current:** Heading "Choose your package," CTA button reads **"Request This Package"** already in one version.
- **Requested change:** Confirm/standardize on **"Request This Package"** as the CTA label everywhere this panel appears (client note: "Request this package instead of choose….." — read as: keep the CTA labeled "Request This Package", not "Choose Your Package" style copy on the button — the heading "Choose your package" can stay as the section title, only the **button** text should be standardized to "Request This Package").
- Also: **delete the intro paragraph** above this panel (the one being replaced by the panel itself) — same instruction as "and delete the paragraph" in the PDF, referring to leftover paragraph copy above the package widget.

---



## 13. Collection Detail Card — Full Version with Price + Style Swatches

- **Requested change:** **Keep this version, annotate with comments only** (client marked "with comments" — meaning this specific screenshot is being marked up for review/discussion, not necessarily changed yet). Treat as **no code change** until specific comments are provided; flag for follow-up with client.
- **Separately, global rule:** **All images must render uncropped** ("All images without any crop") — check `object-fit`/`background-size` rules across image containers (hero images, collection photos, room photos) and switch any `cover`/cropped fit to `contain` (or resize containers to match native aspect ratio) so no image content is cut off.

---



## 14. "Second Bedroom" Step → Rename

- **Current:** Step 03 titled **"Second Bedroom"**.
- **Requested change:** Rename to **"Guest Bedroom"** (title text only; bullet content stays the same: "Bed frame with quality mattress and full linens" / "Storage, side tables, and soft styling").

---



## 15. Request Package Modal (side panel with photo + form)

- **Current:** Left panel shows room photo with overlaid text (brand wordmark + "Urban Collection" label) at bottom-left.
- **Requested changes:**
  1. **Remove the extra text overlay** — the client wants **only "Urban"** (i.e. drop "Collection" / any secondary line, keep the collection name alone) on the photo.
  2. **Add the logo to the top-left** of this photo panel (currently the logo sits bottom-left with "OBÉ / Urban Collection"; move/add a logo mark at the top-left instead).
- **Implementation notes:** This is the left-hand image panel inside the "Request This Package" modal/drawer. Adjust the overlay text block and add a logo asset positioned top-left (check existing header logo asset/component and reuse it here).

---



## 16. Request Package Form — "Anything we should know?" Field

- **Current:** Textarea placeholder: "A floor plan or a photo is welcome."
- **Requested change:** **Remove the floor-plan/photo mention** from this field ("Remove the floor …………" — the client wants this placeholder line dropped or shortened, since floor plan/photo upload apparently isn't being collected here). Replace with a more generic placeholder or leave empty, pending client's preferred wording — flag for a one-line copy confirmation if not already decided.

---



## 17. "Is it earning yet?" Dropdown — Option Wording

- **Client note:** "Na2sen" (Arabic: "نسيتها" – "I forgot it" / "I forgot to add it") — interpreted as: **client forgot to include an option** in the "Is it earning yet?" dropdown. Current visible options in the screenshot: "Empty, not listed" / "Listed but underperforming" — but the full spec (see item #18) lists two more: "Preparing it now" and "I own several." **Verify all four options are present in the actual dropdown component**, since the screenshot only shows two before scrolling.

---



## 18. Full "Get Your Free Estimate" Form — Complete Spec

This section replaces/confirms the entire estimate-request form. Implement exactly as specified:

### Form header

- Headline: `Get Your Free Estimate`
- Intro: "Four quick details about your property. We send back a real revenue projection: what listings like yours earn now, and what the top ten percent earn. Within 24 hours, on WhatsApp."
- Small line under intro: `Takes about a minute.`
- Contact line: `Questions? contact@obespaces.com`



### Section 1 — THE PROPERTY (asked first)


| Field                  | Type     | Required | Options / Placeholder                                                             |
| ---------------------- | -------- | -------- | --------------------------------------------------------------------------------- |
| Where is the property? | text     | Yes      | Helper: "Neighborhood is enough."                                                 |
| How many bedrooms?     | dropdown | Yes      | Studio / 1 / 2 / 3 / 4 or more                                                    |
| What stage is it at?   | dropdown | Yes      | Unfinished / Semi finished / Finished, unfurnished / Finished, furnished          |
| Is it earning yet?     | dropdown | Yes      | Empty, not listed / Listed but underperforming / Preparing it now / I own several |




### Section 2 — YOU (asked second)


| Field                      | Type          | Required      | Notes                                                                        |
| -------------------------- | ------------- | ------------- | ---------------------------------------------------------------------------- |
| Name                       | 2 text fields | Yes           | First Name / Last Name                                                       |
| WhatsApp number            | phone         | Yes           | Placeholder `(000) 000 0000`; Helper: "This is where your estimate arrives." |
| Email                      | email         | Yes           | Placeholder `example@example.com`                                            |
| How did you hear about us? | dropdown      | No (optional) | Instagram / Google / A friend / Other — keep optional, for analytics only    |




### Submit

- Button: `Get My Free Estimate`
- Secondary line under button: `Prefer to talk first? Book a call.`
- Trust line (small, under that): `No cost. No obligation. A real projection, not a sales call.`



### Confirmation screen (post-submit)

- Headline: `Got it. Your estimate is on the way.`
- Body: "Our team is putting together a revenue projection for your property. It reaches you on WhatsApp within 24 hours. If anything is unclear, we will ask before we send."



### Error messages (calm, specific, never blame the visitor)

- Missing WhatsApp number: "We need a WhatsApp number to send your estimate. Could you add it?"
- Bad number format: "That number looks incomplete. Could you check it?"
- Missing required field: "Just this one to go, then you are done."
- General failure: "Something went wrong on our side, not yours. Please try once more, or message us at [contact@obespaces.com](mailto:contact@obespaces.com)"

---



## Open Questions to Confirm With Client Before Shipping

1. Item #9 — exact final wording of the "Shell furnishing" replacement headline (typo "sheel" in source note).
2. Item #10 — confirm the "Standard" label removal doesn't affect the actual toggle control, only a duplicated text node.
3. Item #11 vs #13 — clarify whether the simple detail-card layout (old) and the full package/price detail-card should both exist as separate views, or whether one replaces the other.
4. Item #16 — confirm replacement placeholder copy for the "Anything we should know?" field once the floor-plan/photo mention is removed.
5. Item #17 — confirm all 4 "Is it earning yet?" options are wired into the dropdown (screenshot only showed 2 due to scroll cutoff).

