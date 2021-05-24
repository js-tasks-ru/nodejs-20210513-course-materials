const sinon = require('sinon');
const {expect} = require("chai");

const retry = require('./004-retry');

describe('retry', () => {

  // before
  // after

  // beforeEach
  afterEach(() => {
    sinon.restore();
  });

  it('should call passed function and return it\'s result if any', async () => {
    const timeout = 0;
    const self = {};
    const args = [1, 2, 3];
    const expected = 42;
    const fn = sinon.stub().returns(expected)

    const actual = await retry(timeout, fn, self, ...args)

    expect(actual).to.be.equal(expected)
    expect(fn).calledOn(self)
    expect(fn).calledWithExactly(...args)
    expect(fn).calledOnce
  });

  it('should call passed function second time if error has been returned after the first call', async () => {
    const timeout = 0;
    const self = {};
    const args = [1, 2, 3];
    const expected = 42;
    const fn = sinon.stub()
      .onFirstCall().throws(new Error('something went wrong'))
      .onSecondCall().returns(expected)

    const actual = await retry(timeout, fn, self, ...args)

    expect(actual).to.be.equal(expected)
    expect(fn).calledOn(self)
    expect(fn).calledWithExactly(...args)
    expect(fn).calledTwice
  });

  it('should call the function second time after specified amount of time', async () => {
    const timeout = 10_000;
    const self = {};
    const args = [1, 2, 3];
    const expected = 42;
    const fn = sinon.stub()
      .onFirstCall().throws(new Error('something went wrong'))
      .onSecondCall().returns(expected)

    const timers = sinon.useFakeTimers()

    const actualP = retry(timeout, fn, self, ...args)

    await Promise.resolve();

    timers.next();

    const actual = await actualP;

    expect(actual).to.be.equal(expected)
    expect(fn).calledOn(self)
    expect(fn).calledWithExactly(...args)
    expect(fn).calledTwice
  });
});
