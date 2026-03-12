const B = document.body;
const $ = (s, k, d) => (d || document).querySelectorAll(s)[k || 0];
const L = href => window.location.href = 'https://' + href;
const ON = document.addEventListener;

(() => {
    const def = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            value,
            writable: true,
            configurable: true,
            enumerable: false
        });
    };

    const defProp = (obj, key, getter, setter) => {
        Object.defineProperty(obj, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: false
        });
    };

    const isValidClassToken = (v) =>
        typeof v === "string" && v.trim() !== "" && !/\s/.test(v);

    const normalizeClassTokens = (args) =>
        args.filter(isValidClassToken);

    const safeClassList = function (method, ...args) {
        if (!this || !this.classList || typeof this.classList[method] !== "function") {
            return method === "contains" ? false : this;
        }

        if (method === "contains") {
            const token = args[0];
            if (!isValidClassToken(token)) return false;
            return this.classList.contains(token);
        }

        if (method === "toggle") {
            const token = args[0];
            const force = args[1];
            if (!isValidClassToken(token)) return false;
            if (typeof force === "boolean") {
                return this.classList.toggle(token, force);
            }
            return this.classList.toggle(token);
        }

        const tokens = normalizeClassTokens(args);
        if (!tokens.length) return this;

        this.classList[method](...tokens);
        return this;
    };

    const classAliases = {
        CA: "add",
        CR: "remove",
        CT: "toggle",
        CC: "contains"
    };

    for (const [alias, method] of Object.entries(classAliases)) {
        def(Element.prototype, alias, function (...args) {
            return safeClassList.call(this, method, ...args);
        });
    }

    const elementMethodAliases = {
        EC: function (handler, options) {
            if (typeof handler !== "function") return this;
            this.addEventListener("click", handler, options);
            return this;
        },
        A: function (name, value) {
            if (!this || typeof this.setAttribute !== "function") return false;
            if (typeof name !== "string" || name.trim() === "") return false;
            if (typeof value !== "undefined") {
                this.setAttribute(name, value);
            }
            return this.getAttribute(name);
        },
        R: function () {
            if (!this) return null;
            if (typeof this.remove === "function") {
                this.remove();
                return this;
            }
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
            return this;
        }
    };

    for (const [alias, fn] of Object.entries(elementMethodAliases)) {
        def(Element.prototype, alias, fn);
    }

    def(Node.prototype, "AC", function (child) {
        if (!this || typeof this.appendChild !== "function") return this;
        if (!(child instanceof Node)) return this;
        this.appendChild(child);
        return this;
    });

    const contentProps = {
        H: "innerHTML",
        T: "textContent"
    };

    for (const [alias, prop] of Object.entries(contentProps)) {
        defProp(
            Element.prototype,
            alias,
            function () {
                return this?.[prop];
            },
            function (v) {
                if (!this) return;
                this[prop] = v;
            }
        );
    }

    const styleProps = {
        ST: "transform",
        SD: "display",
        SO: "opacity",
        SW: "width",
        SH: "height"
    };

    for (const [alias, styleKey] of Object.entries(styleProps)) {
        defProp(
            Element.prototype,
            alias,
            function () {
                return this?.style?.[styleKey];
            },
            function (v) {
                if (!this || !this.style) return;
                this.style[styleKey] = v;
            }
        );
    }

    def(Array.prototype, "F", function (cb, thisArg) {
        if (typeof cb !== "function") return this;
        this.forEach(cb, thisArg);
        return this;
    });

    if (typeof NodeList !== "undefined") {
        def(NodeList.prototype, "F", function (cb, thisArg) {
            if (typeof cb !== "function") return this;
            this.forEach(cb, thisArg);
            return this;
        });
    }

    if (typeof HTMLCollection !== "undefined") {
        def(HTMLCollection.prototype, "F", function (cb, thisArg) {
            if (typeof cb !== "function") return this;
            Array.prototype.forEach.call(this, cb, thisArg);
            return this;
        });
    }

    def(Object.prototype, "FK", function (cb, thisArg) {
        if (typeof cb !== "function") return this;
        Object.keys(this).forEach(cb, thisArg);
        return this;
    });

    def(Object.prototype, "FO", function (cb, thisArg) {
        if (typeof cb !== "function") return this;
        Object.values(this).forEach(cb, thisArg);
        return this;
    });

    const globalAliases = {
        CP: (text) => {
            if (!navigator?.clipboard?.writeText) {
                return Promise.reject(new Error("!Clipboard"));
            }
            return navigator.clipboard.writeText(String(text ?? ""));
        },
        ID: (id) => document.getElementById(id),
        T: (fn, ms, ...args) =>
            setTimeout(typeof fn === "function" ? fn : () => { }, ms, ...args)
    };

    for (const [name, fn] of Object.entries(globalAliases)) {
        def(globalThis, name, fn);
    }
})();
