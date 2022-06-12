import { Options, ReturnOutput } from './types.d';
import soffice from './soffice';

const convert = (input: string, options: Options = {}): ReturnOutput => {
  const sofficeOptions: Options = {
    ...options,
    input,
  };

  return soffice(sofficeOptions);
};

export default convert;
