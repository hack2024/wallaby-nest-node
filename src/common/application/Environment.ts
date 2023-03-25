export default class Environment {
  private static readonly LOCAL = 'local';
  private static readonly ENVIRONMENT = process.env.NODE_ENV || this.LOCAL;

  static isLocal(): boolean {
    return this.ENVIRONMENT === this.LOCAL;
  }
}
