## Overview

Small utility layer that adds short aliases for common DOM, style, event, clipboard, and iteration operations.

It extends native prototypes to allow very compact code when working with elements, collections, and objects.

Example:

```js
$("#btn").CA("active").EC(() => alert("clicked"));
```

---

## Core Shortcuts

```js
const B = document.body;
const $ = (s, k = 0, d = document) =>
    d.querySelectorAll(s)[k];

const L = href =>
    window.location.href = "https://" + href;

const ON = document.addEventListener;
```

| Alias | Description |
|---|---|
| B | Shortcut for document.body |
| $(s, k, d) | querySelectorAll shortcut returning element at index k |
| L(href) | Redirect to https URL |
| ON | Alias for document.addEventListener |

Example:

```js
$(".item").CA("active");

L("example.com");

ON("keydown", e => console.log(e.key));
```

---

## Class Helpers

Aliases for`classList` methods with safety checks.
Invalid tokens (empty strings, spaces, etc.) are ignored.

| Alias | Original | Description |
|---|---|---|
| CA | classList.add | Add class |
| CR | classList.remove | Remove class |
| CT | classList.toggle | Toggle class |
| CC | classList.contains | Check class |

Example:

```js
$("#box").CA("visible");
$("#box").CR("hidden");

$("#box").CT("open");

if ($("#box").CC("active")) {
    console.log("active");
}
```

---

## Element Method Aliases

| Alias | Original | Description |
|---|---|---|
| EC | addEventListener("click") | Click event listener |
| A | setAttribute / getAttribute | Set or get attribute |
| R | remove | Remove element from DOM |

Example:

```js
$("#btn")
    .A("data-id", 5)
    .EC(() => console.log("clicked"));

const id = $("#btn").A("data-id");

$("#box").R();
```

---

## Node Methods

| Alias | Original | Description |
|---|---|---|
| AC | appendChild | Append child node |

Example:

```js
const div = document.createElement("div");

B.AC(div);
```

---

## Content Properties

Property aliases for common DOM content fields.

| Alias | Original |
|---|---|
| H | innerHTML |
| T | textContent |

Example:

```js
$("#title").T = "Hello";

$("#list").H = "<li>Item</li>";
```

---

## Style Properties

Short aliases for common inline style properties.

| Alias | CSS Property |
|---|---|
| ST | transform |
| SD | display |
| SO | opacity |
| SW | width |
| SH | height |

Example:

```js
$("#box").SD = "none";

$("#box").SO = "0.5";

$("#box").ST = "scale(1.2)";

$("#box").SW = "200px";
$("#box").SH = "100px";
```

---

## Collection Iteration

Adds a short`forEach` alias.

| Type | Alias |
|---|---|
| Array | F |
| NodeList | F |
| HTMLCollection | F |

Example:

```js
document.querySelectorAll(".item").F(el => {
    el.CA("active");
});
```

---

## Object Iteration

Utilities for iterating object keys or values.

| Alias | Description |
|---|---|
| FK | Iterate object keys |
| FO | Iterate object values |

Example:

```js
const obj = { a: 1, b: 2 };

obj.FK(key => console.log(key));

obj.FO(value => console.log(value));
```

---

## Global Helpers

| Alias | Description |
|---|---|
| CP(text) | Copy text to clipboard |
| ID(id) | Shortcut for getElementById |
| T(fn, ms, ...args) | setTimeout shortcut |

Example:

```js
CP("hello");

ID("box").CA("active");

T(() => console.log("later"), 1000);
```

---

## Example

```js
$("#btn")
    .CA("ready")
    .EC(() => {
        $("#box").CT("open");
        CP("clicked!");
    });
```
