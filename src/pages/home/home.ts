import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MyApp } from '../../app/app.component';
import { GetDataDirective } from '../../directives/get-data/get-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cat1 =[];
  products=[];
  totalElements = 0;

  constructor(public navCtrl: NavController,
    private http: Http,
    public alertCtrl: AlertController,
    public getDataDirective: GetDataDirective ) {
  //  let x = this.search();
    let x= getDataDirective.getCat1(0);
x.subscribe(res =>
  {
  this.getcat1(res.json());
  this.getproducts(res.json());
  });
  }

getcat1(res: any){

 this.cat1 =this.buildArray(res['facets']['hierarchicalCategories.lvl0']);
}

getproducts(res: any){
this.products=res['products'];
this.totalElements = res['totalElements'];
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

  search() {
   let uri = 'https://www.bringmeister.de/api/products?limit=60&offset=0&hierarchicalCategories.lvl0=' + encodeURIComponent('Babynahrung & Pflege');
   console.log('encoded url: ',(uri))
  return  this.http.get('https://www.bringmeister.de/api/products?limit=60');
 // return  this.http.get('https://www.bringmeister.de/api/products?limit=60&offset=0&q=milk');
  //  return this.http.get('https://www.bringmeister.de/api/products?limit=60&offset=0&q=milkdrogerie-haushaltswaren/korperpflege-kosmetik.html');
  //  return this.http.get((uri))
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

      let x= this.getDataDirective.getCat1(this.products.length/10);

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

}
