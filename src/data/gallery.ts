export const galleryImages = Array.from({ length: 12 }, (_, index) => ({
  src: `/gallery-images/${index + 1}.webp`,
  alt: `Gallery-Image-${index + 1}`
}));