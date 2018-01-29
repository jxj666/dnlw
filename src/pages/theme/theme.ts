import { Component, OnInit } from '@angular/core';
import { IndexPage } from '../index/index';
import { ThemePublish } from '../theme_publish/theme';
import { ThemeAudit } from '../theme_audit/theme';
// import { NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { ThemeService } from './theme.service';

@Component({
  selector: 'page-theme',
  templateUrl: 'theme.html'
})
export class ThemePage implements OnInit {
  tab1Root = IndexPage;
  tab2Root = ThemePublish;
  tab3Root = ThemeAudit;
  theme_list: any = [];


  constructor(private themeService: ThemeService, public navCtrl: NavController) {}
  ngOnInit(): void {
    this.getAllTopics();
    var that = this;
    setTimeout(function() { that.getAllTopics() }, 1000);
  }
  pushParams(): void {
    this.navCtrl.push(IndexPage, { 'appid': 11, 'sign': 22, 'timestamp': 33, 'appSecret': 44, 'msg': 55 });
  }
  getAllTopics(): void {
    this.themeService.getAllTopics().then(data => this.getMyPublishTopicsShow(data));
  }
  getMyPublishTopicsShow(data): void {
    this.theme_list = data.list;
  }
  showData(data): void {
    console.log(data);
  }
  saveId(data): void {
    localStorage.themeId = data;
  }
  goToMyPage(): void {
    this.navCtrl.push('IndexPage');
  }
}
