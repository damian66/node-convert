# node-convert
NodeJS file converter using LibreOffice or OpenOffice software under the hood.

- Convert PDF, Office and many other file types ([supported file formats](https://en.wikipedia.org/wiki/LibreOffice#Supported_file_formats))
- Generate file thumbnails
- Callback and promise support
- Output to file or buffer

## Installation
```
npm install --save node-convert

// or

yarn add node-convert
```

## Usage

### Convert files

#### Convert a single DOC to PDF
```js
await office.convert('./test.doc', './test.pdf');
```

#### Convert a single file with callback function
```js
function callback() {
  console.log('Done!');
}

office.convert('./test.doc', './test.pdf', callback);
```

#### Output to buffer
```js
const buffer = await convert('./test.doc');
```

### Generate thumbnails

Thumbnails can be generated by converting a file to an image format like JPEG or PNG.

#### Generate a thumbnail for a single file
```js
await convert('./test.doc', './test.jpg');
await convert('./marketing.pdf', './marketing.jpg');
```

##

### Different ways to import node-convert

#### ES6 Import syntax
```js
import convert from 'node-convert';

await convert('./test.doc', './test.pdf');
```
```js
import { convert, listen } from 'node-convert';

await convert('./test.doc', './test.pdf');
```

#### CommonJS require syntax
```js
const convert = require('node-convert');

function cb() {
  console.log('Conversion complete');
}

convert('./test.doc', './test.pdf', cb);
```
