import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../model/etudiant.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: []
})
export class RechercheParNomComponent implements OnInit {
  nomEtudiant: string = '';
  etudiants: Etudiant[] = [];
  searchTerm!: string;
  allEtudiants! : Etudiant[];

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.etudiantService.listeEtudiants().subscribe(etud => {
      console.log(etud);
      this.etudiants =etud;
      });
  }

  rechercherEtuds(): void {
    if (this.nomEtudiant) {
      this.etudiantService.rechercherParNom(this.nomEtudiant).subscribe(
        etuds => {
          this.etudiants = etuds;
          console.log(etuds);
        },
        error => {
          console.error('Error fetching students:', error);
        }
      );
    }
  }
  onKeyUp(filterText : string){
    this.etudiants = this.allEtudiants.filter(item =>item.nom.toLowerCase().includes(filterText));
    }
}
