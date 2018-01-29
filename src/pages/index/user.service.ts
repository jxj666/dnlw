import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { KEY } from '../../app/key'

import 'rxjs/add/operator/toPromise';



@Injectable()
export class UserService {
  constructor(private http: Http) {}
  getUser(data): Promise < any > {
    // const userUrl = localStorage.url + `v1/m/user/index?appid=${data.appid}&appSecret=${data.appSecret}&key=${KEY.key}&sign=${data.sign}&msg=${data.msg}&timestamp=${data.timestamp}`;
    const userUrl=`https://easy-mock.com/mock/5a6ea0577af44c1f4d779871/v1/m/user/index`;
    return this.http.get(userUrl)
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }
  getTrumpet(): Promise < {} > {
    const requestData = {
      key: KEY.key,
      token: localStorage.token
    }
    const userUrl = localStorage.url + `v1/m/news/getTrumpet?key=${requestData.key}&token=${requestData.token}`;

    return this.http.get(userUrl)
      .toPromise()
      .then(response => response.json().context as {})
  }
  private handleError(error: any): void{
    console.error('An error', error);
    localStorage.error = JSON.stringify(error);
  }
}
