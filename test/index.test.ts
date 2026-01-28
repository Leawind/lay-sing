import { beforeAll, describe, expect, it } from 'bun:test';
import { hello } from '../src';

describe('Example Test', () => {
  it('example it', () => {
    console.log('greet:', hello());
  });
});
