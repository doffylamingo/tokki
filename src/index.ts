import { TokkiFactory } from "./factory";

export async function scrape(url: string) {
  const scraper = TokkiFactory.createScraper(url);

  if (!scraper) {
    return { error: `No scraper found for the provided URL: ${url}` };
  }

  return scraper.scrape(url);
}
