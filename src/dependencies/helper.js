// @flow

import { fromPromise } from 'rxjs/observable/fromPromise';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { takeUntil } from 'rxjs/operators';
import EventEmitter from 'EventEmitter';

import Navigator from '../navigator';

export type payloadType = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: string,
};

export interface IHelper {
  createPayload(data: {[string]: string | number}): payloadType;
  fetch(url: string, payload?: payloadType): Promise<*>;
}

const AUTH_TOKEN = (
'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6ImNvbXBsZXRhcj8ifSwidXNlciI6Il9iYWNrZW5kIiwic2NvcGUiOiJhbGlicmF0ZSIsInJvbGVzIjpbImJhY2tlbmQiXSwicGVybWlzc2lvbnMiOlsiZ2V0IC92MS91c2VyL3Jlc2V0LyoiLCJwb3N0IC92MS91c2VyL3Jlc2V0L3Bhc3MiLCJwb3N0IC92MS91c2VyL3Jlc2V0L3Jlc2V0UGFzc3dvcmRSZXF1ZXN0IiwicG9zdCAvdjEvdXNlci9hY3RpdmF0ZSIsImdldCAvdjEvYm9va3MvKiIsImdldCAvdjEvbGlzdHMqIiwiZ2V0IC92MS9ob21lLWxpc3QiLCJnZXQgL3YxL3NvY2lhbC9wdWJsaWMvd2hvUmVhZHNUaGlzQm9vay8qIiwiZ2V0IC92MS9zb2NpYWwvcHVibGljL3B1YmxpY2F0aW9uLyoiLCJnZXQgL3YxL3NvY2lhbC93aG9SZWFkc1RoaXNCb29rLyoiLCJnZXQgL3YxL3Jldmlld3MvcHVibGljL2Jvb2svKiIsImdldCAvdjEvYnJvd3NlciIsImdldCAvdjEvbGlicmFyeS91c2VyLyoiLCJwb3N0IC92MS9ldmVudHMiLCJwb3N0IC92MS91c2VyIiwicG9zdCAvdjEvYXV0aC9sb2NhbCJdLCJwcm92aWRlciI6ImxvY2FsIiwiaWF0IjoxNTI0NjAyNjk2LCJleHAiOjE1NTYxNjAyOTYsImF1ZCI6ImFsaWJyYXRlIn0.RisxT8pQv_8hHHqoobBbXlwPgEGvr1CAh_bBRMXrJC4oNWNSjuOeqhFpJbBA6n39bxSbl5Jy1wSzTKdoc5ixgCfkL11J664jEU4MRlHHEtnU5IxLTz2_9BZMWCfE_Fc6KbC2oLYNvFdNpqNPRBmZkdEFgyIqd40R6HG4rD_IWcID5Buwnj-xQQ-SfSJ9pQTmgRC6Z9Urbe3OjGAuDHN2uArpiIAbZLakOMwBtS7VNcif3SW8huCHxIJA7TYgJ4K3UBweAEXHG0xJLSeBWgtnWoolRSYJOYqLuxwysdXrRvkcy5QKdGW53BTCpkYFZO3TzBzVOE2YJSk4_mRS6WekjA'
);

export default class Helper implements IHelper {

  popEmitter: EventEmitter = new EventEmitter();

  constructor() {
    Navigator.onPop = () => {
      this.popEmitter.emit('pop');
    };
  }

  createPayload(data: {[string]: string | number}): payloadType {
    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': AUTH_TOKEN,
      },
      body: JSON.stringify(data),
    };
  }

  fetch(url: string, payload?: payloadType): Promise<*> {
    return new Promise((resolve, reject) => {
      fromPromise(payload ? fetch(url, payload) : fetch(url))
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
