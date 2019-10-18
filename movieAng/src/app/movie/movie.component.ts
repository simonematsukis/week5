import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];
  actorsArray: any[] = [];
  section = 1;
  title: string = "";
  year: number = 0;
  movieId: string = "";
  name: string = "";
  bYear: number = 0;
  
  constructor(private dbService: DatabaseService) {}
  //Get all Actors
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Update an Actor
  onSelectMovie(item) {
    this.title = item.title;
    this.year = item.year;
    this.movieId = item._id;
  }
  onSelectActor(item) {
    this.name = item.name;
    this.bYear = item.bYear;
  }
  onUpdateActor() {
    let obj = { name: this.title, bYear: this.year };
    this.dbService.updateActor(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }
  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }
  resetValues() {
    this.title = "";
    this.year = 0;
    this.movieId = "";
  }
  //Delete Movie By Year
  onDeleteYear(year) {
    for(let movie of this.moviesDB){
      if (movie.year <= year){
        this.dbService.deleteMovie(movie._id).subscribe(result => {
          this.onGetMovies();
        });
      }
    }
    
    
  }

  assign (title,name) {
        this.dbService.addActorToMovie(title,name).subscribe(result => {
          this.onGetMovies();
        });
      
    
    
    
  }

  

}
