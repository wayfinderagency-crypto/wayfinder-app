/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://wayfinder-agency.com", // <- zamień na swój adres strony
  generateRobotsTxt: true, // tworzy automatycznie robots.txt
  changefreq: "weekly", // jak często Google powinien sprawdzać strony
  priority: 0.8, // domyślny priorytet stron
  sitemapSize: 5000, // maksymalna liczba URL w jednym pliku sitemap
};
