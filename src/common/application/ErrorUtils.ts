export default class ErrorUtils {
  static stackTrace(actual: Error, child?: Error): void {
    if (child) {
      actual.stack = child.stack
        ? child.stack + '\n' + actual.stack
        : actual.stack;
    }
  }
}
