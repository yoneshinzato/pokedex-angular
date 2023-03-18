import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any;
  getAllPokemons: any;
  apiError: boolean = false

  constructor(
    private service: PokeApiService
  ) {}

  ngOnInit(): void {

    this.service.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results
        this.getAllPokemons = this.setAllPokemons
      },
      error => {
        this.apiError = true
      }
    )
  }

  searchPokemon(value: string) {
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase())
    })
    this.getAllPokemons = filter;
    
  }

}
