import auth from './auth';
import {SUCCESS_STATUS} from './constants';

const localStorage = require('localStorage');
describe('Auth', () => {
it('Logs in a user after signup', done => {
    const mockSuccessResponse = {status:SUCCESS_STATUS, result:{token:'123'}};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    auth.signup({username:'username', fullName:'name lastname', password:'123Password', email:'test@test.com', country:'mexico', test:true })
    .then(res=>{
      expect(res.status).toEqual(SUCCESS_STATUS);
      expect(localStorage.token).toEqual('123');
      done();
    });
  });

});
