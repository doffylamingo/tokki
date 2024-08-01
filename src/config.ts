import { CosmopolitanScraper } from "./modules/cosmopolitan";
import { DazedKoreaScraper } from "./modules/dazedkorea";
import { DispatchScraper } from "./modules/dispatch";
import { ElleScraper } from "./modules/elle";
import { EsquireScraper } from "./modules/esquire";
import { HarpersBazaarScraper } from "./modules/harpersbazaar";
import { IlganSportsScraper } from "./modules/ilgansports";
import { Scraper } from "./types";

type ScraperConstructor = new () => Scraper;

interface ScraperEntry {
  constructor: ScraperConstructor;
  matchers: RegExp[];
}

export const scraperConfig: { [key: string]: ScraperEntry } = {
  "cosmopolitan.co.kr": {
    constructor: CosmopolitanScraper,
    matchers: [/\/article\/\d+$/],
  },
  "dazedkorea.com": {
    constructor: DazedKoreaScraper,
    matchers: [/\/feature\/article\/\d+\/detail\.do$/],
  },
  "dispatch.co.kr": {
    constructor: DispatchScraper,
    matchers: [/\/\d+$/],
  },
  "elle.co.kr": {
    constructor: ElleScraper,
    matchers: [/\/article\/\d+$/],
  },
  "esquirekorea.co.kr": {
    constructor: EsquireScraper,
    matchers: [/\/article\/\d+$/],
  },
  "harpersbazaar.co.kr": {
    constructor: HarpersBazaarScraper,
    matchers: [/\/article\/\d+$/],
  },
  "isplus.com": {
    constructor: IlganSportsScraper,
    matchers: [/\/article\/view\/[a-zA-Z0-9]+$/],
  },
};
