import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpModule } from '@angular/http';
import { DirectivesModule } from '../directives/directives.module';
import { GetDataDirective } from '../directives/get-data/get-data';
import { CategoryListPage } from '../pages/category-list/category-list';
//import { GetDataDirective } from '../directives/get-data/get-data';

@NgModule({
  declarations: [
    MyApp,
    CategoryListPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DirectivesModule,
    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryListPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GetDataDirective,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
