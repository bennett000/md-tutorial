/**
 * Created by michael on 29/03/15.
 */

// These functions are more or less _ adapted to angular

export function throttleNow() {
  return () => Date.now();
}

/** @ngInject */
export function throttle($timeout, throttleNow) {
  'use strict';

  function throttle(func, wait, options) {
    let context, args, result,
      timeout = null,
      previous = 0;

    if (!options) {
      options = {};
    }
    function later() {
      previous = options.leading === false ? 0 : throttleNow();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    }

    return function () {
      let now = throttleNow(), remaining;
      if (!previous && options.leading === false) {
        previous = now;
      }
      remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        $timeout.cancel(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }

      } else if (!timeout && options.trailing !== false) {
        timeout = $timeout(later, remaining);
      }
      return result;
    };
  }

  return throttle;
}

/** @ngInject */
export function debounce($timeout, throttleNow) {
  'use strict';

  /**
   * @param {function(...)} func
   * @param {number} wait
   * @param {boolean=} immediate
   * @returns {Function}
   */
  function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    function later() {
      const last = throttleNow() - timestamp;

      if (last < wait && last > 0) {
        timeout = $timeout(later, wait - last);
      } else {
        $timeout.cancel(timeout);
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) {
            context = args = null;
          }
        }
      }
    }

    return function () {
      context = this;
      args = Array.prototype.slice.call(arguments, 0);
      timestamp = throttleNow();
      const callNow = immediate && !timeout;
      if (!timeout) {
        timeout = $timeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }

  return debounce;
}


