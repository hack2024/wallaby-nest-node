import { OnEvent } from '@nestjs/event-emitter';
import GreattingsEvent from '@common/domain/events/GreattingsEvent';

export default class GreattingsListener {
  private greattingId: string = '';

  @OnEvent('greattings.hi')
  handleGreattings(payload: GreattingsEvent) {
    this.greattingId = payload.GreattingId;
  }
}
