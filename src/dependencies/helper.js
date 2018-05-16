// @flow

import { fromPromise } from 'rxjs/observable/fromPromise';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import EventEmitter from 'EventEmitter';

import Navigator from '../navigator';

export type payloadType = {
  method: 'GET' | 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': string,
  },
  body: string | void,
};

export interface IHelper {
  setAccessToken(accessToken: string): void,
  createPayload(
    method: 'POST' | 'GET',
    data?: {[string]: string | number}
  ): payloadType;
  fetch(url: string, payload?: payloadType): Promise<*>;
}

export default class Helper implements IHelper {

  popEmitter: EventEmitter = new EventEmitter();
  accessToken: string;

  constructor(accessToken: string) {
    Navigator.onPop = () => {
      this.popEmitter.emit('pop');
    };

    this.setAccessToken(accessToken);
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  createPayload(
    method: 'GET' | 'POST',
    data?: {[string]: string | number}): payloadType {
    return {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: typeof data !== 'undefined' ? JSON.stringify(data) : undefined,
    };
  }

  fetch(url: string, payload?: payloadType): Promise<*> {
    return new Promise((resolve, reject) => {
      fromPromise(fetch(url, payload))
        .pipe(
          takeUntil(fromEvent(this.popEmitter, 'pop'))
        )
        .subscribe(
          (response) => resolve(response),
          (error) => reject(error)
        )
      ;
    });
  }

}
