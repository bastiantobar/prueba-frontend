import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from '../../../domains/pokemon';
import { PokemonService } from '../../service/pokemon.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-table-pokemon',
  templateUrl: './table-pokemon.component.html',
  styleUrls: ['./table-pokemon.component.css'],
})
export class TablePokemonComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'url', 'delete'];
  dataSource = new MatTableDataSource<Pokemon>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.getkanto();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = Object.keys(data)
        .reduce((currentTerm, key) => {
          return currentTerm + data[key] + ' ';
        }, '')
        .toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

  getkanto() {
    this.pokeService.getPokemon(150, 0).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }
  deletePokemon(pokemon: Pokemon) {
    const index = this.dataSource.data.indexOf(pokemon);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
