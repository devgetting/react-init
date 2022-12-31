import { ListenerClass } from "../models/ListenerClass";

export default function (
  _: any,
  __: string,
  propertyDescriptor: PropertyDescriptor
) {
  const originalMethod = propertyDescriptor.value;

  propertyDescriptor.value = function (...arg: any[]) {
    originalMethod.call(this, ...arg);

    const listen = this.listener as unknown as ListenerClass;
    listen.getInstance().notifyReceivers();
  };
}
