import { Options, ReturnOutput } from './types.d';
import convert from './convert';

export {
  convert,
};

const defaultExport = function unoconv(input: string, options: Options = {}): ReturnOutput {
  return convert(input, options);
};

defaultExport.prototype = {
  convert,
};

export default defaultExport;
