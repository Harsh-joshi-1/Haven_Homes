import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  type?: 'hero' | 'normal' | 'thumbnail';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  type = 'normal',
}) => {
  // Logic to determine quality based on type
  const getQuality = () => {
    switch (type) {
      case 'hero':
        return 90;
      case 'thumbnail':
        return 50;
      default:
        return 75;
    }
  };

  // Cloudinary URL Transformation Logic
  const transformUrl = (url: string, width?: number) => {
    if (!url.includes('cloudinary.com')) return url;

    const quality = getQuality();
    const transformations = [`f_auto`, `q_${quality}`];
    
    if (width) {
      transformations.push(`w_${width}`);
    }

    // Replace existing transformations or inject new ones
    // Cloudinary URLs usually have /upload/v123456/path
    // We want to insert transformations after /upload/
    if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/${transformations.join(',')}/`);
    }
    
    return url;
  };

  // Generate Srcset
  const generateSrcset = (url: string) => {
    if (!url.includes('cloudinary.com')) return undefined;
    
    const widths = [400, 800, 1200, 1600];
    return widths
      .map((w) => `${transformUrl(url, w)} ${w}w`)
      .join(', ');
  };

  // Sizes attribute based on common layouts
  const getSizes = () => {
    switch (type) {
      case 'hero':
        return '100vw';
      case 'thumbnail':
        return '(max-width: 640px) 100vw, 300px';
      default:
        return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
    }
  };

  const optimizedSrc = transformUrl(src, type === 'hero' ? 1200 : undefined);
  const srcset = generateSrcset(src);
  const sizes = getSizes();

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      srcSet={srcset}
      sizes={sizes}
      decoding="async"
    />
  );
};

export default OptimizedImage;
