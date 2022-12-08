import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function ArrayValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ArrayValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ArrayValidatorRule,
    });
  };
}

@ValidatorConstraint({ name: 'ArrayValidator', async: true })
@Injectable()
export class ArrayValidatorRule implements ValidatorConstraintInterface {
  async validate(value: any) {
    try {
      if (Array.isArray(value)) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a array`;
  }
}
