import Stats from '../models/statsModel.js';

export const trackAPIStats = async (req, res, next) => {
  // ONLY track property views: GET requests starting with /api/products/single/
  if (req.method !== 'GET' || !req.originalUrl.startsWith('/api/products/single/')) {
    return next();
  }

  const start = Date.now();
  
  res.on('finish', async () => {
    try {
      const duration = Date.now() - start;
      await Stats.create({
        endpoint: req.originalUrl,
        method: req.method,
        responseTime: duration,
        statusCode: res.statusCode
      });
    } catch (error) {
      // Log error but don't crash the app
      console.error('Error tracking API stats:', error);
    }
  });
  
  next();
};