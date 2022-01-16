/* eslint-disable @typescript-eslint/no-unused-vars */
import debugFactory from 'debug';
import path from 'path';

import { spawn, ChildProcess } from 'child_process';
import { DEFAULT_OPTIONS } from './constants';
import {
  Callback, OptionValues,
  Options, ReturnOutput,
  ConvertOptions,
} from './types.d';

const debug = debugFactory('node-unoconv:command');

const officeConvert = (options: ConvertOptions): ChildProcess => {
  const stdout: Uint8Array[] = [];
  const stderr: Uint8Array[] = [];

  const {
    callback = (() => null) as Callback,
    input,
    type = 'pdf',
    outdir = path.join(__dirname, '..', 'test'),
  } = options;

  if (options.debug) {
    debugFactory.enable('node-office:*');
  }

  const args = [
    '--convert-to', type,
    input,
    '--outdir', outdir,
    '--accept=socket,host=127.0.0.1,port=2001,tcpNoDelay=1;urp;StarOffice.ComponentContext',
    '--headless',
  ] as string[];

  debug(`Running command: soffice ${args.join(' ')}`);

  const childProcess = spawn('soffice', args);

  childProcess.stdout.on('data', (data: Uint8Array) => {
    stdout.push(data);
  });

  childProcess.stderr.on('data', (data: Uint8Array) => {
    stderr.push(data);
  });

  childProcess.on('close', (code: string) => {
    debug('node-office finished with code: %s', code);
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

      return officeConvert(runOptions);
    });
  }

  return officeConvert(options);
};

export default convert;