// @flow

import { type IHelper } from './helper';

export type TReviewer = {
  _id: string,
  profile: {
    picture: string,
    country: {
      countryName: string,
      code: string,
    },
  },
  username: string,
  countReviews: number,
  iAmFollow: bool,
};

export type TReviewers = Array<TReviewer>;

export type TGetTopResponse = {
  success: bool,
  data: TReviewers
} | null;

export interface IReviewers {
  getTop(page: number, limit: number): Promise<TGetTopResponse>;
};

export default class Reviewers implements IReviewers {

  helper: IHelper;

  constructor(helper: IHelper) {
    this.helper = helper;
  }

  async getTop(page: number, limit: number): Promise<TGetTopResponse> {
    const { helper } = this;
    const url = `https://api.alibrate.com/v1/rankings/topReviewers?page=${page}&limit=${limit}`;
    const payload = helper.createPayload('GET');
    try {
      const response = await helper.fetch(url, payload);
      const { ok } = response;
      const json = await response.json();
      if(!ok) {
        return null;
      }
      (json: TGetTopResponse);
      return {
        success: true,
        data: json,
      };
    } catch(e) {
      console.error('fail Reviewers.getTop', e);
      return null;
    }
  }

}
