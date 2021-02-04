import _cloneDeep from "lodash/cloneDeep";
import _extend from "lodash/extend";
import _isArray from "lodash/isArray";

export class ConfigHolder<T> {
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  set(newValue: Partial<T>) {
    if (_isArray(this.value)) {
      this.value = newValue as T;
    } else if (typeof this.value === "object") {
      _extend(this.value, newValue);
    } else {
      this.value = newValue as T;
    }
  }

  get() {
    return _cloneDeep(this.value);
  }
}

export default ConfigHolder;
