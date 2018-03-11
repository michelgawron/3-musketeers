'use strict';

const convert = require('..');
const Big = require('big.js');
let myTest = require('unit.js');

test('should default to returning a Number', () => {
    myTest.assert(typeof convert(2, 'BTC', 'BTC') === "number");
});

test('should return a Number', () => {
    myTest.assert(typeof convert(2, 'BTC', 'BTC', 'Number') === "number");
});

test('should return a Big number', () => {
    expect(convert(2, 'BTC', 'BTC', 'Big')).toBeInstanceOf(Big);
});

test('should return a String', () => {
    myTest.assert(typeof convert(2100, 'mBTC', 'BTC', 'String') === "string");
});

test('should convert an integer', () => {
    myTest.assert(typeof convert(123456789012345, 'Satoshi', 'BTC', 'Number') === "number");
});

test('should convert a number', () => {
    myTest.assert(typeof convert(1234567.89012345, 'BTC', 'Satoshi', 'Number') === "number");
});

test('should convert a string', () => {
    myTest.assert(typeof convert('2', 'BTC', 'BTC', 'Number') === "number");
});

test('should convert a Big number', () => {
    myTest.assert(typeof convert(new Big(2), 'BTC', 'BTC', 'Number') === "number");
});

test('should convert a NaN to a Number', () => {
    myTest.assert(typeof convert(NaN, 'BTC', 'BTC', 'Number') === "number");
    myTest.assert(typeof convert(NaN, 'BTC', 'mBTC', 'Number') === "number");
});

test('should convert a NaN to a String', () => {
    myTest.assert(typeof convert(NaN, 'BTC', 'BTC', 'String' === "string"));
    myTest.assert(typeof convert(NaN, 'BTC', 'mBTC', 'String' === "string"));
});

test('should not convert a NaN to a Big', () => {
    expect(() => {
        convert(NaN, 'BTC', 'BTC', 'Big')
    }).toThrow();
});

test('should handle rounding errors', () => {
    myTest.assert(typeof convert(4.6, 'Satoshi', 'BTC', 'Number') === "number");
    myTest.assert(typeof convert(0.000000046, 'BTC', 'Satoshi', 'Number') === "number");
});

test('should throw when untest is undefined', () => {
    expect(() => {
        convert(new Big(2), 'x', 'BTC', 'Number')
    }).toThrow();
    expect(() => {
        convert(new Big(2), 'BTC', 'x', 'Number')
    }).toThrow();
    expect(() => {
        convert(NaN, 'x', 'BTC', 'Number')
    }).toThrow();
    expect(() => {
        convert(NaN, 'BTC', 'x', 'Number')
    }).toThrow();
});

test('should throw when representaion is undefined', () => {
    expect(() => {
        convert(2, 'BTC', 'mBTC', 'x')
    }).toThrow();
    expect(() => {
        convert(NaN, 'BTC', 'mBTC', 'x')
    }).toThrow();
});

test('should allow untest aliases', () => {
    convert(4.6, 'Satoshi', 'sat');
    expect(() => {
        convert(4.6, 'μBTC', 'btest')
    }).toThrow();
});

test('should allow unit creation', () => {
    convert.addUnit("myUnit", new Big(0.05412));
    expect(convert.units()).toContain("myUnit");
});

test('should allow removing units', () => {
    convert.addUnit("myUnit", new Big(0.05412));
    expect(convert.units()).toContain("myUnit");
    convert.removeUnit("myUnit");
    expect(convert.units()).not.toContain("myUnit");
});

test('should throw when adding an existing unit', () => {
    convert.addUnit("myUnit", new Big(0.05412));
    expect(convert.units()).toContain("myUnit");
    expect(() => {
        convert.addUnit("myUnit", new Big(1));
    }).toThrow();
});

test('should throw when removing predefined unit', () => {
    expect(() => {
        convert.removeUnit("Satoshi")
    }).toThrow();
});
