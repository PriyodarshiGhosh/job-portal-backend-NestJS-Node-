import { startCase, isEmpty } from 'lodash';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable, Type } from '@nestjs/common';
import { ValidationFailed } from '../exceptions';

@Injectable()
export class BaseValidator {
  async fire<T>(inputs: Record<string, any>, schemaMeta: Type<T>): Promise<T> {
    console.log(":fire 1")
    console.log("schemaMeta=>>>", schemaMeta)
    console.log("inputs->>>", inputs)
    const schema: T = plainToClass(schemaMeta, inputs);
    console.log(":fire 11")

    const errors = await validate(schema as Record<string, any>, {
      stopAtFirstError: true,
    });
    console.log(":fire 12")


    /**
     * Process errors, if any.
     * Throws new ValidationFailed Exception with validation errors
     */
    let bag = {};
    if (errors.length > 0) {
      for (const error of errors) {
        const errorsFromParser = this.parseError(error);
        const childErrorBag = {};
        for (const key in errorsFromParser) {
          if (!isEmpty(errorsFromParser[key])) {
            childErrorBag[key] = errorsFromParser[key];
          }
        }

        bag = { ...bag, ...childErrorBag };
      }

      throw new ValidationFailed(bag);
    }

    return schema;
  }

  parseError(error) {
    const children = [];
    for (const child of error.children || []) {
      children.push(this.parseError(child));
    }

    const messages = [];
    for (const c in error.constraints) {
      let message = error.constraints[c];
      message = message.replace(error.property, startCase(error.property));
      messages.push(message);
    }

    const errors = {};
    if (!isEmpty(messages)) {
      errors[error.property] = messages;
    }

    for (const child of children) {
      for (const key in child) {
        errors[`${error.property}.${key}`] = child[key];
      }
    }

    return errors;
  }
}
