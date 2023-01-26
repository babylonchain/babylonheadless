import getSitemapPages from "../src/utils/getSitemapPages";
import getTotalCounts from "../src/lib/getTotalCounts";
export default function SitemapIndexPage() {
  return null;
}
export async function getServerSideProps({ res }) {
  const details = await getTotalCounts();
  // console.warn(details);

  let sitemapIndex = `<?xml version='1.0' encoding='UTF-8'?>
  <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
           xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${details.map((item) => getSitemapPages(item)).join("")}
  </sitemapindex>`;
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=600"
  );
  res.write(sitemapIndex);
  res.end();
  return { props: {} };
}
