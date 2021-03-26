import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BlocksComponent } from './blocks/blocks.component';
import { FooterComponent } from './footer/footer.component';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, BlocksComponent, FooterComponent, DescriptionComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
