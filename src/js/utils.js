export function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export class Listeners {
  constructor(listeners) {
    this.listeners = listeners;
  }

  add(listener) {
    this.listeners.push(listener);
    return this;
  }

  init(target, type) {
    this.listeners.forEach((listener) => {
      if (listener.target === target && listener.type === type) {
        listener.target.addEventListener(listener.type, listener.func);
      }
    });
    return this;
  }

  destroy(target, type) {
    this.listeners.forEach((listener) => {
      if (listener.target === target && listener.type === type) {
        listener.target.removeEventListener(listener.type, listener.func);
      }
    });
    return this;
  }
}

export const sliderOptions = {
  perView: 4,
  gap: 20,
  draggable: false,
  rewind: true,

  breakpoints: {
    768: {
      perView: 1,
    },
    1200: {
      perView: 3,
    },
  },
};
