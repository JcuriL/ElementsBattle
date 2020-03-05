import { Component, OnInit, Input } from '@angular/core';
import { ElementService } from '../element.service';
import { SElement } from '../element';
import { MessageService } from '../message.service';
import { BattleService } from '../battle.service';


@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  @Input() elements$: SElement[];
  
  constructor(private elementService: ElementService) { }

  ngOnInit(): void {
    this.elementService.getElements()
      .subscribe(elements => this.elements$ = elements);
  }
}
