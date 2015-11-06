import EventObject from './EventObject';

export default function addEventListener(target, eventType, callback) {
  function wrapCallback(e) {
    const ne = new EventObject(e);
    callback.call(target, ne);
  }

  if (target.addEventListener) {
    target.addEventListener(eventType, wrapCallback, false);
    return {
      remove() {
        target.removeEventListener(eventType, wrapCallback, false);
      },
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, wrapCallback);
    return {
      remove() {
        target.detachEvent('on' + eventType, wrapCallback);
      },
    };
  }
}
