try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const Cn = (t, ...e) => {
  let n = t;
  return e.length > 0 && (n += ` :: ${JSON.stringify(e)}`), n;
}, kn = Cn;
class h extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, n) {
    const r = kn(e, n);
    super(r), this.name = e, this.details = n;
  }
}
const w = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, te = (t) => [w.prefix, t, w.suffix].filter((e) => e && e.length > 0).join("-"), Dn = (t) => {
  for (const e of Object.keys(w))
    t(e);
}, Be = {
  updateDetails: (t) => {
    Dn((e) => {
      typeof t[e] == "string" && (w[e] = t[e]);
    });
  },
  getGoogleAnalyticsName: (t) => t || te(w.googleAnalytics),
  getPrecacheName: (t) => t || te(w.precache),
  getPrefix: () => w.prefix,
  getRuntimeName: (t) => t || te(w.runtime),
  getSuffix: () => w.suffix
};
function rt(t, e) {
  const n = e();
  return t.waitUntil(n), n;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const An = "__WB_REVISION__";
function Rn(t) {
  if (!t)
    throw new h("add-to-cache-list-unexpected-type", { entry: t });
  if (typeof t == "string") {
    const s = new URL(t, location.href);
    return {
      cacheKey: s.href,
      url: s.href
    };
  }
  const { revision: e, url: n } = t;
  if (!n)
    throw new h("add-to-cache-list-unexpected-type", { entry: t });
  if (!e) {
    const s = new URL(n, location.href);
    return {
      cacheKey: s.href,
      url: s.href
    };
  }
  const r = new URL(n, location.href), o = new URL(n, location.href);
  return r.searchParams.set(An, e), {
    cacheKey: r.href,
    url: o.href
  };
}
class On {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: n }) => {
      n && (n.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: n, cachedResponse: r }) => {
      if (e.type === "install" && n && n.originalRequest && n.originalRequest instanceof Request) {
        const o = n.originalRequest.url;
        r ? this.notUpdatedURLs.push(o) : this.updatedURLs.push(o);
      }
      return r;
    };
  }
}
class Mn {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: n, params: r }) => {
      const o = (r == null ? void 0 : r.cacheKey) || this._precacheController.getCacheKeyForURL(n.url);
      return o ? new Request(o, { headers: n.headers }) : n;
    }, this._precacheController = e;
  }
}
let j;
function Nn() {
  if (j === void 0) {
    const t = new Response("");
    if ("body" in t)
      try {
        new Response(t.body), j = !0;
      } catch {
        j = !1;
      }
    j = !1;
  }
  return j;
}
async function $n(t, e) {
  let n = null;
  if (t.url && (n = new URL(t.url).origin), n !== self.location.origin)
    throw new h("cross-origin-copy-response", { origin: n });
  const r = t.clone(), o = {
    headers: new Headers(r.headers),
    status: r.status,
    statusText: r.statusText
  }, s = e ? e(o) : o, i = Nn() ? r.body : await r.blob();
  return new Response(i, s);
}
const Bn = (t) => new URL(String(t), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function ot(t, e) {
  const n = new URL(t);
  for (const r of e)
    n.searchParams.delete(r);
  return n.href;
}
async function Ln(t, e, n, r) {
  const o = ot(e.url, n);
  if (e.url === o)
    return t.match(e, r);
  const s = Object.assign(Object.assign({}, r), { ignoreSearch: !0 }), i = await t.keys(e, s);
  for (const a of i) {
    const c = ot(a.url, n);
    if (o === c)
      return t.match(a, r);
  }
}
let Pn = class {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    });
  }
};
const xn = /* @__PURE__ */ new Set();
async function jn() {
  for (const t of xn)
    await t();
}
function Kn(t) {
  return new Promise((e) => setTimeout(e, t));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function q(t) {
  return typeof t == "string" ? new Request(t) : t;
}
class Fn {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, n) {
    this._cacheKeys = {}, Object.assign(this, n), this.event = n.event, this._strategy = e, this._handlerDeferred = new Pn(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const r of this._plugins)
      this._pluginStateMap.set(r, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: n } = this;
    let r = q(e);
    if (r.mode === "navigate" && n instanceof FetchEvent && n.preloadResponse) {
      const i = await n.preloadResponse;
      if (i)
        return i;
    }
    const o = this.hasCallback("fetchDidFail") ? r.clone() : null;
    try {
      for (const i of this.iterateCallbacks("requestWillFetch"))
        r = await i({ request: r.clone(), event: n });
    } catch (i) {
      if (i instanceof Error)
        throw new h("plugin-error-request-will-fetch", {
          thrownErrorMessage: i.message
        });
    }
    const s = r.clone();
    try {
      let i;
      i = await fetch(r, r.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const a of this.iterateCallbacks("fetchDidSucceed"))
        i = await a({
          event: n,
          request: s,
          response: i
        });
      return i;
    } catch (i) {
      throw o && await this.runCallbacks("fetchDidFail", {
        error: i,
        event: n,
        originalRequest: o.clone(),
        request: s.clone()
      }), i;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const n = await this.fetch(e), r = n.clone();
    return this.waitUntil(this.cachePut(e, r)), n;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const n = q(e);
    let r;
    const { cacheName: o, matchOptions: s } = this._strategy, i = await this.getCacheKey(n, "read"), a = Object.assign(Object.assign({}, s), { cacheName: o });
    r = await caches.match(i, a);
    for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
      r = await c({
        cacheName: o,
        matchOptions: s,
        cachedResponse: r,
        request: i,
        event: this.event
      }) || void 0;
    return r;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, n) {
    const r = q(e);
    await Kn(0);
    const o = await this.getCacheKey(r, "write");
    if (!n)
      throw new h("cache-put-with-no-response", {
        url: Bn(o.url)
      });
    const s = await this._ensureResponseSafeToCache(n);
    if (!s)
      return !1;
    const { cacheName: i, matchOptions: a } = this._strategy, c = await self.caches.open(i), l = this.hasCallback("cacheDidUpdate"), u = l ? await Ln(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      c,
      o.clone(),
      ["__WB_REVISION__"],
      a
    ) : null;
    try {
      await c.put(o, l ? s.clone() : s);
    } catch (f) {
      if (f instanceof Error)
        throw f.name === "QuotaExceededError" && await jn(), f;
    }
    for (const f of this.iterateCallbacks("cacheDidUpdate"))
      await f({
        cacheName: i,
        oldResponse: u,
        newResponse: s.clone(),
        request: o,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, n) {
    const r = `${e.url} | ${n}`;
    if (!this._cacheKeys[r]) {
      let o = e;
      for (const s of this.iterateCallbacks("cacheKeyWillBeUsed"))
        o = q(await s({
          mode: n,
          request: o,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[r] = o;
    }
    return this._cacheKeys[r];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const n of this._strategy.plugins)
      if (e in n)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, n) {
    for (const r of this.iterateCallbacks(e))
      await r(n);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const n of this._strategy.plugins)
      if (typeof n[e] == "function") {
        const r = this._pluginStateMap.get(n);
        yield (s) => {
          const i = Object.assign(Object.assign({}, s), { state: r });
          return n[e](i);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let n = e, r = !1;
    for (const o of this.iterateCallbacks("cacheWillUpdate"))
      if (n = await o({
        request: this.request,
        response: n,
        event: this.event
      }) || void 0, r = !0, !n)
        break;
    return r || n && n.status !== 200 && (n = void 0), n;
  }
}
class Un {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = Be.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [n] = this.handleAll(e);
    return n;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const n = e.event, r = typeof e.request == "string" ? new Request(e.request) : e.request, o = "params" in e ? e.params : void 0, s = new Fn(this, { event: n, request: r, params: o }), i = this._getResponse(s, r, n), a = this._awaitComplete(i, s, r, n);
    return [i, a];
  }
  async _getResponse(e, n, r) {
    await e.runCallbacks("handlerWillStart", { event: r, request: n });
    let o;
    try {
      if (o = await this._handle(n, e), !o || o.type === "error")
        throw new h("no-response", { url: n.url });
    } catch (s) {
      if (s instanceof Error) {
        for (const i of e.iterateCallbacks("handlerDidError"))
          if (o = await i({ error: s, event: r, request: n }), o)
            break;
      }
      if (!o)
        throw s;
    }
    for (const s of e.iterateCallbacks("handlerWillRespond"))
      o = await s({ event: r, request: n, response: o });
    return o;
  }
  async _awaitComplete(e, n, r, o) {
    let s, i;
    try {
      s = await e;
    } catch {
    }
    try {
      await n.runCallbacks("handlerDidRespond", {
        event: o,
        request: r,
        response: s
      }), await n.doneWaiting();
    } catch (a) {
      a instanceof Error && (i = a);
    }
    if (await n.runCallbacks("handlerDidComplete", {
      event: o,
      request: r,
      response: s,
      error: i
    }), n.destroy(), i)
      throw i;
  }
}
class v extends Un {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = Be.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(v.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, n) {
    const r = await n.cacheMatch(e);
    return r || (n.event && n.event.type === "install" ? await this._handleInstall(e, n) : await this._handleFetch(e, n));
  }
  async _handleFetch(e, n) {
    let r;
    const o = n.params || {};
    if (this._fallbackToNetwork) {
      const s = o.integrity, i = e.integrity, a = !i || i === s;
      r = await n.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? i || s : void 0
      })), s && a && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await n.cachePut(e, r.clone()));
    } else
      throw new h("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return r;
  }
  async _handleInstall(e, n) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const r = await n.fetch(e);
    if (!await n.cachePut(e, r.clone()))
      throw new h("bad-precaching-response", {
        url: e.url,
        status: r.status
      });
    return r;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, n = 0;
    for (const [r, o] of this.plugins.entries())
      o !== v.copyRedirectedCacheableResponsesPlugin && (o === v.defaultPrecacheCacheabilityPlugin && (e = r), o.cacheWillUpdate && n++);
    n === 0 ? this.plugins.push(v.defaultPrecacheCacheabilityPlugin) : n > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
v.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: t }) {
    return !t || t.status >= 400 ? null : t;
  }
};
v.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: t }) {
    return t.redirected ? await $n(t) : t;
  }
};
class Hn {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: n = [], fallbackToNetwork: r = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new v({
      cacheName: Be.getPrecacheName(e),
      plugins: [
        ...n,
        new Mn({ precacheController: this })
      ],
      fallbackToNetwork: r
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const n = [];
    for (const r of e) {
      typeof r == "string" ? n.push(r) : r && r.revision === void 0 && n.push(r.url);
      const { cacheKey: o, url: s } = Rn(r), i = typeof r != "string" && r.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(s) && this._urlsToCacheKeys.get(s) !== o)
        throw new h("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(s),
          secondEntry: o
        });
      if (typeof r != "string" && r.integrity) {
        if (this._cacheKeysToIntegrities.has(o) && this._cacheKeysToIntegrities.get(o) !== r.integrity)
          throw new h("add-to-cache-list-conflicting-integrities", {
            url: s
          });
        this._cacheKeysToIntegrities.set(o, r.integrity);
      }
      if (this._urlsToCacheKeys.set(s, o), this._urlsToCacheModes.set(s, i), n.length > 0) {
        const a = `Workbox is precaching URLs without revision info: ${n.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(a);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return rt(e, async () => {
      const n = new On();
      this.strategy.plugins.push(n);
      for (const [s, i] of this._urlsToCacheKeys) {
        const a = this._cacheKeysToIntegrities.get(i), c = this._urlsToCacheModes.get(s), l = new Request(s, {
          integrity: a,
          cache: c,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: i },
          request: l,
          event: e
        }));
      }
      const { updatedURLs: r, notUpdatedURLs: o } = n;
      return { updatedURLs: r, notUpdatedURLs: o };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return rt(e, async () => {
      const n = await self.caches.open(this.strategy.cacheName), r = await n.keys(), o = new Set(this._urlsToCacheKeys.values()), s = [];
      for (const i of r)
        o.has(i.url) || (await n.delete(i), s.push(i.url));
      return { deletedURLs: s };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const n = new URL(e, location.href);
    return this._urlsToCacheKeys.get(n.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const n = e instanceof Request ? e.url : e, r = this.getCacheKeyForURL(n);
    if (r)
      return (await self.caches.open(this.strategy.cacheName)).match(r);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const n = this.getCacheKeyForURL(e);
    if (!n)
      throw new h("non-precached-url", { url: e });
    return (r) => (r.request = new Request(e), r.params = Object.assign({ cacheKey: n }, r.params), this.strategy.handle(r));
  }
}
let ne;
const Le = () => (ne || (ne = new Hn()), ne);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const At = "GET", G = (t) => t && typeof t == "object" ? t : { handle: t };
class F {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, n, r = At) {
    this.handler = G(n), this.match = e, this.method = r;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = G(e);
  }
}
class Wn extends F {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, n, r) {
    const o = ({ url: s }) => {
      const i = e.exec(s.href);
      if (i && !(s.origin !== location.origin && i.index !== 0))
        return i.slice(1);
    };
    super(o, n, r);
  }
}
class Vn {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: n } = e, r = this.handleRequest({ request: n, event: e });
      r && e.respondWith(r);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: n } = e.data, r = Promise.all(n.urlsToCache.map((o) => {
          typeof o == "string" && (o = [o]);
          const s = new Request(...o);
          return this.handleRequest({ request: s, event: e });
        }));
        e.waitUntil(r), e.ports && e.ports[0] && r.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: n }) {
    const r = new URL(e.url, location.href);
    if (!r.protocol.startsWith("http"))
      return;
    const o = r.origin === location.origin, { params: s, route: i } = this.findMatchingRoute({
      event: n,
      request: e,
      sameOrigin: o,
      url: r
    });
    let a = i && i.handler;
    const c = e.method;
    if (!a && this._defaultHandlerMap.has(c) && (a = this._defaultHandlerMap.get(c)), !a)
      return;
    let l;
    try {
      l = a.handle({ url: r, request: e, event: n, params: s });
    } catch (f) {
      l = Promise.reject(f);
    }
    const u = i && i.catchHandler;
    return l instanceof Promise && (this._catchHandler || u) && (l = l.catch(async (f) => {
      if (u)
        try {
          return await u.handle({ url: r, request: e, event: n, params: s });
        } catch (A) {
          A instanceof Error && (f = A);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: r, request: e, event: n });
      throw f;
    })), l;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: n, request: r, event: o }) {
    const s = this._routes.get(r.method) || [];
    for (const i of s) {
      let a;
      const c = i.match({ url: e, sameOrigin: n, request: r, event: o });
      if (c)
        return a = c, (Array.isArray(a) && a.length === 0 || c.constructor === Object && // eslint-disable-line
        Object.keys(c).length === 0 || typeof c == "boolean") && (a = void 0), { route: i, params: a };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, n = At) {
    this._defaultHandlerMap.set(n, G(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = G(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new h("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const n = this._routes.get(e.method).indexOf(e);
    if (n > -1)
      this._routes.get(e.method).splice(n, 1);
    else
      throw new h("unregister-route-route-not-registered");
  }
}
let K;
const qn = () => (K || (K = new Vn(), K.addFetchListener(), K.addCacheListener()), K);
function Rt(t, e, n) {
  let r;
  if (typeof t == "string") {
    const s = new URL(t, location.href), i = ({ url: a }) => a.href === s.href;
    r = new F(i, e, n);
  } else if (t instanceof RegExp)
    r = new Wn(t, e, n);
  else if (typeof t == "function")
    r = new F(t, e, n);
  else if (t instanceof F)
    r = t;
  else
    throw new h("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return qn().registerRoute(r), r;
}
function Gn(t, e = []) {
  for (const n of [...t.searchParams.keys()])
    e.some((r) => r.test(n)) && t.searchParams.delete(n);
  return t;
}
function* zn(t, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: n = "index.html", cleanURLs: r = !0, urlManipulation: o } = {}) {
  const s = new URL(t, location.href);
  s.hash = "", yield s.href;
  const i = Gn(s, e);
  if (yield i.href, n && i.pathname.endsWith("/")) {
    const a = new URL(i.href);
    a.pathname += n, yield a.href;
  }
  if (r) {
    const a = new URL(i.href);
    a.pathname += ".html", yield a.href;
  }
  if (o) {
    const a = o({ url: s });
    for (const c of a)
      yield c.href;
  }
}
class Jn extends F {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, n) {
    const r = ({ request: o }) => {
      const s = e.getURLsToCacheKeys();
      for (const i of zn(o.url, n)) {
        const a = s.get(i);
        if (a) {
          const c = e.getIntegrityForCacheKey(a);
          return { cacheKey: a, integrity: c };
        }
      }
    };
    super(r, e.strategy);
  }
}
function Yn(t) {
  const e = Le(), n = new Jn(e, t);
  Rt(n);
}
function Xn(t) {
  return Le().createHandlerBoundToURL(t);
}
function Qn(t) {
  Le().precache(t);
}
function Zn(t, e) {
  Qn(t), Yn(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ot = function(t) {
  const e = [];
  let n = 0;
  for (let r = 0; r < t.length; r++) {
    let o = t.charCodeAt(r);
    o < 128 ? e[n++] = o : o < 2048 ? (e[n++] = o >> 6 | 192, e[n++] = o & 63 | 128) : (o & 64512) === 55296 && r + 1 < t.length && (t.charCodeAt(r + 1) & 64512) === 56320 ? (o = 65536 + ((o & 1023) << 10) + (t.charCodeAt(++r) & 1023), e[n++] = o >> 18 | 240, e[n++] = o >> 12 & 63 | 128, e[n++] = o >> 6 & 63 | 128, e[n++] = o & 63 | 128) : (e[n++] = o >> 12 | 224, e[n++] = o >> 6 & 63 | 128, e[n++] = o & 63 | 128);
  }
  return e;
}, er = function(t) {
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; ) {
    const o = t[n++];
    if (o < 128)
      e[r++] = String.fromCharCode(o);
    else if (o > 191 && o < 224) {
      const s = t[n++];
      e[r++] = String.fromCharCode((o & 31) << 6 | s & 63);
    } else if (o > 239 && o < 365) {
      const s = t[n++], i = t[n++], a = t[n++], c = ((o & 7) << 18 | (s & 63) << 12 | (i & 63) << 6 | a & 63) - 65536;
      e[r++] = String.fromCharCode(55296 + (c >> 10)), e[r++] = String.fromCharCode(56320 + (c & 1023));
    } else {
      const s = t[n++], i = t[n++];
      e[r++] = String.fromCharCode((o & 15) << 12 | (s & 63) << 6 | i & 63);
    }
  }
  return e.join("");
}, Mt = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob == "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(t, e) {
    if (!Array.isArray(t))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
    for (let o = 0; o < t.length; o += 3) {
      const s = t[o], i = o + 1 < t.length, a = i ? t[o + 1] : 0, c = o + 2 < t.length, l = c ? t[o + 2] : 0, u = s >> 2, f = (s & 3) << 4 | a >> 4;
      let A = (a & 15) << 2 | l >> 6, V = l & 63;
      c || (V = 64, i || (A = 64)), r.push(n[u], n[f], n[A], n[V]);
    }
    return r.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(t, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(Ot(t), e);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(t, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : er(this.decodeStringToByteArray(t, e));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(t, e) {
    this.init_();
    const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
    for (let o = 0; o < t.length; ) {
      const s = n[t.charAt(o++)], a = o < t.length ? n[t.charAt(o)] : 0;
      ++o;
      const l = o < t.length ? n[t.charAt(o)] : 64;
      ++o;
      const f = o < t.length ? n[t.charAt(o)] : 64;
      if (++o, s == null || a == null || l == null || f == null)
        throw new tr();
      const A = s << 2 | a >> 4;
      if (r.push(A), l !== 64) {
        const V = a << 4 & 240 | l >> 2;
        if (r.push(V), f !== 64) {
          const Tn = l << 6 & 192 | f;
          r.push(Tn);
        }
      }
    }
    return r;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
      for (let t = 0; t < this.ENCODED_VALS.length; t++)
        this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t), this.charToByteMap_[this.byteToCharMap_[t]] = t, this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t);
    }
  }
};
class tr extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const nr = function(t) {
  const e = Ot(t);
  return Mt.encodeByteArray(e, !0);
}, Nt = function(t) {
  return nr(t).replace(/\./g, "");
}, rr = function(t) {
  try {
    return Mt.decodeString(t, !0);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function or() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const sr = () => or().__FIREBASE_DEFAULTS__, ir = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const t = process.env.__FIREBASE_DEFAULTS__;
  if (t)
    return JSON.parse(t);
}, ar = () => {
  if (typeof document > "u")
    return;
  let t;
  try {
    t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = t && rr(t[1]);
  return e && JSON.parse(e);
}, cr = () => {
  try {
    return sr() || ir() || ar();
  } catch (t) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);
    return;
  }
}, $t = () => {
  var t;
  return (t = cr()) === null || t === void 0 ? void 0 : t.config;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ur {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((e, n) => {
      this.resolve = e, this.reject = n;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(e) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(n) : e(n, r));
    };
  }
}
function Bt() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function Lt() {
  return new Promise((t, e) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module", o = self.indexedDB.open(r);
      o.onsuccess = () => {
        o.result.close(), n || self.indexedDB.deleteDatabase(r), t(!0);
      }, o.onupgradeneeded = () => {
        n = !1;
      }, o.onerror = () => {
        var s;
        e(((s = o.error) === null || s === void 0 ? void 0 : s.message) || "");
      };
    } catch (n) {
      e(n);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const lr = "FirebaseError";
class x extends Error {
  constructor(e, n, r) {
    super(n), this.code = e, this.customData = r, this.name = lr, Object.setPrototypeOf(this, x.prototype), Error.captureStackTrace && Error.captureStackTrace(this, W.prototype.create);
  }
}
class W {
  constructor(e, n, r) {
    this.service = e, this.serviceName = n, this.errors = r;
  }
  create(e, ...n) {
    const r = n[0] || {}, o = `${this.service}/${e}`, s = this.errors[e], i = s ? dr(s, r) : "Error", a = `${this.serviceName}: ${i} (${o}).`;
    return new x(o, a, r);
  }
}
function dr(t, e) {
  return t.replace(fr, (n, r) => {
    const o = e[r];
    return o != null ? String(o) : `<${r}?>`;
  });
}
const fr = /\{\$([^}]+)}/g;
function Ee(t, e) {
  if (t === e)
    return !0;
  const n = Object.keys(t), r = Object.keys(e);
  for (const o of n) {
    if (!r.includes(o))
      return !1;
    const s = t[o], i = e[o];
    if (st(s) && st(i)) {
      if (!Ee(s, i))
        return !1;
    } else if (s !== i)
      return !1;
  }
  for (const o of r)
    if (!n.includes(o))
      return !1;
  return !0;
}
function st(t) {
  return t !== null && typeof t == "object";
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Pe(t) {
  return t && t._delegate ? t._delegate : t;
}
class E {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, n, r) {
    this.name = e, this.instanceFactory = n, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(e) {
    return this.instantiationMode = e, this;
  }
  setMultipleInstances(e) {
    return this.multipleInstances = e, this;
  }
  setServiceProps(e) {
    return this.serviceProps = e, this;
  }
  setInstanceCreatedCallback(e) {
    return this.onInstanceCreated = e, this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const R = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hr {
  constructor(e, n) {
    this.name = e, this.container = n, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(e) {
    const n = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(n)) {
      const r = new ur();
      if (this.instancesDeferred.set(n, r), this.isInitialized(n) || this.shouldAutoInitialize())
        try {
          const o = this.getOrInitializeService({
            instanceIdentifier: n
          });
          o && r.resolve(o);
        } catch {
        }
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(e) {
    var n;
    const r = this.normalizeInstanceIdentifier(e == null ? void 0 : e.identifier), o = (n = e == null ? void 0 : e.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: r
        });
      } catch (s) {
        if (o)
          return null;
        throw s;
      }
    else {
      if (o)
        return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = e, !!this.shouldAutoInitialize()) {
      if (gr(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: R });
        } catch {
        }
      for (const [n, r] of this.instancesDeferred.entries()) {
        const o = this.normalizeInstanceIdentifier(n);
        try {
          const s = this.getOrInitializeService({
            instanceIdentifier: o
          });
          r.resolve(s);
        } catch {
        }
      }
    }
  }
  clearInstance(e = R) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...e.filter((n) => "_delete" in n).map((n) => n._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(e = R) {
    return this.instances.has(e);
  }
  getOptions(e = R) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: n = {} } = e, r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const o = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n
    });
    for (const [s, i] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(s);
      r === a && i.resolve(o);
    }
    return o;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(e, n) {
    var r;
    const o = this.normalizeInstanceIdentifier(n), s = (r = this.onInitCallbacks.get(o)) !== null && r !== void 0 ? r : /* @__PURE__ */ new Set();
    s.add(e), this.onInitCallbacks.set(o, s);
    const i = this.instances.get(o);
    return i && e(i, o), () => {
      s.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const o of r)
        try {
          o(e, n);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: n = {} }) {
    let r = this.instances.get(e);
    if (!r && this.component && (r = this.component.instanceFactory(this.container, {
      instanceIdentifier: pr(e),
      options: n
    }), this.instances.set(e, r), this.instancesOptions.set(e, n), this.invokeOnInitCallbacks(r, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, r);
      } catch {
      }
    return r || null;
  }
  normalizeInstanceIdentifier(e = R) {
    return this.component ? this.component.multipleInstances ? e : R : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function pr(t) {
  return t === R ? void 0 : t;
}
function gr(t) {
  return t.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class br {
  constructor(e) {
    this.name = e, this.providers = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(e) {
    const n = this.getProvider(e.name);
    if (n.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    n.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(e) {
    if (this.providers.has(e))
      return this.providers.get(e);
    const n = new hr(e, this);
    return this.providers.set(e, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var d;
(function(t) {
  t[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT";
})(d || (d = {}));
const mr = {
  debug: d.DEBUG,
  verbose: d.VERBOSE,
  info: d.INFO,
  warn: d.WARN,
  error: d.ERROR,
  silent: d.SILENT
}, wr = d.INFO, yr = {
  [d.DEBUG]: "log",
  [d.VERBOSE]: "log",
  [d.INFO]: "info",
  [d.WARN]: "warn",
  [d.ERROR]: "error"
}, _r = (t, e, ...n) => {
  if (e < t.logLevel)
    return;
  const r = (/* @__PURE__ */ new Date()).toISOString(), o = yr[e];
  if (o)
    console[o](`[${r}]  ${t.name}:`, ...n);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class Ir {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = wr, this._logHandler = _r, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in d))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? mr[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, d.DEBUG, ...e), this._logHandler(this, d.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, d.VERBOSE, ...e), this._logHandler(this, d.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, d.INFO, ...e), this._logHandler(this, d.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, d.WARN, ...e), this._logHandler(this, d.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, d.ERROR, ...e), this._logHandler(this, d.ERROR, ...e);
  }
}
const Er = (t, e) => e.some((n) => t instanceof n);
let it, at;
function vr() {
  return it || (it = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Sr() {
  return at || (at = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Pt = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), xt = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap();
function Tr(t) {
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("success", s), t.removeEventListener("error", i);
    }, s = () => {
      n(S(t.result)), o();
    }, i = () => {
      r(t.error), o();
    };
    t.addEventListener("success", s), t.addEventListener("error", i);
  });
  return e.then((n) => {
    n instanceof IDBCursor && Pt.set(n, t);
  }).catch(() => {
  }), xe.set(e, t), e;
}
function Cr(t) {
  if (ve.has(t))
    return;
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("complete", s), t.removeEventListener("error", i), t.removeEventListener("abort", i);
    }, s = () => {
      n(), o();
    }, i = () => {
      r(t.error || new DOMException("AbortError", "AbortError")), o();
    };
    t.addEventListener("complete", s), t.addEventListener("error", i), t.addEventListener("abort", i);
  });
  ve.set(t, e);
}
let Se = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return ve.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || xt.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return S(t[e]);
  },
  set(t, e, n) {
    return t[e] = n, !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t;
  }
};
function kr(t) {
  Se = t(Se);
}
function Dr(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...n) {
    const r = t.call(oe(this), e, ...n);
    return xt.set(r, e.sort ? e.sort() : [e]), S(r);
  } : Sr().includes(t) ? function(...e) {
    return t.apply(oe(this), e), S(Pt.get(this));
  } : function(...e) {
    return S(t.apply(oe(this), e));
  };
}
function Ar(t) {
  return typeof t == "function" ? Dr(t) : (t instanceof IDBTransaction && Cr(t), Er(t, vr()) ? new Proxy(t, Se) : t);
}
function S(t) {
  if (t instanceof IDBRequest)
    return Tr(t);
  if (re.has(t))
    return re.get(t);
  const e = Ar(t);
  return e !== t && (re.set(t, e), xe.set(e, t)), e;
}
const oe = (t) => xe.get(t);
function Rr(t, e, { blocked: n, upgrade: r, blocking: o, terminated: s } = {}) {
  const i = indexedDB.open(t, e), a = S(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(S(i.result), c.oldVersion, c.newVersion, S(i.transaction), c);
  }), n && i.addEventListener("blocked", (c) => n(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    c.oldVersion,
    c.newVersion,
    c
  )), a.then((c) => {
    s && c.addEventListener("close", () => s()), o && c.addEventListener("versionchange", (l) => o(l.oldVersion, l.newVersion, l));
  }).catch(() => {
  }), a;
}
const Or = ["get", "getKey", "getAll", "getAllKeys", "count"], Mr = ["put", "add", "delete", "clear"], se = /* @__PURE__ */ new Map();
function ct(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (se.get(e))
    return se.get(e);
  const n = e.replace(/FromIndex$/, ""), r = e !== n, o = Mr.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(o || Or.includes(n))
  )
    return;
  const s = async function(i, ...a) {
    const c = this.transaction(i, o ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      o && c.done
    ]))[0];
  };
  return se.set(e, s), s;
}
kr((t) => ({
  ...t,
  get: (e, n, r) => ct(e, n) || t.get(e, n, r),
  has: (e, n) => !!ct(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nr {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((n) => {
      if ($r(n)) {
        const r = n.getImmediate();
        return `${r.library}/${r.version}`;
      } else
        return null;
    }).filter((n) => n).join(" ");
  }
}
function $r(t) {
  const e = t.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Te = "@firebase/app", ut = "0.9.12";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const M = new Ir("@firebase/app"), Br = "@firebase/app-compat", Lr = "@firebase/analytics-compat", Pr = "@firebase/analytics", xr = "@firebase/app-check-compat", jr = "@firebase/app-check", Kr = "@firebase/auth", Fr = "@firebase/auth-compat", Ur = "@firebase/database", Hr = "@firebase/database-compat", Wr = "@firebase/functions", Vr = "@firebase/functions-compat", qr = "@firebase/installations", Gr = "@firebase/installations-compat", zr = "@firebase/messaging", Jr = "@firebase/messaging-compat", Yr = "@firebase/performance", Xr = "@firebase/performance-compat", Qr = "@firebase/remote-config", Zr = "@firebase/remote-config-compat", eo = "@firebase/storage", to = "@firebase/storage-compat", no = "@firebase/firestore", ro = "@firebase/firestore-compat", oo = "firebase";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ce = "[DEFAULT]", so = {
  [Te]: "fire-core",
  [Br]: "fire-core-compat",
  [Pr]: "fire-analytics",
  [Lr]: "fire-analytics-compat",
  [jr]: "fire-app-check",
  [xr]: "fire-app-check-compat",
  [Kr]: "fire-auth",
  [Fr]: "fire-auth-compat",
  [Ur]: "fire-rtdb",
  [Hr]: "fire-rtdb-compat",
  [Wr]: "fire-fn",
  [Vr]: "fire-fn-compat",
  [qr]: "fire-iid",
  [Gr]: "fire-iid-compat",
  [zr]: "fire-fcm",
  [Jr]: "fire-fcm-compat",
  [Yr]: "fire-perf",
  [Xr]: "fire-perf-compat",
  [Qr]: "fire-rc",
  [Zr]: "fire-rc-compat",
  [eo]: "fire-gcs",
  [to]: "fire-gcs-compat",
  [no]: "fire-fst",
  [ro]: "fire-fst-compat",
  "fire-js": "fire-js",
  [oo]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const z = /* @__PURE__ */ new Map(), ke = /* @__PURE__ */ new Map();
function io(t, e) {
  try {
    t.container.addComponent(e);
  } catch (n) {
    M.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n);
  }
}
function D(t) {
  const e = t.name;
  if (ke.has(e))
    return M.debug(`There were multiple attempts to register component ${e}.`), !1;
  ke.set(e, t);
  for (const n of z.values())
    io(n, t);
  return !0;
}
function je(t, e) {
  const n = t.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), t.container.getProvider(e);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ao = {
  [
    "no-app"
    /* AppError.NO_APP */
  ]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
  [
    "bad-app-name"
    /* AppError.BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}",
  [
    "duplicate-app"
    /* AppError.DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  [
    "app-deleted"
    /* AppError.APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  [
    "no-options"
    /* AppError.NO_OPTIONS */
  ]: "Need to provide options, when not being deployed to hosting via source.",
  [
    "invalid-app-argument"
    /* AppError.INVALID_APP_ARGUMENT */
  ]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  [
    "invalid-log-argument"
    /* AppError.INVALID_LOG_ARGUMENT */
  ]: "First argument to `onLog` must be null or a function.",
  [
    "idb-open"
    /* AppError.IDB_OPEN */
  ]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-get"
    /* AppError.IDB_GET */
  ]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-set"
    /* AppError.IDB_WRITE */
  ]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-delete"
    /* AppError.IDB_DELETE */
  ]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
}, T = new W("app", "Firebase", ao);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class co {
  constructor(e, n, r) {
    this._isDeleted = !1, this._options = Object.assign({}, e), this._config = Object.assign({}, n), this._name = n.name, this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled, this._container = r, this.container.addComponent(new E(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted)
      throw T.create("app-deleted", { appName: this._name });
  }
}
function jt(t, e = {}) {
  let n = t;
  typeof e != "object" && (e = { name: e });
  const r = Object.assign({ name: Ce, automaticDataCollectionEnabled: !1 }, e), o = r.name;
  if (typeof o != "string" || !o)
    throw T.create("bad-app-name", {
      appName: String(o)
    });
  if (n || (n = $t()), !n)
    throw T.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const s = z.get(o);
  if (s) {
    if (Ee(n, s.options) && Ee(r, s.config))
      return s;
    throw T.create("duplicate-app", { appName: o });
  }
  const i = new br(o);
  for (const c of ke.values())
    i.addComponent(c);
  const a = new co(n, r, i);
  return z.set(o, a), a;
}
function uo(t = Ce) {
  const e = z.get(t);
  if (!e && t === Ce && $t())
    return jt();
  if (!e)
    throw T.create("no-app", { appName: t });
  return e;
}
function C(t, e, n) {
  var r;
  let o = (r = so[t]) !== null && r !== void 0 ? r : t;
  n && (o += `-${n}`);
  const s = o.match(/\s|\//), i = e.match(/\s|\//);
  if (s || i) {
    const a = [
      `Unable to register library "${o}" with version "${e}":`
    ];
    s && a.push(`library name "${o}" contains illegal characters (whitespace or "/")`), s && i && a.push("and"), i && a.push(`version name "${e}" contains illegal characters (whitespace or "/")`), M.warn(a.join(" "));
    return;
  }
  D(new E(
    `${o}-version`,
    () => ({ library: o, version: e }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const lo = "firebase-heartbeat-database", fo = 1, U = "firebase-heartbeat-store";
let ie = null;
function Kt() {
  return ie || (ie = Rr(lo, fo, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(U);
      }
    }
  }).catch((t) => {
    throw T.create("idb-open", {
      originalErrorMessage: t.message
    });
  })), ie;
}
async function ho(t) {
  try {
    return await (await Kt()).transaction(U).objectStore(U).get(Ft(t));
  } catch (e) {
    if (e instanceof x)
      M.warn(e.message);
    else {
      const n = T.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message
      });
      M.warn(n.message);
    }
  }
}
async function lt(t, e) {
  try {
    const r = (await Kt()).transaction(U, "readwrite");
    await r.objectStore(U).put(e, Ft(t)), await r.done;
  } catch (n) {
    if (n instanceof x)
      M.warn(n.message);
    else {
      const r = T.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message
      });
      M.warn(r.message);
    }
  }
}
function Ft(t) {
  return `${t.name}!${t.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const po = 1024, go = 30 * 24 * 60 * 60 * 1e3;
class bo {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new wo(n), this._heartbeatsCachePromise = this._storage.read().then((r) => (this._heartbeatsCache = r, r));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    const n = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), r = dt();
    if (this._heartbeatsCache === null && (this._heartbeatsCache = await this._heartbeatsCachePromise), !(this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some((o) => o.date === r)))
      return this._heartbeatsCache.heartbeats.push({ date: r, agent: n }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((o) => {
        const s = new Date(o.date).valueOf();
        return Date.now() - s <= go;
      }), this._storage.overwrite(this._heartbeatsCache);
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0)
      return "";
    const e = dt(), { heartbeatsToSend: n, unsentEntries: r } = mo(this._heartbeatsCache.heartbeats), o = Nt(JSON.stringify({ version: 2, heartbeats: n }));
    return this._heartbeatsCache.lastSentHeartbeatDate = e, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), o;
  }
}
function dt() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function mo(t, e = po) {
  const n = [];
  let r = t.slice();
  for (const o of t) {
    const s = n.find((i) => i.agent === o.agent);
    if (s) {
      if (s.dates.push(o.date), ft(n) > e) {
        s.dates.pop();
        break;
      }
    } else if (n.push({
      agent: o.agent,
      dates: [o.date]
    }), ft(n) > e) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return {
    heartbeatsToSend: n,
    unsentEntries: r
  };
}
class wo {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Bt() ? Lt().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    return await this._canUseIndexedDBPromise ? await ho(this.app) || { heartbeats: [] } : { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return lt(this.app, {
        lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : o.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(e) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return lt(this.app, {
        lastSentHeartbeatDate: (n = e.lastSentHeartbeatDate) !== null && n !== void 0 ? n : o.lastSentHeartbeatDate,
        heartbeats: [
          ...o.heartbeats,
          ...e.heartbeats
        ]
      });
    } else
      return;
  }
}
function ft(t) {
  return Nt(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: t })
  ).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function yo(t) {
  D(new E(
    "platform-logger",
    (e) => new Nr(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), D(new E(
    "heartbeat",
    (e) => new bo(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), C(Te, ut, t), C(Te, ut, "esm2017"), C("fire-js", "");
}
yo("");
var _o = "firebase", Io = "9.22.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
C(_o, Io, "app");
const Eo = (t, e) => e.some((n) => t instanceof n);
let ht, pt;
function vo() {
  return ht || (ht = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function So() {
  return pt || (pt = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Ut = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), ae = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap();
function To(t) {
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("success", s), t.removeEventListener("error", i);
    }, s = () => {
      n(k(t.result)), o();
    }, i = () => {
      r(t.error), o();
    };
    t.addEventListener("success", s), t.addEventListener("error", i);
  });
  return e.then((n) => {
    n instanceof IDBCursor && Ut.set(n, t);
  }).catch(() => {
  }), Ke.set(e, t), e;
}
function Co(t) {
  if (De.has(t))
    return;
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("complete", s), t.removeEventListener("error", i), t.removeEventListener("abort", i);
    }, s = () => {
      n(), o();
    }, i = () => {
      r(t.error || new DOMException("AbortError", "AbortError")), o();
    };
    t.addEventListener("complete", s), t.addEventListener("error", i), t.addEventListener("abort", i);
  });
  De.set(t, e);
}
let Ae = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return De.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || Ht.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return k(t[e]);
  },
  set(t, e, n) {
    return t[e] = n, !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t;
  }
};
function ko(t) {
  Ae = t(Ae);
}
function Do(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...n) {
    const r = t.call(ce(this), e, ...n);
    return Ht.set(r, e.sort ? e.sort() : [e]), k(r);
  } : So().includes(t) ? function(...e) {
    return t.apply(ce(this), e), k(Ut.get(this));
  } : function(...e) {
    return k(t.apply(ce(this), e));
  };
}
function Ao(t) {
  return typeof t == "function" ? Do(t) : (t instanceof IDBTransaction && Co(t), Eo(t, vo()) ? new Proxy(t, Ae) : t);
}
function k(t) {
  if (t instanceof IDBRequest)
    return To(t);
  if (ae.has(t))
    return ae.get(t);
  const e = Ao(t);
  return e !== t && (ae.set(t, e), Ke.set(e, t)), e;
}
const ce = (t) => Ke.get(t);
function Ro(t, e, { blocked: n, upgrade: r, blocking: o, terminated: s } = {}) {
  const i = indexedDB.open(t, e), a = k(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(k(i.result), c.oldVersion, c.newVersion, k(i.transaction));
  }), n && i.addEventListener("blocked", () => n()), a.then((c) => {
    s && c.addEventListener("close", () => s()), o && c.addEventListener("versionchange", () => o());
  }).catch(() => {
  }), a;
}
const Oo = ["get", "getKey", "getAll", "getAllKeys", "count"], Mo = ["put", "add", "delete", "clear"], ue = /* @__PURE__ */ new Map();
function gt(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (ue.get(e))
    return ue.get(e);
  const n = e.replace(/FromIndex$/, ""), r = e !== n, o = Mo.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(o || Oo.includes(n))
  )
    return;
  const s = async function(i, ...a) {
    const c = this.transaction(i, o ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      o && c.done
    ]))[0];
  };
  return ue.set(e, s), s;
}
ko((t) => ({
  ...t,
  get: (e, n, r) => gt(e, n) || t.get(e, n, r),
  has: (e, n) => !!gt(e, n) || t.has(e, n)
}));
const Wt = "@firebase/installations", Fe = "0.6.4";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Vt = 1e4, qt = `w:${Fe}`, Gt = "FIS_v2", No = "https://firebaseinstallations.googleapis.com/v1", $o = 60 * 60 * 1e3, Bo = "installations", Lo = "Installations";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Po = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "not-registered"
    /* ErrorCode.NOT_REGISTERED */
  ]: "Firebase Installation is not registered.",
  [
    "installation-not-found"
    /* ErrorCode.INSTALLATION_NOT_FOUND */
  ]: "Firebase Installation not found.",
  [
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  ]: '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
  [
    "app-offline"
    /* ErrorCode.APP_OFFLINE */
  ]: "Could not process request. Application offline.",
  [
    "delete-pending-registration"
    /* ErrorCode.DELETE_PENDING_REGISTRATION */
  ]: "Can't delete installation while there is a pending registration request."
}, N = new W(Bo, Lo, Po);
function zt(t) {
  return t instanceof x && t.code.includes(
    "request-failed"
    /* ErrorCode.REQUEST_FAILED */
  );
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Jt({ projectId: t }) {
  return `${No}/projects/${t}/installations`;
}
function Yt(t) {
  return {
    token: t.token,
    requestStatus: 2,
    expiresIn: jo(t.expiresIn),
    creationTime: Date.now()
  };
}
async function Xt(t, e) {
  const r = (await e.json()).error;
  return N.create("request-failed", {
    requestName: t,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status
  });
}
function Qt({ apiKey: t }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t
  });
}
function xo(t, { refreshToken: e }) {
  const n = Qt(t);
  return n.append("Authorization", Ko(e)), n;
}
async function Zt(t) {
  const e = await t();
  return e.status >= 500 && e.status < 600 ? t() : e;
}
function jo(t) {
  return Number(t.replace("s", "000"));
}
function Ko(t) {
  return `${Gt} ${t}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Fo({ appConfig: t, heartbeatServiceProvider: e }, { fid: n }) {
  const r = Jt(t), o = Qt(t), s = e.getImmediate({
    optional: !0
  });
  if (s) {
    const l = await s.getHeartbeatsHeader();
    l && o.append("x-firebase-client", l);
  }
  const i = {
    fid: n,
    authVersion: Gt,
    appId: t.appId,
    sdkVersion: qt
  }, a = {
    method: "POST",
    headers: o,
    body: JSON.stringify(i)
  }, c = await Zt(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return {
      fid: l.fid || n,
      registrationStatus: 2,
      refreshToken: l.refreshToken,
      authToken: Yt(l.authToken)
    };
  } else
    throw await Xt("Create Installation", c);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function en(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Uo(t) {
  return btoa(String.fromCharCode(...t)).replace(/\+/g, "-").replace(/\//g, "_");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ho = /^[cdef][\w-]{21}$/, Re = "";
function Wo() {
  try {
    const t = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(t), t[0] = 112 + t[0] % 16;
    const n = Vo(t);
    return Ho.test(n) ? n : Re;
  } catch {
    return Re;
  }
}
function Vo(t) {
  return Uo(t).substr(0, 22);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Q(t) {
  return `${t.appName}!${t.appId}`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const tn = /* @__PURE__ */ new Map();
function nn(t, e) {
  const n = Q(t);
  rn(n, e), qo(n, e);
}
function rn(t, e) {
  const n = tn.get(t);
  if (n)
    for (const r of n)
      r(e);
}
function qo(t, e) {
  const n = Go();
  n && n.postMessage({ key: t, fid: e }), zo();
}
let O = null;
function Go() {
  return !O && "BroadcastChannel" in self && (O = new BroadcastChannel("[Firebase] FID Change"), O.onmessage = (t) => {
    rn(t.data.key, t.data.fid);
  }), O;
}
function zo() {
  tn.size === 0 && O && (O.close(), O = null);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jo = "firebase-installations-database", Yo = 1, $ = "firebase-installations-store";
let le = null;
function Ue() {
  return le || (le = Ro(Jo, Yo, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore($);
      }
    }
  })), le;
}
async function J(t, e) {
  const n = Q(t), o = (await Ue()).transaction($, "readwrite"), s = o.objectStore($), i = await s.get(n);
  return await s.put(e, n), await o.done, (!i || i.fid !== e.fid) && nn(t, e.fid), e;
}
async function on(t) {
  const e = Q(t), r = (await Ue()).transaction($, "readwrite");
  await r.objectStore($).delete(e), await r.done;
}
async function Z(t, e) {
  const n = Q(t), o = (await Ue()).transaction($, "readwrite"), s = o.objectStore($), i = await s.get(n), a = e(i);
  return a === void 0 ? await s.delete(n) : await s.put(a, n), await o.done, a && (!i || i.fid !== a.fid) && nn(t, a.fid), a;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function He(t) {
  let e;
  const n = await Z(t.appConfig, (r) => {
    const o = Xo(r), s = Qo(t, o);
    return e = s.registrationPromise, s.installationEntry;
  });
  return n.fid === Re ? { installationEntry: await e } : {
    installationEntry: n,
    registrationPromise: e
  };
}
function Xo(t) {
  const e = t || {
    fid: Wo(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return sn(e);
}
function Qo(t, e) {
  if (e.registrationStatus === 0) {
    if (!navigator.onLine) {
      const o = Promise.reject(N.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry: e,
        registrationPromise: o
      };
    }
    const n = {
      fid: e.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    }, r = Zo(t, n);
    return { installationEntry: n, registrationPromise: r };
  } else
    return e.registrationStatus === 1 ? {
      installationEntry: e,
      registrationPromise: es(t)
    } : { installationEntry: e };
}
async function Zo(t, e) {
  try {
    const n = await Fo(t, e);
    return J(t.appConfig, n);
  } catch (n) {
    throw zt(n) && n.customData.serverCode === 409 ? await on(t.appConfig) : await J(t.appConfig, {
      fid: e.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), n;
  }
}
async function es(t) {
  let e = await bt(t.appConfig);
  for (; e.registrationStatus === 1; )
    await en(100), e = await bt(t.appConfig);
  if (e.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: r } = await He(t);
    return r || n;
  }
  return e;
}
function bt(t) {
  return Z(t, (e) => {
    if (!e)
      throw N.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return sn(e);
  });
}
function sn(t) {
  return ts(t) ? {
    fid: t.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : t;
}
function ts(t) {
  return t.registrationStatus === 1 && t.registrationTime + Vt < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ns({ appConfig: t, heartbeatServiceProvider: e }, n) {
  const r = rs(t, n), o = xo(t, n), s = e.getImmediate({
    optional: !0
  });
  if (s) {
    const l = await s.getHeartbeatsHeader();
    l && o.append("x-firebase-client", l);
  }
  const i = {
    installation: {
      sdkVersion: qt,
      appId: t.appId
    }
  }, a = {
    method: "POST",
    headers: o,
    body: JSON.stringify(i)
  }, c = await Zt(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return Yt(l);
  } else
    throw await Xt("Generate Auth Token", c);
}
function rs(t, { fid: e }) {
  return `${Jt(t)}/${e}/authTokens:generate`;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function We(t, e = !1) {
  let n;
  const r = await Z(t.appConfig, (s) => {
    if (!an(s))
      throw N.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const i = s.authToken;
    if (!e && is(i))
      return s;
    if (i.requestStatus === 1)
      return n = os(t, e), s;
    {
      if (!navigator.onLine)
        throw N.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const a = cs(s);
      return n = ss(t, a), a;
    }
  });
  return n ? await n : r.authToken;
}
async function os(t, e) {
  let n = await mt(t.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await en(100), n = await mt(t.appConfig);
  const r = n.authToken;
  return r.requestStatus === 0 ? We(t, e) : r;
}
function mt(t) {
  return Z(t, (e) => {
    if (!an(e))
      throw N.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const n = e.authToken;
    return us(n) ? Object.assign(Object.assign({}, e), { authToken: {
      requestStatus: 0
      /* RequestStatus.NOT_STARTED */
    } }) : e;
  });
}
async function ss(t, e) {
  try {
    const n = await ns(t, e), r = Object.assign(Object.assign({}, e), { authToken: n });
    return await J(t.appConfig, r), n;
  } catch (n) {
    if (zt(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await on(t.appConfig);
    else {
      const r = Object.assign(Object.assign({}, e), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
      await J(t.appConfig, r);
    }
    throw n;
  }
}
function an(t) {
  return t !== void 0 && t.registrationStatus === 2;
}
function is(t) {
  return t.requestStatus === 2 && !as(t);
}
function as(t) {
  const e = Date.now();
  return e < t.creationTime || t.creationTime + t.expiresIn < e + $o;
}
function cs(t) {
  const e = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return Object.assign(Object.assign({}, t), { authToken: e });
}
function us(t) {
  return t.requestStatus === 1 && t.requestTime + Vt < Date.now();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ls(t) {
  const e = t, { installationEntry: n, registrationPromise: r } = await He(e);
  return r ? r.catch(console.error) : We(e).catch(console.error), n.fid;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ds(t, e = !1) {
  const n = t;
  return await fs(n), (await We(n, e)).token;
}
async function fs(t) {
  const { registrationPromise: e } = await He(t);
  e && await e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function hs(t) {
  if (!t || !t.options)
    throw de("App Configuration");
  if (!t.name)
    throw de("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const n of e)
    if (!t.options[n])
      throw de(n);
  return {
    appName: t.name,
    projectId: t.options.projectId,
    apiKey: t.options.apiKey,
    appId: t.options.appId
  };
}
function de(t) {
  return N.create("missing-app-config-values", {
    valueName: t
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const cn = "installations", ps = "installations-internal", gs = (t) => {
  const e = t.getProvider("app").getImmediate(), n = hs(e), r = je(e, "heartbeat");
  return {
    app: e,
    appConfig: n,
    heartbeatServiceProvider: r,
    _delete: () => Promise.resolve()
  };
}, bs = (t) => {
  const e = t.getProvider("app").getImmediate(), n = je(e, cn).getImmediate();
  return {
    getId: () => ls(n),
    getToken: (o) => ds(n, o)
  };
};
function ms() {
  D(new E(
    cn,
    gs,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), D(new E(
    ps,
    bs,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
ms();
C(Wt, Fe);
C(Wt, Fe, "esm2017");
const ws = (t, e) => e.some((n) => t instanceof n);
let wt, yt;
function ys() {
  return wt || (wt = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function _s() {
  return yt || (yt = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const un = /* @__PURE__ */ new WeakMap(), Oe = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new WeakMap(), fe = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap();
function Is(t) {
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("success", s), t.removeEventListener("error", i);
    }, s = () => {
      n(y(t.result)), o();
    }, i = () => {
      r(t.error), o();
    };
    t.addEventListener("success", s), t.addEventListener("error", i);
  });
  return e.then((n) => {
    n instanceof IDBCursor && un.set(n, t);
  }).catch(() => {
  }), Ve.set(e, t), e;
}
function Es(t) {
  if (Oe.has(t))
    return;
  const e = new Promise((n, r) => {
    const o = () => {
      t.removeEventListener("complete", s), t.removeEventListener("error", i), t.removeEventListener("abort", i);
    }, s = () => {
      n(), o();
    }, i = () => {
      r(t.error || new DOMException("AbortError", "AbortError")), o();
    };
    t.addEventListener("complete", s), t.addEventListener("error", i), t.addEventListener("abort", i);
  });
  Oe.set(t, e);
}
let Me = {
  get(t, e, n) {
    if (t instanceof IDBTransaction) {
      if (e === "done")
        return Oe.get(t);
      if (e === "objectStoreNames")
        return t.objectStoreNames || ln.get(t);
      if (e === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return y(t[e]);
  },
  set(t, e, n) {
    return t[e] = n, !0;
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in t;
  }
};
function vs(t) {
  Me = t(Me);
}
function Ss(t) {
  return t === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...n) {
    const r = t.call(he(this), e, ...n);
    return ln.set(r, e.sort ? e.sort() : [e]), y(r);
  } : _s().includes(t) ? function(...e) {
    return t.apply(he(this), e), y(un.get(this));
  } : function(...e) {
    return y(t.apply(he(this), e));
  };
}
function Ts(t) {
  return typeof t == "function" ? Ss(t) : (t instanceof IDBTransaction && Es(t), ws(t, ys()) ? new Proxy(t, Me) : t);
}
function y(t) {
  if (t instanceof IDBRequest)
    return Is(t);
  if (fe.has(t))
    return fe.get(t);
  const e = Ts(t);
  return e !== t && (fe.set(t, e), Ve.set(e, t)), e;
}
const he = (t) => Ve.get(t);
function ee(t, e, { blocked: n, upgrade: r, blocking: o, terminated: s } = {}) {
  const i = indexedDB.open(t, e), a = y(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(y(i.result), c.oldVersion, c.newVersion, y(i.transaction));
  }), n && i.addEventListener("blocked", () => n()), a.then((c) => {
    s && c.addEventListener("close", () => s()), o && c.addEventListener("versionchange", () => o());
  }).catch(() => {
  }), a;
}
function P(t, { blocked: e } = {}) {
  const n = indexedDB.deleteDatabase(t);
  return e && n.addEventListener("blocked", () => e()), y(n).then(() => {
  });
}
const Cs = ["get", "getKey", "getAll", "getAllKeys", "count"], ks = ["put", "add", "delete", "clear"], pe = /* @__PURE__ */ new Map();
function _t(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string"))
    return;
  if (pe.get(e))
    return pe.get(e);
  const n = e.replace(/FromIndex$/, ""), r = e !== n, o = ks.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(o || Cs.includes(n))
  )
    return;
  const s = async function(i, ...a) {
    const c = this.transaction(i, o ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      o && c.done
    ]))[0];
  };
  return pe.set(e, s), s;
}
vs((t) => ({
  ...t,
  get: (e, n, r) => _t(e, n) || t.get(e, n, r),
  has: (e, n) => !!_t(e, n) || t.has(e, n)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const dn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Ds = "https://fcmregistrations.googleapis.com/v1", fn = "FCM_MSG", As = "google.c.a.c_id", Rs = 3, Os = 1;
var Y;
(function(t) {
  t[t.DATA_MESSAGE = 1] = "DATA_MESSAGE", t[t.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(Y || (Y = {}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
var X;
(function(t) {
  t.PUSH_RECEIVED = "push-received", t.NOTIFICATION_CLICKED = "notification-clicked";
})(X || (X = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function b(t) {
  const e = new Uint8Array(t);
  return btoa(String.fromCharCode(...e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Ms(t) {
  const e = "=".repeat((4 - t.length % 4) % 4), n = (t + e).replace(/\-/g, "+").replace(/_/g, "/"), r = atob(n), o = new Uint8Array(r.length);
  for (let s = 0; s < r.length; ++s)
    o[s] = r.charCodeAt(s);
  return o;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ge = "fcm_token_details_db", Ns = 5, It = "fcm_token_object_Store";
async function $s(t) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((s) => s.name).includes(ge))
    return null;
  let e = null;
  return (await ee(ge, Ns, {
    upgrade: async (r, o, s, i) => {
      var a;
      if (o < 2 || !r.objectStoreNames.contains(It))
        return;
      const c = i.objectStore(It), l = await c.index("fcmSenderId").get(t);
      if (await c.clear(), !!l) {
        if (o === 2) {
          const u = l;
          if (!u.auth || !u.p256dh || !u.endpoint)
            return;
          e = {
            token: u.fcmToken,
            createTime: (a = u.createTime) !== null && a !== void 0 ? a : Date.now(),
            subscriptionOptions: {
              auth: u.auth,
              p256dh: u.p256dh,
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: typeof u.vapidKey == "string" ? u.vapidKey : b(u.vapidKey)
            }
          };
        } else if (o === 3) {
          const u = l;
          e = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: b(u.auth),
              p256dh: b(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: b(u.vapidKey)
            }
          };
        } else if (o === 4) {
          const u = l;
          e = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: b(u.auth),
              p256dh: b(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: b(u.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await P(ge), await P("fcm_vapid_details_db"), await P("undefined"), Bs(e) ? e : null;
}
function Bs(t) {
  if (!t || !t.subscriptionOptions)
    return !1;
  const { subscriptionOptions: e } = t;
  return typeof t.createTime == "number" && t.createTime > 0 && typeof t.token == "string" && t.token.length > 0 && typeof e.auth == "string" && e.auth.length > 0 && typeof e.p256dh == "string" && e.p256dh.length > 0 && typeof e.endpoint == "string" && e.endpoint.length > 0 && typeof e.swScope == "string" && e.swScope.length > 0 && typeof e.vapidKey == "string" && e.vapidKey.length > 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ls = "firebase-messaging-database", Ps = 1, B = "firebase-messaging-store";
let be = null;
function qe() {
  return be || (be = ee(Ls, Ps, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(B);
      }
    }
  })), be;
}
async function Ge(t) {
  const e = Je(t), r = await (await qe()).transaction(B).objectStore(B).get(e);
  if (r)
    return r;
  {
    const o = await $s(t.appConfig.senderId);
    if (o)
      return await ze(t, o), o;
  }
}
async function ze(t, e) {
  const n = Je(t), o = (await qe()).transaction(B, "readwrite");
  return await o.objectStore(B).put(e, n), await o.done, e;
}
async function xs(t) {
  const e = Je(t), r = (await qe()).transaction(B, "readwrite");
  await r.objectStore(B).delete(e), await r.done;
}
function Je({ appConfig: t }) {
  return t.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const js = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "only-available-in-window"
    /* ErrorCode.AVAILABLE_IN_WINDOW */
  ]: "This method is available in a Window context.",
  [
    "only-available-in-sw"
    /* ErrorCode.AVAILABLE_IN_SW */
  ]: "This method is available in a service worker context.",
  [
    "permission-default"
    /* ErrorCode.PERMISSION_DEFAULT */
  ]: "The notification permission was not granted and dismissed instead.",
  [
    "permission-blocked"
    /* ErrorCode.PERMISSION_BLOCKED */
  ]: "The notification permission was not granted and blocked instead.",
  [
    "unsupported-browser"
    /* ErrorCode.UNSUPPORTED_BROWSER */
  ]: "This browser doesn't support the API's required to use the Firebase SDK.",
  [
    "indexed-db-unsupported"
    /* ErrorCode.INDEXED_DB_UNSUPPORTED */
  ]: "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
  [
    "failed-service-worker-registration"
    /* ErrorCode.FAILED_DEFAULT_REGISTRATION */
  ]: "We are unable to register the default service worker. {$browserErrorMessage}",
  [
    "token-subscribe-failed"
    /* ErrorCode.TOKEN_SUBSCRIBE_FAILED */
  ]: "A problem occurred while subscribing the user to FCM: {$errorInfo}",
  [
    "token-subscribe-no-token"
    /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
  ]: "FCM returned no token when subscribing the user to push.",
  [
    "token-unsubscribe-failed"
    /* ErrorCode.TOKEN_UNSUBSCRIBE_FAILED */
  ]: "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
  [
    "token-update-failed"
    /* ErrorCode.TOKEN_UPDATE_FAILED */
  ]: "A problem occurred while updating the user from FCM: {$errorInfo}",
  [
    "token-update-no-token"
    /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
  ]: "FCM returned no token when updating the user to push.",
  [
    "use-sw-after-get-token"
    /* ErrorCode.USE_SW_AFTER_GET_TOKEN */
  ]: "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
  [
    "invalid-sw-registration"
    /* ErrorCode.INVALID_SW_REGISTRATION */
  ]: "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
  [
    "invalid-bg-handler"
    /* ErrorCode.INVALID_BG_HANDLER */
  ]: "The input to setBackgroundMessageHandler() must be a function.",
  [
    "invalid-vapid-key"
    /* ErrorCode.INVALID_VAPID_KEY */
  ]: "The public VAPID key must be a string.",
  [
    "use-vapid-key-after-get-token"
    /* ErrorCode.USE_VAPID_KEY_AFTER_GET_TOKEN */
  ]: "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."
}, g = new W("messaging", "Messaging", js);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Ks(t, e) {
  const n = await Xe(t), r = pn(e), o = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let s;
  try {
    s = await (await fetch(Ye(t.appConfig), o)).json();
  } catch (i) {
    throw g.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (s.error) {
    const i = s.error.message;
    throw g.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!s.token)
    throw g.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return s.token;
}
async function Fs(t, e) {
  const n = await Xe(t), r = pn(e.subscriptionOptions), o = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let s;
  try {
    s = await (await fetch(`${Ye(t.appConfig)}/${e.token}`, o)).json();
  } catch (i) {
    throw g.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (s.error) {
    const i = s.error.message;
    throw g.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!s.token)
    throw g.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return s.token;
}
async function hn(t, e) {
  const r = {
    method: "DELETE",
    headers: await Xe(t)
  };
  try {
    const s = await (await fetch(`${Ye(t.appConfig)}/${e}`, r)).json();
    if (s.error) {
      const i = s.error.message;
      throw g.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (o) {
    throw g.create("token-unsubscribe-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
}
function Ye({ projectId: t }) {
  return `${Ds}/projects/${t}/registrations`;
}
async function Xe({ appConfig: t, installations: e }) {
  const n = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function pn({ p256dh: t, auth: e, endpoint: n, vapidKey: r }) {
  const o = {
    web: {
      endpoint: n,
      auth: e,
      p256dh: t
    }
  };
  return r !== dn && (o.web.applicationPubKey = r), o;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Us = 7 * 24 * 60 * 60 * 1e3;
async function Hs(t) {
  const e = await Vs(t.swRegistration, t.vapidKey), n = {
    vapidKey: t.vapidKey,
    swScope: t.swRegistration.scope,
    endpoint: e.endpoint,
    auth: b(e.getKey("auth")),
    p256dh: b(e.getKey("p256dh"))
  }, r = await Ge(t.firebaseDependencies);
  if (r) {
    if (qs(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + Us ? Ws(t, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await hn(t.firebaseDependencies, r.token);
    } catch (o) {
      console.warn(o);
    }
    return Et(t.firebaseDependencies, n);
  } else
    return Et(t.firebaseDependencies, n);
}
async function Ne(t) {
  const e = await Ge(t.firebaseDependencies);
  e && (await hn(t.firebaseDependencies, e.token), await xs(t.firebaseDependencies));
  const n = await t.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function Ws(t, e) {
  try {
    const n = await Fs(t.firebaseDependencies, e), r = Object.assign(Object.assign({}, e), { token: n, createTime: Date.now() });
    return await ze(t.firebaseDependencies, r), n;
  } catch (n) {
    throw await Ne(t), n;
  }
}
async function Et(t, e) {
  const r = {
    token: await Ks(t, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await ze(t, r), r.token;
}
async function Vs(t, e) {
  const n = await t.pushManager.getSubscription();
  return n || t.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Ms(e)
  });
}
function qs(t, e) {
  const n = e.vapidKey === t.vapidKey, r = e.endpoint === t.endpoint, o = e.auth === t.auth, s = e.p256dh === t.p256dh;
  return n && r && o && s;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gs(t) {
  const e = {
    from: t.from,
    // eslint-disable-next-line camelcase
    collapseKey: t.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: t.fcmMessageId
  };
  return zs(e, t), Js(e, t), Ys(e, t), e;
}
function zs(t, e) {
  if (!e.notification)
    return;
  t.notification = {};
  const n = e.notification.title;
  n && (t.notification.title = n);
  const r = e.notification.body;
  r && (t.notification.body = r);
  const o = e.notification.image;
  o && (t.notification.image = o);
  const s = e.notification.icon;
  s && (t.notification.icon = s);
}
function Js(t, e) {
  e.data && (t.data = e.data);
}
function Ys(t, e) {
  var n, r, o, s, i;
  if (!e.fcmOptions && !(!((n = e.notification) === null || n === void 0) && n.click_action))
    return;
  t.fcmOptions = {};
  const a = (o = (r = e.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && o !== void 0 ? o : (s = e.notification) === null || s === void 0 ? void 0 : s.click_action;
  a && (t.fcmOptions.link = a);
  const c = (i = e.fcmOptions) === null || i === void 0 ? void 0 : i.analytics_label;
  c && (t.fcmOptions.analyticsLabel = c);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Xs(t) {
  return typeof t == "object" && !!t && As in t;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qs(t) {
  return new Promise((e) => {
    setTimeout(e, t);
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
gn("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
gn("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
async function Zs(t, e) {
  const n = ei(e, await t.firebaseDependencies.installations.getId());
  ti(t, n);
}
function ei(t, e) {
  var n, r;
  const o = {};
  return t.from && (o.project_number = t.from), t.fcmMessageId && (o.message_id = t.fcmMessageId), o.instance_id = e, t.notification ? o.message_type = Y.DISPLAY_NOTIFICATION.toString() : o.message_type = Y.DATA_MESSAGE.toString(), o.sdk_platform = Rs.toString(), o.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), t.collapse_key && (o.collapse_key = t.collapse_key), o.event = Os.toString(), !((n = t.fcmOptions) === null || n === void 0) && n.analytics_label && (o.analytics_label = (r = t.fcmOptions) === null || r === void 0 ? void 0 : r.analytics_label), o;
}
function ti(t, e) {
  const n = {};
  n.event_time_ms = Math.floor(Date.now()).toString(), n.source_extension_json_proto3 = JSON.stringify(e), t.logEvents.push(n);
}
function gn(t, e) {
  const n = [];
  for (let r = 0; r < t.length; r++)
    n.push(t.charAt(r)), r < e.length && n.push(e.charAt(r));
  return n.join("");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ni(t, e) {
  var n, r;
  const { newSubscription: o } = t;
  if (!o) {
    await Ne(e);
    return;
  }
  const s = await Ge(e.firebaseDependencies);
  await Ne(e), e.vapidKey = (r = (n = s == null ? void 0 : s.subscriptionOptions) === null || n === void 0 ? void 0 : n.vapidKey) !== null && r !== void 0 ? r : dn, await Hs(e);
}
async function ri(t, e) {
  const n = ii(t);
  if (!n)
    return;
  e.deliveryMetricsExportedToBigQueryEnabled && await Zs(e, n);
  const r = await bn();
  if (ci(r))
    return ui(r, n);
  if (n.notification && await li(si(n)), !!e && e.onBackgroundMessageHandler) {
    const o = Gs(n);
    typeof e.onBackgroundMessageHandler == "function" ? await e.onBackgroundMessageHandler(o) : e.onBackgroundMessageHandler.next(o);
  }
}
async function oi(t) {
  var e, n;
  const r = (n = (e = t.notification) === null || e === void 0 ? void 0 : e.data) === null || n === void 0 ? void 0 : n[fn];
  if (r) {
    if (t.action)
      return;
  } else
    return;
  t.stopImmediatePropagation(), t.notification.close();
  const o = di(r);
  if (!o)
    return;
  const s = new URL(o, self.location.href), i = new URL(self.location.origin);
  if (s.host !== i.host)
    return;
  let a = await ai(s);
  if (a ? a = await a.focus() : (a = await self.clients.openWindow(o), await Qs(3e3)), !!a)
    return r.messageType = X.NOTIFICATION_CLICKED, r.isFirebaseMessaging = !0, a.postMessage(r);
}
function si(t) {
  const e = Object.assign({}, t.notification);
  return e.data = {
    [fn]: t
  }, e;
}
function ii({ data: t }) {
  if (!t)
    return null;
  try {
    return t.json();
  } catch {
    return null;
  }
}
async function ai(t) {
  const e = await bn();
  for (const n of e) {
    const r = new URL(n.url, self.location.href);
    if (t.host === r.host)
      return n;
  }
  return null;
}
function ci(t) {
  return t.some((e) => e.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !e.url.startsWith("chrome-extension://"));
}
function ui(t, e) {
  e.isFirebaseMessaging = !0, e.messageType = X.PUSH_RECEIVED;
  for (const n of t)
    n.postMessage(e);
}
function bn() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function li(t) {
  var e;
  const { actions: n } = t, { maxActions: r } = Notification;
  return n && r && n.length > r && console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    (e = t.title) !== null && e !== void 0 ? e : "",
    t
  );
}
function di(t) {
  var e, n, r;
  const o = (n = (e = t.fcmOptions) === null || e === void 0 ? void 0 : e.link) !== null && n !== void 0 ? n : (r = t.notification) === null || r === void 0 ? void 0 : r.click_action;
  return o || (Xs(t.data) ? self.location.origin : null);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function fi(t) {
  if (!t || !t.options)
    throw me("App Configuration Object");
  if (!t.name)
    throw me("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = t;
  for (const r of e)
    if (!n[r])
      throw me(r);
  return {
    appName: t.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function me(t) {
  return g.create("missing-app-config-values", {
    valueName: t
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let hi = class {
  constructor(e, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const o = fi(e);
    this.firebaseDependencies = {
      app: e,
      appConfig: o,
      installations: n,
      analyticsProvider: r
    };
  }
  _delete() {
    return Promise.resolve();
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pi = (t) => {
  const e = new hi(t.getProvider("app").getImmediate(), t.getProvider("installations-internal").getImmediate(), t.getProvider("analytics-internal"));
  return self.addEventListener("push", (n) => {
    n.waitUntil(ri(n, e));
  }), self.addEventListener("pushsubscriptionchange", (n) => {
    n.waitUntil(ni(n, e));
  }), self.addEventListener("notificationclick", (n) => {
    n.waitUntil(oi(n));
  }), e;
};
function gi() {
  D(new E(
    "messaging-sw",
    pi,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function bi() {
  return Bt() && await Lt() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function mi(t, e) {
  if (self.document !== void 0)
    throw g.create(
      "only-available-in-sw"
      /* ErrorCode.AVAILABLE_IN_SW */
    );
  return t.onBackgroundMessageHandler = e, () => {
    t.onBackgroundMessageHandler = null;
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function wi(t = uo()) {
  return bi().then((e) => {
    if (!e)
      throw g.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (e) => {
    throw g.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), je(Pe(t), "messaging-sw").getImmediate();
}
function yi(t, e) {
  return t = Pe(t), mi(t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
gi();
const _i = {
  apiKey: "AIzaSyDF5IvWe8mdsgDmGgq-Rn-BddhEWth-qK4",
  authDomain: "chatapp-talker.firebaseapp.com",
  projectId: "chatapp-talker",
  storageBucket: "chatapp-talker.appspot.com",
  messagingSenderId: "603904451577",
  appId: "1:603904451577:web:8e2a5c294a6da2865e1328",
  measurementId: "G-Z59T9XJ1ZF"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Ii = "/firebase-messaging-sw.js", Ei = "/firebase-cloud-messaging-push-scope", mn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", vi = "https://fcmregistrations.googleapis.com/v1", wn = "google.c.a.c_id", Si = "google.c.a.c_l", Ti = "google.c.a.ts", Ci = "google.c.a.e";
var vt;
(function(t) {
  t[t.DATA_MESSAGE = 1] = "DATA_MESSAGE", t[t.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(vt || (vt = {}));
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
var H;
(function(t) {
  t.PUSH_RECEIVED = "push-received", t.NOTIFICATION_CLICKED = "notification-clicked";
})(H || (H = {}));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function m(t) {
  const e = new Uint8Array(t);
  return btoa(String.fromCharCode(...e)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function ki(t) {
  const e = "=".repeat((4 - t.length % 4) % 4), n = (t + e).replace(/\-/g, "+").replace(/_/g, "/"), r = atob(n), o = new Uint8Array(r.length);
  for (let s = 0; s < r.length; ++s)
    o[s] = r.charCodeAt(s);
  return o;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const we = "fcm_token_details_db", Di = 5, St = "fcm_token_object_Store";
async function Ai(t) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((s) => s.name).includes(we))
    return null;
  let e = null;
  return (await ee(we, Di, {
    upgrade: async (r, o, s, i) => {
      var a;
      if (o < 2 || !r.objectStoreNames.contains(St))
        return;
      const c = i.objectStore(St), l = await c.index("fcmSenderId").get(t);
      if (await c.clear(), !!l) {
        if (o === 2) {
          const u = l;
          if (!u.auth || !u.p256dh || !u.endpoint)
            return;
          e = {
            token: u.fcmToken,
            createTime: (a = u.createTime) !== null && a !== void 0 ? a : Date.now(),
            subscriptionOptions: {
              auth: u.auth,
              p256dh: u.p256dh,
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: typeof u.vapidKey == "string" ? u.vapidKey : m(u.vapidKey)
            }
          };
        } else if (o === 3) {
          const u = l;
          e = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: m(u.auth),
              p256dh: m(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: m(u.vapidKey)
            }
          };
        } else if (o === 4) {
          const u = l;
          e = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: m(u.auth),
              p256dh: m(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: m(u.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await P(we), await P("fcm_vapid_details_db"), await P("undefined"), Ri(e) ? e : null;
}
function Ri(t) {
  if (!t || !t.subscriptionOptions)
    return !1;
  const { subscriptionOptions: e } = t;
  return typeof t.createTime == "number" && t.createTime > 0 && typeof t.token == "string" && t.token.length > 0 && typeof e.auth == "string" && e.auth.length > 0 && typeof e.p256dh == "string" && e.p256dh.length > 0 && typeof e.endpoint == "string" && e.endpoint.length > 0 && typeof e.swScope == "string" && e.swScope.length > 0 && typeof e.vapidKey == "string" && e.vapidKey.length > 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Oi = "firebase-messaging-database", Mi = 1, L = "firebase-messaging-store";
let ye = null;
function Qe() {
  return ye || (ye = ee(Oi, Mi, {
    upgrade: (t, e) => {
      switch (e) {
        case 0:
          t.createObjectStore(L);
      }
    }
  })), ye;
}
async function yn(t) {
  const e = et(t), r = await (await Qe()).transaction(L).objectStore(L).get(e);
  if (r)
    return r;
  {
    const o = await Ai(t.appConfig.senderId);
    if (o)
      return await Ze(t, o), o;
  }
}
async function Ze(t, e) {
  const n = et(t), o = (await Qe()).transaction(L, "readwrite");
  return await o.objectStore(L).put(e, n), await o.done, e;
}
async function Ni(t) {
  const e = et(t), r = (await Qe()).transaction(L, "readwrite");
  await r.objectStore(L).delete(e), await r.done;
}
function et({ appConfig: t }) {
  return t.appId;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const $i = {
  [
    "missing-app-config-values"
    /* ErrorCode.MISSING_APP_CONFIG_VALUES */
  ]: 'Missing App configuration value: "{$valueName}"',
  [
    "only-available-in-window"
    /* ErrorCode.AVAILABLE_IN_WINDOW */
  ]: "This method is available in a Window context.",
  [
    "only-available-in-sw"
    /* ErrorCode.AVAILABLE_IN_SW */
  ]: "This method is available in a service worker context.",
  [
    "permission-default"
    /* ErrorCode.PERMISSION_DEFAULT */
  ]: "The notification permission was not granted and dismissed instead.",
  [
    "permission-blocked"
    /* ErrorCode.PERMISSION_BLOCKED */
  ]: "The notification permission was not granted and blocked instead.",
  [
    "unsupported-browser"
    /* ErrorCode.UNSUPPORTED_BROWSER */
  ]: "This browser doesn't support the API's required to use the Firebase SDK.",
  [
    "indexed-db-unsupported"
    /* ErrorCode.INDEXED_DB_UNSUPPORTED */
  ]: "This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)",
  [
    "failed-service-worker-registration"
    /* ErrorCode.FAILED_DEFAULT_REGISTRATION */
  ]: "We are unable to register the default service worker. {$browserErrorMessage}",
  [
    "token-subscribe-failed"
    /* ErrorCode.TOKEN_SUBSCRIBE_FAILED */
  ]: "A problem occurred while subscribing the user to FCM: {$errorInfo}",
  [
    "token-subscribe-no-token"
    /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
  ]: "FCM returned no token when subscribing the user to push.",
  [
    "token-unsubscribe-failed"
    /* ErrorCode.TOKEN_UNSUBSCRIBE_FAILED */
  ]: "A problem occurred while unsubscribing the user from FCM: {$errorInfo}",
  [
    "token-update-failed"
    /* ErrorCode.TOKEN_UPDATE_FAILED */
  ]: "A problem occurred while updating the user from FCM: {$errorInfo}",
  [
    "token-update-no-token"
    /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
  ]: "FCM returned no token when updating the user to push.",
  [
    "use-sw-after-get-token"
    /* ErrorCode.USE_SW_AFTER_GET_TOKEN */
  ]: "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",
  [
    "invalid-sw-registration"
    /* ErrorCode.INVALID_SW_REGISTRATION */
  ]: "The input to useServiceWorker() must be a ServiceWorkerRegistration.",
  [
    "invalid-bg-handler"
    /* ErrorCode.INVALID_BG_HANDLER */
  ]: "The input to setBackgroundMessageHandler() must be a function.",
  [
    "invalid-vapid-key"
    /* ErrorCode.INVALID_VAPID_KEY */
  ]: "The public VAPID key must be a string.",
  [
    "use-vapid-key-after-get-token"
    /* ErrorCode.USE_VAPID_KEY_AFTER_GET_TOKEN */
  ]: "The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."
}, p = new W("messaging", "Messaging", $i);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Bi(t, e) {
  const n = await nt(t), r = In(e), o = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let s;
  try {
    s = await (await fetch(tt(t.appConfig), o)).json();
  } catch (i) {
    throw p.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (s.error) {
    const i = s.error.message;
    throw p.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!s.token)
    throw p.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return s.token;
}
async function Li(t, e) {
  const n = await nt(t), r = In(e.subscriptionOptions), o = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let s;
  try {
    s = await (await fetch(`${tt(t.appConfig)}/${e.token}`, o)).json();
  } catch (i) {
    throw p.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (s.error) {
    const i = s.error.message;
    throw p.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!s.token)
    throw p.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return s.token;
}
async function _n(t, e) {
  const r = {
    method: "DELETE",
    headers: await nt(t)
  };
  try {
    const s = await (await fetch(`${tt(t.appConfig)}/${e}`, r)).json();
    if (s.error) {
      const i = s.error.message;
      throw p.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (o) {
    throw p.create("token-unsubscribe-failed", {
      errorInfo: o == null ? void 0 : o.toString()
    });
  }
}
function tt({ projectId: t }) {
  return `${vi}/projects/${t}/registrations`;
}
async function nt({ appConfig: t, installations: e }) {
  const n = await e.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": t.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function In({ p256dh: t, auth: e, endpoint: n, vapidKey: r }) {
  const o = {
    web: {
      endpoint: n,
      auth: e,
      p256dh: t
    }
  };
  return r !== mn && (o.web.applicationPubKey = r), o;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Pi = 7 * 24 * 60 * 60 * 1e3;
async function xi(t) {
  const e = await Fi(t.swRegistration, t.vapidKey), n = {
    vapidKey: t.vapidKey,
    swScope: t.swRegistration.scope,
    endpoint: e.endpoint,
    auth: m(e.getKey("auth")),
    p256dh: m(e.getKey("p256dh"))
  }, r = await yn(t.firebaseDependencies);
  if (r) {
    if (Ui(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + Pi ? Ki(t, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await _n(t.firebaseDependencies, r.token);
    } catch (o) {
      console.warn(o);
    }
    return Tt(t.firebaseDependencies, n);
  } else
    return Tt(t.firebaseDependencies, n);
}
async function ji(t) {
  const e = await yn(t.firebaseDependencies);
  e && (await _n(t.firebaseDependencies, e.token), await Ni(t.firebaseDependencies));
  const n = await t.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function Ki(t, e) {
  try {
    const n = await Li(t.firebaseDependencies, e), r = Object.assign(Object.assign({}, e), { token: n, createTime: Date.now() });
    return await Ze(t.firebaseDependencies, r), n;
  } catch (n) {
    throw await ji(t), n;
  }
}
async function Tt(t, e) {
  const r = {
    token: await Bi(t, e),
    createTime: Date.now(),
    subscriptionOptions: e
  };
  return await Ze(t, r), r.token;
}
async function Fi(t, e) {
  const n = await t.pushManager.getSubscription();
  return n || t.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: ki(e)
  });
}
function Ui(t, e) {
  const n = e.vapidKey === t.vapidKey, r = e.endpoint === t.endpoint, o = e.auth === t.auth, s = e.p256dh === t.p256dh;
  return n && r && o && s;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ct(t) {
  const e = {
    from: t.from,
    // eslint-disable-next-line camelcase
    collapseKey: t.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: t.fcmMessageId
  };
  return Hi(e, t), Wi(e, t), Vi(e, t), e;
}
function Hi(t, e) {
  if (!e.notification)
    return;
  t.notification = {};
  const n = e.notification.title;
  n && (t.notification.title = n);
  const r = e.notification.body;
  r && (t.notification.body = r);
  const o = e.notification.image;
  o && (t.notification.image = o);
  const s = e.notification.icon;
  s && (t.notification.icon = s);
}
function Wi(t, e) {
  e.data && (t.data = e.data);
}
function Vi(t, e) {
  var n, r, o, s, i;
  if (!e.fcmOptions && !(!((n = e.notification) === null || n === void 0) && n.click_action))
    return;
  t.fcmOptions = {};
  const a = (o = (r = e.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && o !== void 0 ? o : (s = e.notification) === null || s === void 0 ? void 0 : s.click_action;
  a && (t.fcmOptions.link = a);
  const c = (i = e.fcmOptions) === null || i === void 0 ? void 0 : i.analytics_label;
  c && (t.fcmOptions.analyticsLabel = c);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function qi(t) {
  return typeof t == "object" && !!t && wn in t;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
En("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
En("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function En(t, e) {
  const n = [];
  for (let r = 0; r < t.length; r++)
    n.push(t.charAt(r)), r < e.length && n.push(e.charAt(r));
  return n.join("");
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gi(t) {
  if (!t || !t.options)
    throw _e("App Configuration Object");
  if (!t.name)
    throw _e("App Name");
  const e = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = t;
  for (const r of e)
    if (!n[r])
      throw _e(r);
  return {
    appName: t.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function _e(t) {
  return p.create("missing-app-config-values", {
    valueName: t
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zi {
  constructor(e, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const o = Gi(e);
    this.firebaseDependencies = {
      app: e,
      appConfig: o,
      installations: n,
      analyticsProvider: r
    };
  }
  _delete() {
    return Promise.resolve();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Ji(t) {
  try {
    t.swRegistration = await navigator.serviceWorker.register(Ii, {
      scope: Ei
    }), t.swRegistration.update().catch(() => {
    });
  } catch (e) {
    throw p.create("failed-service-worker-registration", {
      browserErrorMessage: e == null ? void 0 : e.message
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Yi(t, e) {
  if (!e && !t.swRegistration && await Ji(t), !(!e && t.swRegistration)) {
    if (!(e instanceof ServiceWorkerRegistration))
      throw p.create(
        "invalid-sw-registration"
        /* ErrorCode.INVALID_SW_REGISTRATION */
      );
    t.swRegistration = e;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Xi(t, e) {
  e ? t.vapidKey = e : t.vapidKey || (t.vapidKey = mn);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function vn(t, e) {
  if (!navigator)
    throw p.create(
      "only-available-in-window"
      /* ErrorCode.AVAILABLE_IN_WINDOW */
    );
  if (Notification.permission === "default" && await Notification.requestPermission(), Notification.permission !== "granted")
    throw p.create(
      "permission-blocked"
      /* ErrorCode.PERMISSION_BLOCKED */
    );
  return await Xi(t, e == null ? void 0 : e.vapidKey), await Yi(t, e == null ? void 0 : e.serviceWorkerRegistration), xi(t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Qi(t, e, n) {
  const r = Zi(e);
  (await t.firebaseDependencies.analyticsProvider.get()).logEvent(r, {
    /* eslint-disable camelcase */
    message_id: n[wn],
    message_name: n[Si],
    message_time: n[Ti],
    message_device_time: Math.floor(Date.now() / 1e3)
    /* eslint-enable camelcase */
  });
}
function Zi(t) {
  switch (t) {
    case H.NOTIFICATION_CLICKED:
      return "notification_open";
    case H.PUSH_RECEIVED:
      return "notification_foreground";
    default:
      throw new Error();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function ea(t, e) {
  const n = e.data;
  if (!n.isFirebaseMessaging)
    return;
  t.onMessageHandler && n.messageType === H.PUSH_RECEIVED && (typeof t.onMessageHandler == "function" ? t.onMessageHandler(Ct(n)) : t.onMessageHandler.next(Ct(n)));
  const r = n.data;
  qi(r) && r[Ci] === "1" && await Qi(t, n.messageType, r);
}
const kt = "@firebase/messaging", Dt = "0.12.4";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ta = (t) => {
  const e = new zi(t.getProvider("app").getImmediate(), t.getProvider("installations-internal").getImmediate(), t.getProvider("analytics-internal"));
  return navigator.serviceWorker.addEventListener("message", (n) => ea(e, n)), e;
}, na = (t) => {
  const e = t.getProvider("messaging").getImmediate();
  return {
    getToken: (r) => vn(e, r)
  };
};
function ra() {
  D(new E(
    "messaging",
    ta,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), D(new E(
    "messaging-internal",
    na,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), C(kt, Dt), C(kt, Dt, "esm2017");
}
async function oa(t, e) {
  return t = Pe(t), vn(t, e);
}
ra();
const $e = new BroadcastChannel("talker-sw"), sa = jt(_i), Sn = wi(sa);
yi(Sn, (t) => {
  console.log(" Received background message ", t);
  const e = "Background Message Title", n = {
    body: "Background Message body."
  };
  self.registration.showNotification(e, n);
});
Zn([{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"firebase-messaging-sw.js"},{"revision":"650c96fe4141b24d1297e91e0b5f5a50","url":"index.html"},{"revision":"ccf8c0e3ea8c834ac8974a2bef90d113","url":"talker.svg"},{"revision":"22290268c8e4f86da83952e3345d733f","url":"manifest.webmanifest"}] || []);
Rt(
  ({ request: t }) => t.mode === "navigate",
  Xn("/index.html")
);
let Ie = !1;
const ia = {
  debug: "#7f8c8d",
  log: "#2ecc71",
  warn: "#f39c12",
  error: "#c0392b",
  groupCollapsed: "#3498db",
  groupEnd: null
  // No colored prefix on groupEnd
}, I = function(t, e) {
  if (t === "groupCollapsed" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    console[t](...e);
    return;
  }
  const n = [
    `background: ${ia[t]}`,
    "border-radius: 0.5em",
    "color: white",
    "font-weight: bold",
    "padding: 2px 0.5em"
  ], r = Ie ? [] : ["%cTalker SW", n.join(";")];
  console[t](...r, ...e), t === "groupCollapsed" && (Ie = !0), t === "groupEnd" && (Ie = !1);
};
self.addEventListener("activate", async () => {
  I("log", ["Running..."]);
  const t = await oa(Sn, {
    serviceWorkerRegistration: self.registration,
    vapidKey: "BOF-yJZi4d8yVCVRkD6lvrviRbMObr7fHl5ma2IyJzjDC4-Ecr9_FGJsDTloNVuETMQUqH7MVEoXfV3MkGg5yO4"
  });
  $e.postMessage({
    type: "TOKEN_DOWNLOAD",
    token: t
  }), I("log", [t]);
});
self.addEventListener("notificationclick", (t) => {
  const { notification: e } = t;
  I("groupCollapsed", ["Notification clicked!"]), I("log", [`Action -> ${t.action ?? "empty"}`, e.data]), I("groupEnd", []);
});
$e.onmessage = (t) => {
  var e;
  ((e = t.data) == null ? void 0 : e.type) === "INIT_COMMUNICATION" && (I("log", ["Communication initialized"]), $e.postMessage({
    type: "Communication initialized"
  }));
};
self.addEventListener("message", (t) => {
  const e = t.data;
  e && (I("groupCollapsed", ["Message send!"]), I("log", [`Action -> ${e.type ?? "empty"}`, e]), I("groupEnd", []));
});
