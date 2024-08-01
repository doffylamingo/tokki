import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class DispatchScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".page-post-title").text().trim();
    const mediaUrls = $("img.post-image")
      .map((_, el) => {
        const dataSrc = $(el).attr("data-src");
        const src = $(el).attr("src");

        return dataSrc || src;
      })
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
    };
  }
}
