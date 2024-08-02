import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "https://www.elle.co.kr";

export class ElleScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".tit_article").text().trim();
    const mediaUrls = $(".atc_body_cont img")
      .map((_, el) => BASE_URL + $(el).attr("src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
