import { CosmopolitanScraper } from "./modules/cosmopolitan";
import { DazedKoreaScraper } from "./modules/dazedkorea";
import { DispatchScraper } from "./modules/dispatch";
import { ElleScraper } from "./modules/elle";
import { EsquireScraper } from "./modules/esquire";
import { HarpersBazaarScraper } from "./modules/harpersbazaar";
import { IlganSportsScraper } from "./modules/ilgansports";
import { IMBCNewsScraper } from "./modules/imbcnews";
import { JTBCNewsScraper } from "./modules/jtbcnews";
import { KoreanVibeScraper } from "./modules/koreanvibe";
import { LOfficielScraper } from "./modules/lofficiel";
import { MBCScraper } from "./modules/mbc";
import { MelonScraper } from "./modules/melon";
import { NaverPostScraper } from "./modules/naverpost";
import { News1craper } from "./modules/news1";
// import { NewsenScraper } from "./modules/newsen";
import { NewsJammScraper } from "./modules/newsjamm";
import { OsenScraper } from "./modules/osen";
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
  "enews.imbc.com": {
    constructor: IMBCNewsScraper,
    matchers: [/\/News\/RetrieveNewsInfo\/\d+$/],
  },
  "news.jtbc.co.kr": {
    constructor: JTBCNewsScraper,
    matchers: [/\/article\/article\.aspx\?news_id=[a-zA-Z0-9]+$/],
  },
  "korean-vibe.com": {
    constructor: KoreanVibeScraper,
    matchers: [/\/news\/newsview\.php\?ncode=\d+$/],
  },
  "lofficielkorea.com": {
    constructor: LOfficielScraper,
    matchers: [/\/fashion|people|beauty|jewelry-and-watch\/[a-zA-Z0-9-]+$/],
  },
  "lofficielsingapore.com": {
    constructor: LOfficielScraper,
    matchers: [
      /\/fashion|people|beauty|jewellery|style|culture\/[a-zA-Z0-9-]+$/,
    ],
  },
  "with.mbc.co.kr": {
    constructor: MBCScraper,
    matchers: [
      /\/m\/pr\/photo\/view\.html\?idx=\d+&page=(\d?)+&keyword=([a-zA-Z0-9-]?)+$/,
    ],
  },
  "melon.com": {
    constructor: MelonScraper,
    matchers: [/\/artist\/photo\.htm\?artistId=\d+$/],
  },
  "post.naver.com": {
    constructor: NaverPostScraper,
    matchers: [/\/viewer\/postView\.naver\?volumeNo=\d+&memberNo=\d+$/],
  },
  "newsjamm.co.kr": {
    constructor: NewsJammScraper,
    matchers: [/\/contents\/[a-zA-Z0-9]+$/],
  },
  "news1.kr": {
    constructor: News1craper,
    matchers: [/./],
  },
  "osen.co.kr": {
    constructor: OsenScraper,
    matchers: [/\/article\/[a-zA-Z0-9-]+$/, /\/photo\/slide\/\d+/],
  },
  // Won't work because of certificate error
  // "newsen.com": {
  //   constructor: NewsenScraper,
  //   matchers: [/\/news_view\.php\?uid=\d+/],
  // },
};
