import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'desafio';

  constructor(private search: SearchService) {}

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.onSearch(input.value);
  }
}
