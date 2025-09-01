import { Pipe, PipeTransform } from '@angular/core';

type SortCriteria = string | string[];

@Pipe({
  name: 'customSort',
})
export class CustomSortPipe implements PipeTransform {
  /**
   * Sorts an array based on the provided criteria.
   * @param array The array to sort.
   * @param sortCriteria A string or array of strings specifying the sort keys and order.
   * @returns A new sorted array.
   */
  transform<T>(array: T[], sortCriteria: SortCriteria): T[] {
    if (!Array.isArray(array)) {
      return array;
    }
    const criteriaList = Array.isArray(sortCriteria)
      ? sortCriteria
      : [sortCriteria];
    return [...array].sort((firstItem, secondItem) =>
      this.compareByCriteria(firstItem, secondItem, criteriaList)
    );
  }

  /**
   * Compares two items using the provided sort criteria.
   * Handles multiple criteria and ascending/descending order.
   * @param firstItem The first item to compare.
   * @param secondItem The second item to compare.
   * @param criteriaList Array of sort keys (with optional '-' prefix for descending).
   * @returns -1, 0, or 1 depending on sort order.
   */
  private compareByCriteria(
    firstItem: unknown,
    secondItem: unknown,
    criteriaList: string[]
  ): number {
    for (const criterion of criteriaList) {
      let isDescending = false;
      let propertyKey = criterion;
      if (propertyKey.startsWith('-')) {
        isDescending = true;
        propertyKey = propertyKey.slice(1);
      }
      const firstValue = this.getPropertyValue(firstItem, propertyKey);
      const secondValue = this.getPropertyValue(secondItem, propertyKey);
      const comparisonResult = this.compareValues(firstValue, secondValue);
      if (comparisonResult !== 0) return isDescending ? -comparisonResult : comparisonResult;
    }
    return 0;
  }

  /**
   * Safely retrieves the value of a property from an object.
   * @param item The object to retrieve the value from.
   * @param propertyKey The property key.
   * @returns The value of the property, or undefined/null if not found.
   */
  private getPropertyValue(item: unknown, propertyKey: string): unknown {
    if (item == null || typeof item !== 'object') return item;
    return (item as Record<string, unknown>)[propertyKey];
  }

  /**
   * Compares two values of any type, supporting strings, numbers, dates, arrays, and objects.
   * @param firstValue The first value to compare.
   * @param secondValue The second value to compare.
   * @returns -1, 0, or 1 depending on comparison result.
   */
  private compareValues(firstValue: unknown, secondValue: unknown): number {
    // Handle strict equality and null/undefined
    if (firstValue === secondValue) return 0;
    if (firstValue == null) return secondValue == null ? 0 : -1;
    if (secondValue == null) return 1;

    // Compare strings
    if (typeof firstValue === 'string' && typeof secondValue === 'string') {
      return firstValue.localeCompare(secondValue);
    }
    // Compare numbers
    if (typeof firstValue === 'number' && typeof secondValue === 'number') {
      return firstValue - secondValue;
    }
    // Compare dates
    if (firstValue instanceof Date && secondValue instanceof Date) {
      return firstValue.getTime() - secondValue.getTime();
    }
    // Compare arrays by length
    if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
      return firstValue.length - secondValue.length;
    }
    // Compare objects by JSON string
    if (typeof firstValue === 'object' && typeof secondValue === 'object') {
      return JSON.stringify(firstValue).localeCompare(
        JSON.stringify(secondValue)
      );
    }
    // Fallback: compare as strings
    return String(firstValue).localeCompare(String(secondValue));
  }
}
