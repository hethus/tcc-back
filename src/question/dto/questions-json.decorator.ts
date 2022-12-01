import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function jsonValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'jsonValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: jsonValidatorRule,
    });
  };
}

@ValidatorConstraint({ name: 'jsonValidator', async: true })
@Injectable()
export class jsonValidatorRule implements ValidatorConstraintInterface {
  async validate(value: any) {
    try {
      if (typeof value === 'string') {
        JSON.parse(value);
        return true;
      }
      if (typeof value !== 'object') {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid JSON`;
  }
}
