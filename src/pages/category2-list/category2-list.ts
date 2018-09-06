import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GetDataDirective } from '../../directives/get-data/get-data';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the Category2ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category2-list',
  templateUrl: 'category2-list.html',
})
export class Category2ListPage {
  public products = [];
  public categories = [{'key1':"",'data':""}];
  public category3 = "";
  public cc = "";
  public s ="";
  totalElements = 0;
    constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController, 
      public getDataDirective: GetDataDirective) {
      this.s = navParams.get('subjects');
      let x= getDataDirective.getCat3(this.s,0);
      x.subscribe(res=>
      {
  
  
  this.fillCat1(res.json());
  this.fillCat2(res.json());
  this.fillCat3(res.json());
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
     // this.cc=categories[0]['key1'] + " > ";
    }
    fillCat2(res: any){
      let categories=this.getDataDirective.buildArray(res['facets']['hierarchicalCategories.lvl1']); 
      
      this.cc=this.cc + categories[0]['key1'] + " >";

    }
    fillCat3(res: any){
      this.categories=this.getDataDirective.buildArray(res['facets']['hierarchicalCategories.lvl2']);  


    }
    gotocat4(){
/**      console.log('cat2',this.category2);
 * */
      this.navCtrl.push('Category3ListPage',{
        subjects:this.category3
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

      if (this.products.length <= this.totalElements) {
  
        let x= this.getDataDirective.getCat3(this.s,this.products.length/10);
  
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
    console.log('ionViewDidLoad Category2ListPage');
  }

}
