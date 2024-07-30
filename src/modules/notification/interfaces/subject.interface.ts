import { Observer } from './observer.interface';

export interface Subject {
  addObserver(observer: Observer): void;
  notifyObservers(eventType: string, data: any): void;
}
