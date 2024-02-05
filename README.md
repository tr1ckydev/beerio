# beerio
Blazingly faster alternative to [cheerio](https://cheerio.js.org/).

*Supported only on Bun runtime and cloudflare.*

### For a simple benchmark, beerio performs **2.6x faster** than cheerio.

```ts
const $ = beerio.load(`<h2 class="title">Hello world</h2>`);
$("h2.title").text("hello");
$.html();
```

The above code was benchmarked in mitata for both the libraries.

```
cpu: 12th Gen Intel(R) Core(TM) i7-12700H
runtime: bun 1.0.26 (x64-linux)

benchmark      time (avg)             (min … max)
-------------------------------------------------
beerio      4,090 ns/iter   (3,653 ns … 6,347 ns)
cheerio     10.69 µs/iter   (7,683 ns … 1,866 µs)
```

- ### How is beerio so fast?

  Beerio is a custom implementation of cheerio APIs by using underlying native HTMLRewriter to directly parse and manipulate the document quickly skipping both DOM parsing and rendering them back to HTML.

- ### Is beerio a drop-in replacement for cheerio?

  Yes, but partially. Beerio is an alternative and does not strive to be a full drop-in replacement. Although Beerio APIs are kept consistent and similar to cheerio's but as there is no full DOM parsing, beerio is able to implement only a small portion of cheerio APIs.

### Check out the full documentation [here](https://github.com/tr1ckydev/beerio/blob/main/DOCUMENTATION.md).



## License

This repository uses MIT License. See [LICENSE](https://github.com/tr1ckydev/beerio/blob/main/LICENSE) for full license text.
