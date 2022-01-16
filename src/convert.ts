import { Options, ReturnOutput } from './types.d';
import office from './office';

const convert = (input: string, options: Options = {}): ReturnOutput => {
  const officeOptions: Options = {
    ...options,
    input,
  };

  return office(officeOptions);
};

export default convert;
