import { Injectable } from "@nestjs/common";
import { Subject } from "./interfaces/subject.interface";
import { Observer } from "./interfaces/observer.interface";

@Injectable()
export class NotificationService implements Subject {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public notifyObservers(eventType: string, data: any): void {
    for (const observer of this.observers) {
      observer.update(eventType, data);
    }
  }
}