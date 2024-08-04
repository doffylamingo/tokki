import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class NewsenScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  extractVideoId(url: string): string | null {
    const regex = /\/embed\/([^?]+)/;
    const match = url.match(regex);

    return match ? match[1]! : null;
  }

  async scrape(url: string) {
    const { data, status } = await this.getData(url);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".art_title").text().trim();
    const mediaUrls = $("#artImg")
      .map((_, el) => "https:" + $(el).attr("src"))
      .get();

    const iframe = $(".center_vod iframe").attr("src");
    const videoSrc = iframe
      ? "https://youtube.com/watch?v=" + this.extractVideoId(iframe)
      : "";

    return {
      source: url,
      title: postTitle,
      video: videoSrc,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
