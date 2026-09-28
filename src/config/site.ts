export const SITE = {
  name: 'Tinkle Trailers',
  domain: 'TinkleTrailers.com',
  title: 'TinkleTrailers.com | Premium Domain for Sale | Tinkle Trailers',
  description:
    'Buy TinkleTrailers.com for $95,000. Premium .com for mobile trailers and portable restrooms. Escrow transfer. Make an offer or buy now.',
  url: 'https://tinkletrailers.com',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  location: 'Arizona',
  price: 95000,
  priceLabel: '$95,000',
  priceValidUntil: '2026-12-31',
  googleSiteVerification: '8ew0Mz4N6mrzuDM71-GJKcdD9BWHDNUDvuqDyBeTMrg',
  published: '2026-06-08',
  updated: '2026-09-28',
} as const;

export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  heroImageId: 'b1338c09-c7ff-4346-42e3-194cbc49fe00',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

function mail(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const MAIL = {
  buy: mail(
    'Buy Now — TinkleTrailers.com at $95,000',
    'Hello,\n\nI want to buy TinkleTrailers.com at the listed price of $95,000 USD.\n\nName:\nCompany:\nPhone:\nEmail:\nRegistrar I will use:\n\nThank you.',
  ),
  offer: mail(
    'Offer — TinkleTrailers.com',
    'Hello,\n\nI would like to make an offer on TinkleTrailers.com.\n\nOffer amount (USD):\nIntended use:\nName:\nCompany:\nPhone:\nEmail:\n\nThank you.',
  ),
  contact: mail(
    'TinkleTrailers.com — Contact the Seller',
    'Hello,\n\nI have a question about acquiring TinkleTrailers.com.\n\nName:\nEmail:\nQuestion:\n\nThank you.',
  ),
} as const;

export const FAQS = [
  {
    q: 'Is the $95,000 price negotiable?',
    a: 'The asking price is $95,000 and reflects a short, hyphen-free .com that says the category out loud. Reasonable offers from serious buyers are reviewed. Use Make Offer and include your intended use.',
  },
  {
    q: 'How do I buy TinkleTrailers.com?',
    a: 'Agree on price, open a licensed escrow (Escrow.com, Dan.com, or your provider), pay escrow — not the seller directly — and receive the domain at your registrar. Funds release only after you control the name. Most closings take 3–10 business days.',
  },
  {
    q: 'Why buy this .com instead of a newer TLD?',
    a: 'Buyers looking for premium domain names still default to .com. It is the extension people type, trust, and remember. TinkleTrailers.com is the exact commercial phrase, with no hyphen and no number to explain.',
  },
  {
    q: 'Can one company use it across cities or a franchise?',
    a: 'Yes. The name is not tied to one city. A rental fleet, a manufacturer, or a franchise group can run every location on a single category domain.',
  },
  {
    q: 'What am I actually buying?',
    a: 'The domain name TinkleTrailers.com and its transfer. You are not buying trailers, contracts, a website business, or revenue. After transfer you can build whatever brand you want on it.',
  },
] as const;

export const AUDIENCES = [
  {
    id: 'restroom',
    title: 'Portable restroom trailers',
    body: 'Launch or rebrand a luxury restroom-trailer rental company on a name customers already understand. No slogan required.',
  },
  {
    id: 'rental',
    title: 'Trailer rental companies',
    body: 'Put the fleet under a domain people can repeat over the phone and find again without a business card.',
  },
  {
    id: 'event',
    title: 'Event and wedding services',
    body: 'Own the name for upscale wedding, festival, and corporate restroom trailers before a competitor types it in.',
  },
  {
    id: 'jobsite',
    title: 'Construction site services',
    body: 'Pair jobsite sanitation, office trailers, and storage with a category domain crews and GCs can remember.',
  },
  {
    id: 'dealer',
    title: 'Trailer sales and manufacturing',
    body: 'Give a dealership or plant a brandable .com that matches the words buyers already search.',
  },
  {
    id: 'hospitality',
    title: 'Mobile hospitality units',
    body: 'Use it for shower trailers, restroom lounges, glamping, and film-set hospitality — the same mobile category, a higher ticket.',
  },
] as const;
