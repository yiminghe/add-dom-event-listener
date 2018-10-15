import EventObject from './EventObject';

export default function addEventListener(target, eventType, callback, option) {
  function wrapCallback(e) {
    const ne = new EventObject(e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    let useCapture = false;
    if (typeof option === 'object') {
      useCapture = option.capture || false;
    } else if (typeof option === 'boolean') {
      useCapture = option;
    }

    target.addEventListener(eventType, wrapCallback, option || false);

    return {
      remove() {
        target.removeEventListener(eventType, wrapCallback, useCapture);
      },
    };
  } else if (target.attachEvent) {
    target.attachEvent(`on${eventType}`, wrapCallback);
    return {
      remove() {
        target.detachEvent(`on${eventType}`, wrapCallback);
      },
    };
  }
}
