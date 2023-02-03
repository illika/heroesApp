import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  busqueda: string = "";
  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
  }

  buscar() {
    this.heroesServices.getSugerencia(this.busqueda).subscribe((data) => this.heroes = data);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    this.busqueda = heroe.superhero;

    this.heroesServices.getHeroePorId(heroe.id!).subscribe(
      (data) => this.heroeSeleccionado = data
    )
  }

}
