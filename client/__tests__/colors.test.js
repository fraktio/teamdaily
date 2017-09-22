import colors from '../src/colors';

describe('Color constants', () => {
  test('Defined number of colors', () => {
    expect(colors.length).toEqual(5);
  });

  test('Has color green', () => {
    expect(colors.includes(colors.COLOR_GREEN)).toEqual(true);
  });

  test('Has color yellow', () => {
    expect(colors.includes(colors.COLOR_YELLOW)).toEqual(true);
  });

  test('Has color red', () => {
    expect(colors.includes(colors.COLOR_RED)).toEqual(true);
  });

  test('Has color blue', () => {
    expect(colors.includes(colors.COLOR_BLUE)).toEqual(true);
  });

  test('Has color pink', () => {
    expect(colors.includes(colors.COLOR_PINK)).toEqual(true);
  });
});
