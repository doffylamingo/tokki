import { scraperConfig } from "./config";
import { Scraper } from "./types";

export class TokkiFactory {
  static createScraper(url: string): Scraper | null {
    for (const domain of Object.keys(scraperConfig)) {
      if (!url.includes(domain)) continue;

      const scraper = scraperConfig[domain]!;

      for (const matcher of scraper.matchers) {
        if (matcher.test(url)) {
          return new scraper.constructor();
        }
      }
    }

    return null;
  }
}
