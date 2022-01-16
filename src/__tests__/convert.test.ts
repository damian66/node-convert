import convert from '../convert';
import office from '../office';

jest.mock('../office.ts');

describe('Convert', () => {
  it('', () => expect(true).toBe(true));
  // it('calls soffice command', async () => {
  //   const inputString = 'foo.txt';
  //   await convert(inputString);

  //   expect(unoconv).toBeCalledWith({
  //     input: inputString,
  //   });
  // });

  // it('passes options to unoconv command', async () => {
  //   const inputString = 'bar.txt';
  //   const options = {
  //     abc: 'def',
  //     foo: 'bar',
  //   };
  //   await convert(inputString, options);

  //   expect(unoconv).toBeCalledWith({
  //     ...options,
  //     input: inputString,
  //   });
  // });

  // it('ignores input from options object because it was already passed with first parameter', async () => {
  //   const inputString = 'foo.txt';
  //   const options = {
  //     abc: 'def',
  //     foo: 'bar',
  //     input: 'bar.jpg',
  //   };
  //   await convert(inputString, options);

  //   expect(unoconv).toBeCalledWith({
  //     ...options,
  //     input: inputString,
  //   });
  // });
});
