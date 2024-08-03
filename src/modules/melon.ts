import * as cheerio from "cheerio";
import { TokkiBase } from "../base";

export class MelonScraper extends TokkiBase {
  constructor() {
    super("html");
  }

  async scrape(url: string) {
    const artistId = new URL(url).searchParams.get("artistId");
    const pagingUrl = `https://www.melon.com/artist/photoPaging.htm?startIndex=1&pageSize=1000000&orderBy=NEW&listType=0&artistId=${artistId}`;
    const { data, status } = await this.getData(pagingUrl);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    const $ = cheerio.load(data as string);
    const postTitle = $(".title_atist").text().trim();

    const mediaUrls = $("img")
      .map((_, el) =>
        $(el)
          .attr("src")
          ?.replace("1000.jpg", "org.jpg")
          .replace(
            "/melon/resize/148/quality/80/optimize",
            "/melon/quality/100/optimize",
          ),
      )
      .get();

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
