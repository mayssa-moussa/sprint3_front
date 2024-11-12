import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { EtudiantService } from '../services/etudiant.service';
import { Groupe } from '../model/groupe.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrl: './add-etudiant.component.css'
})
export class AddEtudiantComponent implements OnInit {
  newEtudiant = new Etudiant();
  message?: string;
  groupes!: Groupe[];
  newIdGroupe!: number;
  newGroupe!: Groupe;
  uploadedImage!: File;
  imagePath: any;
  constructor(private etudiantService: EtudiantService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.etudiantService.listeGroupes().
      subscribe(gp => {
        this.groupes = gp._embedded.groupes;
        console.log(gp);

      });
  }
  /* addEtudiant() {

    this.newEtudiant.groupe = this.groupes.find(gp => gp.idGroupe == this.newIdGroupe)!;
    this.etudiantService.ajouterEtudiant(this.newEtudiant).subscribe(etud => {
      console.log(etud);
      this.router.navigate(['etudiants']);
    });
  } */
  /*addEtudiant() {
   this.etudiantService
     .uploadImage(this.uploadedImage, this.uploadedImage.name)
     .subscribe((img: Image) => {
       console.log('Image response:', img); // Vérifiez la réponse ici
       this.newEtudiant.image = img;  // img doit contenir l'ID
       this.newEtudiant.groupe = this.groupes.find(gp => gp.idGroupe == this.newIdGroupe)!;
       this.etudiantService
         .ajouterEtudiant(this.newEtudiant)
         .subscribe(() => {
           this.router.navigate(['etudiants']);
         });
     });
 }*/
  addEtudiant() {
    this.newEtudiant.groupe = this.groupes.find(gp => gp.idGroupe
      == this.newIdGroupe)!;
    this.etudiantService
      .ajouterEtudiant(this.newEtudiant)
      .subscribe((etud) => {
        this.etudiantService
          .uploadImageFS(this.uploadedImage,
            this.uploadedImage.name, etud.idEtudiant)
          .subscribe((response: any) => { }
          );
        this.router.navigate(['etudiants']);
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }
}
