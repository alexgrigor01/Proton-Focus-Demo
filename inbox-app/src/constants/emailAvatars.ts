/**
 * Email row avatars — files live in `public/media/email-avatars/` (committed to git).
 * Right-rail calendar uses `/calendar-icon.svg` separately; list “Calendar” uses `calendar.png`.
 * Do not use `figma.com/api/mcp/asset` in components — those URLs expire (~7 days).
 */
export const EMAIL_AVATAR = {
  barclays: '/media/email-avatars/barclays.png',
  thamesWater: '/media/email-avatars/thames-water.png',
  notion: '/media/email-avatars/notion.png',
  calendar: '/media/email-avatars/calendar.png',
  slack: '/media/email-avatars/slack.png',
  facebook: '/media/email-avatars/facebook.png',
  linkedin: '/media/email-avatars/linkedin.png',
  strava: '/media/email-avatars/strava.png',
  amazon: '/media/email-avatars/amazon.png',
  lloyds: '/media/email-avatars/lloyds.png',
  tesco: '/media/email-avatars/tesco.png',
  weather: '/media/email-avatars/weather.png',
  govPortal: '/media/email-avatars/gov-portal.png',
  jet2: '/media/email-avatars/jet2.png',
} as const;
