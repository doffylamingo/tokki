import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class NaverPostScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const scriptData = $("#__clipContent").html()?.trim();
    const $$ = cheerio.load(scriptData!);
    const postTitle = $$("h3.se_textarea").text().trim();
    const mediaUrls = $$(".se_component .se_mediaImage")
      .map((_, el) => $$(el).attr("data-src"))
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
