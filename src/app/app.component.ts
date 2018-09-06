import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GetDataDirective } from '../directives/get-data/get-data';
import { CategoryListPage } from '../pages/category-list/category-list';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
public categories = [];
static products = [];
  constructor(platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen, 
     getDataDirective: GetDataDirective) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    let x= getDataDirective.getCat1(0);
    x.subscribe(res=>
    {
this.fillCat1(res.json());
    });
  }

  fillCat1(res: any){
    this.categories =this.buildArray(res['facets']['hierarchicalCategories.lvl0']);
  }

  buildArray(x:any){
    let arr = [];
    let keys = [];
    let obj :any={key1:"",data:""};
    keys = Object.keys(x);
    keys.forEach(key => {
     obj['data'] = x[key];
     obj['key1'] = key;
      arr.push(obj);
      obj = {};
    });
    return arr;
  }

  gotolist(cat1:string) {

    this.nav.push(CategoryListPage,
      {
      subjects:cat1
      }
    );
    /** 
    this.navCtrl.push('CategoryListPage',
      {
        // subjects: this.userdata
      }
    );*/
  }


}

