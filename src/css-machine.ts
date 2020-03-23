import flatten from 'css-flatten';

type Selector = string;
type SHA = string;
type CSS = string;
type CSSTuple = [SHA, CSS]

export default class CSSMachine {
  static parse = flatten;
  static cssCache: CSSTuple[] = [];

  // returns a tuple: [SHA, CSS]
  static generateCSS (selector: Selector, css: CSS): CSSTuple {
    const SHA = this.generateSHA(css);
    return [SHA, this.parse(`
      ${selector}.${SHA} {
        ${css}
      }
    `)];
  }

  static generateSHA (css: CSS): SHA {
    let hash = 5381;
    let index = css.length;

    while (index) {
      hash = (hash * 33) ^ css.charCodeAt(--index);
    }

    return 'csm-' + (hash >>> 0).toString(16);
  }

  static cacheExists(SHA) {
    for (let tuple of this.cssCache) {
      if (tuple[0] == SHA) return true
    }
  }

  static addCache(tuple) {
    const exists = this.cacheExists(tuple[1]);
    if (!exists) this.cssCache.push(tuple);
  }

  static removeCache(tuple) {
    const newCache = this.cssCache.filter(([sha, _]) => sha !== tuple[0]);
    this.cssCache = newCache
    return this.cssCache;
  }

  static inject(selector, css) {
    const tuple = this.generateCSS(selector, css);
    this.addCache(tuple);
    this.updateStyle();
  }

  static eject(selector, css) {
    const tuple = this.generateCSS(selector, css);
    this.removeCache(tuple);
    this.updateStyle();
  }

  static updateStyle() {
    const head = document.getElementsByTagName('head')[0];
    const cssContent: CSS = this.cssCache.reduce((result, [_, css]) => result + css, '');

    const existingStyle = document.querySelector(`style.csm`);

    const style = existingStyle || document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.className = 'csm';
    style.textContent = cssContent;

    head.appendChild(style);
  }

  static addClass(selector: Selector, ...classes) {
    const elem = document.querySelector(selector);
    return elem.classList.add(...classes);
  }

  static removeClass(selector: Selector , ...classes) {
    const elem = document.querySelector(selector);
    return elem.classList.remove(...classes);
  }
}
