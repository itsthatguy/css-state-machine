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
    const css1 = 'h1 { color: blue; } h2 { color: red; }';
    const sha1 = CSSMachine.generateSHA(css1);
    CSSMachine.inject('#root', css1)
    document.querySelector('#root').className = sha1;

    setTimeout(() => {
      const css2 = 'h1 { color: green; } h2 { color: green; }';
      const sha2 = CSSMachine.generateSHA(css2);
      CSSMachine.eject('#root', css1)
      CSSMachine.inject('#root', css2)
      document.querySelector('#root').className = sha2;
    }, 3000);
  }
}

export default new MyComponent();
