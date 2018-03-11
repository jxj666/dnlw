import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { KEY } from '../../app/key'

import 'rxjs/add/operator/toPromise';



@Injectable()
export class UserService {
   private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: Http) {}
  getUser(data): Promise < any > {
    const userUrl = localStorage.url + `v1/m/user/index?appid=${data.appid}&appSecret=${data.appSecret}&key=${KEY.key}&sign=${data.sign}&msg=${data.msg}&timestamp=${data.timestamp}`;
    // const userUrl=`https://easy-mock.com/mock/5a6ea0577af44c1f4d779871/v1/m/user/index`;
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
  getUserDepartment(): Promise < {} > {
    const userUrl = localStorage.url + `v1/m/user/getUserDepartment?uid=${localStorage.uid}&token=${localStorage.token}`;

    return this.http.get(userUrl)
      .toPromise()
      .then(response => response.json().context as {})
  }
  changeDepartment(): Promise < {} > {
    const userUrl = localStorage.url + `v1/m/user/changeDepartment`;
    const body=`uid=${localStorage.uid}&token=${localStorage.token}&did=${localStorage.did_ready}`;
    return this.http.post(userUrl, body,{headers: this.headers})
      .toPromise()
      .then(response => response.json() as {})
  }
  private handleError(error: any): void {
    console.error('An error', error);
    localStorage.error = JSON.stringify(error);
  }
}
