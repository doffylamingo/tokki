import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "https://cosmopolitan.co.kr";

export class CosmopolitanScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $("h2.tit_article").text().trim();
    const mediaUrls = $("div.atc_body_cont img")
      .map((_, el) => `${BASE_URL}${$(el).attr("src")}`)
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
