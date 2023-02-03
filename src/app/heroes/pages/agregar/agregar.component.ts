import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, throwError } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ]

  titulo: string = "Nuevo";

  heroe: Heroe = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: "",
  };

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.router.url.includes("editar")) {
      this.titulo = "Editar";
      this.activatedRoute.params.pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      ).subscribe((heroe) => this.heroe = heroe);
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id)
      this.heroesService.putHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar("Registro Actualizado");
        this.heroe = heroe
      });
    else
      this.heroesService.postHeroe(this.heroe).subscribe(heroe => {
        this.mostrarSnackBar("Registro Creado");
        this.router.navigate(["/heroes/editar", heroe.id]);
      });
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: "250px",
      data: this.heroe
    });

    dialog.afterClosed().pipe(
      switchMap(
        (resp) => (resp) ? this.heroesService.deleteHeroe(this.heroe.id!) : throwError(() => new Error("undefined"))
      )
    ).subscribe({
      next: (_) => this.router.navigate(["/heroes"]),
      error: (_) => console.log("error")
    })
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok', {
      duration: 2500
    });
  }

}
