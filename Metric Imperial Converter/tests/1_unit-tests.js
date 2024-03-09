const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function() {
        test('Whole number input', function(done){
            let input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });
        test('Decimal Input', function(done){
            let input = '3.2L';
            assert.equal(convertHandler.getNum(input), 3.2);
            done();
        });
        test('Fractional Input', function(done){
            let input = '3/2L';
            assert.equal(convertHandler.getNum(input), 1.5);
            done();
        });
        test('Fractional Input with Decimal', function(done){
            let input = '3.2/2L';
            assert.equal(convertHandler.getNum(input), 1.6);
            done();
        });
        test('Invalid Input (double fraction)', function(done){
            let input = '3/2/2L';
            assert.isUndefined(convertHandler.getNum(input));
            done();
        }); 
        test('No Numerical Input', function(done){
            let input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    });
    suite('Function convertHandler.getUnit(input)', function() {
        test('For Each Valid Unit Inputs', function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            input.forEach(function(ele,index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        });
        test('Unknown Unit Input', function(done){
            let input = '3.2g';
            assert.isUndefined(convertHandler.getUnit(input));
            done();
        });
    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function() {
        test('For Each Valid Unit Inputs', function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function(ele,index) {
                assert.equal(convertHandler.getReturnUnit(ele), output[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {
        test('For Each Valid Unit Inputs', function(done){
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            input.forEach(function(ele,index) {
                assert.equal(convertHandler.spellOutUnit(ele), output[index]);
            });
            done();
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('Gal to L', function(done){
            let input = [5, 'gal'];
            let output = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test('L to Gal', function(done){
            let input = [5, 'L'];
            let output = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test('Mi to Km', function(done){
            let input = [5, 'mi'];
            let output = 8.04672;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test('Km to Mi', function(done){
            let input = [5, 'km'];
            let output = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test('Lbs to Kg', function(done){
            let input = [5, 'lbs'];
            let output = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
        test('Kg to Lbs', function(done){
            let input = [5, 'kg'];
            let output = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
            done();
        });
    });
});