import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule],
  providers: [TaskService],
  bootstrap: [],
})
export class AppModule {}
