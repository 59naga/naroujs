import assert from 'assert';
import { rejects } from 'assert-exception';

// target
import fetch from '../src/fetch';

// specs
describe('fetch', () => {
  it('バリデーションエラーをrejectするべき', async () => {
    assert(
      (await rejects(fetch({ invalid: 1 })))
      .message === '"invalid" is not allowed'
    );
  });
});
