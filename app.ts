import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShowcaseComponent } from './showcase/showcase.component';

@Component({
  imports: [RouterModule, ShowcaseComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend-assessment';
}
