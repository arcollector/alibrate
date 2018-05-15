// @flow

import { type IHelper } from './helper';


export type TLoginResponse = { success: bool, data: string } | null;

export interface ILogin {
  login(email: string, pass: string): Promise<TLoginResponse>;
};

type TLoginBad = {
  message: string,
};

type TLoginGood = {
  access_token: string,
};

export default class Login implements ILogin {

  helper: IHelper;

  constructor(helper: IHelper) {
    this.helper = helper;
  }

  async login(username: string, password: string): Promise<TLoginResponse> {
    const { helper } = this;
    const url = 'https://api.alibrate.com/v1/auth/local';
    const payload = helper.createPayload({
      username,
      password,
    });
    try {
      const response = await helper.fetch(url, payload);
      const { ok } = response;
      const json = await response.json();
      if(!ok) {
        (json: TLoginBad);
        const { message } = json;
        return {
          success: false,
          data: message,
        };
      }
      (json: TLoginGood);
      const { access_token } = json;
      return {
        success: true,
        data: access_token,
      };
    } catch(e) {
      console.error('fail Login.login', e);
      return null;
    }
  }

}
