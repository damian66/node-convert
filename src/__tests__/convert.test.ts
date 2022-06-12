import convert from '../convert';
import office from '../soffice';

jest.mock('../soffice.ts');

describe('Convert', () => {
  it('calls soffice function', async () => {
    const inputString = 'foo.txt';
    await convert(inputString);

    expect(office).toBeCalledWith({
      input: inputString,
    });
  });

  it('passes options to soffice function', async () => {
    const inputString = 'bar.txt';
    const options = {
      abc: 'def',
      foo: 'bar',
    };
    await convert(inputString, options);

    expect(office).toBeCalledWith({
      ...options,
      input: inputString,
    });
  });

  it('ignores input from options object because it was already passed as first parameter', async () => {
    const inputString = 'foo.txt';
    const options = {
      abc: 'def',
      foo: 'bar',
      input: 'bar.jpg',
    };
    await convert(inputString, options);

    expect(office).toBeCalledWith({
      ...options,
      input: inputString,
    });
  });
});
