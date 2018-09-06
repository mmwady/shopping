import { NgModule } from '@angular/core';
import { IonicPageModule, NavController, NavParams } from 'ionic-angular';
import { CategoryListPage } from './category-list';
import { Subject } from 'rxjs/Subject';

@NgModule({
  declarations: [
    CategoryListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryListPage),
  ],
})
export class CategoryListPageModule {

}
