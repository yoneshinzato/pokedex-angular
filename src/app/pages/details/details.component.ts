import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  pokemon: any;
  isLoading: boolean = false
  apiError: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PokeApiService
  ) {

  }

  ngOnInit(): void {
    this.getPokemon;
  }

 getPokemon() {
    const id = this.activatedRoute.snapshot.params['id']
    const pokemon = this.service.apiGetPokemon(`${this.urlPokemon}/${id}`)
    const name = this.service.apiGetPokemon(`${this.urlName}/${id}`)

    forkJoin([pokemon, name]).subscribe({
      next: res => {
        this.pokemon = res
        this.isLoading = true
      },
      error: err => {
        this.apiError = true
      }
    })


    return console.log(id)
  }
}
