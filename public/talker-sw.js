try {
  self["workbox:core:7.0.0"] && _();
} catch {
}
const Dn = (e, ...t) => {
  let n = e;
  return t.length > 0 && (n += ` :: ${JSON.stringify(t)}`), n;
}, An = Dn;
class h extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(t, n) {
    const r = An(t, n);
    super(r), this.name = t, this.details = n;
  }
}
const y = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, re = (e) => [y.prefix, e, y.suffix].filter((t) => t && t.length > 0).join("-"), Rn = (e) => {
  for (const t of Object.keys(y))
    e(t);
}, Be = {
  updateDetails: (e) => {
    Rn((t) => {
      typeof e[t] == "string" && (y[t] = e[t]);
    });
  },
  getGoogleAnalyticsName: (e) => e || re(y.googleAnalytics),
  getPrecacheName: (e) => e || re(y.precache),
  getPrefix: () => y.prefix,
  getRuntimeName: (e) => e || re(y.runtime),
  getSuffix: () => y.suffix
};
function ot(e, t) {
  const n = t();
  return e.waitUntil(n), n;
}
try {
  self["workbox:precaching:7.0.0"] && _();
} catch {
}
const On = "__WB_REVISION__";
function Mn(e) {
  if (!e)
    throw new h("add-to-cache-list-unexpected-type", { entry: e });
  if (typeof e == "string") {
    const o = new URL(e, location.href);
    return {
      cacheKey: o.href,
      url: o.href
    };
  }
  const { revision: t, url: n } = e;
  if (!n)
    throw new h("add-to-cache-list-unexpected-type", { entry: e });
  if (!t) {
    const o = new URL(n, location.href);
    return {
      cacheKey: o.href,
      url: o.href
    };
  }
  const r = new URL(n, location.href), s = new URL(n, location.href);
  return r.searchParams.set(On, t), {
    cacheKey: r.href,
    url: s.href
  };
}
class Nn {
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
class $n {
  constructor({ precacheController: t }) {
    this.cacheKeyWillBeUsed = async ({ request: n, params: r }) => {
      const s = (r == null ? void 0 : r.cacheKey) || this._precacheController.getCacheKeyForURL(n.url);
      return s ? new Request(s, { headers: n.headers }) : n;
    }, this._precacheController = t;
  }
}
let F;
function Ln() {
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
async function Bn(e, t) {
  let n = null;
  if (e.url && (n = new URL(e.url).origin), n !== self.location.origin)
    throw new h("cross-origin-copy-response", { origin: n });
  const r = e.clone(), s = {
    headers: new Headers(r.headers),
    status: r.status,
    statusText: r.statusText
  }, o = t ? t(s) : s, i = Ln() ? r.body : await r.blob();
  return new Response(i, o);
}
const Pn = (e) => new URL(String(e), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function it(e, t) {
  const n = new URL(e);
  for (const r of t)
    n.searchParams.delete(r);
  return n.href;
}
async function xn(e, t, n, r) {
  const s = it(t.url, n);
  if (t.url === s)
    return e.match(t, r);
  const o = Object.assign(Object.assign({}, r), { ignoreSearch: !0 }), i = await e.keys(t, o);
  for (const a of i) {
    const c = it(a.url, n);
    if (s === c)
      return e.match(a, r);
  }
}
let jn = class {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((t, n) => {
      this.resolve = t, this.reject = n;
    });
  }
};
const Fn = /* @__PURE__ */ new Set();
async function Kn() {
  for (const e of Fn)
    await e();
}
function Un(e) {
  return new Promise((t) => setTimeout(t, e));
}
try {
  self["workbox:strategies:7.0.0"] && _();
} catch {
}
function G(e) {
  return typeof e == "string" ? new Request(e) : e;
}
class Hn {
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
    this._cacheKeys = {}, Object.assign(this, n), this.event = n.event, this._strategy = t, this._handlerDeferred = new jn(), this._extendLifetimePromises = [], this._plugins = [...t.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
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
        throw new h("plugin-error-request-will-fetch", {
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
    await Un(0);
    const s = await this.getCacheKey(r, "write");
    if (!n)
      throw new h("cache-put-with-no-response", {
        url: Pn(s.url)
      });
    const o = await this._ensureResponseSafeToCache(n);
    if (!o)
      return !1;
    const { cacheName: i, matchOptions: a } = this._strategy, c = await self.caches.open(i), l = this.hasCallback("cacheDidUpdate"), u = l ? await xn(
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
    } catch (f) {
      if (f instanceof Error)
        throw f.name === "QuotaExceededError" && await Kn(), f;
    }
    for (const f of this.iterateCallbacks("cacheDidUpdate"))
      await f({
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
class Pe {
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
    this.cacheName = Be.getRuntimeName(t.cacheName), this.plugins = t.plugins || [], this.fetchOptions = t.fetchOptions, this.matchOptions = t.matchOptions;
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
    const n = t.event, r = typeof t.request == "string" ? new Request(t.request) : t.request, s = "params" in t ? t.params : void 0, o = new Hn(this, { event: n, request: r, params: s }), i = this._getResponse(o, r, n), a = this._awaitComplete(i, o, r, n);
    return [i, a];
  }
  async _getResponse(t, n, r) {
    await t.runCallbacks("handlerWillStart", { event: r, request: n });
    let s;
    try {
      if (s = await this._handle(n, t), !s || s.type === "error")
        throw new h("no-response", { url: n.url });
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
class v extends Pe {
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
    t.cacheName = Be.getPrecacheName(t.cacheName), super(t), this._fallbackToNetwork = t.fallbackToNetwork !== !1, this.plugins.push(v.copyRedirectedCacheableResponsesPlugin);
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
      throw new h("missing-precache-entry", {
        cacheName: this.cacheName,
        url: t.url
      });
    return r;
  }
  async _handleInstall(t, n) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const r = await n.fetch(t);
    if (!await n.cachePut(t, r.clone()))
      throw new h("bad-precaching-response", {
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
    return e.redirected ? await Bn(e) : e;
  }
};
class Wn {
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
      cacheName: Be.getPrecacheName(t),
      plugins: [
        ...n,
        new $n({ precacheController: this })
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
      const { cacheKey: s, url: o } = Mn(r), i = typeof r != "string" && r.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(o) && this._urlsToCacheKeys.get(o) !== s)
        throw new h("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(o),
          secondEntry: s
        });
      if (typeof r != "string" && r.integrity) {
        if (this._cacheKeysToIntegrities.has(s) && this._cacheKeysToIntegrities.get(s) !== r.integrity)
          throw new h("add-to-cache-list-conflicting-integrities", {
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
    return ot(t, async () => {
      const n = new Nn();
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
    return ot(t, async () => {
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
      throw new h("non-precached-url", { url: t });
    return (r) => (r.request = new Request(t), r.params = Object.assign({ cacheKey: n }, r.params), this.strategy.handle(r));
  }
}
let se;
const xe = () => (se || (se = new Wn()), se);
try {
  self["workbox:routing:7.0.0"] && _();
} catch {
}
const Ot = "GET", z = (e) => e && typeof e == "object" ? e : { handle: e };
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
  constructor(t, n, r = Ot) {
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
class Vn extends S {
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
class qn {
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
    } catch (f) {
      l = Promise.reject(f);
    }
    const u = i && i.catchHandler;
    return l instanceof Promise && (this._catchHandler || u) && (l = l.catch(async (f) => {
      if (u)
        try {
          return await u.handle({ url: r, request: t, event: n, params: o });
        } catch (R) {
          R instanceof Error && (f = R);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: r, request: t, event: n });
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
  setDefaultHandler(t, n = Ot) {
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
      throw new h("unregister-route-but-not-found-with-method", {
        method: t.method
      });
    const n = this._routes.get(t.method).indexOf(t);
    if (n > -1)
      this._routes.get(t.method).splice(n, 1);
    else
      throw new h("unregister-route-route-not-registered");
  }
}
let K;
const Gn = () => (K || (K = new qn(), K.addFetchListener(), K.addCacheListener()), K);
function W(e, t, n) {
  let r;
  if (typeof e == "string") {
    const o = new URL(e, location.href), i = ({ url: a }) => a.href === o.href;
    r = new S(i, t, n);
  } else if (e instanceof RegExp)
    r = new Vn(e, t, n);
  else if (typeof e == "function")
    r = new S(e, t, n);
  else if (e instanceof S)
    r = e;
  else
    throw new h("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return Gn().registerRoute(r), r;
}
function zn(e, t = []) {
  for (const n of [...e.searchParams.keys()])
    t.some((r) => r.test(n)) && e.searchParams.delete(n);
  return e;
}
function* Jn(e, { ignoreURLParametersMatching: t = [/^utm_/, /^fbclid$/], directoryIndex: n = "index.html", cleanURLs: r = !0, urlManipulation: s } = {}) {
  const o = new URL(e, location.href);
  o.hash = "", yield o.href;
  const i = zn(o, t);
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
class Yn extends S {
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
      for (const i of Jn(s.url, n)) {
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
function Xn(e) {
  const t = xe(), n = new Yn(t, e);
  W(n);
}
function Qn(e) {
  return xe().createHandlerBoundToURL(e);
}
function Zn(e) {
  xe().precache(e);
}
function er(e, t) {
  Zn(e), Xn(t);
}
class Mt extends Pe {
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
      throw new h("no-response", { url: t.url, error: s });
    return r;
  }
}
const tr = {
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
class nr extends Pe {
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
    super(t), this.plugins.some((n) => "cacheWillUpdate" in n) || this.plugins.unshift(tr);
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
      throw new h("no-response", { url: t.url, error: o });
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
const Nt = function(e) {
  const t = [];
  let n = 0;
  for (let r = 0; r < e.length; r++) {
    let s = e.charCodeAt(r);
    s < 128 ? t[n++] = s : s < 2048 ? (t[n++] = s >> 6 | 192, t[n++] = s & 63 | 128) : (s & 64512) === 55296 && r + 1 < e.length && (e.charCodeAt(r + 1) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++r) & 1023), t[n++] = s >> 18 | 240, t[n++] = s >> 12 & 63 | 128, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128) : (t[n++] = s >> 12 | 224, t[n++] = s >> 6 & 63 | 128, t[n++] = s & 63 | 128);
  }
  return t;
}, rr = function(e) {
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
}, $t = {
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
      const o = e[s], i = s + 1 < e.length, a = i ? e[s + 1] : 0, c = s + 2 < e.length, l = c ? e[s + 2] : 0, u = o >> 2, f = (o & 3) << 4 | a >> 4;
      let R = (a & 15) << 2 | l >> 6, q = l & 63;
      c || (q = 64, i || (R = 64)), r.push(n[u], n[f], n[R], n[q]);
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
    return this.HAS_NATIVE_SUPPORT && !t ? btoa(e) : this.encodeByteArray(Nt(e), t);
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
    return this.HAS_NATIVE_SUPPORT && !t ? atob(e) : rr(this.decodeStringToByteArray(e, t));
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
      const f = s < e.length ? n[e.charAt(s)] : 64;
      if (++s, o == null || a == null || l == null || f == null)
        throw new sr();
      const R = o << 2 | a >> 4;
      if (r.push(R), l !== 64) {
        const q = a << 4 & 240 | l >> 2;
        if (r.push(q), f !== 64) {
          const kn = l << 6 & 192 | f;
          r.push(kn);
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
class sr extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const or = function(e) {
  const t = Nt(e);
  return $t.encodeByteArray(t, !0);
}, Lt = function(e) {
  return or(e).replace(/\./g, "");
}, ir = function(e) {
  try {
    return $t.decodeString(e, !0);
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
function ar() {
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
const cr = () => ar().__FIREBASE_DEFAULTS__, ur = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const e = process.env.__FIREBASE_DEFAULTS__;
  if (e)
    return JSON.parse(e);
}, lr = () => {
  if (typeof document > "u")
    return;
  let e;
  try {
    e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const t = e && ir(e[1]);
  return t && JSON.parse(t);
}, dr = () => {
  try {
    return cr() || ur() || lr();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
}, Bt = () => {
  var e;
  return (e = dr()) === null || e === void 0 ? void 0 : e.config;
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
class fr {
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
function Pt() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function xt() {
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
const hr = "FirebaseError";
class j extends Error {
  constructor(t, n, r) {
    super(n), this.code = t, this.customData = r, this.name = hr, Object.setPrototypeOf(this, j.prototype), Error.captureStackTrace && Error.captureStackTrace(this, V.prototype.create);
  }
}
class V {
  constructor(t, n, r) {
    this.service = t, this.serviceName = n, this.errors = r;
  }
  create(t, ...n) {
    const r = n[0] || {}, s = `${this.service}/${t}`, o = this.errors[t], i = o ? pr(o, r) : "Error", a = `${this.serviceName}: ${i} (${s}).`;
    return new j(s, a, r);
  }
}
function pr(e, t) {
  return e.replace(gr, (n, r) => {
    const s = t[r];
    return s != null ? String(s) : `<${r}?>`;
  });
}
const gr = /\{\$([^}]+)}/g;
function Se(e, t) {
  if (e === t)
    return !0;
  const n = Object.keys(e), r = Object.keys(t);
  for (const s of n) {
    if (!r.includes(s))
      return !1;
    const o = e[s], i = t[s];
    if (at(o) && at(i)) {
      if (!Se(o, i))
        return !1;
    } else if (o !== i)
      return !1;
  }
  for (const s of r)
    if (!n.includes(s))
      return !1;
  return !0;
}
function at(e) {
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
function je(e) {
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
class br {
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
      const r = new fr();
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
      if (wr(t))
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
function wr(e) {
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
class yr {
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
    const n = new br(t, this);
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
const _r = {
  debug: d.DEBUG,
  verbose: d.VERBOSE,
  info: d.INFO,
  warn: d.WARN,
  error: d.ERROR,
  silent: d.SILENT
}, Ir = d.INFO, Er = {
  [d.DEBUG]: "log",
  [d.VERBOSE]: "log",
  [d.INFO]: "info",
  [d.WARN]: "warn",
  [d.ERROR]: "error"
}, vr = (e, t, ...n) => {
  if (t < e.logLevel)
    return;
  const r = (/* @__PURE__ */ new Date()).toISOString(), s = Er[t];
  if (s)
    console[s](`[${r}]  ${e.name}:`, ...n);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);
};
class Sr {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(t) {
    this.name = t, this._logLevel = Ir, this._logHandler = vr, this._userLogHandler = null;
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
    this._logLevel = typeof t == "string" ? _r[t] : t;
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
const Tr = (e, t) => t.some((n) => e instanceof n);
let ct, ut;
function Cr() {
  return ct || (ct = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function kr() {
  return ut || (ut = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const jt = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), oe = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap();
function Dr(e) {
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
    n instanceof IDBCursor && jt.set(n, e);
  }).catch(() => {
  }), Fe.set(t, e), t;
}
function Ar(e) {
  if (Te.has(e))
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
  Te.set(e, t);
}
let Ce = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Te.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || Ft.get(e);
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
function Rr(e) {
  Ce = e(Ce);
}
function Or(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(ie(this), t, ...n);
    return Ft.set(r, t.sort ? t.sort() : [t]), T(r);
  } : kr().includes(e) ? function(...t) {
    return e.apply(ie(this), t), T(jt.get(this));
  } : function(...t) {
    return T(e.apply(ie(this), t));
  };
}
function Mr(e) {
  return typeof e == "function" ? Or(e) : (e instanceof IDBTransaction && Ar(e), Tr(e, Cr()) ? new Proxy(e, Ce) : e);
}
function T(e) {
  if (e instanceof IDBRequest)
    return Dr(e);
  if (oe.has(e))
    return oe.get(e);
  const t = Mr(e);
  return t !== e && (oe.set(e, t), Fe.set(t, e)), t;
}
const ie = (e) => Fe.get(e);
function Nr(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
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
const $r = ["get", "getKey", "getAll", "getAllKeys", "count"], Lr = ["put", "add", "delete", "clear"], ae = /* @__PURE__ */ new Map();
function lt(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (ae.get(t))
    return ae.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = Lr.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || $r.includes(n))
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
Rr((e) => ({
  ...e,
  get: (t, n, r) => lt(t, n) || e.get(t, n, r),
  has: (t, n) => !!lt(t, n) || e.has(t, n)
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
class Br {
  constructor(t) {
    this.container = t;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((n) => {
      if (Pr(n)) {
        const r = n.getImmediate();
        return `${r.library}/${r.version}`;
      } else
        return null;
    }).filter((n) => n).join(" ");
  }
}
function Pr(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === "VERSION";
}
const ke = "@firebase/app", dt = "0.9.12";
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
const N = new Sr("@firebase/app"), xr = "@firebase/app-compat", jr = "@firebase/analytics-compat", Fr = "@firebase/analytics", Kr = "@firebase/app-check-compat", Ur = "@firebase/app-check", Hr = "@firebase/auth", Wr = "@firebase/auth-compat", Vr = "@firebase/database", qr = "@firebase/database-compat", Gr = "@firebase/functions", zr = "@firebase/functions-compat", Jr = "@firebase/installations", Yr = "@firebase/installations-compat", Xr = "@firebase/messaging", Qr = "@firebase/messaging-compat", Zr = "@firebase/performance", es = "@firebase/performance-compat", ts = "@firebase/remote-config", ns = "@firebase/remote-config-compat", rs = "@firebase/storage", ss = "@firebase/storage-compat", os = "@firebase/firestore", is = "@firebase/firestore-compat", as = "firebase";
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
const De = "[DEFAULT]", cs = {
  [ke]: "fire-core",
  [xr]: "fire-core-compat",
  [Fr]: "fire-analytics",
  [jr]: "fire-analytics-compat",
  [Ur]: "fire-app-check",
  [Kr]: "fire-app-check-compat",
  [Hr]: "fire-auth",
  [Wr]: "fire-auth-compat",
  [Vr]: "fire-rtdb",
  [qr]: "fire-rtdb-compat",
  [Gr]: "fire-fn",
  [zr]: "fire-fn-compat",
  [Jr]: "fire-iid",
  [Yr]: "fire-iid-compat",
  [Xr]: "fire-fcm",
  [Qr]: "fire-fcm-compat",
  [Zr]: "fire-perf",
  [es]: "fire-perf-compat",
  [ts]: "fire-rc",
  [ns]: "fire-rc-compat",
  [rs]: "fire-gcs",
  [ss]: "fire-gcs-compat",
  [os]: "fire-fst",
  [is]: "fire-fst-compat",
  "fire-js": "fire-js",
  [as]: "fire-js-all"
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
const J = /* @__PURE__ */ new Map(), Ae = /* @__PURE__ */ new Map();
function us(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    N.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`, n);
  }
}
function A(e) {
  const t = e.name;
  if (Ae.has(t))
    return N.debug(`There were multiple attempts to register component ${t}.`), !1;
  Ae.set(t, e);
  for (const n of J.values())
    us(n, e);
  return !0;
}
function Ke(e, t) {
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
const ls = {
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
}, C = new V("app", "Firebase", ls);
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
class ds {
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
function Kt(e, t = {}) {
  let n = e;
  typeof t != "object" && (t = { name: t });
  const r = Object.assign({ name: De, automaticDataCollectionEnabled: !1 }, t), s = r.name;
  if (typeof s != "string" || !s)
    throw C.create("bad-app-name", {
      appName: String(s)
    });
  if (n || (n = Bt()), !n)
    throw C.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const o = J.get(s);
  if (o) {
    if (Se(n, o.options) && Se(r, o.config))
      return o;
    throw C.create("duplicate-app", { appName: s });
  }
  const i = new yr(s);
  for (const c of Ae.values())
    i.addComponent(c);
  const a = new ds(n, r, i);
  return J.set(s, a), a;
}
function fs(e = De) {
  const t = J.get(e);
  if (!t && e === De && Bt())
    return Kt();
  if (!t)
    throw C.create("no-app", { appName: e });
  return t;
}
function k(e, t, n) {
  var r;
  let s = (r = cs[e]) !== null && r !== void 0 ? r : e;
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
const hs = "firebase-heartbeat-database", ps = 1, U = "firebase-heartbeat-store";
let ce = null;
function Ut() {
  return ce || (ce = Nr(hs, ps, {
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
async function gs(e) {
  try {
    return await (await Ut()).transaction(U).objectStore(U).get(Ht(e));
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
async function ft(e, t) {
  try {
    const r = (await Ut()).transaction(U, "readwrite");
    await r.objectStore(U).put(t, Ht(e)), await r.done;
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
function Ht(e) {
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
const bs = 1024, ms = 30 * 24 * 60 * 60 * 1e3;
class ws {
  constructor(t) {
    this.container = t, this._heartbeatsCache = null;
    const n = this.container.getProvider("app").getImmediate();
    this._storage = new _s(n), this._heartbeatsCachePromise = this._storage.read().then((r) => (this._heartbeatsCache = r, r));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    const n = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), r = ht();
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
    const t = ht(), { heartbeatsToSend: n, unsentEntries: r } = ys(this._heartbeatsCache.heartbeats), s = Lt(JSON.stringify({ version: 2, heartbeats: n }));
    return this._heartbeatsCache.lastSentHeartbeatDate = t, r.length > 0 ? (this._heartbeatsCache.heartbeats = r, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), s;
  }
}
function ht() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function ys(e, t = bs) {
  const n = [];
  let r = e.slice();
  for (const s of e) {
    const o = n.find((i) => i.agent === s.agent);
    if (o) {
      if (o.dates.push(s.date), pt(n) > t) {
        o.dates.pop();
        break;
      }
    } else if (n.push({
      agent: s.agent,
      dates: [s.date]
    }), pt(n) > t) {
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
class _s {
  constructor(t) {
    this.app = t, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return Pt() ? xt().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    return await this._canUseIndexedDBPromise ? await gs(this.app) || { heartbeats: [] } : { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const s = await this.read();
      return ft(this.app, {
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
      return ft(this.app, {
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
function pt(e) {
  return Lt(
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
function Is(e) {
  A(new E(
    "platform-logger",
    (t) => new Br(t),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), A(new E(
    "heartbeat",
    (t) => new ws(t),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), k(ke, dt, e), k(ke, dt, "esm2017"), k("fire-js", "");
}
Is("");
var Es = "firebase", vs = "9.22.2";
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
k(Es, vs, "app");
const Ss = (e, t) => t.some((n) => e instanceof n);
let gt, bt;
function Ts() {
  return gt || (gt = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Cs() {
  return bt || (bt = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Wt = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), ue = /* @__PURE__ */ new WeakMap(), Ue = /* @__PURE__ */ new WeakMap();
function ks(e) {
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
    n instanceof IDBCursor && Wt.set(n, e);
  }).catch(() => {
  }), Ue.set(t, e), t;
}
function Ds(e) {
  if (Re.has(e))
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
  Re.set(e, t);
}
let Oe = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Re.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || Vt.get(e);
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
function As(e) {
  Oe = e(Oe);
}
function Rs(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(le(this), t, ...n);
    return Vt.set(r, t.sort ? t.sort() : [t]), D(r);
  } : Cs().includes(e) ? function(...t) {
    return e.apply(le(this), t), D(Wt.get(this));
  } : function(...t) {
    return D(e.apply(le(this), t));
  };
}
function Os(e) {
  return typeof e == "function" ? Rs(e) : (e instanceof IDBTransaction && Ds(e), Ss(e, Ts()) ? new Proxy(e, Oe) : e);
}
function D(e) {
  if (e instanceof IDBRequest)
    return ks(e);
  if (ue.has(e))
    return ue.get(e);
  const t = Os(e);
  return t !== e && (ue.set(e, t), Ue.set(t, e)), t;
}
const le = (e) => Ue.get(e);
function Ms(e, t, { blocked: n, upgrade: r, blocking: s, terminated: o } = {}) {
  const i = indexedDB.open(e, t), a = D(i);
  return r && i.addEventListener("upgradeneeded", (c) => {
    r(D(i.result), c.oldVersion, c.newVersion, D(i.transaction));
  }), n && i.addEventListener("blocked", () => n()), a.then((c) => {
    o && c.addEventListener("close", () => o()), s && c.addEventListener("versionchange", () => s());
  }).catch(() => {
  }), a;
}
const Ns = ["get", "getKey", "getAll", "getAllKeys", "count"], $s = ["put", "add", "delete", "clear"], de = /* @__PURE__ */ new Map();
function mt(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (de.get(t))
    return de.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = $s.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Ns.includes(n))
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
As((e) => ({
  ...e,
  get: (t, n, r) => mt(t, n) || e.get(t, n, r),
  has: (t, n) => !!mt(t, n) || e.has(t, n)
}));
const qt = "@firebase/installations", He = "0.6.4";
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
const Gt = 1e4, zt = `w:${He}`, Jt = "FIS_v2", Ls = "https://firebaseinstallations.googleapis.com/v1", Bs = 60 * 60 * 1e3, Ps = "installations", xs = "Installations";
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
const js = {
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
}, $ = new V(Ps, xs, js);
function Yt(e) {
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
function Xt({ projectId: e }) {
  return `${Ls}/projects/${e}/installations`;
}
function Qt(e) {
  return {
    token: e.token,
    requestStatus: 2,
    expiresIn: Ks(e.expiresIn),
    creationTime: Date.now()
  };
}
async function Zt(e, t) {
  const r = (await t.json()).error;
  return $.create("request-failed", {
    requestName: e,
    serverCode: r.code,
    serverMessage: r.message,
    serverStatus: r.status
  });
}
function en({ apiKey: e }) {
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e
  });
}
function Fs(e, { refreshToken: t }) {
  const n = en(e);
  return n.append("Authorization", Us(t)), n;
}
async function tn(e) {
  const t = await e();
  return t.status >= 500 && t.status < 600 ? e() : t;
}
function Ks(e) {
  return Number(e.replace("s", "000"));
}
function Us(e) {
  return `${Jt} ${e}`;
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
async function Hs({ appConfig: e, heartbeatServiceProvider: t }, { fid: n }) {
  const r = Xt(e), s = en(e), o = t.getImmediate({
    optional: !0
  });
  if (o) {
    const l = await o.getHeartbeatsHeader();
    l && s.append("x-firebase-client", l);
  }
  const i = {
    fid: n,
    authVersion: Jt,
    appId: e.appId,
    sdkVersion: zt
  }, a = {
    method: "POST",
    headers: s,
    body: JSON.stringify(i)
  }, c = await tn(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return {
      fid: l.fid || n,
      registrationStatus: 2,
      refreshToken: l.refreshToken,
      authToken: Qt(l.authToken)
    };
  } else
    throw await Zt("Create Installation", c);
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
function nn(e) {
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
function Ws(e) {
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
const Vs = /^[cdef][\w-]{21}$/, Me = "";
function qs() {
  try {
    const e = new Uint8Array(17);
    (self.crypto || self.msCrypto).getRandomValues(e), e[0] = 112 + e[0] % 16;
    const n = Gs(e);
    return Vs.test(n) ? n : Me;
  } catch {
    return Me;
  }
}
function Gs(e) {
  return Ws(e).substr(0, 22);
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
const rn = /* @__PURE__ */ new Map();
function sn(e, t) {
  const n = Z(e);
  on(n, t), zs(n, t);
}
function on(e, t) {
  const n = rn.get(e);
  if (n)
    for (const r of n)
      r(t);
}
function zs(e, t) {
  const n = Js();
  n && n.postMessage({ key: e, fid: t }), Ys();
}
let M = null;
function Js() {
  return !M && "BroadcastChannel" in self && (M = new BroadcastChannel("[Firebase] FID Change"), M.onmessage = (e) => {
    on(e.data.key, e.data.fid);
  }), M;
}
function Ys() {
  rn.size === 0 && M && (M.close(), M = null);
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
const Xs = "firebase-installations-database", Qs = 1, L = "firebase-installations-store";
let fe = null;
function We() {
  return fe || (fe = Ms(Xs, Qs, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(L);
      }
    }
  })), fe;
}
async function Y(e, t) {
  const n = Z(e), s = (await We()).transaction(L, "readwrite"), o = s.objectStore(L), i = await o.get(n);
  return await o.put(t, n), await s.done, (!i || i.fid !== t.fid) && sn(e, t.fid), t;
}
async function an(e) {
  const t = Z(e), r = (await We()).transaction(L, "readwrite");
  await r.objectStore(L).delete(t), await r.done;
}
async function ee(e, t) {
  const n = Z(e), s = (await We()).transaction(L, "readwrite"), o = s.objectStore(L), i = await o.get(n), a = t(i);
  return a === void 0 ? await o.delete(n) : await o.put(a, n), await s.done, a && (!i || i.fid !== a.fid) && sn(e, a.fid), a;
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
async function Ve(e) {
  let t;
  const n = await ee(e.appConfig, (r) => {
    const s = Zs(r), o = eo(e, s);
    return t = o.registrationPromise, o.installationEntry;
  });
  return n.fid === Me ? { installationEntry: await t } : {
    installationEntry: n,
    registrationPromise: t
  };
}
function Zs(e) {
  const t = e || {
    fid: qs(),
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  };
  return cn(t);
}
function eo(e, t) {
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
    }, r = to(e, n);
    return { installationEntry: n, registrationPromise: r };
  } else
    return t.registrationStatus === 1 ? {
      installationEntry: t,
      registrationPromise: no(e)
    } : { installationEntry: t };
}
async function to(e, t) {
  try {
    const n = await Hs(e, t);
    return Y(e.appConfig, n);
  } catch (n) {
    throw Yt(n) && n.customData.serverCode === 409 ? await an(e.appConfig) : await Y(e.appConfig, {
      fid: t.fid,
      registrationStatus: 0
      /* RequestStatus.NOT_STARTED */
    }), n;
  }
}
async function no(e) {
  let t = await wt(e.appConfig);
  for (; t.registrationStatus === 1; )
    await nn(100), t = await wt(e.appConfig);
  if (t.registrationStatus === 0) {
    const { installationEntry: n, registrationPromise: r } = await Ve(e);
    return r || n;
  }
  return t;
}
function wt(e) {
  return ee(e, (t) => {
    if (!t)
      throw $.create(
        "installation-not-found"
        /* ErrorCode.INSTALLATION_NOT_FOUND */
      );
    return cn(t);
  });
}
function cn(e) {
  return ro(e) ? {
    fid: e.fid,
    registrationStatus: 0
    /* RequestStatus.NOT_STARTED */
  } : e;
}
function ro(e) {
  return e.registrationStatus === 1 && e.registrationTime + Gt < Date.now();
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
async function so({ appConfig: e, heartbeatServiceProvider: t }, n) {
  const r = oo(e, n), s = Fs(e, n), o = t.getImmediate({
    optional: !0
  });
  if (o) {
    const l = await o.getHeartbeatsHeader();
    l && s.append("x-firebase-client", l);
  }
  const i = {
    installation: {
      sdkVersion: zt,
      appId: e.appId
    }
  }, a = {
    method: "POST",
    headers: s,
    body: JSON.stringify(i)
  }, c = await tn(() => fetch(r, a));
  if (c.ok) {
    const l = await c.json();
    return Qt(l);
  } else
    throw await Zt("Generate Auth Token", c);
}
function oo(e, { fid: t }) {
  return `${Xt(e)}/${t}/authTokens:generate`;
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
async function qe(e, t = !1) {
  let n;
  const r = await ee(e.appConfig, (o) => {
    if (!un(o))
      throw $.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const i = o.authToken;
    if (!t && co(i))
      return o;
    if (i.requestStatus === 1)
      return n = io(e, t), o;
    {
      if (!navigator.onLine)
        throw $.create(
          "app-offline"
          /* ErrorCode.APP_OFFLINE */
        );
      const a = lo(o);
      return n = ao(e, a), a;
    }
  });
  return n ? await n : r.authToken;
}
async function io(e, t) {
  let n = await yt(e.appConfig);
  for (; n.authToken.requestStatus === 1; )
    await nn(100), n = await yt(e.appConfig);
  const r = n.authToken;
  return r.requestStatus === 0 ? qe(e, t) : r;
}
function yt(e) {
  return ee(e, (t) => {
    if (!un(t))
      throw $.create(
        "not-registered"
        /* ErrorCode.NOT_REGISTERED */
      );
    const n = t.authToken;
    return fo(n) ? Object.assign(Object.assign({}, t), { authToken: {
      requestStatus: 0
      /* RequestStatus.NOT_STARTED */
    } }) : t;
  });
}
async function ao(e, t) {
  try {
    const n = await so(e, t), r = Object.assign(Object.assign({}, t), { authToken: n });
    return await Y(e.appConfig, r), n;
  } catch (n) {
    if (Yt(n) && (n.customData.serverCode === 401 || n.customData.serverCode === 404))
      await an(e.appConfig);
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
function un(e) {
  return e !== void 0 && e.registrationStatus === 2;
}
function co(e) {
  return e.requestStatus === 2 && !uo(e);
}
function uo(e) {
  const t = Date.now();
  return t < e.creationTime || e.creationTime + e.expiresIn < t + Bs;
}
function lo(e) {
  const t = {
    requestStatus: 1,
    requestTime: Date.now()
  };
  return Object.assign(Object.assign({}, e), { authToken: t });
}
function fo(e) {
  return e.requestStatus === 1 && e.requestTime + Gt < Date.now();
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
async function ho(e) {
  const t = e, { installationEntry: n, registrationPromise: r } = await Ve(t);
  return r ? r.catch(console.error) : qe(t).catch(console.error), n.fid;
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
async function po(e, t = !1) {
  const n = e;
  return await go(n), (await qe(n, t)).token;
}
async function go(e) {
  const { registrationPromise: t } = await Ve(e);
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
function bo(e) {
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
const ln = "installations", mo = "installations-internal", wo = (e) => {
  const t = e.getProvider("app").getImmediate(), n = bo(t), r = Ke(t, "heartbeat");
  return {
    app: t,
    appConfig: n,
    heartbeatServiceProvider: r,
    _delete: () => Promise.resolve()
  };
}, yo = (e) => {
  const t = e.getProvider("app").getImmediate(), n = Ke(t, ln).getImmediate();
  return {
    getId: () => ho(n),
    getToken: (s) => po(n, s)
  };
};
function _o() {
  A(new E(
    ln,
    wo,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), A(new E(
    mo,
    yo,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
}
_o();
k(qt, He);
k(qt, He, "esm2017");
const Io = (e, t) => t.some((n) => e instanceof n);
let _t, It;
function Eo() {
  return _t || (_t = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function vo() {
  return It || (It = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const dn = /* @__PURE__ */ new WeakMap(), Ne = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), Ge = /* @__PURE__ */ new WeakMap();
function So(e) {
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
    n instanceof IDBCursor && dn.set(n, e);
  }).catch(() => {
  }), Ge.set(t, e), t;
}
function To(e) {
  if (Ne.has(e))
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
  Ne.set(e, t);
}
let $e = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done")
        return Ne.get(e);
      if (t === "objectStoreNames")
        return e.objectStoreNames || fn.get(e);
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
function Co(e) {
  $e = e($e);
}
function ko(e) {
  return e === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(t, ...n) {
    const r = e.call(ge(this), t, ...n);
    return fn.set(r, t.sort ? t.sort() : [t]), I(r);
  } : vo().includes(e) ? function(...t) {
    return e.apply(ge(this), t), I(dn.get(this));
  } : function(...t) {
    return I(e.apply(ge(this), t));
  };
}
function Do(e) {
  return typeof e == "function" ? ko(e) : (e instanceof IDBTransaction && To(e), Io(e, Eo()) ? new Proxy(e, $e) : e);
}
function I(e) {
  if (e instanceof IDBRequest)
    return So(e);
  if (pe.has(e))
    return pe.get(e);
  const t = Do(e);
  return t !== e && (pe.set(e, t), Ge.set(t, e)), t;
}
const ge = (e) => Ge.get(e);
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
const Ao = ["get", "getKey", "getAll", "getAllKeys", "count"], Ro = ["put", "add", "delete", "clear"], be = /* @__PURE__ */ new Map();
function Et(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
    return;
  if (be.get(t))
    return be.get(t);
  const n = t.replace(/FromIndex$/, ""), r = t !== n, s = Ro.includes(n);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(s || Ao.includes(n))
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
  return be.set(t, o), o;
}
Co((e) => ({
  ...e,
  get: (t, n, r) => Et(t, n) || e.get(t, n, r),
  has: (t, n) => !!Et(t, n) || e.has(t, n)
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
const hn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Oo = "https://fcmregistrations.googleapis.com/v1", pn = "FCM_MSG", Mo = "google.c.a.c_id", No = 3, $o = 1;
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
function m(e) {
  const t = new Uint8Array(e);
  return btoa(String.fromCharCode(...t)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function Lo(e) {
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
const me = "fcm_token_details_db", Bo = 5, vt = "fcm_token_object_Store";
async function Po(e) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((o) => o.name).includes(me))
    return null;
  let t = null;
  return (await te(me, Bo, {
    upgrade: async (r, s, o, i) => {
      var a;
      if (s < 2 || !r.objectStoreNames.contains(vt))
        return;
      const c = i.objectStore(vt), l = await c.index("fcmSenderId").get(e);
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
              vapidKey: typeof u.vapidKey == "string" ? u.vapidKey : m(u.vapidKey)
            }
          };
        } else if (s === 3) {
          const u = l;
          t = {
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
        } else if (s === 4) {
          const u = l;
          t = {
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
  })).close(), await x(me), await x("fcm_vapid_details_db"), await x("undefined"), xo(t) ? t : null;
}
function xo(e) {
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
const jo = "firebase-messaging-database", Fo = 1, B = "firebase-messaging-store";
let we = null;
function ze() {
  return we || (we = te(jo, Fo, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(B);
      }
    }
  })), we;
}
async function Je(e) {
  const t = Xe(e), r = await (await ze()).transaction(B).objectStore(B).get(t);
  if (r)
    return r;
  {
    const s = await Po(e.appConfig.senderId);
    if (s)
      return await Ye(e, s), s;
  }
}
async function Ye(e, t) {
  const n = Xe(e), s = (await ze()).transaction(B, "readwrite");
  return await s.objectStore(B).put(t, n), await s.done, t;
}
async function Ko(e) {
  const t = Xe(e), r = (await ze()).transaction(B, "readwrite");
  await r.objectStore(B).delete(t), await r.done;
}
function Xe({ appConfig: e }) {
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
const Uo = {
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
}, g = new V("messaging", "Messaging", Uo);
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
async function Ho(e, t) {
  const n = await Ze(e), r = bn(t), s = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(Qe(e.appConfig), s)).json();
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
async function Wo(e, t) {
  const n = await Ze(e), r = bn(t.subscriptionOptions), s = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(`${Qe(e.appConfig)}/${t.token}`, s)).json();
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
async function gn(e, t) {
  const r = {
    method: "DELETE",
    headers: await Ze(e)
  };
  try {
    const o = await (await fetch(`${Qe(e.appConfig)}/${t}`, r)).json();
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
function Qe({ projectId: e }) {
  return `${Oo}/projects/${e}/registrations`;
}
async function Ze({ appConfig: e, installations: t }) {
  const n = await t.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function bn({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
  const s = {
    web: {
      endpoint: n,
      auth: t,
      p256dh: e
    }
  };
  return r !== hn && (s.web.applicationPubKey = r), s;
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
const Vo = 7 * 24 * 60 * 60 * 1e3;
async function qo(e) {
  const t = await zo(e.swRegistration, e.vapidKey), n = {
    vapidKey: e.vapidKey,
    swScope: e.swRegistration.scope,
    endpoint: t.endpoint,
    auth: m(t.getKey("auth")),
    p256dh: m(t.getKey("p256dh"))
  }, r = await Je(e.firebaseDependencies);
  if (r) {
    if (Jo(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + Vo ? Go(e, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await gn(e.firebaseDependencies, r.token);
    } catch (s) {
      console.warn(s);
    }
    return St(e.firebaseDependencies, n);
  } else
    return St(e.firebaseDependencies, n);
}
async function Le(e) {
  const t = await Je(e.firebaseDependencies);
  t && (await gn(e.firebaseDependencies, t.token), await Ko(e.firebaseDependencies));
  const n = await e.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function Go(e, t) {
  try {
    const n = await Wo(e.firebaseDependencies, t), r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
    return await Ye(e.firebaseDependencies, r), n;
  } catch (n) {
    throw await Le(e), n;
  }
}
async function St(e, t) {
  const r = {
    token: await Ho(e, t),
    createTime: Date.now(),
    subscriptionOptions: t
  };
  return await Ye(e, r), r.token;
}
async function zo(e, t) {
  const n = await e.pushManager.getSubscription();
  return n || e.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Lo(t)
  });
}
function Jo(e, t) {
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
function Yo(e) {
  const t = {
    from: e.from,
    // eslint-disable-next-line camelcase
    collapseKey: e.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: e.fcmMessageId
  };
  return Xo(t, e), Qo(t, e), Zo(t, e), t;
}
function Xo(e, t) {
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
function Qo(e, t) {
  t.data && (e.data = t.data);
}
function Zo(e, t) {
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
function ei(e) {
  return typeof e == "object" && !!e && Mo in e;
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
function ti(e) {
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
async function ni(e, t) {
  const n = ri(t, await e.firebaseDependencies.installations.getId());
  si(e, n);
}
function ri(e, t) {
  var n, r;
  const s = {};
  return e.from && (s.project_number = e.from), e.fcmMessageId && (s.message_id = e.fcmMessageId), s.instance_id = t, e.notification ? s.message_type = X.DISPLAY_NOTIFICATION.toString() : s.message_type = X.DATA_MESSAGE.toString(), s.sdk_platform = No.toString(), s.package_name = self.origin.replace(/(^\w+:|^)\/\//, ""), e.collapse_key && (s.collapse_key = e.collapse_key), s.event = $o.toString(), !((n = e.fcmOptions) === null || n === void 0) && n.analytics_label && (s.analytics_label = (r = e.fcmOptions) === null || r === void 0 ? void 0 : r.analytics_label), s;
}
function si(e, t) {
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
async function oi(e, t) {
  var n, r;
  const { newSubscription: s } = e;
  if (!s) {
    await Le(t);
    return;
  }
  const o = await Je(t.firebaseDependencies);
  await Le(t), t.vapidKey = (r = (n = o == null ? void 0 : o.subscriptionOptions) === null || n === void 0 ? void 0 : n.vapidKey) !== null && r !== void 0 ? r : hn, await qo(t);
}
async function ii(e, t) {
  const n = ui(e);
  if (!n)
    return;
  t.deliveryMetricsExportedToBigQueryEnabled && await ni(t, n);
  const r = await wn();
  if (di(r))
    return fi(r, n);
  if (n.notification && await hi(ci(n)), !!t && t.onBackgroundMessageHandler) {
    const s = Yo(n);
    typeof t.onBackgroundMessageHandler == "function" ? await t.onBackgroundMessageHandler(s) : t.onBackgroundMessageHandler.next(s);
  }
}
async function ai(e) {
  var t, n;
  const r = (n = (t = e.notification) === null || t === void 0 ? void 0 : t.data) === null || n === void 0 ? void 0 : n[pn];
  if (r) {
    if (e.action)
      return;
  } else
    return;
  e.stopImmediatePropagation(), e.notification.close();
  const s = pi(r);
  if (!s)
    return;
  const o = new URL(s, self.location.href), i = new URL(self.location.origin);
  if (o.host !== i.host)
    return;
  let a = await li(o);
  if (a ? a = await a.focus() : (a = await self.clients.openWindow(s), await ti(3e3)), !!a)
    return r.messageType = Q.NOTIFICATION_CLICKED, r.isFirebaseMessaging = !0, a.postMessage(r);
}
function ci(e) {
  const t = Object.assign({}, e.notification);
  return t.data = {
    [pn]: e
  }, t;
}
function ui({ data: e }) {
  if (!e)
    return null;
  try {
    return e.json();
  } catch {
    return null;
  }
}
async function li(e) {
  const t = await wn();
  for (const n of t) {
    const r = new URL(n.url, self.location.href);
    if (e.host === r.host)
      return n;
  }
  return null;
}
function di(e) {
  return e.some((t) => t.visibilityState === "visible" && // Ignore chrome-extension clients as that matches the background pages of extensions, which
  // are always considered visible for some reason.
  !t.url.startsWith("chrome-extension://"));
}
function fi(e, t) {
  t.isFirebaseMessaging = !0, t.messageType = Q.PUSH_RECEIVED;
  for (const n of e)
    n.postMessage(t);
}
function wn() {
  return self.clients.matchAll({
    type: "window",
    includeUncontrolled: !0
    // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
  });
}
function hi(e) {
  var t;
  const { actions: n } = e, { maxActions: r } = Notification;
  return n && r && n.length > r && console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`), self.registration.showNotification(
    /* title= */
    (t = e.title) !== null && t !== void 0 ? t : "",
    e
  );
}
function pi(e) {
  var t, n, r;
  const s = (n = (t = e.fcmOptions) === null || t === void 0 ? void 0 : t.link) !== null && n !== void 0 ? n : (r = e.notification) === null || r === void 0 ? void 0 : r.click_action;
  return s || (ei(e.data) ? self.location.origin : null);
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
function gi(e) {
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
let bi = class {
  constructor(t, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const s = gi(t);
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
  const t = new bi(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
  return self.addEventListener("push", (n) => {
    n.waitUntil(ii(n, t));
  }), self.addEventListener("pushsubscriptionchange", (n) => {
    n.waitUntil(oi(n, t));
  }), self.addEventListener("notificationclick", (n) => {
    n.waitUntil(ai(n));
  }), t;
};
function wi() {
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
async function yi() {
  return Pt() && await xt() && "PushManager" in self && "Notification" in self && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey");
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
function _i(e, t) {
  if (self.document !== void 0)
    throw g.create(
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
function Ii(e = fs()) {
  return yi().then((t) => {
    if (!t)
      throw g.create(
        "unsupported-browser"
        /* ErrorCode.UNSUPPORTED_BROWSER */
      );
  }, (t) => {
    throw g.create(
      "indexed-db-unsupported"
      /* ErrorCode.INDEXED_DB_UNSUPPORTED */
    );
  }), Ke(je(e), "messaging-sw").getImmediate();
}
function Ei(e, t) {
  return e = je(e), _i(e, t);
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
wi();
const vi = {
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
const Si = "/firebase-messaging-sw.js", Ti = "/firebase-cloud-messaging-push-scope", yn = "BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4", Ci = "https://fcmregistrations.googleapis.com/v1", _n = "google.c.a.c_id", ki = "google.c.a.c_l", Di = "google.c.a.ts", Ai = "google.c.a.e";
var Tt;
(function(e) {
  e[e.DATA_MESSAGE = 1] = "DATA_MESSAGE", e[e.DISPLAY_NOTIFICATION = 3] = "DISPLAY_NOTIFICATION";
})(Tt || (Tt = {}));
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
function Ri(e) {
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
const _e = "fcm_token_details_db", Oi = 5, Ct = "fcm_token_object_Store";
async function Mi(e) {
  if ("databases" in indexedDB && !(await indexedDB.databases()).map((o) => o.name).includes(_e))
    return null;
  let t = null;
  return (await te(_e, Oi, {
    upgrade: async (r, s, o, i) => {
      var a;
      if (s < 2 || !r.objectStoreNames.contains(Ct))
        return;
      const c = i.objectStore(Ct), l = await c.index("fcmSenderId").get(e);
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
  })).close(), await x(_e), await x("fcm_vapid_details_db"), await x("undefined"), Ni(t) ? t : null;
}
function Ni(e) {
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
const $i = "firebase-messaging-database", Li = 1, P = "firebase-messaging-store";
let Ie = null;
function et() {
  return Ie || (Ie = te($i, Li, {
    upgrade: (e, t) => {
      switch (t) {
        case 0:
          e.createObjectStore(P);
      }
    }
  })), Ie;
}
async function In(e) {
  const t = nt(e), r = await (await et()).transaction(P).objectStore(P).get(t);
  if (r)
    return r;
  {
    const s = await Mi(e.appConfig.senderId);
    if (s)
      return await tt(e, s), s;
  }
}
async function tt(e, t) {
  const n = nt(e), s = (await et()).transaction(P, "readwrite");
  return await s.objectStore(P).put(t, n), await s.done, t;
}
async function Bi(e) {
  const t = nt(e), r = (await et()).transaction(P, "readwrite");
  await r.objectStore(P).delete(t), await r.done;
}
function nt({ appConfig: e }) {
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
const Pi = {
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
}, p = new V("messaging", "Messaging", Pi);
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
async function xi(e, t) {
  const n = await st(e), r = vn(t), s = {
    method: "POST",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(rt(e.appConfig), s)).json();
  } catch (i) {
    throw p.create("token-subscribe-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw p.create("token-subscribe-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw p.create(
      "token-subscribe-no-token"
      /* ErrorCode.TOKEN_SUBSCRIBE_NO_TOKEN */
    );
  return o.token;
}
async function ji(e, t) {
  const n = await st(e), r = vn(t.subscriptionOptions), s = {
    method: "PATCH",
    headers: n,
    body: JSON.stringify(r)
  };
  let o;
  try {
    o = await (await fetch(`${rt(e.appConfig)}/${t.token}`, s)).json();
  } catch (i) {
    throw p.create("token-update-failed", {
      errorInfo: i == null ? void 0 : i.toString()
    });
  }
  if (o.error) {
    const i = o.error.message;
    throw p.create("token-update-failed", {
      errorInfo: i
    });
  }
  if (!o.token)
    throw p.create(
      "token-update-no-token"
      /* ErrorCode.TOKEN_UPDATE_NO_TOKEN */
    );
  return o.token;
}
async function En(e, t) {
  const r = {
    method: "DELETE",
    headers: await st(e)
  };
  try {
    const o = await (await fetch(`${rt(e.appConfig)}/${t}`, r)).json();
    if (o.error) {
      const i = o.error.message;
      throw p.create("token-unsubscribe-failed", {
        errorInfo: i
      });
    }
  } catch (s) {
    throw p.create("token-unsubscribe-failed", {
      errorInfo: s == null ? void 0 : s.toString()
    });
  }
}
function rt({ projectId: e }) {
  return `${Ci}/projects/${e}/registrations`;
}
async function st({ appConfig: e, installations: t }) {
  const n = await t.getToken();
  return new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-goog-api-key": e.apiKey,
    "x-goog-firebase-installations-auth": `FIS ${n}`
  });
}
function vn({ p256dh: e, auth: t, endpoint: n, vapidKey: r }) {
  const s = {
    web: {
      endpoint: n,
      auth: t,
      p256dh: e
    }
  };
  return r !== yn && (s.web.applicationPubKey = r), s;
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
const Fi = 7 * 24 * 60 * 60 * 1e3;
async function Ki(e) {
  const t = await Wi(e.swRegistration, e.vapidKey), n = {
    vapidKey: e.vapidKey,
    swScope: e.swRegistration.scope,
    endpoint: t.endpoint,
    auth: w(t.getKey("auth")),
    p256dh: w(t.getKey("p256dh"))
  }, r = await In(e.firebaseDependencies);
  if (r) {
    if (Vi(r.subscriptionOptions, n))
      return Date.now() >= r.createTime + Fi ? Hi(e, {
        token: r.token,
        createTime: Date.now(),
        subscriptionOptions: n
      }) : r.token;
    try {
      await En(e.firebaseDependencies, r.token);
    } catch (s) {
      console.warn(s);
    }
    return kt(e.firebaseDependencies, n);
  } else
    return kt(e.firebaseDependencies, n);
}
async function Ui(e) {
  const t = await In(e.firebaseDependencies);
  t && (await En(e.firebaseDependencies, t.token), await Bi(e.firebaseDependencies));
  const n = await e.swRegistration.pushManager.getSubscription();
  return n ? n.unsubscribe() : !0;
}
async function Hi(e, t) {
  try {
    const n = await ji(e.firebaseDependencies, t), r = Object.assign(Object.assign({}, t), { token: n, createTime: Date.now() });
    return await tt(e.firebaseDependencies, r), n;
  } catch (n) {
    throw await Ui(e), n;
  }
}
async function kt(e, t) {
  const r = {
    token: await xi(e, t),
    createTime: Date.now(),
    subscriptionOptions: t
  };
  return await tt(e, r), r.token;
}
async function Wi(e, t) {
  const n = await e.pushManager.getSubscription();
  return n || e.pushManager.subscribe({
    userVisibleOnly: !0,
    // Chrome <= 75 doesn't support base64-encoded VAPID key. For backward compatibility, VAPID key
    // submitted to pushManager#subscribe must be of type Uint8Array.
    applicationServerKey: Ri(t)
  });
}
function Vi(e, t) {
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
function Dt(e) {
  const t = {
    from: e.from,
    // eslint-disable-next-line camelcase
    collapseKey: e.collapse_key,
    // eslint-disable-next-line camelcase
    messageId: e.fcmMessageId
  };
  return qi(t, e), Gi(t, e), zi(t, e), t;
}
function qi(e, t) {
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
function Gi(e, t) {
  t.data && (e.data = t.data);
}
function zi(e, t) {
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
function Ji(e) {
  return typeof e == "object" && !!e && _n in e;
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
Sn("hts/frbslgigp.ogepscmv/ieo/eaylg", "tp:/ieaeogn-agolai.o/1frlglgc/o");
Sn("AzSCbw63g1R0nCw85jG8", "Iaya3yLKwmgvh7cF0q4");
function Sn(e, t) {
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
function Yi(e) {
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
  return p.create("missing-app-config-values", {
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
class Xi {
  constructor(t, n, r) {
    this.deliveryMetricsExportedToBigQueryEnabled = !1, this.onBackgroundMessageHandler = null, this.onMessageHandler = null, this.logEvents = [], this.isLogServiceStarted = !1;
    const s = Yi(t);
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
async function Qi(e) {
  try {
    e.swRegistration = await navigator.serviceWorker.register(Si, {
      scope: Ti
    }), e.swRegistration.update().catch(() => {
    });
  } catch (t) {
    throw p.create("failed-service-worker-registration", {
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
async function Zi(e, t) {
  if (!t && !e.swRegistration && await Qi(e), !(!t && e.swRegistration)) {
    if (!(t instanceof ServiceWorkerRegistration))
      throw p.create(
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
async function ea(e, t) {
  t ? e.vapidKey = t : e.vapidKey || (e.vapidKey = yn);
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
async function Tn(e, t) {
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
  return await ea(e, t == null ? void 0 : t.vapidKey), await Zi(e, t == null ? void 0 : t.serviceWorkerRegistration), Ki(e);
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
async function ta(e, t, n) {
  const r = na(t);
  (await e.firebaseDependencies.analyticsProvider.get()).logEvent(r, {
    /* eslint-disable camelcase */
    message_id: n[_n],
    message_name: n[ki],
    message_time: n[Di],
    message_device_time: Math.floor(Date.now() / 1e3)
    /* eslint-enable camelcase */
  });
}
function na(e) {
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
async function ra(e, t) {
  const n = t.data;
  if (!n.isFirebaseMessaging)
    return;
  e.onMessageHandler && n.messageType === H.PUSH_RECEIVED && (typeof e.onMessageHandler == "function" ? e.onMessageHandler(Dt(n)) : e.onMessageHandler.next(Dt(n)));
  const r = n.data;
  Ji(r) && r[Ai] === "1" && await ta(e, n.messageType, r);
}
const At = "@firebase/messaging", Rt = "0.12.4";
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
const sa = (e) => {
  const t = new Xi(e.getProvider("app").getImmediate(), e.getProvider("installations-internal").getImmediate(), e.getProvider("analytics-internal"));
  return navigator.serviceWorker.addEventListener("message", (n) => ra(t, n)), t;
}, oa = (e) => {
  const t = e.getProvider("messaging").getImmediate();
  return {
    getToken: (r) => Tn(t, r)
  };
};
function ia() {
  A(new E(
    "messaging",
    sa,
    "PUBLIC"
    /* ComponentType.PUBLIC */
  )), A(new E(
    "messaging-internal",
    oa,
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), k(At, Rt), k(At, Rt, "esm2017");
}
async function aa(e, t) {
  return e = je(e), Tn(e, t);
}
ia();
er([{"revision":"10ae03871fb1bcee98915b3e801a78ec","url":"android-chrome-192x192.png"},{"revision":"31bfe7427dc83c410e63693094bdd7eb","url":"android-chrome-512x512.png"},{"revision":"4a0de055d61d6a98a51bb17cbf7003be","url":"apple-touch-icon.png"},{"revision":"2646ab039d243a88694256e0fd1a2474","url":"favicon-16x16.png"},{"revision":"a8f1e6415c97f09be4e55428d5820a8b","url":"favicon-32x32.png"},{"revision":"8bf983c3aa965f030568f62d5add79ae","url":"favicon.ico"},{"revision":"650c96fe4141b24d1297e91e0b5f5a50","url":"index.html"},{"revision":"d56efad0a551756954d378677363f4da","url":"mstile-144x144.png"},{"revision":"25b0b1c9f78025d3a16da5c267535f7c","url":"mstile-150x150.png"},{"revision":"8245ae538149f0349fb015c2c1f89026","url":"mstile-310x150.png"},{"revision":"b7ba57b777d1df0c769e317c767b9e46","url":"mstile-310x310.png"},{"revision":"0a928f2b9562d7ae902a167473503721","url":"mstile-70x70.png"},{"revision":"04b2b88179130e5df4af4cff6ac9264e","url":"safari-pinned-tab.svg"},{"revision":"ccf8c0e3ea8c834ac8974a2bef90d113","url":"talker.svg"},{"revision":"ccf8c0e3ea8c834ac8974a2bef90d113","url":"talker.svg"},{"revision":"8f47a97b2c1136987645d1f5d280bd68","url":"manifest.webmanifest"}] || []);
W(
  ({ request: e }) => e.mode === "navigate",
  Qn("/index.html")
);
const ca = new S(
  ({ request: e }) => e.destination === "image",
  new nr({
    cacheName: "images"
  })
), ua = new S(
  ({ request: e }) => e.destination === "script",
  new Mt({
    cacheName: "scripts"
  })
), la = new S(
  ({ request: e }) => e.destination === "style",
  new Mt({
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
  await ha();
});
const ne = new BroadcastChannel("talker-sw"), da = Kt(vi), Cn = Ii(da);
Ei(Cn, async (e) => {
  e.data && e.data.isNotified === "no" && (self.registration.showNotification(e.data.type, {
    tag: "FRIEND_REQUEST",
    body: `${e.data.name} ${e.data.message}`,
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
  }), console.log(e));
});
let ve = !1;
const fa = {
  debug: "#7f8c8d",
  log: "#2ecc71",
  warn: "#f39c12",
  error: "#c0392b",
  groupCollapsed: "#3498db",
  groupEnd: null
  // No colored prefix on groupEnd
}, b = function(e, t) {
  if (e === "groupCollapsed" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    console[e](...t);
    return;
  }
  const n = [
    `background: ${fa[e]}`,
    "border-radius: 0.5em",
    "color: white",
    "font-weight: bold",
    "padding: 2px 0.5em"
  ], r = ve ? [] : ["%cTalker SW", n.join(";")];
  console[e](...r, ...t), e === "groupCollapsed" && (ve = !0), e === "groupEnd" && (ve = !1);
};
self.addEventListener("notificationclick", (e) => {
  const { notification: t } = e;
  t.close(), b("groupCollapsed", ["Notification clicked!"]), b("log", [`Action -> ${e.action ?? "empty"}`]), b("groupEnd", []), e.waitUntil(
    self.clients.matchAll({
      type: "window"
    }).then(function(n) {
      console.log(n);
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
const ha = async () => {
  const e = await aa(Cn, {
    serviceWorkerRegistration: self.registration,
    vapidKey: "BOF-yJZi4d8yVCVRkD6lvrviRbMObr7fHl5ma2IyJzjDC4-Ecr9_FGJsDTloNVuETMQUqH7MVEoXfV3MkGg5yO4"
  });
  ne.postMessage({
    type: "TOKEN_REGENERATED",
    token: e
  }), b("groupCollapsed", ["Token succesfully regenerated!"]), b("log", [`Generated token -> ${e}`]), b("groupEnd", []);
}, pa = () => {
  self.clients.claim(), b("log", ["Client claimed!"]);
};
ne.onmessage = async (e) => {
  var t;
  switch ((t = e.data) == null ? void 0 : t.type) {
    case "CLAIM_CLIENTS":
      pa();
      break;
  }
};
self.addEventListener("message", (e) => {
  const t = e.data;
  t && (b("groupCollapsed", ["Message send!"]), b("log", [`Action -> ${t.type ?? "empty"}`, t]), b("groupEnd", []));
});
