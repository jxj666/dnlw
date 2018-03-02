import { Component, OnInit } from '@angular/core';
import { ThemePage } from '../theme/theme';
import { AuditPage } from '../audit/audit';
// import { Broadcaster } from '@ionic-native/broadcaster';
import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';


import { UserService } from './user.service';



// @IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})
export class IndexPage implements OnInit {
  tab1Root = ThemePage;
  tab2Root = AuditPage;
  myParam: string = '123';
  user: any = {
    username: '加载中...',
    avatar: '',
    roleName: '请稍后...',
  };
  appid: string = 'test';
  sign: string = 'test';
  timestamp: string = 'test';
  appSecret: string = 'test';
  msg: string = 'test';
  url: string = '';
  test: number = 1;
  request: string = '';
  response: string = '';
  mobile: string = '';
  local: string = '';
  error: string = '';
  index: any = {
    auditNum: 0,
    themeNum: 0
  };

  http: boolean = true;
  load: boolean = true;
  station: boolean = true;

  // private broadcaster: Broadcaster,
  constructor(private userService: UserService, private navParams: NavParams, public navCtrl: NavController) {}
  getUser(): void {
    if (this.appid == ':appid') {
      this.appid = '';
      this.sign = '';
      this.timestamp = '';
      this.appSecret = '';
      this.msg = '';
    }
    if (this.appid && this.sign && this.timestamp) {
      var data = {
        appid: this.appid,
        sign: this.sign,
        timestamp: this.timestamp,
        appSecret: this.appSecret,
        msg: encodeURIComponent(this.msg)
      }
      localStorage.url = `http://zkcms.lwinst.com/`;
      // localStorage.url = `http://testliaowang.chengjuiot.com/`;
      this.userService.getUser(data).then(redata => this.userShow(redata));
    } else {
      this.load = true;
      if (!localStorage.user) {
        this.http = false;
        return;
      }
      this.user.avatar = JSON.parse(localStorage.user).avatar;
      this.user.username = JSON.parse(localStorage.user).username;
      this.user.roleName = localStorage.roleName || '新华社';
      if (localStorage.status_num == -1) {
        this.station = false;
      }
      //this.getTrumpet();
    }
  }
  getTrumpet(): void {
    this.userService.getTrumpet().then(data => this.getTrumpetShow(data));
  }
  getTrumpetShow(data): void {
    this.index.auditNum = data.news;
  }
  addtest(a): void {
    this.test += Number(a);
  }
  userShow(redata): void {
    this.load = true;
    this.response = JSON.stringify(redata);
    if (!redata) {
      this.http = false;
      this.error = localStorage.error;
      return;
    }
    var user = JSON.parse(redata._body).context;
    var did_obj={ 'ZKS': '周刊社', 'LWZK': '瞭望智库', 'HQZZ': '环球杂志', 'DFZK': '东方周刊', 'CJGJZK': '财经国家周刊' };
    if (user == null) {
      this.http = false;
      return;
    }
    this.user.avatar = user.avatar;
    this.user.username = user.username;
    localStorage.user = JSON.stringify(user);
    localStorage.role = user.role;
    localStorage.token = user.token;
    localStorage.uid = user.uid;
    this.user.roleName = did_obj[user.did] || "新华社";
    localStorage.status_num = user.role.search('CMS004');
    if (localStorage.status_num == -1) {
      this.station = false;
    }
    localStorage.roleName = this.user.roleName;
    this.navCtrl.push(IndexPage);
    // this.getTrumpet();
  }
  pushParams(): void {
    this.navCtrl.push(IndexPage, { 'appid': 11, 'sign': 22, 'timestamp': 33, 'appSecret': 44, 'msg': 55 });
  }
  ngOnInit(): void {
    this.load = false;
    this.appid = this.navParams.get('appid');
    this.sign = this.navParams.get('sign');
    this.timestamp = this.navParams.get('timestamp');
    this.appSecret = this.navParams.get('appSecret');
    this.msg = this.navParams.get('msg');
    this.request = JSON.stringify(this.navParams);
    this.mobile = JSON.stringify(window.navigator.userAgent);
    this.local = JSON.stringify(window.location);
    sessionStorage.audited = 0;
    this.getUser();
  }
}
