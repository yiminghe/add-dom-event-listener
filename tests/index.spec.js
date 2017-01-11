import addEventLister from '../src/';
import expect from 'expect.js';
import simulateEvent from 'simulate-dom-event';

describe('add-dom-event-listener', () => {
  it('works', () => {
    let count = 0;
    const a = document.createElement('a');
    const handle = addEventLister(a, 'click', (e) => {
      expect(e.target).to.be(a);
      expect(e.nativeEvent).to.be.ok();
      expect(e.isEventObject).to.be.ok();
      count++;
    });
    a.href = '#';
    document.body.appendChild(a);
    simulateEvent(a, 'click');
    expect(count).to.be(1);
    handle.remove();
    simulateEvent(a, 'click');
    expect(count).to.be(1);
  });
});
