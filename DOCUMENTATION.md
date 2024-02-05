# Loading Documents

## `load`

Load a document from a HTML string.

```ts
import * as beerio from "beerio";

const $ = beerio.load("<html><head><title>Hello, world!</title></head></html>");

console.log($("title").text());
// Output: Hello, world!
```

> Beerio does not introduce any `<html>`, `<head>`, or `<body>` elements if they are not already present like cheerio.

## `fromFile`

Load a document from a local HTML file.

```ts
import * as beerio from "beerio";

const $ = await beerio.fromFile("index.html");

console.log($("h1").text());
// Output: Hello, world!
```

## `fromURL`

Load a document from a URL.

```ts
import * as beerio from "beerio";

const $ = await beerio.fromURL("https://example.com/");

console.log($("h1").text());
// Output: Example Domain
```



# Selecting Elements

```ts
import * as beerio from "beerio";

// Load the document using any of the methods described in the 'Loading Documents' section.
const $ = beerio.load("<html>...</html>");
```

- To select all the `<p>` elements in the document:

  ```ts
  const $p = $("p");
  // or, $.select("p")
  ```

  > The convention in Beerio is to prefix the variable name with a $ to indicate that it contains a Beerio object. This is not required, but it is a good practice to follow.

- Combining selectors:

  ```ts
  const $selected = $("p.selected");
  ```
  
- Check out [cloudflare's documentation](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#selectors) for more selectors.



# Manipulating the Document

## Modifying Element Attributes

```ts
// Set the 'src' attribute of an image element
$("img").attr("src", "https://example.com/image.jpg");

// Get the 'href' attribute of a link element
const href = $("a").attr("href");

// Set the 'data-apple-color' attribute of an image element
$("img").data("apple-color", "red");

// Get the 'data-apple-color' attribute of an image element
const color = $("img").data("apple-color");

// Removing the 'href' attribute of a link element
$("a").removeAttr("href");
```

## Adding and Removing Classes

```ts
// Add a class to an element
$("div").addClass("new-class");

// Add multiple classes to an element
$("div").addClass("new-class another-class");

// Remove a class from an element
$("div").removeClass("old-class");

// Remove multiple classes from an element
$("div").removeClass("old-class another-class");

// Toggle a class on an element (add if it doesn't exist, remove if it does)
$("div").toggleClass("active");

// Check if a class exists on an element
const is_present = $("div").hasClass("new-class");
```

## Modifying the Text Content of an Element

```ts
// Set the text content of an element
$("h1").text("Hello, World!");

// Get the text content of an element
const text = $("p").text();
```

## Modifying the HTML Content of an Element

```ts
// Set the inner HTML of an element
$("div").html("<p>Hello, World!</p>");
```

## Inserting New Elements

```ts
// Append an element to the end of a parent element
$("ul").append("<li>Item</li>");

// Prepend an element to the beginning of a parent element
$("ul").prepend("<li>Item</li>");

// Insert an element before a target element
$("li").before("<li>Item</li>");

// Insert an element after a target element
$("li").after("<li>Item</li>");
```

## Replacing Elements

```ts
// Replace an element with another element
$("li").replaceWith("<li>Item</li>");
```

## Removing Elements

```ts
// Remove an element's children from the document
$("li").empty();

// Remove an element from the document
$("li").remove();
```



# Render the document

Beerio doesn't actually render any HTML unlike cheerio because every manipulation overwrites the HTML string with the new one at the same time.

```ts
// Get the new HTML string after manipulation
$.html();
```

