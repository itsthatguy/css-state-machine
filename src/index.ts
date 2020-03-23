
export default class CSSStateMachine {
  states: any[];
  queue: any[];

  constructor(states) {
    this.states = states;
    this.queue = [];
  }
}

const idleCSS = `
  h1 { color: black; }
  h2 { color: black; }
`;

const loadingCSS = `
  h1 { color: red; }
  h2 { color: blue; }
`;

const runningCSS = `
  h1 { color: green; }
  h2 { color: green; }
`;

/*
  1. definition of the discreet states that the component can take
    - name of state
    - visual description of state

  2. define triggers (events)

  3. how do you transition between
    - where is it general, and specific

*/

//   handleTransition(state) {
//     if (this.queue.length() > 0) {
//       this.cancelTransition()
//     }
//     for (let s of state.on) {
//       this.addToQueue(s);
//     }
//   }

//   addTransition() {
//     // cleanup current queue/timeouts
//   }

//   addToQueue(state) {
//     this.queue.push(() => {
//       state.fn(s.args)
//       this.queue.pop()
//     })
//   }

//   removeFromQueue(state) {
//     for (let s of state.on) {
//       if s == state {
//         // remove s from queue
//       }
//     }
//   }
// }

// let to = setTimeout(() => "", 1600)

// clearTimeout(to)

// // let foo = new CSSStateMachine([
// //   { name: 'idle', from: ['loading', 'active', 'hover'] },
// //   { name: 'loading', from: ['idle', 'active', 'hover'], to: 'idle' },
// //   { name: 'active', },
// //   { name: 'hover', },
// // ])

// let holding = (props) => `
//   animation-name: fade-in;
//   animation-duration: ${props.duration}ms;
// `
// let myStates = [
//   name: 'loading'
//   on: [
//     { fn: holding, args: { duration: 3600 }, target: '.hold-please' },
//     idle,
//   ],
//   out: [
//     '.fade-out',
//   ]
// }


// .loading-idle {
//   color: red;
//   opacity: 1;
// }

// .loading {
//   animation-name: fade-in;
//   animation-duration: 3.6s;
// }

// @keyframes fade-in {
//   0% { opacity: 0; }
//   100% { opacity: 1; }
// }
