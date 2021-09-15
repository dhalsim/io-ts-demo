import * as fs from 'fs';

import * as swaggerJson from './demoSwagger.json';

import * as tc from 'io-ts-codegen';
import { log } from './helpers';

export interface StringSchema {
  type: 'string';
  enum?: Array<string>;
}

export interface NumberSchema {
  type: 'number';
}

export interface BooleanSchema {
  type: 'boolean';
}

export interface ObjectSchema {
  type: 'object';
  properties: { [key: string]: JSONSchema };
  required?: Array<string>;
}

export interface ArraySchema {
  type: 'array';
  items: JSONSchema;
  required?: Array<string>;
}

export type JSONSchema =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ObjectSchema
  | ArraySchema;

function getRequiredProperties(schema: ObjectSchema): { [key: string]: true } {
  const required: { [key: string]: true } = {};
  if (schema.required) {
    schema.required.forEach(function (k) {
      required[k] = true;
    });
  }

  return required;
}

function toInterfaceCombinator(schema: ObjectSchema): tc.InterfaceCombinator {
  const required = getRequiredProperties(schema);

  return tc.typeCombinator(
    Object.keys(schema.properties).map((key) =>
      tc.property(
        key,
        to(schema.properties[key]),
        !required.hasOwnProperty(key)
      )
    )
  );
}

function toArrayCombinator(schema: ArraySchema): tc.ArrayCombinator {
  return tc.arrayCombinator(to(schema.items));
}

export function to(schema: JSONSchema): tc.TypeReference {
  switch (schema.type) {
    case 'string':
      return schema.enum ? tc.keyofCombinator(schema.enum) : tc.stringType;
    case 'number':
      return tc.numberType;
    case 'boolean':
      return tc.booleanType;
    case 'object':
      return toInterfaceCombinator(schema);
    case 'array':
      return toArrayCombinator(schema);
  }
}

function mergeAllOf(schema: any): any {
  if (schema.allOf) {
    return schema.allOf.reduce(
      (acc, elem) => {
        const { required, properties } = mergeAllOf(elem);

        return {
          ...acc,
          required: acc.required.concat(required),
          properties: { ...acc.properties, ...properties }
        };
      },
      { required: [], properties: {}, type: 'object' }
    );
  }

  return schema;
}

async function handler() {
  const declarations = Object.entries(swaggerJson).map(([propKey, prop]) =>
    tc.typeDeclaration(propKey, to(mergeAllOf(prop)), true)
  );

  log(10)(declarations);

  const sorted = tc.sort(declarations);

  fs.writeFileSync(
    'src/generatedFiles/typeDefinitions.ts',
    `
import * as t from 'io-ts';

${sorted.map((d) => tc.printRuntime(d)).join('\n')}

${sorted.map((d) => tc.printStatic(d)).join('\n')}
  `
  );
}

handler().catch(console.log);
