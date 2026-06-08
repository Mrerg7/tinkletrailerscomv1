export const SITE = {
  name: 'Tinkle Trailers',
  title: 'Tinkle Trailers • Premium Domain for Sale | Mobile Trailers & Portable Solutions',
  description:
    'Tinkle Trailers — The definitive premium domain for mobile trailer solutions, portable restroom trailers, luxury mobile units, and event trailer businesses. Strategic acquisition available.',
  url: 'https://tinkletrailers.com',
  email: 'sales@desertrich.com',
  locale: 'en_US',
  location: 'Arizona',
} as const;

export const CF_IMAGES = {
  accountHash: '-sPAUAWeA405NiWJ0SNIQA',
  heroImageId: 'b1338c09-c7ff-4346-42e3-194cbc49fe00',
} as const;

export function cfImageUrl(imageId: string, variant = 'public'): string {
  return `https://imagedelivery.net/${CF_IMAGES.accountHash}/${imageId}/${variant}`;
}

export const OG_IMAGE = cfImageUrl(CF_IMAGES.heroImageId);

export const ACQUISITION_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent('TinkleTrailers.com Domain Acquisition Inquiry')}&body=${encodeURIComponent('Hello,\n\nI am interested in acquiring TinkleTrailers.com.\n\nIntended use:\nBudget range:\n\nThank you.')}`;
