import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GetDataDirective } from '../../directives/get-data/get-data';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the Category3ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category3-list',
  templateUrl: 'category3-list.html',
})
export class Category3ListPage {

  public products = [];
  public categories = [{'key1':"",'data':""}];
  totalElements = 0;
  public cc = "";
  public s = "";
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public getDataDirective: GetDataDirective) {
      this.s = navParams.get('subjects');
      let x= getDataDirective.getCat4(this.s,0);
      x.subscribe(res=>
      {
  this.fillProducts(res.json());
console.log('res.json()',res.json());
      });
    }
    fillProducts(res: any){
      this.products=res['products'];
      this.totalElements = res['totalElements']; 
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

      if (this.products.length <= this.totalElements) {
  
        let x= this.getDataDirective.getCat4(this.s,this.products.length/10);
  
        x.subscribe(res =>
          {
  
          this.moreproducts(res.json());
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category3ListPage');
  }

}
