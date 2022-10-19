import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TodoserviceService } from './services/todoservice.service';
import { TooltipModule } from 'primeng/tooltip';
import { ComponentsModule } from './components/components.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms'



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TooltipModule,
    ComponentsModule,
    DialogModule,
    ButtonModule,
    FormsModule
  ],
  exports: [
    TooltipModule
  ],
  providers: [TodoserviceService],
  bootstrap: [AppComponent]
})


export class AppModule {

}

