import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  
  heroes: Hero[] = [];
  heroId: any;
  heroName: any;
  selectedHero?: Hero;
  deleteHeroId:any;
  

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  GetHeroes(): void {
    debugger
    this.heroService.GetHeroes()
        .subscribe(heroes => this.heroes = heroes);
        console.log(this.heroes);
  }

  ngOnInit(): void {
    this.GetHeroes();
  }
  
  
  
  constructor(private heroService: HeroService) {}

  
  onAddHero() {
    this.heroService.OnAddHero(this.heroId,this.heroName).subscribe(() => {
      console.log('Hero added successfully');
      // Reset the form fields after successful submission
      alert("Hero added successfully")
   
    }, error => {
      console.error('Error occurred while adding hero:', error);
    });
  }
    
  onDeleteHero() {
    const deleteHeroId = this.deleteHeroId;
    this.heroService.deleteHero(deleteHeroId).subscribe(() => {
      console.log('Hero deleted successfully');
      this.GetHeroes();
    }, error => {
      console.error('Error occurred while deleting hero:', error);
    });
  }
  
}
