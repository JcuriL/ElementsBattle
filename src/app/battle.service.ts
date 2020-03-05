import { Injectable } from '@angular/core';
import { BattleComponent } from './battle/battle.component';
import { FighterComponent } from './fighter/fighter.component';
import { SElement } from './element';
import { Observable, of } from 'rxjs';
import { ElementService } from './element.service';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  fighters$: SElement[] = [];

  constructor(private elementService: ElementService) { }

  getFighters(): Observable<SElement[]> {
    return of(this.fighters$);
  }

  setFighters(name: string): void {
    this.elementService.getElement(name).subscribe(element => this.fighters$.push(element));
  }

}
