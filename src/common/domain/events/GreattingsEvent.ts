export default class GreattingsEvent {
  public readonly GreattingId: string;

  public readonly GreattingName: string;

  constructor(
    private readonly greattingId: string,
    private readonly greattingName: string
  ) {
    this.GreattingId = greattingId;
    this.GreattingName = greattingName;
  }
}
