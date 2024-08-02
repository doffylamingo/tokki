import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

const BASE_URL = "https://isplus.com";

export class IlganSportsScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $("#viewTitle").text().trim();
    const mediaUrls = $("#article_body img")
      .map((_, el) => BASE_URL + $(el).attr("src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
