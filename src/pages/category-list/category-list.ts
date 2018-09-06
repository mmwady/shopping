import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GetDataDirective } from '../../directives/get-data/get-data';
import { HomePage } from '../home/home';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
public products = [];
public categories = [{'key1':"",'data':""}];
public category2 = "";
public cc = "";
public s="";
totalElements = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public getDataDirective: GetDataDirective) {
    this.s = navParams.get('subjects');
    let x= getDataDirective.getCat2(this.s,0);
    x.subscribe(res=>
    {
this.fillCat2(res.json());
this.fillCat1(res.json());
this.fillProducts(res.json());
console.log('res',res.json());
    });
  }
  fillProducts(res: any){
    this.products=res['products'];
    this.totalElements = res['totalElements'];
  }
  fillCat1(res:any){
    let categories=this.getDataDirective.buildArray(res['facets']['hierarchicalCategories.lvl0']);
    this.cc=categories[0]['key1'] + " >";
  }
  fillCat2(res: any){
    this.categories=this.getDataDirective.buildArray(res['facets']['hierarchicalCategories.lvl1']);  
    console.log('res1',this.categories[0]['key1'])
    //this.cc = this.categories[0]['key1'];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }

  gotocat3(){
    console.log('cat2',this.category2);
    this.navCtrl.push('Category2ListPage',{
      subjects:this.category2
    })
  }

  gotolist(){
    this.navCtrl.push('ShoppingListPage');
  }

  showConfirm(product: any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: "add: " + product['name'],
      buttons: [
        {
          text: 'yes',
          handler: () => {
            MyApp.products.push(product);
          }
        },
        {
          text: 'No',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  }


  loadMore(){
console.log('length',this.products.length);
console.log('totalElements',this.totalElements)
    if (this.products.length <= this.totalElements) {

      let x= this.getDataDirective.getCat2(this.s,this.products.length/10);

      x.subscribe(res =>
        {

        this.moreproducts(res.json());
        console.log('my res', res.json());
        });
    } else {
      
    }

  }
  moreproducts(res: any){
 
    res['products'] ;
    res['products'].forEach(product => {
      this.products.push(product);
    });
  
    }

}
