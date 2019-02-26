import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Импортируем FormsModule из библиотеки @angular/forms.
// Для того, чтобы можно было осуществить двухстороннее связывание через директиву [(ngModel)]. Между элементом формы и соответствующим свойством класса AppComponent.
import { FormsModule }  from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
