import { ReceiverClass } from "../models/ReceiverClass";
import { ClassInstance } from "../types";

export default function <T extends ClassInstance>(target: T) {
  const Listen = class extends target {
    private receivers: ReceiverClass[] = [];

    private static instance: T;

    private constructor(...args: any[]) {
      super(args);
    }

    public static getInstance(): T {
      if (!this.instance) {
        this.instance = new Listen();
      }

      return this.instance;
    }

    registerReceiver(receiver: ReceiverClass) {
      this.receivers.push(receiver);
    }

    public notifyReceivers(): void {
      this.receivers.forEach((receiver) => {
        receiver.rerender();
      });
    }
  };

  return Listen as unknown as typeof target;
}
