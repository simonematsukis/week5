import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    item = "";
    date = "";
    type = "";
    summary = "";
    data = [];
    cover: boolean = true; 
    counter: number = 0;

  
  newItem() {
    this.data.push({
        item: this.item,
        date: this.date,
        type: this.type,
        summary: this.summary
        
      });
      if (this.type === "Hard Cover") {
        this.counter++;
      }
      this.item = '';
      this.date = '';
      this.type = '';
      this.summary = '';

      
  
  }
  clearItems() {
    this.data = [];
  }

  deleteElement(item){
    if (this.data[item].type === "Hard Cover") {
      this.counter--;
    }
    
      this.data.splice(item,1);
      
  }

  deleteAllHard(){
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].type === "Hard Cover") {
        this.data.splice(i,1);
        this.counter--;
      }

    }
  }
  
  

  
  
  
}