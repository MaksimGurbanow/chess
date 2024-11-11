const letters = 'abcdefghijklmnopqrstuvwxyz1234567890';

export default () =>
  Array.from({ length: 8 })
    .map(() => letters.at(Math.floor(Math.random() * letters.length)))
    .join('');
