import flatten from 'css-flatten';

type Selector = string;
type SHA = string;
type CSS = string;
type CSSTuple = [SHA, CSS]

export default class CSSMachine {
  static parse = flatten;
  static cssPipeline: CSSTuple[] = [];

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

  static inPipeline(SHA) {
    for (let tuple of this.cssPipeline) {
      if (tuple[0] == SHA) return true
    }
  }

  static addToPipeline(tuple) {
    const exists = this.inPipeline(tuple[0]);
    if (!exists) this.cssPipeline.push(tuple);
  }

  static removeFromPipeline(tuple) {
    const newCache = this.cssPipeline.filter(([sha, _]) => sha !== tuple[0]);
    this.cssPipeline = newCache
    return this.cssPipeline;
  }

  static inject(selector, css) {
    const tuple = this.generateCSS(selector, css);
    this.addToPipeline(tuple);
    this.updateStyle();
  }

  static eject(selector, css) {
    const tuple = this.generateCSS(selector, css);
    this.removeFromPipeline(tuple);
    this.updateStyle();
  }

  static updateStyle() {
    const head = document.getElementsByTagName('head')[0];
    const cssContent: CSS = this.cssPipeline.reduce((result, [_, css]) => result + css, '');

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
