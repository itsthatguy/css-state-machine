import CSM from '../../src/index';
import CSSMachine from '../../src/css-machine';
import { isDeleteExpression } from 'typescript';

class MyComponent {
  name: string;
  state: CSM;

  constructor() {
    console.log('new MyComponent');
    this.name = "MyComponent";

    // state :loading
    // state :hover
    // state :idle

    // event :load do
    //   before do
    //     // something
    //   end

    //   transitions from: :idle, to: :loading, after: {}
    //   transitions from: :hover, to: :loading, after: {}
    // end

    /*
      NOTE: This is just a test implementation for confirming the css machine works...
            The final implementation would leverage the state machine for inject/eject
    */
    const css1 = CSSMachine.generateCSS('.root', 'h1 { color: blue; } h2 { color: red; }');
    const css2 = CSSMachine.generateCSS('.root', 'h1 { color: green; } h2 { color: green; }');
    const css3 = CSSMachine.generateCSS('.root', 'h1 { color: pink; } h2 { color: orange; }');

    const second1 = CSSMachine.generateCSS('.second', 'h1, h2 { color: purple; }');
    const second2 = CSSMachine.generateCSS('.second', 'h1, h2 { color: yellow; }');
    const second3 = CSSMachine.generateCSS('.second', 'h1, h2 { color: blue; }');

    CSSMachine.addToPipeline(css1);
    CSSMachine.addToPipeline(css2);
    CSSMachine.addToPipeline(css3);

    CSSMachine.addToPipeline(second1);
    CSSMachine.addToPipeline(second2);
    CSSMachine.addToPipeline(second3);

    CSSMachine.updateStyle();

    CSSMachine.addClass('.root', css1[0]);
    CSSMachine.addClass('.second', second1[0]);

    setTimeout(() => {
      CSSMachine.removeClass('.root', css1[0]);
      CSSMachine.addClass('.root', css2[0]);
      CSSMachine.addClass('.second', second2[0]);

      setTimeout(() => {
        CSSMachine.removeClass('.root', css2[0]);
        CSSMachine.addClass('.root', css3[0]);
        CSSMachine.addClass('.second', second3[0]);
      }, 3000);
    }, 3000);
  }
}

export default new MyComponent();
