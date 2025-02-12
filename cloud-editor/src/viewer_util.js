import { transformationsToString, constructCdnUrl, COMMON_OPERATIONS } from './lib/cdnUtils.js';

export function viewerImageSrc(originalUrl, width, transformations) {
  const MAX_CDN_DIMENSION = 3000;
  let dpr = window.devicePixelRatio;
  let size = Math.min(Math.ceil(width * dpr), MAX_CDN_DIMENSION);
  let quality = dpr >= 2 ? 'lightest' : 'normal';

  return constructCdnUrl(
    originalUrl,
    COMMON_OPERATIONS,
    transformationsToString(transformations),
    `quality/${quality}`,
    `stretch/off/-/resize/${size}x`
  );
}
