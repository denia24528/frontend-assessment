import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { deepCopy } from '../js-tasks/deep-copy/deep-copy';
import { checkEquivalence } from '../js-tasks/check-equivalence/check-equivalence';
import { executeCode } from '../js-tasks/execute-code/execute-code';
import { CustomSortPipe } from '../angular-tasks/custom-sort/custom-sort.pipe';
import { JsonPipe } from '@angular/common';
import { RepeaterComponent } from '../angular-tasks/repeater/repeater.component';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    CustomSortPipe,
    JsonPipe,
    RepeaterComponent
  ],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})

export class ShowcaseComponent {

  // List of menu items for the showcase navigation
  readonly menuItems = [
    { label: 'Deep Copy', key: 'deepCopy' },
    { label: 'Check Equivalence', key: 'checkEquivalence' },
    { label: 'Execute Code', key: 'executeCode' },
    { label: 'Custom Sort', key: 'customSort' },
    { label: 'Repeater', key: 'repeater' }
  ];

  // Signal holding the currently selected task key
  selectedTask = signal('deepCopy');
  // Signal indicating whether dark mode is enabled
  darkMode = signal(false);
  // Signal to track if the executeCode task has been executed
  hasExecutedCode = signal(false);
  // Reference to the deepCopy utility function
  deepCopy = deepCopy;
  // Reference to the checkEquivalence utility function
  checkEquivalence = checkEquivalence;
  // Reference to the executeCode utility function
  executeCode = executeCode;
  
  // Example data object for deep copy and equivalence checks
  data1 = { a: 17, b: { c: 'Test', d: null } };
  data2 = { a: 17, b: { c: 'Test' } };
  data3 = { a: 17, b: null };
  // Example array for custom sort demonstration
  options = [
    { name: 'A', price: 10 },
    { name: 'C', price: 5 },
    { name: 'B', price: 20 }
  ];

  /**
   * Toggles the application's dark mode state.
   */
  toggleDarkMode() {
    this.darkMode.update(v => !v);
    document.body.classList.toggle('dark-theme', this.darkMode());
  }

  /**
   * Handles the selection of a task by its key.
   * 
   * Updates the `selectedTask` state with the provided key. If the selected key is `'executeCode'`
   * and the code has not been executed yet, it executes two code snippets using the `executeCode` function
   * with the provided arguments and sets the `hasExecutedCode` flag to `true`. If a different key is selected,
   * it resets the `hasExecutedCode` flag to `false`.
   *
   * @param key - The unique identifier of the task to select.
   */
  selectTask(key: string) {
    this.selectedTask.set(key);
    if (key === 'executeCode' && !this.hasExecutedCode()) {
      executeCode('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
      executeCode('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 });
      this.hasExecutedCode.set(true);
    }
    if (key !== 'executeCode') {
      this.hasExecutedCode.set(false);
    }
  }
}