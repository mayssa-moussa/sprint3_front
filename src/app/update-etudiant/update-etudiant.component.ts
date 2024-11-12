
import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../services/etudiant.service';
import { Router } from '@angular/router';
import { Groupe } from '../model/groupe.model';
import { group } from '@angular/animations';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-etudiant',
  templateUrl: './update-etudiant.component.html',
  styles: []
})
export class UpdateEtudiantComponent implements OnInit {

  currentEtudiant = new Etudiant();
  groupes!: Groupe[];
  updatedGroupeId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService,
    private router: Router,

  ) { }
  ngOnInit(): void {
    this.etudiantService.listeGroupes().
    subscribe(gp=> {this.groupes = gp._embedded.groupes;
    });
    this.etudiantService.consulterEtudiant(this.activatedRoute.snapshot.params['id'])
    .subscribe( etud =>{ this.currentEtudiant = etud;
    this.updatedGroupeId = etud.groupe.idGroupe;
    } ) ;
    }
  updateEtudiant() {
    this.currentEtudiant.groupe = this.groupes.
      find(gp => gp.idGroupe == this.updatedGroupeId)!;
      this.etudiantService
      .updateEtudiant(this.currentEtudiant)
      .subscribe((etud) => {
      this.router.navigate(['etudiants']);
      });
  }
  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }
  onAddImageEtudiant() {
    this.etudiantService
    .uploadImageEtud(this.uploadedImage,
    this.uploadedImage.name,this.currentEtudiant.idEtudiant)
    .subscribe( (img : Image) => {
    this.currentEtudiant.images.push(img);
    });
    }
    supprimerImage(img: Image){
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.etudiantService.supprimerImage(img.idImage).subscribe(() => {
      //supprimer image du tableau currentProduit.images
      const index = this.currentEtudiant.images.indexOf(img, 0);
      if (index > -1) {
      this.currentEtudiant.images.splice(index, 1);
      }
      });
      }
}
