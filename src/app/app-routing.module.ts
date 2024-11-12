import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantsComponent } from './etudiants/etudiants.component';
import { AddEtudiantComponent } from './add-etudiant/add-etudiant.component';
import { UpdateEtudiantComponent } from './update-etudiant/update-etudiant.component';
import { RechercheParGroupeComponent } from './recherche-par-groupe/recherche-par-groupe.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGroupesComponent } from './liste-groupes/liste-groupes.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EtudiantGuard } from './etudiant.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path: "etudiants", component : EtudiantsComponent},
  {path:"add-etudiant", component:AddEtudiantComponent,canActivate:[EtudiantGuard]},
  {path:"updateEtudiant/:id", component:UpdateEtudiantComponent},
  {path: "", redirectTo: "etudiants", pathMatch: "full"},
  {path: "rechercheParGroupe", component : RechercheParGroupeComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path:"listeGroupes",component:ListeGroupesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
