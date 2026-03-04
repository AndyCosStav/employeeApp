import { describe, it, expect } from 'vitest';
import {add, greet} from '../../math'


describe('add function', () => {
    it('should return 4 when add 2 + 2 ', () => { 
        expect(add(1,2)).toBe(3)
    })
})


describe('greet function', () => { 
    it('should return a string that contains a name and age', () => { 
        expect(greet('Andy', 34)).toBe('Hello my name is Andy and i am 34 years old')
    })
})