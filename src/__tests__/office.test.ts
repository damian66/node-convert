import fs from 'fs';
import path from 'path';

import convert from '../office';

jest.setTimeout(30000);

describe('Convert', () => {
  it('Converts a PDF to JPG', async () => {
    const randomString = Math.floor(Math.random() * 10000).toString();
    const dir = path.join(__dirname, '..', '..', 'test');
    const source = path.join(dir, 'test.pdf');
    const input = path.join(dir, `test-${randomString}.pdf`);
    const output = path.join(dir, `test-${randomString}.jpg`);

    fs.copyFileSync(source, input);

    const options = {
      input,
      outdir: dir,
      type: 'jpg',
    };

    await convert(options);

    const fileStats = fs.statSync(output);

    expect(fileStats.size).toBeGreaterThan(0);

    await Promise.all([
      new Promise((resolve) => fs.unlink(input, () => resolve(true))),
      new Promise((resolve) => fs.unlink(output, () => resolve(true))),
    ]);
  });

  it('Converts a DOC to PDF', async () => {
    const randomString = Math.floor(Math.random() * 10000).toString();
    const dir = path.join(__dirname, '..', '..', 'test');
    const source = path.join(dir, 'test.doc');
    const input = path.join(dir, `test-${randomString}.doc`);
    const output = path.join(dir, `test-${randomString}.pdf`);

    fs.copyFileSync(source, input);

    const options = {
      input,
      outdir: dir,
      type: 'pdf',
    };
    await convert(options);

    const fileStats = fs.statSync(output);

    expect(fileStats.size).toBeGreaterThan(0);

    await Promise.all([
      new Promise((resolve) => fs.unlink(input, () => resolve(true))),
      new Promise((resolve) => fs.unlink(output, () => resolve(true))),
    ]);
  });

  it('Converts a PDF to JPG with callback', (done) => {
    const randomString = Math.floor(Math.random() * 10000).toString();
    const dir = path.join(__dirname, '..', '..', 'test');
    const source = path.join(dir, 'test.pdf');
    const input = path.join(dir, `test-${randomString}.pdf`);
    const output = path.join(dir, `test-${randomString}.jpg`);

    fs.copyFileSync(source, input);

    const callback = () => {
      const fileStats = fs.statSync(output);

      expect(fileStats.size).toBeGreaterThan(0);

      fs.unlinkSync(input);
      fs.unlinkSync(output);
      done();
    };

    const options = {
      callback,
      input,
      outdir: dir,
      type: 'jpg',
    };

    convert(options);
  });
});
