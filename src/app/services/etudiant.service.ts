

import { Injectable } from '@angular/core';
import { Etudiant } from '../model/etudiant.model';
import { Groupe } from '../model/groupe.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLGp } from '../config';
import { GroupeWrapper } from '../model/GroupeWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class EtudiantService {
  etudiants!: Etudiant[];
  etudiant?: Etudiant;
  //groupes: Groupe[];

  constructor(private http: HttpClient, private authService: AuthService) {
    /*this.groupes = [{ idGroupe: 1, nomGroupe: "groupe1" },
    { idGroupe: 2, nomGroupe: "groupe2" }];

    /*this.etudiants = [{ idEtudiant: 1, nom: "moussa", prenom: "mayssa", dateNaiss: new Date("01/02/2000"), classe: "DSI31", email: "mayssa@gmail.com", groupe: { idGroupe: 1, nomGroupe: "groupe1" } },
    { idEtudiant: 2, nom: "makhlouf", prenom: "eya", dateNaiss: new Date("10/05/2003"), classe: "DSI32", email: "eya@gmail.com", groupe: { idGroupe: 2, nomGroupe: "groupe2" } },
    { idEtudiant: 3, nom: "sfia", prenom: "samar", dateNaiss: new Date("01/03/2004"), classe: "RSI31", email: "samar@gmail.com", groupe: { idGroupe: 1, nomGroupe: "groupe1" } }

    ];*/
  }
  listeEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(apiURL + "/all");
  }

  ajouterEtudiant(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<Etudiant>(apiURL + "/addetud", etud, { headers: httpHeaders });
  }


  supprimerEtudiant(id: number) {
    const url = `${apiURL}/deletud/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.delete(url, { headers: httpHeaders });

  }

  consulterEtudiant(id: number): Observable<Etudiant> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<Etudiant>(url, { headers: httpHeaders });
  }

  trierEtudiants() {
    this.etudiants = this.etudiants.sort((n1, n2) => {
      if (n1.idEtudiant > n2.idEtudiant) {
        return 1;
      }
      if (n1.idEtudiant < n2.idEtudiant) {
        return -1;
      }
      return 0;
    });
  }

  updateEtudiant(etud: Etudiant): Observable<Etudiant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.put<Etudiant>(apiURL + "/updateetud", etud, { headers: httpHeaders });
  }
  listeGroupes(): Observable<GroupeWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.get<GroupeWrapper>(apiURLGp, { headers: httpHeaders }
    );
  }

  rechercherParGroupe(idGroupe: number): Observable<Etudiant[]> {
    const url = `${apiURL}/etudgp/${idGroupe}`;
    return this.http.get<Etudiant[]>(url);
  }
  rechercherParNom(nom: string): Observable<Etudiant[]> {
    const url = `${apiURL}/etudsByName/${nom}`;
    return this.http.get<Etudiant[]>(url);
  }
  ajouterGroupe(gp: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(apiURLGp, gp, httpOptions);
  }
  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  uploadImageEtud(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageEtud'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }


}
