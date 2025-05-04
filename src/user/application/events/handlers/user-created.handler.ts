import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../../domain/events/user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent): void {
    console.log('[UserCreatedEvent]', {
      id: event.id,
      fullName: `${event.name}`,
      email: event.email,
      role: event.role,
      createdAt: event.createdAt.toISOString(),
    });
  }
}
