import * as fs from 'fs';
import * as tc from 'io-ts-codegen';

import * as sabreResponse from './sabreResponse.json';

import { log } from './helpers';

function toInterfaceCombinator(obj: Object): tc.InterfaceCombinator {
  return tc.typeCombinator(
    Object.keys(obj).map((key) =>
      tc.property(
        key,
        to(obj[key])
      )
    )
  );
}

function toArrayCombinator(arr: any[]): tc.ArrayCombinator {
  return tc.arrayCombinator(to(arr[0]));
}

export function to(value: any): tc.TypeReference {
  if (Array.isArray(value)) {
    return toArrayCombinator(value);
  }

  if (typeof value === 'string') {
    return tc.stringType;
  }

  if (typeof value === 'number') {
    return tc.numberType;
  }

  if (typeof value === 'boolean') {
    return tc.booleanType;
  }

  if (typeof value === 'object') {
    return toInterfaceCombinator(value);
  }

  throw new Error('could not find type of: ' + JSON.stringify(value, null, 2));
}

async function handler() {
  const declarations = Object.entries(sabreResponse).map(([propKey, prop]) =>
    tc.typeDeclaration(propKey, to(prop), false)
  );

  log(10)(declarations);

  const sorted = tc.sort(declarations);

  fs.writeFileSync(
    'src/generatedFiles/sabreResponseDefinitions.ts',
    `
import * as t from 'io-ts';

${sorted.map((d) => tc.printRuntime(d)).join('\n')}

${sorted.map((d) => tc.printStatic(d)).join('\n')}
  `
  );
}

handler().catch(console.log);