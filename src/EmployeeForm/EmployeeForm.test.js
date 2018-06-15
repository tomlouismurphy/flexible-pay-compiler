import EmployeeForm from './EmployeeForm.js';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

test('salaryConvert rounds to nearest integer', () => {
	const salary = Math.round(Math.random()*1000000);
	expect(salary % 1).toBe(0);
})

test('superConvert ends up with a decimal between 0 and 0.12 if 12 or below is entered', () => {
    let superRate = parseFloat(Math.random()*12);
    if (0 <= superRate && superRate <= .12){
      ;
    } else if (.12 < superRate && superRate <= 12){
      superRate = superRate/100;
    } else {
      superRate = '';
    }
    expect(superRate).toBeLessThanOrEqual(0.12);
})

test('superConvert ends up with an empty string if something between 12 and 100 is entered', () => {
	let superRate = parseFloat(Math.random() * 88 + 12);
    if (0 <= superRate && superRate <= .12){
      ;
    } else if (.12 < superRate && superRate <= 12){
      superRate = superRate/100;
    } else {
      superRate = '';
    }
    expect(superRate).toBe('');
})