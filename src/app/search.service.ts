import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  text: string = '';
  subject = new Subject<string>();

  onSearch(value: string) {
    this.text = value;
    this.subject.next(value);
  }

  listenSearch() {
    return this.subject
      .asObservable()
      .pipe(distinctUntilChanged(), debounceTime(1000));
  }
}
