import './index.css';
import CSM, { state, transition, event, CSMStateComponent, target } from '../../src/index';

const loading = `
  .active-state {
    span.loading { display: inline-block; }
  }

  button.loading { background-color: green; }
`;

const idle = `
  .active-state {
    span.idle { display: inline-block; }
  }

  button.idle { background-color: green; }
`;

const active = `
  animation: colorchange 10s infinite;
  .active-state {
    span.active { display: inline-block; }
  }

  button.active { background-color: green; }
`;

@target('.pill')
// possibly add css or classNames to @state() calls
@state('loading', { initial: true, css: loading })
@state('idle', { css: idle })
@state('active', { css: active })
class MyComponent extends CSMStateComponent {
  name: string;

  constructor() {
    super();
    this.name = 'MyComponent';

    this.setState('idle');

    document.querySelector('button.loading').addEventListener('click', () => this.setState('loading'));
    document.querySelector('button.idle').addEventListener('click', () => this.setState('idle'));
    document.querySelector('button.active').addEventListener('click', () => this.setState('active'));
  }

  @event('loading')
  @transition({ from: 'idle', to: 'loading', duration: 3000 })
  @transition({ from: 'active', to: 'loading', duration: 3000 })
  setLoading() {}

  @event('idle')
  @transition({ from: 'loading', to: 'idle' })
  @transition({ from: 'active', to: 'idle' })
  setIdle() {}

  @event('active')
  @transition({ from: 'idle', to: 'active' })
  @transition({ from: 'loading', to: 'active' })
  setActive() {}
}

export default {}

window.onload = () => new MyComponent();
