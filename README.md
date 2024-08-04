# tokki

Tokki is a multi-platform scraper written in TypeScript for extracting media from various Korean websites. Inspired by [krsite-dl](https://github.com/krsite-dl/krsite-dl)

## Installation

Install the library:

```bash
npm install @doffylamingo/tokki
```

```bash
yarn add @doffylamingo/tokki
```

```bash
pnpm add @doffylamingo/tokki
```

## Usage/Examples

```javascript
import { scrape } from "@doffylamingo/tokki";

const url = "https://www.melon.com/artist/photo.htm?artistId=2398653";

scrape(url).then((data) => {
  console.log(data);
});
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve the library.

## License

This project is licensed under the GPLv2 License.
