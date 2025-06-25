// Utility function to create CSS-based placeholder image data URLs
export const createPlaceholderImage = (text, width = 60, height = 60, bgColor = '#f0f0f0', textColor = '#666') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = textColor;
  ctx.font = `${Math.floor(width * 0.4)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toDataURL();
};

// Simple SVG-based placeholder for fallback
export const createSVGPlaceholder = (text, width = 60, height = 60, bgColor = '#f0f0f0', textColor = '#666') => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.floor(width * 0.4)}" 
            text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${text}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
