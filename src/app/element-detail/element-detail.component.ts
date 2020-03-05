import { Component, OnInit, Input } from '@angular/core';
import { SElement } from '../element';
import { ActivatedRoute } from '@angular/router';
import { ElementService } from '../element.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.css']
})
export class ElementDetailComponent implements OnInit {
  @Input() element: SElement;

  
  constructor(
    private route: ActivatedRoute,
    private elementService: ElementService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getElement();
  }

  goBack(): void {
    this.location.back();
  }

  getElement(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.elementService.getElement(name)
      .subscribe(element => this.element = element);
  }

}
