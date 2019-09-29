const loginService = require('./login.service');
jest.mock('fs');
const fs = require('fs');
jest.mock('jsonwebtoken');
const jwt = require('jsonwebtoken');

describe('login.service', () => {
  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhOTAwNTFmYzA5ZThmNjBlMTE2N2ViYzMxMjYwZjNiM2Y2YmJhYmIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZnJlZW1vbmktY29uc3VtZXItZGV2LWE2YjRjIiwiYXVkIjoiZnJlZW1vbmktY29uc3VtZXItZGV2LWE2YjRjIiwiYXV0aF90aW1lIjoxNTY5NTk3MzczLCJ1c2VyX2lkIjoiZ1lPeGZmczZKN1pNM25Mb1JBZU91VHVvdFJmMSIsInN1YiI6ImdZT3hmZnM2SjdaTTNuTG9SQWVPdVR1b3RSZjEiLCJpYXQiOjE1Njk1OTc0MTUsImV4cCI6MTU2OTYwMTAxNSwiZW1haWwiOiJhZG1pbkBmcmVlbW9uaS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWRtaW5AZnJlZW1vbmkuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.hWD5v8t2g-1P0xG6C1zbWkHb1g7JqWlYlJCZL6dZAy0hwLrr-gJ-zHBwi_QMMcmv1q_X-5ou-PBJignbQXXq1Gt_5-ur56SPtKMz1XCgHc5r1Z15lhfLUDMIRlCUuc_CXE8psS_NbC8gDh6V7oyNHag2x4soA9BdOGjpR4R0uudTAd5ZR3V7dO6qR14Osx1eDRTRNqn_ImEsmbq_pdNazzEcaNxWiCuRHMAZb1t1_0g5SmWRGZd-nF9xlZnz1E0oStz_8g6_fUJTPCiU6lP4Fv46sXfpVZJ7msVhzmXi2pvdIR6Hd8hWCouYN58LG4HfHH8XwXN32MZ50mKZsMAWFg';
  describe('saveTimestamp method', () => {
    it('should call writeFileSync with filpath and date', () => {
      // given
      fs.writeFileSync.mockReturnValue(true);
      const filepath = expect.any(String);
      const date = expect.any(String);

      // when
      loginService.saveTimestamp();

      // then
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(filepath, date);
    });
  });
  describe('create method', () => {
    it('should have to call sign with parameters', () => {
      // given
      const payload = expect.objectContaining({
        name: expect.any(String),
        email: expect.any(String),
      });
      const privateKey = expect.any(String);
      const options = expect.objectContaining({
        expiresIn: expect.any(String),
      });
      jwt.sign.mockReturnValue(token);

      // when
      const response = loginService.create();

      // then
      expect(jwt.sign).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        payload,
        privateKey,
        options
      );
      expect(response).toBe(token);
    });
  });
  describe('tokenIsValid', () => {
    it('should pass because of date', () => {
      // given
      const date = new Date();
      date.setHours(date.getHours() + 2);
      jwt.verify.mockReturnValue({
        exp: date,
      });
      
      // when
      const response = loginService.tokenIsValid(token);

      // then
      expect(response).toBe(true);
    });
    it('should fail because of date', () => {
      // given
      const date = new Date();
      date.setHours(date.getHours() - 2);
      jwt.verify.mockReturnValue({
        exp: date.getTime() / 1000,
      });
      
      // when
      const response = loginService.tokenIsValid(token);

      // then
      expect(response).toBe(false);
    });
  });
});