export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';

  // Check if request is from a social media crawler
  const isSocialBot = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot|Pinterest|Discordbot/i.test(userAgent);

  if (!isSocialBot) {
    return context.next();
  }

  // Social media bot detected — serve minimal HTML with OG tags
  const ogHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PaddleMatch PH — Find Your Perfect Pickleball Paddle</title>
  <meta name="description" content="Free 2-minute quiz matches you with the best pickleball paddle on Shopee Philippines. 33 paddles ranked for beginners to advanced players.">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://paddlematch.ph/">
  <meta property="og:title" content="PaddleMatch PH — Find Your Perfect Pickleball Paddle">
  <meta property="og:description" content="Free 2-minute quiz matches you with the best pickleball paddle on Shopee Philippines. 33 PH paddles ranked for beginners to advanced players.">
  <meta property="og:image" content="https://i.postimg.cc/50cw2pwd/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="en_PH">
  <meta property="og:site_name" content="PaddleMatch PH">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="PaddleMatch PH — Find Your Perfect Pickleball Paddle">
  <meta name="twitter:description" content="Free 2-minute quiz matches you with the best pickleball paddle on Shopee Philippines.">
  <meta name="twitter:image" content="https://i.postimg.cc/50cw2pwd/og-image.png">
</head>
<body>
  <h1>PaddleMatch PH — Find Your Perfect Pickleball Paddle</h1>
  <p>Free 2-minute quiz matches you with the best pickleball paddle on Shopee Philippines. 33 PH paddles ranked.</p>
  <a href="https://paddlematch.ph/">Visit PaddleMatch PH</a>
</body>
</html>`;

  return new Response(ogHTML, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};

export const config = {
  path: "/"
};
