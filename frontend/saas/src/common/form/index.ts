import {Validators} from "@lemoncode/fonk";
import {VALIDATION_INPUT_EMAIL, VALIDATION_INPUT_REQUIRED} from "@common/messages";

export function configureFormValidationMessages() {
  Validators.required.setErrorMessage(VALIDATION_INPUT_REQUIRED);
  Validators.email.setErrorMessage(VALIDATION_INPUT_EMAIL);
}