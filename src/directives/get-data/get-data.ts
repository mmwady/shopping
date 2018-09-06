import { Directive } from '@angular/core';
import { Http } from '@angular/http';

/**
 * Generated class for the GetDataDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[get-data]' // Attribute selector
})
export class GetDataDirective {

  constructor(private http: Http) {
    console.log('Hello GetDataDirective Directive');
  }
 public getCat1(off: number) {
 //   let uri = 'https://www.bringmeister.de/api/products?limit=60&offset=0&hierarchicalCategories.lvl0=' + encodeURIComponent('Babynahrung & Pflege');
 //   console.log('encoded url: ',(uri))
  // return  this.http.get('https://www.bringmeister.de/api/products?limit=60');
   return  this.http.get('https://www.bringmeister.de/api/products?limit=10&offset=' + off);

   }

   public getCat2(cat1:string,off: number) {
    return   this.http.get('https://www.bringmeister.de/api/products?limit=10&offset=' + off + '&hierarchicalCategories.lvl0=' + encodeURIComponent(cat1));
      }

      public getCat3(cat2:string,off: number) {
        return   this.http.get('https://www.bringmeister.de/api/products?limit=10&offset=' + off + '&hierarchicalCategories.lvl1=' + encodeURIComponent(cat2));
          }
          public getCat4(cat3:string,off: number) {
            return   this.http.get('https://www.bringmeister.de/api/products?limit=10&offset=' + off + '&hierarchicalCategories.lvl2=' + encodeURIComponent(cat3));
              }

    public  buildArray(x:any){
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
}
