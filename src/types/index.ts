export type ScraperType = "html" | "json";

export interface Scraper {
  scrape(url: string): Promise<any>;
}
