import { Score } from './score';

export class SElement {
  constructor(
    public name: string,
    public weakness: string[],
    public resistance: string[],
    public scores: Score[]
  )
  { }
}
