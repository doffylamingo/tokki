import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class ImbcNewsScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".title").text().trim();
    const mediaUrls = $(".ent-cont img")
      .map((_, el) => "https:" + $(el).attr("src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
