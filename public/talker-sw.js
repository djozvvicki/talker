try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const kn = (e, ...t) => {
  let n = e;
  return t.length > 0 && (n += ` :: ${JSON.stringify(t)}`), n;
}, Dn = kn;
class p extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(t, n) {
    const r = Dn(t, n);
    super(r), this.name = t, this.details = n;
  }
}
const y = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, re = (e) => [y.prefix, e, y.suffix].filter((t) => t && t.length > 0).join("-"), An = (e) => {
  for (const t of Object.keys(y))
    e(t);
}, Le = {
  updateDetails: (e) => {
    An((t) => {
      typeof e[t] == "string" && (y[t] = e[t]);
    });
  },
  getGoogleAnalyticsName: (e) => e || re(y.googleAnalytics),
  getPrecacheName: (e) => e || re(y.precache),
  getPrefix: () => y.prefix,
  getRuntimeName: (e) => e || re(y.runtime),
  getSuffix: () => y.suffix
};
function st(e, t) {
  const n = t();
  return e.waitUntil(n), n;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const Rn = "__WB_REVISION__";
function On(e) {
  if (!e)
    throw new p("add-to-cache-list-unexpected-type", { entry: e });
  if (typeof e == "string") {
    const o = new URL(e, location.href);
    return {
      cacheKey: o.href,
      url: o.href
    };
  }
  const { revision: t, url: n } = e;
  if (!n)
    throw new p("add-to-cache-list-unexpected-type", { entry: e });
  if (!t) {
    const o = new URL(n, location.href);
    return {
      cacheKey: o.href,
      url: o.href
    };
  }
  const r = new URL(n, location.href), s = new URL(n, location.href);
  return r.searchParams.set(Rn, t), {
    cacheKey: r.href,
    url: s.href
  };
}
class Mn {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: t, state: n }) => {
      n && (n.originalRequest = t);
    }, this.cachedResponseWillBeUsed = async ({ event: t, state: n, cachedResponse: r }) => {
      if (t.type === "install" && n && n.originalRequest && n.originalRequest instanceof Request) {
        const s = n.originalRequest.url;
        r ? this.notUpdatedURLs.push(s) : this.updatedURLs.push(s);
      }
      return r;
    };
  }
}
class Nn {
  constructor({ precacheController: t }) {
    this.cacheKeyWillBeUsed = async ({ request: n, params: r }) => {
      const s = (r == null ? void 0 : r.cacheKey) || this._precacheController.getCacheKeyForURL(n.url);
      return s ? new Request(s, { headers: n.headers }) : n;
    }, this._precacheController = t;
  }
}
let F;
function $n() {
  if (F === void 0) {
    const e = new Response("");
    if ("body" in e)
      try {
        new Response(e.body), F = !0;
      } catch {
        F = !1;
      }
    F = !1;
  }
  return F;
}
async function Ln(e, t) {
  let n = null;
  if (e.url && (n = new URL(e.url).origin), n !== self.location.origin)
    throw new p("cross-origin-copy-response", { origin: n });
  const r = e.clone(), s = {
    headers: new Headers(r.headers),
    status: r.status,
    statusText: r.statusText
  }, o = t ? t(s) : s, i = $n() ? r.body : await r.blob();
  return new Response(i, o);
}
const Bn = (e) => new URL(String(e), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function ot(e, t) {
  const n = new URL(e);
  for (const r of t)
    n.searchParams.delete(r);
  return n.href;
}
async function Pn(e, t, n, r) {
  const s = ot(t.url, n);
  if (t.url === s)
    return e.match(t, r);
  const o = Object.assign(Object.assign({}, r), { ignoreSearch: !0 }), i = await e.keys(t, o);
  for (const a of i) {
    const c = ot(a.url, n);
    if (s === c)
      return e.match(a, r);
  }
}
let xn = class {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((t, n) => {
      this.resolve = t, this.reject = n;
    });
  }
};
const jn = /* @__PURE__ */ new Set();
async function Fn() {
  for (const e of jn)
    await e();
}
function Kn(e) {
  return new Promise((t) => setTimeout(t, e));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function G(e) {
  return typeof e == "string" ? new Request(e) : e;
}
class Un {
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
  constructor(t, n) {
    this._cacheKeys = {}, Object.assign(this, n), this.event = n.event, this._strategy = t, this._handlerDeferred = new xn(), this._extendLifetimePromises = [], this._plugins = [...t.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
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
  async fetch(t) {
    const { event: n } = this;
    let r = G(t);
    if (r.mode === "navigate" && n instanceof FetchEvent && n.preloadResponse) {
      const i = await n.preloadResponse;
      if (i)
        return i;
    }
    const s = this.hasCallback("fetchDidFail") ? r.clone() : null;
    try {
      for (const i of this.iterateCallbacks("requestWillFetch"))
        r = await i({ request: r.clone(), event: n });
    } catch (i) {
      if (i instanceof Error)
        throw new p("plugin-error-request-will-fetch", {
          thrownErrorMessage: i.message
        });
    }
    const o = r.clone();
    try {
      let i;
      i = await fetch(r, r.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const a of this.iterateCallbacks("fetchDidSucceed"))
        i = await a({
          event: n,
          request: o,
          response: i
        });
      return i;
    } catch (i) {
      throw s && await this.runCallbacks("fetchDidFail", {
        error: i,
        event: n,
        originalRequest: s.clone(),
        request: o.clone()
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
  async fetchAndCachePut(t) {
    const n = await this.fetch(t), r = n.clone();
    return this.waitUntil(this.cachePut(t, r)), n;
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
  async cacheMatch(t) {
    const n = G(t);
    let r;
    const { cacheName: s, matchOptions: o } = this._strategy, i = await this.getCacheKey(n, "read"), a = Object.assign(Object.assign({}, o), { cacheName: s });
    r = await caches.match(i, a);
    for (const c of this.iterateCallbacks("cachedResponseWillBeUsed"))
      r = await c({
        cacheName: s,
        matchOptions: o,
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
  async cachePut(t, n) {
    const r = G(t);
    await Kn(0);
    const s = await this.getCacheKey(r, "write");
    if (!n)
      throw new p("cache-put-with-no-response", {
        url: Bn(s.url)
      });
    const o = await this._ensureResponseSafeToCache(n);
    if (!o)
      return !1;
    const { cacheName: i, matchOptions: a } = this._strategy, c = await self.caches.open(i), l = this.hasCallback("cacheDidUpdate"), u = l ? await Pn(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      c,
      s.clone(),
      ["__WB_REVISION__"],
      a
    ) : null;
    try {
      await c.put(s, l ? o.clone() : o);
    } catch (h) {
      if (h instanceof Error)
        throw h.name === "QuotaExceededError" && await Fn(), h;
    }
    for (const h of this.iterateCallbacks("cacheDidUpdate"))
      await h({
        cacheName: i,
        oldResponse: u,
        newResponse: o.clone(),
        request: s,
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
  async getCacheKey(t, n) {
    const r = `${t.url} | ${n}`;
    if (!this._cacheKeys[r]) {
      let s = t;
      for (const o of this.iterateCallbacks("cacheKeyWillBeUsed"))
        s = G(await o({
          mode: n,
          request: s,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[r] = s;
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
  hasCallback(t) {
    for (const n of this._strategy.plugins)
      if (t in n)
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
  async runCallbacks(t, n) {
    for (const r of this.iterateCallbacks(t))
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
  *iterateCallbacks(t) {
    for (const n of this._strategy.plugins)
      if (typeof n[t] == "function") {
        const r = this._pluginStateMap.get(n);
        yield (o) => {
          const i = Object.assign(Object.assign({}, o), { state: r });
          return n[t](i);
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
  waitUntil(t) {
    return this._extendLifetimePromises.push(t), t;
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
    let t;
    for (; t = this._extendLifetimePromises.shift(); )
      await t;
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
  async _ensureResponseSafeToCache(t) {
    let n = t, r = !1;
    for (const s of this.iterateCallbacks("cacheWillUpdate"))
      if (n = await s({
        request: this.request,
        response: n,
        event: this.event
      }) || void 0, r = !0, !n)
        break;
    return r || n && n.status !== 200 && (n = void 0), n;
  }
}
class Be {
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
  constructor(t = {}) {
    this.cacheName = Le.getRuntimeName(t.cacheName), this.plugins = t.plugins || [], this.fetchOptions = t.fetchOptions, this.matchOptions = t.matchOptions;
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
  handle(t) {
    const [n] = this.handleAll(t);
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
  handleAll(t) {
    t instanceof FetchEvent && (t = {
      event: t,
      request: t.request
    });
    const n = t.event, r = typeof t.request == "string" ? new Request(t.request) : t.request, s = "params" in t ? t.params : void 0, o = new Un(this, { event: n, request: r, params: s }), i = this._getResponse(o, r, n), a = this._awaitComplete(i, o, r, n);
    return [i, a];
  }
  async _getResponse(t, n, r) {
    await t.runCallbacks("handlerWillStart", { event: r, request: n });
    let s;
    try {
      if (s = await this._handle(n, t), !s || s.type === "error")
        throw new p("no-response", { url: n.url });
    } catch (o) {
      if (o instanceof Error) {
        for (const i of t.iterateCallbacks("handlerDidError"))
          if (s = await i({ error: o, event: r, request: n }), s)
            break;
      }
      if (!s)
        throw o;
    }
    for (const o of t.iterateCallbacks("handlerWillRespond"))
      s = await o({ event: r, request: n, response: s });
    return s;
  }
  async _awaitComplete(t, n, r, s) {
    let o, i;
    try {
      o = await t;
    } catch {
    }
    try {
      await n.runCallbacks("handlerDidRespond", {
        event: s,
        request: r,
        response: o
      }), await n.doneWaiting();
    } catch (a) {
      a instanceof Error && (i = a);
    }
    if (await n.runCallbacks("handlerDidComplete", {
      event: s,
      request: r,
      response: o,
      error: i
    }), n.destroy(), i)
      throw i;
  }
}
class v extends Be {
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
  constructor(t = {}) {
    t.cacheName = Le.getPrecacheName(t.cacheName), super(t), this._fallbackToNetwork = t.fallbackToNetwork !== !1, this.plugins.push(v.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(t, n) {
    const r = await n.cacheMatch(t);
    return r || (n.event && n.event.type === "install" ? await this._handleInstall(t, n) : await this._handleFetch(t, n));
  }
  async _handleFetch(t, n) {
    let r;
    const s = n.params || {};
    if (this._fallbackToNetwork) {
      const o = s.integrity, i = t.integrity, a = !i || i === o;
      r = await n.fetch(new Request(t, {
        integrity: t.mode !== "no-cors" ? i || o : void 0
      })), o && a && t.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await n.cachePut(t, r.clone()));
    } else
      throw new p("missing-precache-entry", {
        cacheName: this.cacheName,
        url: t.url
      });
    return r;
  }
  async _handleInstall(t, n) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const r = await n.fetch(t);
    if (!await n.cachePut(t, r.clone()))
      throw new p("bad-precaching-response", {
        url: t.url,
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
    let t = null, n = 0;
    for (const [r, s] of this.plugins.entries())
      s !== v.copyRedirectedCacheableResponsesPlugin && (s === v.defaultPrecacheCacheabilityPlugin && (t = r), s.cacheWillUpdate && n++);
    n === 0 ? this.plugins.push(v.defaultPrecacheCacheabilityPlugin) : n > 1 && t !== null && this.plugins.splice(t, 1);
  }
}
v.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: e }) {
    return !e || e.status >= 400 ? null : e;
  }
};
v.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: e }) {
    return e.redirected ? await Ln(e) : e;
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
  constructor({ cacheName: t, plugins: n = [], fallbackToNetwork: r = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new v({
      cacheName: Le.getPrecacheName(t),
      plugins: [
        ...n,
        new Nn({ precacheController: this })
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
  precache(t) {
    this.addToCacheList(t), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(t) {
    const n = [];
    for (const r of t) {
      typeof r == "string" ? n.push(r) : r && r.revision === void 0 && n.push(r.url);
      const { cacheKey: s, url: o } = On(r), i = typeof r != "string" && r.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(o) && this._urlsToCacheKeys.get(o) !== s)
        throw new p("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(o),
          secondEntry: s
        });
      if (typeof r != "string" && r.integrity) {
        if (this._cacheKeysToIntegrities.has(s) && this._cacheKeysToIntegrities.get(s) !== r.integrity)
          throw new p("add-to-cache-list-conflicting-integrities", {
            url: o
          });
        this._cacheKeysToIntegrities.set(s, r.integrity);
      }
      if (this._urlsToCacheKeys.set(o, s), this._urlsToCacheModes.set(o, i), n.length > 0) {
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
  install(t) {
    return st(t, async () => {
      const n = new Mn();
      this.strategy.plugins.push(n);
      for (const [o, i] of this._urlsToCacheKeys) {
        const a = this._cacheKeysToIntegrities.get(i), c = this._urlsToCacheModes.get(o), l = new Request(o, {
          integrity: a,
          cache: c,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: i },
          request: l,
          event: t
        }));
      }
      const { updatedURLs: r, notUpdatedURLs: s } = n;
      return { updatedURLs: r, notUpdatedURLs: s };
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
  activate(t) {
    return st(t, async () => {
      const n = await self.caches.open(this.strategy.cacheName), r = await n.keys(), s = new Set(this._urlsToCacheKeys.values()), o = [];
      for (const i of r)
        s.has(i.url) || (await n.delete(i), o.push(i.url));
      return { deletedURLs: o };
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
  getCacheKeyForURL(t) {
    const n = new URL(t, location.href);
    return this._urlsToCacheKeys.get(n.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(t) {
    return this._cacheKeysToIntegrities.get(t);
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
  async matchPrecache(t) {
    const n = t instanceof Request ? t.url : t, r = this.getCacheKeyForURL(n);
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
  createHandlerBoundToURL(t) {
    const n = this.getCacheKeyForURL(t);
    if (!n)
      throw new p("non-precached-url", { url: t });
    return (r) => (r.request = new Request(t), r.params = Object.assign({ cacheKey: n }, r.params), this.strategy.handle(r));
  }
}
let se;
const Pe = () => (se || (se = new Hn()), se);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const Rt = "GET", z = (e) => e && typeof e == "object" ? e : { handle: e };
class S {
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
  constructor(t, n, r = Rt) {
    this.handler = z(n), this.match = t, this.method = r;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(t) {
    this.catchHandler = z(t);
  }
}
class Wn extends S {
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
  constructor(t, n, r) {
    const s = ({ url: o }) => {
      const i = t.exec(o.href);
      if (i && !(o.origin !== location.origin && i.index !== 0))
        return i.slice(1);
    };
    super(s, n, r);
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
    self.addEventListener("fetch", (t) => {
      const { request: n } = t, r = this.handleRequest({ request: n, event: t });
      r && t.respondWith(r);
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
    self.addEventListener("message", (t) => {
      if (t.data && t.data.type === "CACHE_URLS") {
        const { payload: n } = t.data, r = Promise.all(n.urlsToCache.map((s) => {
          typeof s == "string" && (s = [s]);
          const o = new Request(...s);
          return this.handleRequest({ request: o, event: t });
        }));
        t.waitUntil(r), t.ports && t.ports[0] && r.then(() => t.ports[0].postMessage(!0));
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
  handleRequest({ request: t, event: n }) {
    const r = new URL(t.url, location.href);
    if (!r.protocol.startsWith("http"))
      return;
    const s = r.origin === location.origin, { params: o, route: i } = this.findMatchingRoute({
      event: n,
      request: t,
      sameOrigin: s,
      url: r
    });
    let a = i && i.handler;
    const c = t.method;
    if (!a && this._defaultHandlerMap.has(c) && (a = this._defaultHandlerMap.get(c)), !a)
      return;
    let l;
    try {
      l = a.handle({ url: r, request: t, event: n, params: o });
    } catch (h) {
      l = Promise.reject(h);
    }
    const u = i && i.catchHandler;
    return l instanceof Promise && (this._catchHandler || u) && (l = l.catch(async (h) => {
      if (u)
        try {
          return await u.handle({ url: r, request: t, event: n, params: o });
        } catch (R) {
          R instanceof Error && (h = R);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: r, request: t, event: n });
      throw h;
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
  findMatchingRoute({ url: t, sameOrigin: n, request: r, event: s }) {
    const o = this._routes.get(r.method) || [];
    for (const i of o) {
      let a;
      const c = i.match({ url: t, sameOrigin: n, request: r, event: s });
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
  setDefaultHandler(t, n = Rt) {
    this._defaultHandlerMap.set(n, z(t));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(t) {
    this._catchHandler = z(t);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(t) {
    this._routes.has(t.method) || this._routes.set(t.method, []), this._routes.get(t.method).push(t);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(t) {
    if (!this._routes.has(t.method))
      throw new p("unregister-route-but-not-found-with-method", {
        method: t.method
      });
    const n = this._routes.get(t.method).indexOf(t);
    if (n > -1)
      this._routes.get(t.method).splice(n, 1);
    else
      throw new p("unregister-route-route-not-registered");
  }
}
let K;
const qn = () => (K || (K = new Vn(), K.addFetchListener(), K.addCacheListener()), K);
function W(e, t, n) {
  let r;
  if (typeof e == "string") {
    const o = new URL(e, location.href), i = ({ url: a }) => a.href === o.href;
    r = new S(i, t, n);
  } else if (e instanceof RegExp)
    r = new Wn(e, t, n);
  else if (typeof e == "function")
    r = new S(e, t, n);
  else if (e instanceof S)
    r = e;
  else
    throw new p("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return qn().registerRoute(r), r;
}
function Gn(e, t = []) {
  for (const n of [...e.searchParams.keys()])
    t.some((r) => r.test(n)) && e.searchParams.delete(n);
  return e;
}
function* zn(e, { ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/], directoryIndex: n = "index.html", cleanURLs: r = !0, urlManipulation: s } = {}) {
  const o = new URL(e, location.href);
  o.hash = "", yield o.href;
  const i = Gn(o, t);
  if (yield i.href, n && i.pathname.endsWith("/")) {
    const a = new URL(i.href);
    a.pathname += n, yield a.href;
  }
  if (r) {
    const a = new URL(i.href);
    a.pathname += ".html", yield a.href;
  }
  if (s) {
    const a = s({ url: o });
    for (const c of a)
      yield c.href;
  }
}
class Jn extends S {
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
  constructor(t, n) {
    const r = ({ request: s }) => {
      const o = t.getURLsToCacheKeys();
      for (const i of zn(s.url, n)) {
        const a = o.get(i);
        if (a) {
          const c = t.getIntegrityForCacheKey(a);
          return { cacheKey: a, integrity: c };
        }
      }
    };
    super(r, t.strategy);
  }
}
function Yn(e) {
  const t = Pe(), n = new Jn(t, e);
  W(n);
}
function Xn(e) {
  return Pe().createHandlerBoundToURL(e);
}
function Qn(e) {
  Pe().precache(e);
}
function Zn(e, t) {
  Qn(e), Yn(t);
}
class Ot extends Be {
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(t, n) {
    let r = await n.cacheMatch(t), s;
    if (!r)
      try {
        r = await n.fetchAndCachePut(t);
      } catch (o) {
        o instanceof Error && (s = o);
      }
    if (!r)
      throw new p("no-response", { url: t.url, error: s });
    return r;
  }
}
const er = {
  /**
   * Returns a valid response (to allow caching) if the status is 200 (OK) or
   * 0 (opaque).
   *
   * @param {Object} options
   * @param {Response} options.response
   * @return {Response|null}
   *
   * @private
   */
  cacheWillUpdate: async ({ response: e }) => e.status === 200 || e.status === 0 ? e : null
};
class tr extends Be {
  /**
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor(t = {}) {
    super(t), this.plugins.some((n) => "cacheWillUpdate" in n) || this.plugins.unshift(er);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(t, n) {
    const r = n.fetchAndCachePut(t).catch(() => {
    });
    n.waitUntil(r);
    let s = await n.cacheMatch(t), o;
    if (!s)
      try {
        s = await r;
      } catch (i) {
        i instanceof Error && (o = i);
      }
    if (!s)
      throw new p("no-response", { url: t.url, error: o });
    return s;
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
const Mt = function(e) {
  const t = [];
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    let s = e.charCodeAt(r);
    s < 128 ? t[n++] = s : s < 2048 ? (t[n++] = s >> 6 | 192, t[n++] = s & 63 | 128) : (s & 64512) === 55296 && r + 1 < e.length && (e.charCodeAt(r + 1) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++r) & 1023), t[n++] = s >> 18 | 240, t[n++] = s >> 12 & 63 | 128, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128) : (t[n++] = s >> 12 | 224, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128);
  }
  return t;
}, nr = function(e) {
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; ) {
    const s = e[n++];
    if (s < 128)
      t[r++] = String.fromCharCode(s);
    else if (s > 191 && s < 224) {
      const o = e[n++];
      t[r++] = String.fromCharCode((s & 31) << 6 | o & 63);
    } else if (s > 239 && s < 365) {
      const o = e[n++], i = e[n++], a = e[n++], c = ((s & 7) << 18 | (o & 63) << 12 | (i & 63) << 6 | a & 63) - 65536;
      t[r++] = String.fromCharCode(55296 + (c >> 10)), t[r++] = String.fromCharCode(56320 + (c & 1023));
    } else {
      const o = e[n++], i = e[n++];
      t[r++] = String.fromCharCode((s & 15) << 12 | (o & 63) << 6 | i & 63);
    }
  }
  return t.join("");
}, Nt = {
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
  encodeByteArray(e, t) {
    if (!Array.isArray(e))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, r = [];
    for (let s = 0; s < e.length; s += 3) {
      const o = e[s], i = s + 1 < e.length, a = i ? e[s + 1] : 0, c = s + 2 < e.length, l = c ? e[s + 2] : 0, u = o >> 2, h = (o & 3) << 4 | a >> 4;
      let R = (a & 15) << 2 | l >> 6, q = l & 63;
      c || (q = 64, i || (R = 64)), r.push(n[u], n[h], n[R], n[q]);
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
  encodeString(e, t) {
    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Mt(e), t);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(e, t) {
    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : nr(this.decodeStringToByteArray(e, t));
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
  decodeStringToByteArray(e, t) {
    this.init_();
    const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_, r = [];
    for (let s = 0; s < e.length; ) {
      const o = n[e.charAt(s++)], a = s < e.length ? n[e.charAt(s)] : 0;
      ++s;
      const l = s < e.length ? n[e.charAt(s)] : 64;
      ++s;
      const h = s < e.length ? n[e.charAt(s)] : 64;
      if (++s, o == null || a == null || l == null || h == null)
        throw new rr();
      const R = o << 2 | a >> 4;
      if (r.push(R), l !== 64) {
        const q = a << 4 & 240 | l >> 2;
        if (r.push(q), h !== 64) {
          const Cn = l << 6 & 192 | h;
          r.push(Cn);
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
      for (let e = 0; e < this.ENCODED_VALS.length; e++)
        this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e), this.charToByteMap_[this.byteToCharMap_[e]] = e, this.byteToCharMapWebSafe_[e] = this.ENCODED_VALS_WEBSAFE.charAt(e), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e, e >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e);
    }
  }
};
class rr extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const sr = function(e) {
  const t = Mt(e);
  return Nt.encodeByteArray(t, !0);
}, $t = function(e) {
  return sr(e).replace(/\./g, "");
}, or = function(e) {
  try {
    return Nt.decodeString(e, !0);
  } catch (t) {
    console.error("base64Decode failed: ", t);
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
function ir() {
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
const ar = () => ir().__FIREBASE_DEFAULTS__, cr = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const e = process.env.__FIREBASE_DEFAULTS__;
  if (e)
    return JSON.parse(e);
}, ur = () => {
  if (typeof document > "u")
    return;
  let e;
  try {
    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const t = e && or(e[1]);
  return t && JSON.parse(t);
}, lr = () => {
  try {
    return ar() || cr() || ur();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
}, Lt = () => {
  var e;
  return (e = lr()) === null || e === void 0 ? void 0 : e.config;
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
class dr {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((t, n) => {
      this.resolve = t, this.reject = n;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(t) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r), typeof t == "function" && (this.promise.catch(() => {
      }), t.length === 1 ? t(n) : t(n, r));
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
function Pt() {
  return new Promise((e, t) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module", s = self.indexedDB.open(r);
      s.onsuccess = () => {
        s.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
      }, s.onupgradeneeded = () => {
        n = !1;
      }, s.onerror = () => {
        var o;
        t(((o = s.error) === null || o === void 0 ? void 0 : o.message) || "");
      };
    } catch (n) {
      t(n);
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
const fr = "FirebaseError";
class j extends Error {
  constructor(t, n, r) {
    super(n), this.code = t, this.customData = r, this.name = fr, Object.setPrototypeOf(this, j.prototype), Error.captureStackTrace && Error.captureStackTrace(this, V.prototype.create);
  }
}
class V {
  constructor(t, n, r) {
    this.service = t, this.serviceName = n, this.errors = r;
  }
  create(t, ...n) {
    const r = n[0] || {}, s = `${this.service}/${t}`, o = this.errors[t], i = o ? hr(o, r) : "Error", a = `${this.serviceName}: ${i} (${s}).`;
    return new j(s, a, r);
  }
}
function hr(e, t) {
  return e.replace(pr, (n, r) => {
    const s = t[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const pr = /\{\$([^}]+)}/g;
function ve(e, t) {
  if (e === t)
    return !0;
  const n = Object.keys(e), r = Object.keys(t);
  for (const s of n) {
    if (!r.includes(s))
      return !1;
    const o = e[s], i = t[s];
    if (it(o) && it(i)) {
      if (!ve(o, i))
        return !1;
    } else if (o !== i)
      return !1;
  }
  for (const s of r)
    if (!n.includes(s))
      return !1;
  return !0;
}
function it(e) {
  return e !== null && typeof e == "object";
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
function xe(e) {
  return e && e._delegate ? e._delegate : e;
}
class E {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(t, n, r) {
    this.name = t, this.instanceFactory = n, this.type = r, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(t) {
    return this.instantiationMode = t, this;
  }
  setMultipleInstances(t) {
    return this.multipleInstances = t, this;
  }
  setServiceProps(t) {
    return this.serviceProps = t, this;
  }
  setInstanceCreatedCallback(t) {
    return this.onInstanceCreated = t, this;
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
const O = "[DEFAULT]";
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
class gr {
  constructor(t, n) {
    this.name = t, this.container = n, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(t) {
    const n = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(n)) {
      const r = new dr();
      if (this.instancesDeferred.set(n, r), this.isInitialized(n) || this.shouldAutoInitialize())
        try {
          const s = this.getOrInitializeService({
            instanceIdentifier: n
          });
          s && r.resolve(s);
        } catch {
        }
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(t) {
    var n;
    const r = this.normalizeInstanceIdentifier(t == null ? void 0 : t.identifier), s = (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: r
        });
      } catch (o) {
        if (s)
          return null;
        throw o;
      }
    else {
      if (s)
        return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = t, !!this.shouldAutoInitialize()) {
      if (br(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: O });
        } catch {
        }
      for (const [n, r] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(n);
        try {
          const o = this.getOrInitializeService({
            instanceIdentifier: s
          });
          r.resolve(o);
        } catch {
        }
      }
    }
  }
  clearInstance(t = O) {
    this.instancesDeferred.delete(t), this.instancesOptions.delete(t), this.instances.delete(t);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => "_delete" in n).map((n) => n._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = O) {
    return this.instances.has(t);
  }
  getOptions(t = O) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: n = {} } = t, r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const s = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n
    });
    for (const [o, i] of this.instancesDeferred.entries()) {
      const a = this.normalizeInstanceIdentifier(o);
      r === a && i.resolve(s);
    }
    return s;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(t, n) {
    var r;
    const s = this.normalizeInstanceIdentifier(n), o = (r = this.onInitCallbacks.get(s)) !== null && r !== void 0 ? r : /* @__PURE__ */ new Set();
    o.add(t), this.onInitCallbacks.set(s, o);
    const i = this.instances.get(s);
    return i && t(i, s), () => {
      o.delete(t);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const s of r)
        try {
          s(t, n);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t);
    if (!r && this.component && (r = this.component.instanceFactory(this.container, {
      instanceIdentifier: mr(t),
      options: n
    }), this.instances.set(t, r), this.instancesOptions.set(t, n), this.invokeOnInitCallbacks(r, t), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, t, r);
      } catch {
      }
    return r || null;
  }
  normalizeInstanceIdentifier(t = O) {
    return this.component ? this.component.multipleInstances ? t : O : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function mr(e) {
  return e === O ? void 0 : e;
}
function br(e) {
  return e.instantiationMode === "EAGER";
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
class wr {
  constructor(t) {
    this.name = t, this.providers = /* @__PURE__ */ new Map();
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
  addComponent(t) {
    const n = this.getProvider(t.name);
    if (n.isComponentSet())
      throw new Error(`Component ${t.name} has already been registered with ${this.name}`);
    n.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name), this.addComponent(t);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(t) {
    if (this.providers.has(t))
      return this.providers.get(t);
    const n = new gr(t, this);
    return this.providers.set(t, n), n;
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
(function(e) {
  e[e.DEBUG = 0] = "DEBUG", e[e.VERBOSE = 1] = "VERBOSE", e[e.INFO = 2] = "INFO", e[e.WARN = 3] = "WARN", e[e.ERROR = 4] = "ERROR", e[e.SILENT = 5] = "SILENT";
})(d || (d = {}));
const yr = {
  debug: d.DEBUG,
  verbose: d.VERBOSE,
  info: d.INFO,
  warn: d.WARN,
  error: d.ERROR,
  silent: d.SILENT
}, _r = d.INFO, Ir = {
  [d.DEBUG]: "log",
  [d.VERBOSE]: "log",
  [d.INFO]: "info",
  [d.WARN]: "warn",
  [d.ERROR]: "error"
}, Er = (e, t, ...n) => {
  if (t < e.logLevel)
    return;
  const r = (/* @__PURE__ */ new Date()).toISOString(), s = Ir[t];
  if (s)
    console[s](`[${r}]  ${e.name}:`, ...n);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
};
class vr {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(t) {
    this.name = t, this._logLevel = _r, this._logHandler = Er, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in d))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(t) {
    this._logLevel = typeof t == "string" ? yr[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, d.DEBUG, ...t), this._logHandler(this, d.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, d.VERBOSE, ...t), this._logHandler(this, d.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, d.INFO, ...t), this._logHandler(this, d.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, d.WARN, ...t), this._logHandler(this, d.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, d.ERROR, ...t), this._logHandler(this, d.ERROR, ...t);
  }
}
const Sr = (e, t) => t.some((n) => e instanceof n);
let at, ct;
function Tr() {
  return at || (at = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Cr() {
  return ct || (ct = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const xt = /* @__PURE__ */ new WeakMap(), Se = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), je = /* @__PURE__ */ new WeakMap();
function kr(e) {
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("success", o), e.removeEventListener("error", i);
    }, o = () => {
      n(T(e.result)), s();
    }, i = () => {
      r(e.error), s();
    };
    e.addEventListener("success", o), e.addEventListener("error", i);
  });
  return t.then((n) => {
    n instanceof IDBCursor && xt.set(n, e);
  }).catch(() => {
  }), je.set(t, e), t;
}
function Dr(e) {
  if (Se.has(e))
    return;
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("complete", o), e.removeEventListener("error", i), e.removeEventListener("abort", i);
    }, o = () => {
      n(), s();
    }, i = () => {
      r(e.error || new DOMException("AbortError", "AbortError")), s();
    };
    e.addEventListener("complete", o), e.addEventListener("error", i), e.addEventListener("abort", i);
  });
  Se.set(e, t);
}
let Te = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Se.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || jt.get(e);
      if (t === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return T(e[t]);
  },
  set(e, t, n) {
    return e[t] = n, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function Ar(e) {
  Te = e(Te);
}
function Rr(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(ie(this), t, ...n);
    return jt.set(r, t.sort ? t.sort() : [t]), T(r);
  } : Cr().includes(e) ? function(...t) {
    return e.apply(ie(this), t), T(xt.get(this));
  } : function(...t) {
    return T(e.apply(ie(this), t));
  };
}
function Or(e) {
  return typeof e == "function" ? Rr(e) : (e instanceof IDBTransaction && Dr(e), Sr(e, Tr()) ? new Proxy(e, Te) : e);
}
function T(e) {
  if (e instanceof IDBRequest)
    return kr(e);
  if (oe.has(e))
    return oe.get(e);
  const t = Or(e);
  return t !== e && (oe.set(e, t), je.set(t, e)), t;
}
const ie = (e) => je.get(e);
function Mr(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
  const i = indexedDB.open(e, t), a = T(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(T(i.result), c.oldVersion, c.newVersion, T(i.transaction), c);
  }), n && i.addEventListener("blocked", (c) => n(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    c.oldVersion,
    c.newVersion,
    c
  )), a.then((c) => {
    o && c.addEventListener("close", () => o()), s && c.addEventListener("versionchange", (l) => s(l.oldVersion, l.newVersion, l));
  }).catch(() => {
  }), a;
}
const Nr = ["get", "getKey", "getAll", "getAllKeys", "count"], $r = ["put", "add", "delete", "clear"], ae = /* @__PURE__ */ new Map();
function ut(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (ae.get(t))
    return ae.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = $r.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Nr.includes(n))
  )
    return;
  const o = async function(i, ...a) {
    const c = this.transaction(i, s ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      s && c.done
    ]))[0];
  };
  return ae.set(t, o), o;
}
Ar((e) => ({
  ...e,
  get: (t, n, r) => ut(t, n) || e.get(t, n, r),
  has: (t, n) => !!ut(t, n) || e.has(t, n)
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
class Lr {
  constructor(t) {
    this.container = t;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((n) => {
      if (Br(n)) {
        const r = n.getImmediate();
        return `${r.library}/${r.version}`;
      } else
        return null;
    }).filter((n) => n).join(" ");
  }
}
function Br(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === "VERSION";
}
const Ce = "@firebase/app", lt = "0.9.12";
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
const N = new vr("@firebase/app"), Pr = "@firebase/app-compat", xr = "@firebase/analytics-compat", jr = "@firebase/analytics", Fr = "@firebase/app-check-compat", Kr = "@firebase/app-check", Ur = "@firebase/auth", Hr = "@firebase/auth-compat", Wr = "@firebase/database", Vr = "@firebase/database-compat", qr = "@firebase/functions", Gr = "@firebase/functions-compat", zr = "@firebase/installations", Jr = "@firebase/installations-compat", Yr = "@firebase/messaging", Xr = "@firebase/messaging-compat", Qr = "@firebase/performance", Zr = "@firebase/performance-compat", es = "@firebase/remote-config", ts = "@firebase/remote-config-compat", ns = "@firebase/storage", rs = "@firebase/storage-compat", ss = "@firebase/firestore", os = "@firebase/firestore-compat", is = "firebase";
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
const ke = "[DEFAULT]", as = {
  [Ce]: "fire-core",
  [Pr]: "fire-core-compat",
  [jr]: "fire-analytics",
  [xr]: "fire-analytics-compat",
  [Kr]: "fire-app-check",
  [Fr]: "fire-app-check-compat",
  [Ur]: "fire-auth",
  [Hr]: "fire-auth-compat",
  [Wr]: "fire-rtdb",
  [Vr]: "fire-rtdb-compat",
  [qr]: "fire-fn",
  [Gr]: "fire-fn-compat",
  [zr]: "fire-iid",
  [Jr]: "fire-iid-compat",
  [Yr]: "fire-fcm",
  [Xr]: "fire-fcm-compat",
  [Qr]: "fire-perf",
  [Zr]: "fire-perf-compat",
  [es]: "fire-rc",
  [ts]: "fire-rc-compat",
  [ns]: "fire-gcs",
  [rs]: "fire-gcs-compat",
  [ss]: "fire-fst",
  [os]: "fire-fst-compat",
  "fire-js": "fire-js",
  [is]: "fire-js-all"
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
const J = /* @__PURE__ */ new Map(), De = /* @__PURE__ */ new Map();
function cs(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    N.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
  }
}
function A(e) {
  const t = e.name;
  if (De.has(t))
    return N.debug(`There were multiple attempts to register component ${t}.`), !1;
  De.set(t, e);
  for (const n of J.values())
    cs(n, e);
  return !0;
}
function Fe(e, t) {
  const n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
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
const us = {
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
}, C = new V("app", "Firebase", us);
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
class ls {
  constructor(t, n, r) {
    this._isDeleted = !1, this._options = Object.assign({}, t), this._config = Object.assign({}, n), this._name = n.name, this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled, this._container = r, this.container.addComponent(new E(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = t;
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
  set isDeleted(t) {
    this._isDeleted = t;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted)
      throw C.create("app-deleted", { appName: this._name });
  }
}
function Ft(e, t = {}) {
  let n = e;
  typeof t != "object" && (t = { name: t });
  const r = Object.assign({ name: ke, automaticDataCollectionEnabled: !1 }, t), s = r.name;
  if (typeof s != "string" || !s)
    throw C.create("bad-app-name", {
      appName: String(s)
    });
  if (n || (n = Lt()), !n)
    throw C.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const o = J.get(s);
  if (o) {
    if (ve(n, o.options) && ve(r, o.config))
      return o;
    throw C.create("duplicate-app", { appName: s });
  }
  const i = new wr(s);
  for (const c of De.values())
    i.addComponent(c);
  const a = new ls(n, r, i);
  return J.set(s, a), a;
}
function ds(e = ke) {
  const t = J.get(e);
  if (!t && e === ke && Lt())
    return Ft();
  if (!t)
    throw C.create("no-app", { appName: e });
  return t;
}
function k(e, t, n) {
  var r;
  let s = (r = as[e]) !== null && r !== void 0 ? r : e;
  n && (s += `-${n}`);
  const o = s.match(/\s|\//), i = t.match(/\s|\//);
  if (o || i) {
    const a = [
      `Unable to register library "${s}" with version "${t}":`
    ];
    o && a.push(`library name "${s}" contains illegal characters (whitespace or "/")`), o && i && a.push("and"), i && a.push(`version name "${t}" contains illegal characters (whitespace or "/")`), N.warn(a.join(" "));
    return;
  }
  A(new E(
    `${s}-version`,
    () => ({ library: s, version: t }),
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
const fs = "firebase-heartbeat-database", hs = 1, U = "firebase-heartbeat-store";
let ce = null;
function Kt() {
  return ce || (ce = Mr(fs, hs, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(U);
      }
    }
  }).catch((e) => {
    throw C.create("idb-open", {
      originalErrorMessage: e.message
    });
  })), ce;
}
async function ps(e) {
  try {
    return await (await Kt()).transaction(U).objectStore(U).get(Ut(e));
  } catch (t) {
    if (t instanceof j)
      N.warn(t.message);
    else {
      const n = C.create("idb-get", {
        originalErrorMessage: t == null ? void 0 : t.message
      });
      N.warn(n.message);
    }
  }
}
async function dt(e, t) {
  try {
    const r = (await Kt()).transaction(U, "readwrite");
    await r.objectStore(U).put(t, Ut(e)), await r.done;
  } catch (n) {
    if (n instanceof j)
      N.warn(n.message);
    else {
      const r = C.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message
      });
      N.warn(r.message);
    }
  }
}
function Ut(e) {
  return `${e.name}!${e.options.appId}`;
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
const gs = 1024, ms = 30 * 24 * 60 * 60 * 1e3;
class bs {
  constructor(t) {
    this.container = t, this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new ys(n), this._heartbeatsCachePromise = this._storage.read().then((r) => (this._heartbeatsCache = r, r));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    const n = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), r = ft();
    if (this._heartbeatsCache === null && (this._heartbeatsCache = await this._heartbeatsCachePromise), !(this._heartbeatsCache.lastSentHeartbeatDate === r || this._heartbeatsCache.heartbeats.some((s) => s.date === r)))
      return this._heartbeatsCache.heartbeats.push({ date: r, agent: n }), this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((s) => {
        const o = new Date(s.date).valueOf();
        return Date.now() - o <= ms;
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
    const t = ft(), { heartbeatsToSend: n, unsentEntries: r } = ws(this._heartbeatsCache.heartbeats), s = $t(JSON.stringify({ version: 2, heartbeats: n }));
    return this._heartbeatsCache.lastSentHeartbeatDate = t, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), s;
  }
}
function ft() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function ws(e, t = gs) {
  const n = [];
  let r = e.slice();
  for (const s of e) {
    const o = n.find((i) => i.agent === s.agent);
    if (o) {
      if (o.dates.push(s.date), ht(n) > t) {
        o.dates.pop();
        break;
      }
    } else if (n.push({
      agent: s.agent,
      dates: [s.date]
    }), ht(n) > t) {
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
class ys {
  constructor(t) {
    this.app = t, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Bt() ? Pt().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    return await this._canUseIndexedDBPromise ? await ps(this.app) || { heartbeats: [] } : { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return dt(this.app, {
        lastSentHeartbeatDate: (n = t.lastSentHeartbeatDate) !== null && n !== void 0 ? n : s.lastSentHeartbeatDate,
        heartbeats: t.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return dt(this.app, {
        lastSentHeartbeatDate: (n = t.lastSentHeartbeatDate) !== null && n !== void 0 ? n : s.lastSentHeartbeatDate,
        heartbeats: [
          ...s.heartbeats,
          ...t.heartbeats
        ]
      });
    } else
      return;
  }
}
function ht(e) {
  return $t(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: e })
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
function _s(e) {
  A(new E(
    "platform-logger",
    (t) => new Lr(t),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), A(new E(
    "heartbeat",
    (t) => new bs(t),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), k(Ce, lt, e), k(Ce, lt, "esm2017"), k("fire-js", "");
}
_s("");
var Is = "firebase", Es = "9.22.2";
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
k(Is, Es, "app");
const vs = (e, t) => t.some((n) => e instanceof n);
let pt, gt;
function Ss() {
  return pt || (pt = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Ts() {
  return gt || (gt = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Ht = /* @__PURE__ */ new WeakMap(), Ae = /* @__PURE__ */ new WeakMap(), Wt = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap();
function Cs(e) {
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("success", o), e.removeEventListener("error", i);
    }, o = () => {
      n(D(e.result)), s();
    }, i = () => {
      r(e.error), s();
    };
    e.addEventListener("success", o), e.addEventListener("error", i);
  });
  return t.then((n) => {
    n instanceof IDBCursor && Ht.set(n, e);
  }).catch(() => {
  }), Ke.set(t, e), t;
}
function ks(e) {
  if (Ae.has(e))
    return;
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("complete", o), e.removeEventListener("error", i), e.removeEventListener("abort", i);
    }, o = () => {
      n(), s();
    }, i = () => {
      r(e.error || new DOMException("AbortError", "AbortError")), s();
    };
    e.addEventListener("complete", o), e.addEventListener("error", i), e.addEventListener("abort", i);
  });
  Ae.set(e, t);
}
let Re = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Ae.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || Wt.get(e);
      if (t === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return D(e[t]);
  },
  set(e, t, n) {
    return e[t] = n, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function Ds(e) {
  Re = e(Re);
}
function As(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(le(this), t, ...n);
    return Wt.set(r, t.sort ? t.sort() : [t]), D(r);
  } : Ts().includes(e) ? function(...t) {
    return e.apply(le(this), t), D(Ht.get(this));
  } : function(...t) {
    return D(e.apply(le(this), t));
  };
}
function Rs(e) {
  return typeof e == "function" ? As(e) : (e instanceof IDBTransaction && ks(e), vs(e, Ss()) ? new Proxy(e, Re) : e);
}
function D(e) {
  if (e instanceof IDBRequest)
    return Cs(e);
  if (ue.has(e))
    return ue.get(e);
  const t = Rs(e);
  return t !== e && (ue.set(e, t), Ke.set(t, e)), t;
}
const le = (e) => Ke.get(e);
function Os(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
  const i = indexedDB.open(e, t), a = D(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(D(i.result), c.oldVersion, c.newVersion, D(i.transaction));
  }), n && i.addEventListener("blocked", () => n()), a.then((c) => {
    o && c.addEventListener("close", () => o()), s && c.addEventListener("versionchange", () => s());
  }).catch(() => {
  }), a;
}
const Ms = ["get", "getKey", "getAll", "getAllKeys", "count"], Ns = ["put", "add", "delete", "clear"], de = /* @__PURE__ */ new Map();
function mt(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (de.get(t))
    return de.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = Ns.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Ms.includes(n))
  )
    return;
  const o = async function(i, ...a) {
    const c = this.transaction(i, s ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      s && c.done
    ]))[0];
  };
  return de.set(t, o), o;
}
Ds((e) => ({
  ...e,
  get: (t, n, r) => mt(t, n) || e.get(t, n, r),
  has: (t, n) => !!mt(t, n) || e.has(t, n)
}));
const Vt = "@firebase/installations", Ue = "0.6.4";
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
const qt = 1e4, Gt = `w:${Ue}`, zt = "FIS_v2", $s = "https://firebaseinstallations.googleapis.com/v1", Ls = 60 * 60 * 1e3, Bs = "installations", Ps = "Installations";
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
const xs = {
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
}, $ = new V(Bs, Ps, xs);
function Jt(e) {
  return e instanceof j && e.code.includes(
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
function Yt({ projectId: e }) {
  return `${$s}/projects/${e}/installations`;
}
function Xt(e) {
  return {
    token: e.token,
    requestStatus: 2,
    expiresIn: Fs(e.expiresIn),
    creationTime: Date.now()
  };
}
async function Qt(e, t) {
  const r = (await t.json()).error;
  return $.create("request-failed", {
    requestName: e,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status
  });
}
function Zt({ apiKey: e }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e
  });
}
function js(e, { refreshToken: t }) {
  const n = Zt(e);
  return n.append("Authorization", Ks(t)), n;
}
async function en(e) {
  const t = await e();
  return t.status >= 500 && t.status < 600 ? e() : t;
}
function Fs(e) {
  return Number(e.replace("s", "000"));
}
function Ks(e) {
  return `${zt} ${e}`;
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
async function Us({ appConfig: e, heartbeatServiceProvider: t }, { fid: n }) {
  const r = Yt(e), s = Zt(e), o = t.getImmediate({
    optional: !0
  });
  if (o) {
    const l = await o.getHeartbeatsHeader();
    l && s.append("x-firebase-client", l);
  }
  const i = {
    fid: n,
    authVersion: zt,
    appId: e.appId,
    sdkVersion: Gt
  }, a = {
    method: "POST",
    headers: s,
    body: JSON.stringify(i)
  }, c = await en(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return {
      fid: l.fid || n,
      registrationStatus: 2,
      refreshToken: l.refreshToken,
      authToken: Xt(l.authToken)
    };
  } else
    throw await Qt("Create Installation", c);
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
function tn(e) {
  return new Promise((t) => {
    setTimeout(t, e);
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
function Hs(e) {
  return btoa(String.fromCharCode(...e)).replace(/\+/g, "-").replace(/\//g, "_");
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
const Ws = /^[cdef][\w-]{21}$/, Oe = "";
function Vs() {
  try {
    const e = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(e), e[0] = 112 + e[0] % 16;
    const n = qs(e);
    return Ws.test(n) ? n : Oe;
  } catch {
    return Oe;
  }
}
function qs(e) {
  return Hs(e).substr(0, 22);
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
function Z(e) {
  return `${e.appName}!${e.appId}`;
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
const nn = /* @__PURE__ */ new Map();
function rn(e, t) {
  const n = Z(e);
  sn(n, t), Gs(n, t);
}
function sn(e, t) {
  const n = nn.get(e);
  if (n)
    for (const r of n)
      r(t);
}
function Gs(e, t) {
  const n = zs();
  n && n.postMessage({ key: e, fid: t }), Js();
}
let M = null;
function zs() {
  return !M && "BroadcastChannel" in self && (M = new BroadcastChannel("[Firebase] FID Change"), M.onmessage = (e) => {
    sn(e.data.key, e.data.fid);
  }), M;
}
function Js() {
  nn.size === 0 && M && (M.close(), M = null);
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
const Ys = "firebase-installations-database", Xs = 1, L = "firebase-installations-store";
let fe = null;
function He() {
  return fe || (fe = Os(Ys, Xs, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(L);
      }
    }
  })), fe;
}
async function Y(e, t) {
  const n = Z(e), s = (await He()).transaction(L, "readwrite"), o = s.objectStore(L), i = await o.get(n);
  return await o.put(t, n), await s.done, (!i || i.fid !== t.fid) && rn(e, t.fid), t;
}
async function on(e) {
  const t = Z(e), r = (await He()).transaction(L, "readwrite");
  await r.objectStore(L).delete(t), await r.done;
}
async function ee(e, t) {
  const n = Z(e), s = (await He()).transaction(L, "readwrite"), o = s.objectStore(L), i = await o.get(n), a = t(i);
  return a === void 0 ? await o.delete(n) : await o.put(a, n), await s.done, a && (!i || i.fid !== a.fid) && rn(e, a.fid), a;
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
async function We(e) {
  let t;
  const n = await ee(e.appConfig, (r) => {
    const s = Qs(r), o = Zs(e, s);
    return t = o.registrationPromise, o.installationEntry;
  });
  return n.fid === Oe ? { installationEntry: await t } : {
    installationEntry: n,
    registrationPromise: t
  };
}
function Qs(e) {
  const t = e || {
    fid: Vs(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return an(t);
}
function Zs(e, t) {
  if (t.registrationStatus === 0) {
    if (!navigator.onLine) {
      const s = Promise.reject($.create(
        "app-offline"
        /* ErrorCode.APP_OFFLINE */
      ));
      return {
        installationEntry: t,
        registrationPromise: s
      };
    }
    const n = {
      fid: t.fid,
      registrationStatus: 1,
      registrationTime: Date.now()
    }, r = eo(e, n);
    return { installationEntry: n, registrationPromise: r };
  } else
    return t.registrationStatus === 1 ? {
      installationEntry: t,
      registrationPromise: to(e)
    } : { installationEntry: t };
}
async function eo(e, t) {
  try {
    const n = await Us(e, t);
    return Y(e.appConfig, n);
  } catch (n) {
    throw Jt(n) && n.customData.serverCode === 409 ? await on(e.appConfig) : await Y(e.appConfig, {
      fid: t.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), n;
  }
}
async function to(e) {
  let t = await bt(e.appConfig);
  for (; t.registrationStatus === 1; )
    await tn(100), t = await bt(e.appConfig);
  if (t.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: r } = await We(e);
    return r || n;
  }
  return t;
}
function bt(e) {
  return ee(e, (t) => {
    if (!t)
      throw $.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return an(t);
  });
}
function an(e) {
  return no(e) ? {
    fid: e.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : e;
}
function no(e) {
  return e.registrationStatus === 1 && e.registrationTime + qt < Date.now();
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
async function ro({ appConfig: e, heartbeatServiceProvider: t }, n) {
  const r = so(e, n), s = js(e, n), o = t.getImmediate({
    optional: !0
  });
  if (o) {
    const l = await o.getHeartbeatsHeader();
    l && s.append("x-firebase-client", l);
  }
  const i = {
    installation: {
      sdkVersion: Gt,
      appId: e.appId
    }
  }, a = {
    method: "POST",
    headers: s,
    body: JSON.stringify(i)
  }, c = await en(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return Xt(l);
  } else
    throw await Qt("Generate Auth Token", c);
}
function so(e, { fid: t }) {
  return `${Yt(e)}/${t}/authTokens:generate`;
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
async function Ve(e, t = !1) {
  let n;
  const r = await ee(e.appConfig, (o) => {
    if (!cn(o))
      throw $.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const i = o.authToken;
    if (!t && ao(i))
      return o;
    if (i.requestStatus === 1)
      return n = oo(e, t), o;
    {
      if (!navigator.onLine)
        throw $.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const a = uo(o);
      return n = io(e, a), a;
    }
  });
  return n ? await n : r.authToken;
}
async function oo(e, t) {
  let n = await wt(e.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await tn(100), n = await wt(e.appConfig);
  const r = n.authToken;
  return r.requestStatus === 0 ? Ve(e, t) : r;
}
function wt(e) {
  return ee(e, (t) => {
    if (!cn(t))
      throw $.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const n = t.authToken;
    return lo(n) ? Object.assign(Object.assign({}, t), { authToken: {
      requestStatus: 0
      /* RequestStatus.NOT_STARTED */
    } }) : t;
  });
}
async function io(e, t) {
  try {
    const n = await ro(e, t), r = Object.assign(Object.assign({}, t), { authToken: n });
    return await Y(e.appConfig, r), n;
  } catch (n) {
    if (Jt(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await on(e.appConfig);
    else {
      const r = Object.assign(Object.assign({}, t), { authToken: {
        requestStatus: 0
        /* RequestStatus.NOT_STARTED */
      } });
      await Y(e.appConfig, r);
    }
    throw n;
  }
}
function cn(e) {
  return e !== void 0 && e.registrationStatus === 2;
}
function ao(e) {
  return e.requestStatus === 2 && !co(e);
}
function co(e) {
  const t = Date.now();
  return t < e.creationTime || e.creationTime + e.expiresIn < t + Ls;
}
function uo(e) {
  const t = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return Object.assign(Object.assign({}, e), { authToken: t });
}
function lo(e) {
  return e.requestStatus === 1 && e.requestTime + qt < Date.now();
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
async function fo(e) {
  const t = e, { installationEntry: n, registrationPromise: r } = await We(t);
  return r ? r.catch(console.error) : Ve(t).catch(console.error), n.fid;
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
async function ho(e, t = !1) {
  const n = e;
  return await po(n), (await Ve(n, t)).token;
}
async function po(e) {
  const { registrationPromise: t } = await We(e);
  t && await t;
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
function go(e) {
  if (!e || !e.options)
    throw he("App Configuration");
  if (!e.name)
    throw he("App Name");
  const t = [
    "projectId",
    "apiKey",
    "appId"
  ];
  for (const n of t)
    if (!e.options[n])
      throw he(n);
  return {
    appName: e.name,
    projectId: e.options.projectId,
    apiKey: e.options.apiKey,
    appId: e.options.appId
  };
}
function he(e) {
  return $.create("missing-app-config-values", {
    valueName: e
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
const un = "installations", mo = "installations-internal", bo = (e) => {
  const t = e.getProvider("app").getImmediate(), n = go(t), r = Fe(t, "heartbeat");
  return {
    app: t,
    appConfig: n,
    heartbeatServiceProvider: r,
    _delete: () => Promise.resolve()
  };
}, wo = (e) => {
  const t = e.getProvider("app").getImmediate(), n = Fe(t, un).getImmediate();
  return {
    getId: () => fo(n),
    getToken: (s) => ho(n, s)
  };
};
function yo() {
  A(new E(
    un,
    bo,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), A(new E(
    mo,
    wo,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
yo();
k(Vt, Ue);
k(Vt, Ue, "esm2017");
const _o = (e, t) => t.some((n) => e instanceof n);
let yt, _t;
function Io() {
  return yt || (yt = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Eo() {
  return _t || (_t = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const ln = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), dn = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap();
function vo(e) {
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("success", o), e.removeEventListener("error", i);
    }, o = () => {
      n(I(e.result)), s();
    }, i = () => {
      r(e.error), s();
    };
    e.addEventListener("success", o), e.addEventListener("error", i);
  });
  return t.then((n) => {
    n instanceof IDBCursor && ln.set(n, e);
  }).catch(() => {
  }), qe.set(t, e), t;
}
function So(e) {
  if (Me.has(e))
    return;
  const t = new Promise((n, r) => {
    const s = () => {
      e.removeEventListener("complete", o), e.removeEventListener("error", i), e.removeEventListener("abort", i);
    }, o = () => {
      n(), s();
    }, i = () => {
      r(e.error || new DOMException("AbortError", "AbortError")), s();
    };
    e.addEventListener("complete", o), e.addEventListener("error", i), e.addEventListener("abort", i);
  });
  Me.set(e, t);
}
let Ne = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Me.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || dn.get(e);
      if (t === "store")
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return I(e[t]);
  },
  set(e, t, n) {
    return e[t] = n, !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store") ? !0 : t in e;
  }
};
function To(e) {
  Ne = e(Ne);
}
function Co(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(ge(this), t, ...n);
    return dn.set(r, t.sort ? t.sort() : [t]), I(r);
  } : Eo().includes(e) ? function(...t) {
    return e.apply(ge(this), t), I(ln.get(this));
  } : function(...t) {
    return I(e.apply(ge(this), t));
  };
}
function ko(e) {
  return typeof e == "function" ? Co(e) : (e instanceof IDBTransaction && So(e), _o(e, Io()) ? new Proxy(e, Ne) : e);
}
function I(e) {
  if (e instanceof IDBRequest)
    return vo(e);
  if (pe.has(e))
    return pe.get(e);
  const t = ko(e);
  return t !== e && (pe.set(e, t), qe.set(t, e)), t;
}
const ge = (e) => qe.get(e);
function te(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
  const i = indexedDB.open(e, t), a = I(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(I(i.result), c.oldVersion, c.newVersion, I(i.transaction));
  }), n && i.addEventListener("blocked", () => n()), a.then((c) => {
    o && c.addEventListener("close", () => o()), s && c.addEventListener("versionchange", () => s());
  }).catch(() => {
  }), a;
}
function x(e, { blocked: t } = {}) {
  const n = indexedDB.deleteDatabase(e);
  return t && n.addEventListener("blocked", () => t()), I(n).then(() => {
  });
}
const Do = ["get", "getKey", "getAll", "getAllKeys", "count"], Ao = ["put", "add", "delete", "clear"], me = /* @__PURE__ */ new Map();
function It(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (me.get(t))
    return me.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = Ao.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Do.includes(n))
  )
    return;
  const o = async function(i, ...a) {
    const c = this.transaction(i, s ? "readwrite" : "readonly");
    let l = c.store;
    return r && (l = l.index(a.shift())), (await Promise.all([
      l[n](...a),
      s && c.done
    ]))[0];
  };
  return me.set(t, o), o;
}
To((e) => ({
  ...e,
  get: (t, n, r) => It(t, n) || e.get(t, n, r),
  has: (t, n) => !!It(t, n) || e.has(t, n)
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
const fn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Ro = "https://fcmregistrations.googleapis.com/v1", hn = "FCM_MSG", Oo = "google.c.a.c_id", Mo = 3, No = 1;
var X;
(function(e) {
  e[e.DATA_MESSAGE = 1] = "DATA_MESSAGE", e[e.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(X || (X = {}));
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
var Q;
(function(e) {
  e.PUSH_RECEIVED = "push-received", e.NOTIFICATION_CLICKED = "notification-clicked";
})(Q || (Q = {}));
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
function b(e) {
  const t = new Uint8Array(e);
  return btoa(String.fromCharCode(...t)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function $o(e) {
  const t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = atob(n), s = new Uint8Array(r.length);
  for (let o = 0; o < r.length; ++o)
    s[o] = r.charCodeAt(o);
  return s;
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
const be = "fcm_token_details_db", Lo = 5, Et = "fcm_token_object_Store";
async function Bo(e) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((o) => o.name).includes(be))
    return null;
  let t = null;
  return (await te(be, Lo, {
    upgrade: async (r, s, o, i) => {
      var a;
      if (s < 2 || !r.objectStoreNames.contains(Et))
        return;
      const c = i.objectStore(Et), l = await c.index("fcmSenderId").get(e);
      if (await c.clear(), !!l) {
        if (s === 2) {
          const u = l;
          if (!u.auth || !u.p256dh || !u.endpoint)
            return;
          t = {
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
        } else if (s === 3) {
          const u = l;
          t = {
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
        } else if (s === 4) {
          const u = l;
          t = {
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
  })).close(), await x(be), await x("fcm_vapid_details_db"), await x("undefined"), Po(t) ? t : null;
}
function Po(e) {
  if (!e || !e.subscriptionOptions)
    return !1;
  const { subscriptionOptions: t } = e;
  return typeof e.createTime == "number" && e.createTime > 0 && typeof e.token == "string" && e.token.length > 0 && typeof t.auth == "string" && t.auth.length > 0 && typeof t.p256dh == "string" && t.p256dh.length > 0 && typeof t.endpoint == "string" && t.endpoint.length > 0 && typeof t.swScope == "string" && t.swScope.length > 0 && typeof t.vapidKey == "string" && t.vapidKey.length > 0;
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
const xo = "firebase-messaging-database", jo = 1, B = "firebase-messaging-store";
let we = null;
function Ge() {
  return we || (we = te(xo, jo, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(B);
      }
    }
  })), we;
}
async function ze(e) {
  const t = Ye(e), r = await (await Ge()).transaction(B).objectStore(B).get(t);
  if (r)
    return r;
  {
    const s = await Bo(e.appConfig.senderId);
    if (s)
      return await Je(e, s), s;
  }
}
async function Je(e, t) {
  const n = Ye(e), s = (await Ge()).transaction(B, "readwrite");
  return await s.objectStore(B).put(t, n), await s.done, t;
}
async function Fo(e) {
  const t = Ye(e), r = (await Ge()).transaction(B, "readwrite");
  await r.objectStore(B).delete(t), await r.done;
}
function Ye({ appConfig: e }) {
  return e.appId;
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
const Ko = {
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
}, m = new V("messaging", "Messaging", Ko);
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
async function Uo(e, t) {
  const n = await Qe(e), r = gn(t), s = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(Xe(e.appConfig), s)).json();
  } catch (i) {
    throw m.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw m.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw m.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return o.token;
}
async function Ho(e, t) {
  const n = await Qe(e), r = gn(t.subscriptionOptions), s = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(`${Xe(e.appConfig)}/${t.token}`, s)).json();
  } catch (i) {
    throw m.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw m.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw m.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return o.token;
}
async function pn(e, t) {
  const r = {
    method: "DELETE",
    headers: await Qe(e)
  };
  try {
    const o = await (await fetch(`${Xe(e.appConfig)}/${t}`, r)).json();
    if (o.error) {
      const i = o.error.message;
      throw m.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (s) {
    throw m.create("token-unsubscribe-failed", {
      errorInfo: s == null ? void 0 : s.toString()
    });
  }
}
function Xe({ projectId: e }) {
  return `${Ro}/projects/${e}/registrations`;
}
async function Qe({ appConfig: e, installations: t }) {
  const n = await t.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function gn({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
  const s = {
    web: {
      endpoint: n,
      auth: t,
      p256dh: e
    }
  };
  return r !== fn && (s.web.applicationPubKey = r), s;
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
const Wo = 7 * 24 * 60 * 60 * 1e3;
async function Vo(e) {
  const t = await Go(e.swRegistration, e.vapidKey), n = {
    vapidKey: e.vapidKey,
    swScope: e.swRegistration.scope,
    endpoint: t.endpoint,
    auth: b(t.getKey("auth")),
    p256dh: b(t.getKey("p256dh"))
  }, r = await ze(e.firebaseDependencies);
  if (r) {
    if (zo(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + Wo ? qo(e, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await pn(e.firebaseDependencies, r.token);
    } catch (s) {
      console.warn(s);
    }
    return vt(e.firebaseDependencies, n);
  } else
    return vt(e.firebaseDependencies, n);
}
async function $e(e) {
  const t = await ze(e.firebaseDependencies);
  t && (await pn(e.firebaseDependencies, t.token), await Fo(e.firebaseDependencies));
  const n = await e.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function qo(e, t) {
  try {
    const n = await Ho(e.firebaseDependencies, t), r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
    return await Je(e.firebaseDependencies, r), n;
  } catch (n) {
    throw await $e(e), n;
  }
}
async function vt(e, t) {
  const r = {
    token: await Uo(e, t),
    createTime: Date.now(),
    subscriptionOptions: t
  };
  return await Je(e, r), r.token;
}
async function Go(e, t) {
  const n = await e.pushManager.getSubscription();
  return n || e.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: $o(t)
  });
}
function zo(e, t) {
  const n = t.vapidKey === e.vapidKey, r = t.endpoint === e.endpoint, s = t.auth === e.auth, o = t.p256dh === e.p256dh;
  return n && r && s && o;
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
function Jo(e) {
  const t = {
    from: e.from,
    // eslint-disable-next-line camelcase
    collapseKey: e.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: e.fcmMessageId
  };
  return Yo(t, e), Xo(t, e), Qo(t, e), t;
}
function Yo(e, t) {
  if (!t.notification)
    return;
  e.notification = {};
  const n = t.notification.title;
  n && (e.notification.title = n);
  const r = t.notification.body;
  r && (e.notification.body = r);
  const s = t.notification.image;
  s && (e.notification.image = s);
  const o = t.notification.icon;
  o && (e.notification.icon = o);
}
function Xo(e, t) {
  t.data && (e.data = t.data);
}
function Qo(e, t) {
  var n, r, s, o, i;
  if (!t.fcmOptions && !(!((n = t.notification) === null || n === void 0) && n.click_action))
    return;
  e.fcmOptions = {};
  const a = (s = (r = t.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && s !== void 0 ? s : (o = t.notification) === null || o === void 0 ? void 0 : o.click_action;
  a && (e.fcmOptions.link = a);
  const c = (i = t.fcmOptions) === null || i === void 0 ? void 0 : i.analytics_label;
  c && (e.fcmOptions.analyticsLabel = c);
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
function Zo(e) {
  return typeof e == "object" && !!e && Oo in e;
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
function ei(e) {
  return new Promise((t) => {
    setTimeout(t, e);
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
mn("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
mn("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
async function ti(e, t) {
  const n = ni(t, await e.firebaseDependencies.installations.getId());
  ri(e, n);
}
function ni(e, t) {
  var n, r;
  const s = {};
  return e.from && (s.project_number = e.from), e.fcmMessageId && (s.message_id = e.fcmMessageId), s.instance_id = t, e.notification ? s.message_type = X.DISPLAY_NOTIFICATION.toString() : s.message_type = X.DATA_MESSAGE.toString(), s.sdk_platform = Mo.toString(), s.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), e.collapse_key && (s.collapse_key = e.collapse_key), s.event = No.toString(), !((n = e.fcmOptions) === null || n === void 0) && n.analytics_label && (s.analytics_label = (r = e.fcmOptions) === null || r === void 0 ? void 0 : r.analytics_label), s;
}
function ri(e, t) {
  const n = {};
  n.event_time_ms = Math.floor(Date.now()).toString(), n.source_extension_json_proto3 = JSON.stringify(t), e.logEvents.push(n);
}
function mn(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++)
    n.push(e.charAt(r)), r < t.length && n.push(t.charAt(r));
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
async function si(e, t) {
  var n, r;
  const { newSubscription: s } = e;
  if (!s) {
    await $e(t);
    return;
  }
  const o = await ze(t.firebaseDependencies);
  await $e(t), t.vapidKey = (r = (n = o == null ? void 0 : o.subscriptionOptions) === null || n === void 0 ? void 0 : n.vapidKey) !== null && r !== void 0 ? r : fn, await Vo(t);
}
async function oi(e, t) {
  const n = ci(e);
  if (!n)
    return;
  t.deliveryMetricsExportedToBigQueryEnabled && await ti(t, n);
  const r = await bn();
  if (li(r))
    return di(r, n);
  if (n.notification && await fi(ai(n)), !!t && t.onBackgroundMessageHandler) {
    const s = Jo(n);
    typeof t.onBackgroundMessageHandler == "function" ? await t.onBackgroundMessageHandler(s) : t.onBackgroundMessageHandler.next(s);
  }
}
async function ii(e) {
  var t, n;
  const r = (n = (t = e.notification) === null || t === void 0 ? void 0 : t.data) === null || n === void 0 ? void 0 : n[hn];
  if (r) {
    if (e.action)
      return;
  } else
    return;
  e.stopImmediatePropagation(), e.notification.close();
  const s = hi(r);
  if (!s)
    return;
  const o = new URL(s, self.location.href), i = new URL(self.location.origin);
  if (o.host !== i.host)
    return;
  let a = await ui(o);
  if (a ? a = await a.focus() : (a = await self.clients.openWindow(s), await ei(3e3)), !!a)
    return r.messageType = Q.NOTIFICATION_CLICKED, r.isFirebaseMessaging = !0, a.postMessage(r);
}
function ai(e) {
  const t = Object.assign({}, e.notification);
  return t.data = {
    [hn]: e
  }, t;
}
function ci({ data: e }) {
  if (!e)
    return null;
  try {
    return e.json();
  } catch {
    return null;
  }
}
async function ui(e) {
  const t = await bn();
  for (const n of t) {
    const r = new URL(n.url, self.location.href);
    if (e.host === r.host)
      return n;
  }
  return null;
}
function li(e) {
  return e.some((t) => t.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !t.url.startsWith("chrome-extension://"));
}
function di(e, t) {
  t.isFirebaseMessaging = !0, t.messageType = Q.PUSH_RECEIVED;
  for (const n of e)
    n.postMessage(t);
}
function bn() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function fi(e) {
  var t;
  const { actions: n } = e, { maxActions: r } = Notification;
  return n && r && n.length > r && console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    (t = e.title) !== null && t !== void 0 ? t : "",
    e
  );
}
function hi(e) {
  var t, n, r;
  const s = (n = (t = e.fcmOptions) === null || t === void 0 ? void 0 : t.link) !== null && n !== void 0 ? n : (r = e.notification) === null || r === void 0 ? void 0 : r.click_action;
  return s || (Zo(e.data) ? self.location.origin : null);
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
function pi(e) {
  if (!e || !e.options)
    throw ye("App Configuration Object");
  if (!e.name)
    throw ye("App Name");
  const t = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = e;
  for (const r of t)
    if (!n[r])
      throw ye(r);
  return {
    appName: e.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function ye(e) {
  return m.create("missing-app-config-values", {
    valueName: e
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
let gi = class {
  constructor(t, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const s = pi(t);
    this.firebaseDependencies = {
      app: t,
      appConfig: s,
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
const mi = (e) => {
  const t = new gi(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
  return self.addEventListener("push", (n) => {
    n.waitUntil(oi(n, t));
  }), self.addEventListener("pushsubscriptionchange", (n) => {
    n.waitUntil(si(n, t));
  }), self.addEventListener("notificationclick", (n) => {
    n.waitUntil(ii(n));
  }), t;
};
function bi() {
  A(new E(
    "messaging-sw",
    mi,
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
async function wi() {
  return Bt() && await Pt() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
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
function yi(e, t) {
  if (self.document !== void 0)
    throw m.create(
      "only-available-in-sw"
      /* ErrorCode.AVAILABLE_IN_SW */
    );
  return e.onBackgroundMessageHandler = t, () => {
    e.onBackgroundMessageHandler = null;
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
function _i(e = ds()) {
  return wi().then((t) => {
    if (!t)
      throw m.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (t) => {
    throw m.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), Fe(xe(e), "messaging-sw").getImmediate();
}
function Ii(e, t) {
  return e = xe(e), yi(e, t);
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
bi();
const Ei = {
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
const vi = "/firebase-messaging-sw.js", Si = "/firebase-cloud-messaging-push-scope", wn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Ti = "https://fcmregistrations.googleapis.com/v1", yn = "google.c.a.c_id", Ci = "google.c.a.c_l", ki = "google.c.a.ts", Di = "google.c.a.e";
var St;
(function(e) {
  e[e.DATA_MESSAGE = 1] = "DATA_MESSAGE", e[e.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(St || (St = {}));
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
(function(e) {
  e.PUSH_RECEIVED = "push-received", e.NOTIFICATION_CLICKED = "notification-clicked";
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
function w(e) {
  const t = new Uint8Array(e);
  return btoa(String.fromCharCode(...t)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Ai(e) {
  const t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = atob(n), s = new Uint8Array(r.length);
  for (let o = 0; o < r.length; ++o)
    s[o] = r.charCodeAt(o);
  return s;
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
const _e = "fcm_token_details_db", Ri = 5, Tt = "fcm_token_object_Store";
async function Oi(e) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((o) => o.name).includes(_e))
    return null;
  let t = null;
  return (await te(_e, Ri, {
    upgrade: async (r, s, o, i) => {
      var a;
      if (s < 2 || !r.objectStoreNames.contains(Tt))
        return;
      const c = i.objectStore(Tt), l = await c.index("fcmSenderId").get(e);
      if (await c.clear(), !!l) {
        if (s === 2) {
          const u = l;
          if (!u.auth || !u.p256dh || !u.endpoint)
            return;
          t = {
            token: u.fcmToken,
            createTime: (a = u.createTime) !== null && a !== void 0 ? a : Date.now(),
            subscriptionOptions: {
              auth: u.auth,
              p256dh: u.p256dh,
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: typeof u.vapidKey == "string" ? u.vapidKey : w(u.vapidKey)
            }
          };
        } else if (s === 3) {
          const u = l;
          t = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: w(u.auth),
              p256dh: w(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: w(u.vapidKey)
            }
          };
        } else if (s === 4) {
          const u = l;
          t = {
            token: u.fcmToken,
            createTime: u.createTime,
            subscriptionOptions: {
              auth: w(u.auth),
              p256dh: w(u.p256dh),
              endpoint: u.endpoint,
              swScope: u.swScope,
              vapidKey: w(u.vapidKey)
            }
          };
        }
      }
    }
  })).close(), await x(_e), await x("fcm_vapid_details_db"), await x("undefined"), Mi(t) ? t : null;
}
function Mi(e) {
  if (!e || !e.subscriptionOptions)
    return !1;
  const { subscriptionOptions: t } = e;
  return typeof e.createTime == "number" && e.createTime > 0 && typeof e.token == "string" && e.token.length > 0 && typeof t.auth == "string" && t.auth.length > 0 && typeof t.p256dh == "string" && t.p256dh.length > 0 && typeof t.endpoint == "string" && t.endpoint.length > 0 && typeof t.swScope == "string" && t.swScope.length > 0 && typeof t.vapidKey == "string" && t.vapidKey.length > 0;
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
const Ni = "firebase-messaging-database", $i = 1, P = "firebase-messaging-store";
let Ie = null;
function Ze() {
  return Ie || (Ie = te(Ni, $i, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(P);
      }
    }
  })), Ie;
}
async function _n(e) {
  const t = tt(e), r = await (await Ze()).transaction(P).objectStore(P).get(t);
  if (r)
    return r;
  {
    const s = await Oi(e.appConfig.senderId);
    if (s)
      return await et(e, s), s;
  }
}
async function et(e, t) {
  const n = tt(e), s = (await Ze()).transaction(P, "readwrite");
  return await s.objectStore(P).put(t, n), await s.done, t;
}
async function Li(e) {
  const t = tt(e), r = (await Ze()).transaction(P, "readwrite");
  await r.objectStore(P).delete(t), await r.done;
}
function tt({ appConfig: e }) {
  return e.appId;
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
const Bi = {
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
}, g = new V("messaging", "Messaging", Bi);
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
async function Pi(e, t) {
  const n = await rt(e), r = En(t), s = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(nt(e.appConfig), s)).json();
  } catch (i) {
    throw g.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw g.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw g.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return o.token;
}
async function xi(e, t) {
  const n = await rt(e), r = En(t.subscriptionOptions), s = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(`${nt(e.appConfig)}/${t.token}`, s)).json();
  } catch (i) {
    throw g.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw g.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw g.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return o.token;
}
async function In(e, t) {
  const r = {
    method: "DELETE",
    headers: await rt(e)
  };
  try {
    const o = await (await fetch(`${nt(e.appConfig)}/${t}`, r)).json();
    if (o.error) {
      const i = o.error.message;
      throw g.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (s) {
    throw g.create("token-unsubscribe-failed", {
      errorInfo: s == null ? void 0 : s.toString()
    });
  }
}
function nt({ projectId: e }) {
  return `${Ti}/projects/${e}/registrations`;
}
async function rt({ appConfig: e, installations: t }) {
  const n = await t.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function En({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
  const s = {
    web: {
      endpoint: n,
      auth: t,
      p256dh: e
    }
  };
  return r !== wn && (s.web.applicationPubKey = r), s;
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
const ji = 7 * 24 * 60 * 60 * 1e3;
async function Fi(e) {
  const t = await Hi(e.swRegistration, e.vapidKey), n = {
    vapidKey: e.vapidKey,
    swScope: e.swRegistration.scope,
    endpoint: t.endpoint,
    auth: w(t.getKey("auth")),
    p256dh: w(t.getKey("p256dh"))
  }, r = await _n(e.firebaseDependencies);
  if (r) {
    if (Wi(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + ji ? Ui(e, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await In(e.firebaseDependencies, r.token);
    } catch (s) {
      console.warn(s);
    }
    return Ct(e.firebaseDependencies, n);
  } else
    return Ct(e.firebaseDependencies, n);
}
async function Ki(e) {
  const t = await _n(e.firebaseDependencies);
  t && (await In(e.firebaseDependencies, t.token), await Li(e.firebaseDependencies));
  const n = await e.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function Ui(e, t) {
  try {
    const n = await xi(e.firebaseDependencies, t), r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
    return await et(e.firebaseDependencies, r), n;
  } catch (n) {
    throw await Ki(e), n;
  }
}
async function Ct(e, t) {
  const r = {
    token: await Pi(e, t),
    createTime: Date.now(),
    subscriptionOptions: t
  };
  return await et(e, r), r.token;
}
async function Hi(e, t) {
  const n = await e.pushManager.getSubscription();
  return n || e.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Ai(t)
  });
}
function Wi(e, t) {
  const n = t.vapidKey === e.vapidKey, r = t.endpoint === e.endpoint, s = t.auth === e.auth, o = t.p256dh === e.p256dh;
  return n && r && s && o;
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
function kt(e) {
  const t = {
    from: e.from,
    // eslint-disable-next-line camelcase
    collapseKey: e.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: e.fcmMessageId
  };
  return Vi(t, e), qi(t, e), Gi(t, e), t;
}
function Vi(e, t) {
  if (!t.notification)
    return;
  e.notification = {};
  const n = t.notification.title;
  n && (e.notification.title = n);
  const r = t.notification.body;
  r && (e.notification.body = r);
  const s = t.notification.image;
  s && (e.notification.image = s);
  const o = t.notification.icon;
  o && (e.notification.icon = o);
}
function qi(e, t) {
  t.data && (e.data = t.data);
}
function Gi(e, t) {
  var n, r, s, o, i;
  if (!t.fcmOptions && !(!((n = t.notification) === null || n === void 0) && n.click_action))
    return;
  e.fcmOptions = {};
  const a = (s = (r = t.fcmOptions) === null || r === void 0 ? void 0 : r.link) !== null && s !== void 0 ? s : (o = t.notification) === null || o === void 0 ? void 0 : o.click_action;
  a && (e.fcmOptions.link = a);
  const c = (i = t.fcmOptions) === null || i === void 0 ? void 0 : i.analytics_label;
  c && (e.fcmOptions.analyticsLabel = c);
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
function zi(e) {
  return typeof e == "object" && !!e && yn in e;
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
vn("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
vn("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function vn(e, t) {
  const n = [];
  for (let r = 0; r < e.length; r++)
    n.push(e.charAt(r)), r < t.length && n.push(t.charAt(r));
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
function Ji(e) {
  if (!e || !e.options)
    throw Ee("App Configuration Object");
  if (!e.name)
    throw Ee("App Name");
  const t = [
    "projectId",
    "apiKey",
    "appId",
    "messagingSenderId"
  ], { options: n } = e;
  for (const r of t)
    if (!n[r])
      throw Ee(r);
  return {
    appName: e.name,
    projectId: n.projectId,
    apiKey: n.apiKey,
    appId: n.appId,
    senderId: n.messagingSenderId
  };
}
function Ee(e) {
  return g.create("missing-app-config-values", {
    valueName: e
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
class Yi {
  constructor(t, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const s = Ji(t);
    this.firebaseDependencies = {
      app: t,
      appConfig: s,
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
async function Xi(e) {
  try {
    e.swRegistration = await navigator.serviceWorker.register(vi, {
      scope: Si
    }), e.swRegistration.update().catch(() => {
    });
  } catch (t) {
    throw g.create("failed-service-worker-registration", {
      browserErrorMessage: t == null ? void 0 : t.message
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
async function Qi(e, t) {
  if (!t && !e.swRegistration && await Xi(e), !(!t && e.swRegistration)) {
    if (!(t instanceof ServiceWorkerRegistration))
      throw g.create(
        "invalid-sw-registration"
        /* ErrorCode.INVALID_SW_REGISTRATION */
      );
    e.swRegistration = t;
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
async function Zi(e, t) {
  t ? e.vapidKey = t : e.vapidKey || (e.vapidKey = wn);
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
async function Sn(e, t) {
  if (!navigator)
    throw g.create(
      "only-available-in-window"
      /* ErrorCode.AVAILABLE_IN_WINDOW */
    );
  if (Notification.permission === "default" && await Notification.requestPermission(), Notification.permission !== "granted")
    throw g.create(
      "permission-blocked"
      /* ErrorCode.PERMISSION_BLOCKED */
    );
  return await Zi(e, t == null ? void 0 : t.vapidKey), await Qi(e, t == null ? void 0 : t.serviceWorkerRegistration), Fi(e);
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
async function ea(e, t, n) {
  const r = ta(t);
  (await e.firebaseDependencies.analyticsProvider.get()).logEvent(r, {
    /* eslint-disable camelcase */
    message_id: n[yn],
    message_name: n[Ci],
    message_time: n[ki],
    message_device_time: Math.floor(Date.now() / 1e3)
    /* eslint-enable camelcase */
  });
}
function ta(e) {
  switch (e) {
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
async function na(e, t) {
  const n = t.data;
  if (!n.isFirebaseMessaging)
    return;
  e.onMessageHandler && n.messageType === H.PUSH_RECEIVED && (typeof e.onMessageHandler == "function" ? e.onMessageHandler(kt(n)) : e.onMessageHandler.next(kt(n)));
  const r = n.data;
  zi(r) && r[Di] === "1" && await ea(e, n.messageType, r);
}
const Dt = "@firebase/messaging", At = "0.12.4";
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
const ra = (e) => {
  const t = new Yi(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
  return navigator.serviceWorker.addEventListener("message", (n) => na(t, n)), t;
}, sa = (e) => {
  const t = e.getProvider("messaging").getImmediate();
  return {
    getToken: (r) => Sn(t, r)
  };
};
function oa() {
  A(new E(
    "messaging",
    ra,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), A(new E(
    "messaging-internal",
    sa,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), k(Dt, At), k(Dt, At, "esm2017");
}
async function ia(e, t) {
  return e = xe(e), Sn(e, t);
}
oa();
const aa = () => {
  let e = !1;
  const t = {
    debug: "#7f8c8d",
    log: "#2ecc71",
    warn: "#f39c12",
    error: "#c0392b",
    groupCollapsed: "#3498db",
    groupEnd: null
    // No colored prefix on groupEnd
  };
  return { print: function(r, s) {
    if (r === "groupCollapsed" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      console[r](...s);
      return;
    }
    const o = [
      `background: ${t[r]}`,
      "border-radius: 0.5em",
      "color: white",
      "font-weight: bold",
      "padding: 2px 0.5em"
    ], i = e ? [] : ["%cTalker", o.join(";")];
    console[r](...i, ...s), r === "groupCollapsed" && (e = !0), r === "groupEnd" && (e = !1);
  } };
}, { print: f } = aa();
Zn([{"revision":"10ae03871fb1bcee98915b3e801a78ec","url":"android-chrome-192x192.png"},{"revision":"31bfe7427dc83c410e63693094bdd7eb","url":"android-chrome-512x512.png"},{"revision":"4a0de055d61d6a98a51bb17cbf7003be","url":"apple-touch-icon.png"},{"revision":"2646ab039d243a88694256e0fd1a2474","url":"favicon-16x16.png"},{"revision":"a8f1e6415c97f09be4e55428d5820a8b","url":"favicon-32x32.png"},{"revision":"8bf983c3aa965f030568f62d5add79ae","url":"favicon.ico"},{"revision":"650c96fe4141b24d1297e91e0b5f5a50","url":"index.html"},{"revision":"d56efad0a551756954d378677363f4da","url":"mstile-144x144.png"},{"revision":"25b0b1c9f78025d3a16da5c267535f7c","url":"mstile-150x150.png"},{"revision":"8245ae538149f0349fb015c2c1f89026","url":"mstile-310x150.png"},{"revision":"b7ba57b777d1df0c769e317c767b9e46","url":"mstile-310x310.png"},{"revision":"0a928f2b9562d7ae902a167473503721","url":"mstile-70x70.png"},{"revision":"04b2b88179130e5df4af4cff6ac9264e","url":"safari-pinned-tab.svg"},{"revision":"ccf8c0e3ea8c834ac8974a2bef90d113","url":"talker.svg"},{"revision":"ccf8c0e3ea8c834ac8974a2bef90d113","url":"talker.svg"},{"revision":"8f47a97b2c1136987645d1f5d280bd68","url":"manifest.webmanifest"}] || []);
W(
  ({ request: e }) => e.mode === "navigate",
  Xn("/index.html")
);
const ca = new S(
  ({ request: e }) => e.destination === "image",
  new tr({
    cacheName: "images"
  })
), ua = new S(
  ({ request: e }) => e.destination === "script",
  new Ot({
    cacheName: "scripts"
  })
), la = new S(
  ({ request: e }) => e.destination === "style",
  new Ot({
    cacheName: "styles"
  })
);
W(ca);
W(ua);
W(la);
self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("activate", async () => {
  await fa();
});
const ne = new BroadcastChannel("talker-sw"), da = Ft(Ei), Tn = _i(da);
Ii(Tn, async (e) => {
  f("log", ["Background message received!"]), e.data && (self.registration.showNotification(`${e.data.message}`, {
    tag: e.data.type,
    icon: "/talker.svg",
    image: e.data.fromProfilePicture.length > 0 ? e.data.fromProfilePicture : "",
    actions: [
      {
        action: "decline",
        title: "Decline"
      },
      {
        action: "accept",
        title: "Accept"
      }
    ]
  }), ne.postMessage({
    type: "SET_NOTIFIED_NOTIFICATION",
    requestID: e.data.requestID
  }), f("groupCollapsed", ["BG message payload"]), f("log", [e.data]), f("groupEnd", []));
});
self.addEventListener("notificationclick", (e) => {
  const { notification: t } = e;
  t.close(), f("groupCollapsed", ["Notification clicked!"]), f("log", [`Action -> ${e.action ?? "empty"}`]), f("groupEnd", []), e.waitUntil(
    self.clients.matchAll({
      type: "window"
    }).then(function(n) {
      f("groupCollapsed", ["Actual clients"]), f("log", [n]), f("groupEnd", []);
      for (let r = 0; r < n.length; r++) {
        let s = n[r];
        if (s.url.includes("/app") && "focus" in s) {
          s.focused || s.focus(), ne.postMessage({
            type: "CHANGE_VIEW",
            newPage: "app.notifications"
          });
          return;
        }
      }
      if (self.clients.openWindow)
        return self.clients.openWindow("/?nextPage=app.notifications");
    })
  );
});
const fa = async () => {
  const e = await ia(Tn, {
    serviceWorkerRegistration: self.registration,
    vapidKey: "BOF-yJZi4d8yVCVRkD6lvrviRbMObr7fHl5ma2IyJzjDC4-Ecr9_FGJsDTloNVuETMQUqH7MVEoXfV3MkGg5yO4"
  });
  ne.postMessage({
    type: "TOKEN_REGENERATED",
    token: e
  }), f("groupCollapsed", ["Token succesfully regenerated!"]), f("log", [e]), f("groupEnd", []);
}, ha = () => {
  self.clients.claim(), f("log", ["Client claimed!"]);
};
ne.onmessage = async (e) => {
  var t;
  switch ((t = e.data) == null ? void 0 : t.type) {
    case "CLAIM_CLIENTS":
      ha();
      break;
  }
};
self.addEventListener("message", (e) => {
  const t = e.data;
  t && (f("groupCollapsed", ["Message received!"]), f("log", [t]), f("groupEnd", []));
});
