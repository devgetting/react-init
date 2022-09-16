export default function (
  _: any,
  __: string,
  propertyDescriptor: PropertyDescriptor
) {
  const originalMethod = propertyDescriptor.value;

  propertyDescriptor.value = function (...arg: any[]) {
    originalMethod.call(this, ...arg);
    this.rerender();
  };
}
