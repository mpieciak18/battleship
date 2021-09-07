import {surroundingSpots} from '../scripts/surroundingspots.js';

test('Pass array of [15] and return [4, 5, 6, 14, 16, 24, 25, 26]', () => {
    const input = [15]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 14, 16, 24, 25, 26]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [15, 16] and return [4, 5, 6, 7, 14, 17, 24, 25, 26, 27]', () => {
    const input = [15, 16]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 7, 14, 17, 24, 25, 26, 27]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [15, 16, 17] and return [4, 5, 6, 7, 8, 14, 18, 24, 25, 26, 27, 28]', () => {
    const input = [15, 16, 17]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 7, 8, 14, 18, 24, 25, 26, 27, 28]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [13, 14, 15, 16, 17] and return [2, 3, 4, 5, 6, 7, 8, 12, 18, 22, 23, 24, 25, 26, 27, 28]', () => {
    const input = [13, 14, 15, 16, 17]
    const output = surroundingSpots(input)
    const expectedOutput = [2, 3, 4, 5, 6, 7, 8, 12, 18, 22, 23, 24, 25, 26, 27, 28]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [15, 25] and return [4, 5, 6, 14, 16, 24, 26, 34, 35, 36]', () => {
    const input = [15, 25]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 14, 16, 24, 26, 34, 35, 36]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [15, 25, 35] and return [4, 5, 6, 14, 16, 24, 26, 34, 36, 44, 45, 46]', () => {
    const input = [15, 25, 35]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 14, 16, 24, 26, 34, 36, 44, 45, 46]
    expect(output).toEqual(expectedOutput)
})

test('Pass array of [15, 25, 35, 45, 55] and return [4, 5, 6, 14, 16, 24, 26, 34, 36, 44, 46, 54, 56, 64, 65, 66]', () => {
    const input = [15, 25, 35, 45, 55]
    const output = surroundingSpots(input)
    const expectedOutput = [4, 5, 6, 14, 16, 24, 26, 34, 36, 44, 46, 54, 56, 64, 65, 66]
    expect(output).toEqual(expectedOutput)
})