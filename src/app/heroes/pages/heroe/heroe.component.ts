import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.paramMap.get("id"))
    /*
    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.heroesService.getHeroePorId(id).subscribe((heroe) => {
          this.heroe = heroe;
        })
      });
    */
    this.activatedRoute.params.pipe(
      delay(3000),
      switchMap(({ id }) => this.heroesService.getHeroePorId(id))
    ).subscribe((heroe) => this.heroe = heroe);
  }

}
