import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-repeater',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.css']
})
export class RepeaterComponent<T = unknown> {
  /**
   * The array of items to repeat over.
   */
  @Input() option: T[] = [];

  /**
   * The template to render for each item.
   */
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<unknown>;
}
