export function getReviewWord(count: number): string {
  const absCount = Math.abs(count); // Берем абсолютное значение
  const lastDigit = absCount % 10; // Последняя цифра
  const lastTwoDigits = absCount % 100; // Последние две цифры

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "отзыв";
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return "отзыва";
  } else {
    return "отзывов";
  }
}
