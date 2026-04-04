export const galleryImages = Array.from({ length: 12 }, (_, index) => ({
  src: `/gallery-images/${index + 1}.jpeg`,
  alt: `Gallery-Image-${index + 1}`
}));