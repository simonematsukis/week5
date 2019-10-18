import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { ActorComponent } from "./actor/actor.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { MovieComponent } from './movie/movie.component';
@NgModule({
  declarations: [AppComponent, ActorComponent, MovieComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}