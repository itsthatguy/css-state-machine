import './index.css';
import CSM, { state, transition, event, CSMStateComponent, target } from '../../src/index';

const loading = `
  .active-state {
    span.loading { display: inline-block; }
  }

  button.loading { background-color: var(--yellow); }
`;

const idle = `
  .active-state {
    span.idle { display: inline-block; }
  }

  button.idle { background-color: var(--yellow); }
`;

const active = `
  h1, h2, .active-state {
    color: var(--dark);
  }

  .active-state {
    span.active { display: inline-block; }
  }

  button.active { background-color: var(--yellow); }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: colorchange 10s infinite;
    z-index: -1;
  }
`;

@target('.root')
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

    document.querySelector('button.loading').addEventListener('click', () => this.setLoading());
    document.querySelector('button.idle').addEventListener('click', () => this.setIdle());
    document.querySelector('button.active').addEventListener('click', () => this.setActive());
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
