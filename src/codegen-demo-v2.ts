import fs from 'fs';
import * as gen from 'io-ts-codegen';

import * as swaggerJson from './fullSwagger.json';

interface AllOfSchema {
  // for discrimated union
  type: 'allOf';
  allOf: Array<JSONSchema>;
}

interface ObjectSchema {
  type: 'object';
  required?: Array<string>;
  properties: { [key: string]: JSONSchema };
}

interface StringSchema {
  type: 'string';
  enum?: Array<string>;
}

interface ArraySchema {
  type: 'array';
  items: JSONSchema;
}

interface BooleanSchema {
  type: 'boolean';
  // default?
}

interface NumberSchema {
  type: 'number' | 'integer';
}

type JSONSchema =
  | ObjectSchema
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | AllOfSchema;

function transformObjectSchema(schema: ObjectSchema): gen.InterfaceCombinator {
  const requiredProperties = schema.required
    ? new Set(schema.required)
    : new Set();

  const properties = Object.keys(schema.properties).map((key) => {
    return gen.property(
      key,
      transform(schema.properties[key]),
      !requiredProperties.has(key)
    );
  });

  return gen.typeCombinator(properties);
}

function transformAllOf(schema: AllOfSchema): gen.InterfaceCombinator {
  const properties = [];
  for (const allOf of schema.allOf) {
    const typeReference = transform(allOf);

    if (typeReference.kind === 'InterfaceCombinator') {
      properties.push(...typeReference.properties);
    } else {
      properties.push(typeReference);
    }
  }

  return gen.typeCombinator(properties);
}

function transform(schema: JSONSchema): gen.TypeReference {
  switch (schema.type) {
    case 'string':
      return schema.enum ? gen.keyofCombinator(schema.enum) : gen.stringType;
    case 'boolean':
      return gen.booleanType;
    case 'integer':
    case 'number':
      return gen.numberType;
    case 'object':
      return transformObjectSchema(schema);
    case 'array':
      return gen.arrayCombinator(transform(schema.items));
    default:
      if ((schema as any).enum) {
        return gen.keyofCombinator((schema as any).enum);
      }

      if (schema.allOf) {
        return transformAllOf(schema);
      }
  }
}

function start(swaggerJSON: any) {
  const definitions = Object.keys(swaggerJSON.definitions).map((key) => {
    return gen.typeDeclaration(
      key.toUpperCase(),
      transform(swaggerJSON.definitions[key])
    );
  });

  console.log(definitions.map((d) => gen.printStatic(d)).join('\n'));

  const sorted = gen.sort(definitions);

  fs.writeFileSync(
    'src/generatedFiles/typeDefinitions_V2.ts',
    `
import * as t from 'io-ts';

${sorted.map((d) => gen.printRuntime(d)).join('\n')}

${sorted.map((d) => gen.printStatic(d)).join('\n')}
`
  );
}

start(swaggerJson);
