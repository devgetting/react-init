import { ReceiverClass } from "./ReceiverClass";

export interface ListenerClass {
  instance: ListenerClass;
  receivers: ObjectConstructor[];
  getInstance(): ListenerClass;
  registerReceiver(receiver: ReceiverClass): void;
  notifyReceivers(): void;
}
