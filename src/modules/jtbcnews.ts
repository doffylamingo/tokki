import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class JTBCNewsScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $("h3#jtbcBody").text().trim();
    const mediaUrls = $("#ijam_content img")
      .map((_, el) => $(el).attr("src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
