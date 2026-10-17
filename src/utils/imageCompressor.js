/**
 * Compresses an image file in the browser using HTML5 Canvas.
 * Reduces 5-10MB smartphone photos down to ~70-120KB without visible quality loss.
 * Prevents LocalStorage QuotaExceeded errors!
 */
export const compressImageFile = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = (err) => reject(err);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target.result);
          return;
        }

        // Draw and compress to WebP or JPEG
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        let compressedDataUrl = canvas.toDataURL('image/webp', quality);
        if (!compressedDataUrl.startsWith('data:image/webp')) {
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calculate size reduction
        const originalKB = Math.round(file.size / 1024);
        const compressedKB = Math.round((compressedDataUrl.length * (3 / 4)) / 1024);

        resolve({
          dataUrl: compressedDataUrl,
          originalSizeKB: originalKB,
          compressedSizeKB: compressedKB,
          savedPercent: Math.max(0, Math.round(((originalKB - compressedKB) / originalKB) * 100))
        });
      };
      img.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Returns a reliable fallback image if an image fails to load
 */
export const getFallbackImage = (category = 'solar-panels') => {
  switch (category) {
    case 'inverters':
      return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
    case 'batteries':
      return 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80';
    case 'packages':
      return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80';
  }
};
