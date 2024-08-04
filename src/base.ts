import ky from "ky";
import { ScraperType } from "./types";

export class TokkiBase {
  protected type: ScraperType;

  constructor(type: ScraperType) {
    this.type = type;
  }

  protected async getData<T>(
    url: string,
  ): Promise<{ status: number; data: string | T }> {
    try {
      const response = await ky.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        retry: {
          limit: 2,
          methods: ["get"],
          backoffLimit: 3000,
        },
      });

      return this.type === "html"
        ? { status: response.status, data: await response.text() }
        : { status: response.status, data: await response.json() };
    } catch (_) {
      return { status: 500, data: "Error fetching data" };
    }
  }
}
