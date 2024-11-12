import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Groupe } from '../model/groupe.model';

@Component({
  selector: 'app-update-groupe',
  templateUrl: './update-groupe.component.html',
  styles: ``
})
export class UpdateGroupeComponent {
  @Input()
  groupe!: Groupe;
  @Output()
  groupeUpdated = new EventEmitter<Groupe>();
  @Input()
ajout!:boolean;
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateGroupe ", this.groupe);
  }
  saveGroupe() {
    this.groupeUpdated.emit(this.groupe);
  }


}
