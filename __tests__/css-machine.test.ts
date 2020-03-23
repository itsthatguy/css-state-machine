import CSSMachine from '../src/css-machine';

const sanitize = (str) => str.replace(/\n\s{2,}/gm, ' ').replace(/^\s|\s$/gm, '');

const validateCSS = (input, expected) => {
  return expect(sanitize(input)).toMatch(expected);
}

describe('CSS Parser', () => {
  const cssSHA ='csm-ccc1bf64';
  const css = `
    .foo {
      color: red;
    }
  `;
  const expectedCss = `.foo { color: red; }`;

  const nestedCssSHA = 'csm-def42fd9';
  const nestedCss = `
    .foo {
      color: red;

      &.bar {
        color: blue;
      }
    }
  `;
  const expectedNestedCss = `.foo { color: red; }.foo.bar{ color: blue; }`

  const expectedGeneratedCss = `#root.csm-def42fd9 .foo{ color: red; }#root.csm-def42fd9 .foo.bar{ color: blue; }`;


  it('parses css', () => {
    validateCSS(CSSMachine.parse(css), expectedCss);
  });

  it('parses nested css', () => {
    validateCSS(CSSMachine.parse(nestedCss), expectedNestedCss);
  });

  it('generates a SHA', () => {
    expect(CSSMachine.generateSHA(css)).toEqual(cssSHA);
    expect(CSSMachine.generateSHA(nestedCss)).toEqual(nestedCssSHA);
  });

  it('generates a tuple returning [SHA, CSS]', () => {
    const generated = CSSMachine.generateCSS('#root', nestedCss)
    expect(generated[0]).toEqual(nestedCssSHA);
    validateCSS(generated[1], expectedGeneratedCss);
  });
})
