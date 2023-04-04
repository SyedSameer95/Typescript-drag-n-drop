export interface Validate {
  value: string | number;
  required: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}

export function validate(validatable: Validate): Boolean {
  let isValid = true;
  if (validatable.required) {
    if (validatable.max) {
      isValid = isValid && +validatable.value.toString() <= validatable.max;
    }
    if (validatable.min) {
      isValid = isValid && +validatable.value.toString() >= validatable.min;
    }
    if (validatable.maxLength) {
      isValid =
        isValid && validatable.value.toString().length <= validatable.maxLength;
    }
    if (validatable.minLength) {
      isValid =
        isValid && validatable.value.toString().length >= validatable.minLength;
    }
  }
  return isValid;
}
