import CSM from './css-machine';
export default class CSSStateMachine {
  states: any[];
  queue: any[];

  constructor(states) {
    this.queue = [];
  }
}

type stateOptions = {
  sha?: string;
  css?: string;
  selector?: string;
}

export class CSMStateComponent {
  state: string;
  states: { [key in string]: stateOptions };
  stateMethods: any;
  events: any[];
  target: string;
  queue: any[];

  constructor() {
    for (let [key, value] of Object.entries(this.states)) {
      const tuple = CSM.generateCSS(this.target, value.css)
      value.sha = tuple[0];
      CSM.addToPipeline(tuple);

      if (key == this.state) {
        CSM.addClass(this.target, tuple[0])
      }
    }
    CSM.updateStyle()
  }

  getSHA(name) {
    return this.states[name].sha
  }

  setState(name) {
    console.log(this);
    CSM.removeClass(this.target, this.getSHA(this.state))
    CSM.addClass(this.target, this.getSHA(name))
    this.state = name;
  }
}

export function target(selector) {
  return function(constructor: any) {
    constructor.prototype.target = selector;
    constructor.target = selector;
  }
}

type StateOptions = {
  initial?: boolean;
  css?: string;
}

export function state(name, options?: StateOptions) {
  let opts = options || {};

  return function(constructor: Function) {
    if (opts.initial) {
      constructor.prototype.state = name
    } else if (!constructor.prototype.state) {
      constructor.prototype.state = name
    }

    constructor.prototype.states = {
      ...constructor.prototype.states,
      [name]: {
        ...(opts.css && { css: opts.css })
      }
    }
  }
}

export function event(name, opts?) {
  return (t, n, d) => {
    t.stateMethods = {
      ...t.stateMethods,
      [name]: d.value,
    };

    return d;
  }
}

export function transition(opts) {
  return function(t, n, d) {
    return d;
  }
}
