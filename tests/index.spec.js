import addEventLister from '../src/';
import expect from 'expect.js';
import simulateEvent from 'simulate-dom-event';

describe('add-dom-event-listener', function () {
  it('works', function () {
    var count = 0;
    var a = document.createElement('a');
    var handle = addEventLister(a, 'click', function (e) {
      expect(e.target).to.be(a);
      expect(e.nativeEvent).to.be.ok();
      expect(e.isEventObject).to.be.ok();
      count++;
    });
    a.href = '#';
    document.body.appendChild(a);
    simulateEvent(a,'click');
    expect(count).to.be(1);
    handle.remove();
    simulateEvent(a,'click');
    expect(count).to.be(1);
  });
});
