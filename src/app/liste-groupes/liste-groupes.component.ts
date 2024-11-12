import { Component } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { Groupe } from '../model/groupe.model';

@Component({
  selector: 'app-liste-groupes',
  templateUrl: './liste-groupes.component.html',
  styles: ``
})
export class ListeGroupesComponent {
  groupes!: Groupe[];
  updatedGroupe: Groupe = { "idGroupe": 0, "nomGroupe": "" };
  ajout:boolean=true;
  constructor(private etudiantService: EtudiantService) { }
  ngOnInit(): void {
    this.etudiantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });

  }
  groupeUpdated(gp: Groupe) {
    console.log("group updated event", gp);
    this.etudiantService.ajouterGroupe(gp).
      subscribe(() => this.chargerGroupes());
  }
  chargerGroupes() {
    this.etudiantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);
      });
  }
  updateGroupe(gp: Groupe) {
    this.updatedGroupe = gp;
    this.ajout=false;
  }
}
