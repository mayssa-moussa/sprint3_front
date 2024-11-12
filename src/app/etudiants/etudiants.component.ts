import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';



@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrl: './etudiants.component.css'
})
export class EtudiantsComponent implements OnInit {
  etudiants?: Etudiant[]; //un tableau de chînes de caractères
  apiurl:string='http://localhost:8080/etudiants/api';
  constructor(private etudiantService: EtudiantService,public authService: AuthService) {
  }

  ngOnInit(): void {
    this.chargerEtudiants();
  }
  /*chargerEtudiants() {
    this.etudiantService.listeEtudiants().subscribe(etuds => {
      this.etudiants= etuds;
      this.etudiants.forEach((etud) => {
        etud.imageStr = 'data:' + etud.images[0].type + ';base64,' +
        etud.images[0].image;
        });
      });


  }*/
      chargerEtudiants(){
        this.etudiantService.listeEtudiants().subscribe(etuds => {
        this.etudiants = etuds;
        });
        }

  supprimerEtudiant(e: Etudiant) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.etudiantService.supprimerEtudiant(e.idEtudiant).subscribe(() => {
        console.log("etudiant supprimé");
        this.chargerEtudiants();
      });

  }

}
