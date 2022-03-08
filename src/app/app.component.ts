import { Component } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private index = 0;

  constructor() {}

  ngOnInit() {}

  subject = new Subject<number>();
  behaviorSubject = new BehaviorSubject<number>(-1);
  replaySubject = new ReplaySubject<number>(3);

  nextAll() {
    console.log(`current index: ${this.index}`);
    this.subject.next(this.index);
    this.behaviorSubject.next(this.index);
    this.replaySubject.next(this.index);
    this.index++;
  }

  subjectValues: number[] = [];
  subjectSubscribe() {
    this.subject.subscribe((value) => {
      this.subjectValues.push(value);
    });
  }

  behaviorSubjectValues: number[] = [];
  behaviorSubjectSubscribe() {
    this.behaviorSubject.subscribe((value) => {
      this.behaviorSubjectValues.push(value);
    });
  }

  replaySubjectValues: number[] = [];
  replaySubscription: Subscription | null = null;
  replaySubjectSubscribe() {
    if (this.replaySubscription !== null) {
      this.replaySubscription.unsubscribe();
    }
    this.replaySubscription = this.replaySubject.subscribe((value) => {
      this.replaySubjectValues.push(value);
    });
  }
  replaySubjectUnsubscribe() {
    if (this.replaySubscription !== null) {
      this.replaySubscription.unsubscribe();
    }
  }
}
