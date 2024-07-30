import { EventType } from '../enum/event-type.enum';
import { Observer } from './observer.interface';

export interface Subject {
  notify(eventType: EventType, data: any): void;
}
