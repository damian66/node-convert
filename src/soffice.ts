import { spawn, ChildProcess } from 'child_process';
import debugFactory from 'debug';
import path from 'path';
import fs from 'fs';

import type {
  Callback, Options, ReturnOutput,
  ConvertOptions,
} from './types';

const debug = debugFactory('node-unoconv:command');

const sofficeConvert = (options: ConvertOptions): ChildProcess => {
  const { input = '' } = options;

  const inputPath = input.substring(0, input.lastIndexOf('/'));
  const stdout: Uint8Array[] = [];
  const stderr: Uint8Array[] = [];

  const returnToBuffer = !options.outdir;

  const {
    callback = (() => null) as Callback,
    type = 'pdf',
    outdir = inputPath,
  } = options;

  if (options.debug) {
    debugFactory.enable('node-convert:*');
  }

  const args = [
    '--convert-to', type,
    input,
    '--accept=socket,host=127.0.0.1,port=2001,tcpNoDelay=1;urp;StarOffice.ComponentContext',
    '--headless',
  ] as string[];

  if (outdir) {
    args.push('--outdir', outdir);
  }

  if (returnToBuffer) {
    args.push('-p');
  }

  debug(`Running command: soffice ${args.join(' ')}`);

  const childProcess = spawn('soffice', args);

  childProcess.stdout.on('data', (data: Uint8Array) => {
    stdout.push(data);
  });

  childProcess.stderr.on('data', (data: Uint8Array) => {
    stderr.push(data);
  });

  childProcess.on('close', async (code: string) => {
    debug('soffice finished with code: %s', code);

    if (returnToBuffer) {
      const output = input.replace(path.extname(input), `.${type}`);
      await new Promise((resolve) => { fs.unlink(output, () => resolve(true)); });
    }

    if (stderr.length) {
      const error = new Error(Buffer.concat(stderr).toString('utf8'));
      debug('%o', error);
      callback(error);
      return;
    }

    callback(null, Buffer.concat(stdout));
  });

  childProcess.on('error', (err: Error) => {
    if (err.message.indexOf('ENOENT') > -1) {
      debug('soffice command not found. %o', err);
      return;
    }

    debug('%o', err);
  });

  return childProcess;
};

const convert = (options: Options): ReturnOutput => {
  if (!options.callback) {
    // Return a promise if there is no callback
    return new Promise((resolve, reject) => {
      // Assign a fake callback that would either resolve or reject the promise
      const callback: Callback = (err, result) => (err
        ? reject(err)
        : resolve(result));

      const runOptions = {
        ...options,
        callback,
      };

      sofficeConvert(runOptions);
    });
  }

  return sofficeConvert(options);
};

export default convert;
