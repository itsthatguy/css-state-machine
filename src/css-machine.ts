import flatten from 'css-flatten';

type Selector = string;
type SHA = string;
type CSS = string;
type CSSTuple = [SHA, CSS]

export default class CSSMachine {
  static parse = flatten;

  // returns a touple: [SHA, CSS]
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

  static inject(selector, css) {
    const [SHA, CSS] = this.generateCSS(selector, css);
    const head = document.getElementsByTagName('head')[0];
    const existingStyle = document.querySelector(`style.${SHA}`);

    if (existingStyle) head.removeChild(existingStyle);

    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.className = SHA;
    style.textContent = CSS;

    head.appendChild(style);
  }

  static eject(selector, css) {
    const [SHA] = this.generateCSS(selector, css);
    const head = document.getElementsByTagName('head')[0];
    const existingStyle = document.querySelector(`style.${SHA}`);

    if (existingStyle) head.removeChild(existingStyle);
  }
}
