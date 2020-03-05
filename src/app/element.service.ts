import { Injectable, Input } from '@angular/core';
import { SElement } from './element';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { ActivatedRoute } from '@angular/router';
import { Score } from './score';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  @Input() fighters$: SElement[];

  listElements = [
    new SElement('fire', ['water', 'dark', 'wind', 'earth'], ['ligth', 'neutral'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('water', ['dark', 'wind', 'ligth'], ['fire', 'earth'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('earth', ['dark', 'neutral'], ['fire', 'wind'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('wind', ['ligth', 'dark', 'neutral'], ['earth', 'water'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('ligth', ['dark'], ['fire', 'water', 'earth', 'wind', 'neutral'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('dark', ['ligth'], ['fire', 'water', 'earth', 'wind', 'neutral'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)]),
    new SElement('neutral', ['fire', 'water', 'earth', 'ligth', 'dark'], ['wind'], [new Score('Wins', 0), new Score('Draws', 0), new Score('Loses', 0)])
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    this.messageService.add(`ElementService: ${message}`);
  }

  getName(element: SElement): string {
    return element.name;
  }

  getWeakness(element: SElement): string[] {
    return element.weakness;
  }

  getResistance(element: SElement): string[] {
    return element.resistance;
  }

  getElement(name: string): Observable<SElement> {
    return of (this.listElements.find(element => element.name === name));
  }

  getElements(): Observable<SElement[]> {
    return of(this.listElements);
  }

  getScores(element: SElement): Score[] {
    return element.scores;
  }
  updateScore(elem: SElement, score: Score): void {
    this.listElements
      .find(element => element.name === elem.name)
      .scores
      .find(sc => sc.name === score.name).value += score.value;
  }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
