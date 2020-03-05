import { Component, OnInit, Input } from '@angular/core';
import { ElementService } from '../element.service';
import { SElement } from '../element';
import { Observable, of } from 'rxjs';
import { BattleService } from '../battle.service';
import { Score } from '../score';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {
  @Input() fighters$: SElement[];
  battle: boolean;
  draw: boolean;
  winner: SElement;

  constructor(private elementService: ElementService,
    private battleService: BattleService
  ) { }

  ngOnInit(): void {
  }

  getFighters(): void {
    this.battleService.getFighters().subscribe(elements => this.fighters$ = elements);
  }

  startBattle(): void {
    this.getFighters();
    this.winner = null;
    this.battle = true;
    this.draw = false;
  }

  stopBattle(): void {
    this.battleService.fighters$ = [];
    this.battle = false;
  }

  fight(): void{
    var f1 = 0;
    var f2 = 0;

    var weak1 = this.elementService.getWeakness(this.fighters$[0]);
    var weak2 = this.elementService.getWeakness(this.fighters$[1]);

    var res1 = this.elementService.getResistance(this.fighters$[0]);
    var res2 = this.elementService.getResistance(this.fighters$[1]);

    var perc1 = this.getPercWin(this.getWeak(weak1, this.fighters$[1].name), this.getRes(res1, this.fighters$[1].name));
    var perc2 = this.getPercWin(this.getWeak(weak2, this.fighters$[0].name), this.getRes(res2, this.fighters$[0].name));

    if (perc1 >= Math.floor(Math.random() * 100 + 0)) {
      f1 = 1;
    }

    if (perc2 >= Math.floor(Math.random() * 100 + 0)) {
      f2 = 1;
    }

    if (f1 > f2) {
      this.winner = this.fighters$[0];
      this.elementService.updateScore(this.fighters$[0], new Score('Wins', 1));
      this.elementService.updateScore(this.fighters$[1], new Score('Loses', 1));
      this.draw = false;
    }
    if (f2 > f1) {
      this.winner = this.fighters$[1];
      this.elementService.updateScore(this.fighters$[1], new Score('Wins', 1));
      this.elementService.updateScore(this.fighters$[0], new Score('Loses', 1));
      this.draw = false;
    }
    if (f2 === f1) {
      this.elementService.updateScore(this.fighters$[1], new Score('Draws', 1));
      this.elementService.updateScore(this.fighters$[0], new Score('Draws', 1));
      this.draw= true;
      this.winner =  null;
    }
  }

  getWeak(weak: string[], name: string): number {
    return weak.filter(w => w === name).length;
  }

  getRes(res: string[], name: string): number {
    return res.filter(r => r === name).length;
  }

  getPercWin(weak: number, res: number): number {
    var perc: number;

    if (weak === 0) {
      if (res === 0) {
        return 75;
      } else {
        return 100;
      }
    } else {
      if (res === 0) {
        return 25;
      } else {
        return 50;
      }
    }
  }

}
