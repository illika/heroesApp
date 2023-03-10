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

  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
  }

  buscar() {
    if (this.busqueda.trim().length > 0)
      this.heroesServices.getSugerencia(this.busqueda.trim()).subscribe((data) => this.heroes = data);
    else
      return;
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.busqueda = heroe.superhero;

    this.heroesServices.getHeroePorId(heroe.id!).subscribe(
      (data) => this.heroeSeleccionado = data
    )
  }

}
