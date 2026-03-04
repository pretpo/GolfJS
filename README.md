## Overview

Small utility layer that adds short aliases for common DOM, style, event, and iteration operations.
It extends native prototypes to allow compact code when working with elements and collections.

Example:

```js
$("#btn").CA("active").EC(() => alert("clicked"));
```

---

## Quick Selectors

```js
const B = document.body;
const $ = (selector, index = 0, root = document) =>
    root.querySelectorAll(selector)[index];
```

| Alias | Description |
|---|---|
| B | Shortcut for document.body |
| $(s, k, d) | querySelectorAll shortcut. Returns element at index k (default 0) |

Example:

```js
$(".item").CA("active");
```

---

## Class Helpers

Aliases for`classList` methods with validation.

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
$("#box").CC("active");
```

---

## Element Method Aliases

| Alias | Original | Description |
|---|---|---|
| EC | addEventListener("click") | Click event listener |
| A | setAttribute | Set attribute |
| R | remove | Remove element |

Example:

```js
$("#btn")
    .A("data-id", 5)
    .EC(() => console.log("clicked"));

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
$(".item", 0).parentNode.children.F(el => {
    el.CA("active");
});
```

---

## Object Iteration

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
| ID(id) | getElementById shortcut |
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
