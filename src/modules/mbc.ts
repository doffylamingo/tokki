import { TokkiBase } from "../base";

interface List {
  title: string;
  photo_fullpath: string;
}

interface MBCResponse {
  total_cnt: number;
  page_cnt: number;
  list: List[];
}

export class MBCScraper extends TokkiBase {
  constructor() {
    super("json");
  }

  async scrape(url: string) {
    const idx = url.split("idx=")[1]!.split("&")[0];
    const mbcApiRequest = `https://mbcinfo.imbc.com/api/photo/m_info?intIdx=${idx}`;
    const { data, status } = await this.getData<MBCResponse>(mbcApiRequest);

    if (status !== 200) {
      return { error: "Failed to fetch data from the URL" };
    }

    if (typeof data === "string") {
      return { error: "Failed to parse data" };
    }

    const postTitle = data.list[0]?.title;
    const mediaUrls = data.list.map(
      (item) => "https://mbcinfo.imbc.com/data/" + item.photo_fullpath,
    );

    return {
      source: url,
      title: postTitle,
      media: mediaUrls,
      count: mediaUrls.length,
    };
  }
}
