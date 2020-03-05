import { Component, OnInit, Input } from '@angular/core';
import { SElement } from '../element';
import { ElementService } from '../element.service';
import { BattleService } from '../battle.service';

@Component({
  selector: 'app-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.css']
})
export class FighterComponent implements OnInit {

  @Input() fighters$: SElement[];
  buttonDisabled: boolean;

  constructor(
    private elementService: ElementService,
    private battleService: BattleService
  ) { }

  ngOnInit(): void {
    this.elementService.getElements()
      .subscribe(elements => this.fighters$ = elements);
  }

  selectFighter(name: string): void {
    this.battleService.setFighters(name);
    this.buttonDisabled = false;
  }


}
