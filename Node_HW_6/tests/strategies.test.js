const strategies = require('../Strategies');
jest.mock('../DB.js');
const db = require('../DB.js');

describe('Strategies test suite', () => {
  test('Bearer strategy should call done when token is found', () => {
    const done = jest.fn();
    const token = "lksdjfiewr";
    strategies.bearerStrategy(token, done);
    expect(done).toHaveBeenCalled();
    expect(done.mock.calls[0][0]).toBe(null);
    expect(done.mock.calls[0][1]).toBe('lena');
  });

  test('Local strategy should call done when found user and return null and object with user data', () => {
    let done = jest.fn();
    const username = 'lena';
    const pwd = '123';
    const user = {username: 'lena', pwd: '123', jwt: 'kfjdshgkdjfhg'};
    db.getUser.mockImplementation(() => {
      done = jest.fn();
      return  done(null, user);
    })
    strategies.localStrategy(username, pwd, done);
    expect(done).toHaveBeenCalled();
    expect(done.mock.calls[0][0]).toEqual(null);
    expect(done.mock.calls[0][1]).toEqual(user);
  })
})