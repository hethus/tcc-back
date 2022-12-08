import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ObjectValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ObjectValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ObjectValidatorRule,
    });
  };
}

@ValidatorConstraint({ name: 'ObjectValidator', async: true })
@Injectable()
export class ObjectValidatorRule implements ValidatorConstraintInterface {
  async validate(value: any) {
    try {
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
