import colors from '../src/colors';

describe('Color constants', () => {
  test('Defined number of colors', () => {
    expect(colors.length).toEqual(5);
  });

  test('Has color green', () => {
    expect(colors.includes('green')).toEqual(true);
  });

  test('Has color yellow', () => {
    expect(colors.includes('yellow')).toEqual(true);
  });

  test('Has color red', () => {
    expect(colors.includes('red')).toEqual(true);
  });

  test('Has color blue', () => {
    expect(colors.includes('blue')).toEqual(true);
  });

  test('Has color pink', () => {
    expect(colors.includes('pink')).toEqual(true);
  });
});
