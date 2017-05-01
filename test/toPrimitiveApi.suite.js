'use strict';

const {suite, test} = require('mocha');
const {expect} = require('chai');
const fs = require('fs');

global.window = global;

suite('toPrimitiveApi', () => {
    var prim1 = 'primitive_1';
    var prim2 = 'primitive_2';

    require('../solutions/toPrimitiveApi');
    const code = fs.readFileSync('solutions/toPrimitiveApi.js', {encoding: 'utf8'});

    const getPseudoPrivatePropName = (obj) => Object.getOwnPropertyNames(obj)
            .filter(k => k !== 'valueOf').shift();

    suite('setPrimitive', () => {
        test('should allow to set primitive and return it in valueOf', () => {
            const obj = {};
            setPrimitive(obj, prim1);

            expect(obj.valueOf()).to.equal(prim1);
        });

        test('should use the save valueOf function for all objects', () => {
            const obj1 = {};
            const obj2 = {};

            setPrimitive(obj1, prim1);
            setPrimitive(obj2, prim2);

            expect(obj1.valueOf).to.equal(obj2.valueOf);
        });

        test('should save primitive as pseudo-private data on object', () => {
            const obj = {};

            setPrimitive(obj, prim1);

            expect(obj).to.be.not.empty;
        });

        test(`the name of it's pseudo-private data property should be complex and contain random part`, () => {
            const obj = {};

            setPrimitive(obj, prim1);

            const prop = getPseudoPrivatePropName(obj);

            expect(/(?!\$)\W/.test(prop)).to.be.true;
            expect(/(Math\.random\(\))|(Date\.now\(\))/.test(code)).to.be.true
        });

        test(`it's pseudo-private data property should be not enumerable`, () => {
            const obj = {};

            setPrimitive(obj, prim1);

            const prop = getPseudoPrivatePropName(obj);

            expect(obj.propertyIsEnumerable(prop)).to.be.false;
        });
    });

    suite('changePrimitive', () => {
        test('should allow to change primitive and return it in valueOf', () => {
            const obj = {};
            setPrimitive(obj, prim1);

            changePrimitive(obj, prim2);
            
            expect(obj.valueOf()).to.equal(prim2);
        });

        test('should not change valueOf method', () => {
            const obj = {};
            setPrimitive(obj, prim1);

            const valueOf = obj.valueOf;

            changePrimitive(obj, prim2);
            
            expect(obj.valueOf).to.equal(valueOf);
        });

        test('should not work without setPrimitive', () => {
            const obj = {};
            changePrimitive(obj, prim1);

            expect(obj.valueOf()).to.not.equal(prim1);
        })
    });
});