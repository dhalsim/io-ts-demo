import * as fs from 'fs';

import * as t from "io-ts";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { PathReporter } from "io-ts/PathReporter";
import { stringify } from 'json-to-pretty-yaml'

import * as mt from './types';

const log = (index: number = 0) => (e: any) => {
  if (index >= 7) console.log(index, JSON.stringify(e, null, 2));
  return e;
};

export interface PositiveBrand {
  readonly Positive: unique symbol;
}

const positive = t.brand(
  t.number, // a codec representing the type to be refined
  (n): n is t.Branded<number, PositiveBrand> => 0 < n, // a custom type guard using the build-in helper `Branded`
  "Positive" // the name must match the readonly field in the brand
);

type Positive = t.TypeOf<typeof positive>;

const positiveInt = t.intersection([t.Int, positive]);

type PositiveInt = t.TypeOf<typeof positiveInt>;

const unknownNumber = 20;

if (!positiveInt.is(unknownNumber)) {
    throw new Error('noo');
}

const pn: PositiveInt = unknownNumber;

// [Types and combinators](https://github.com/gcanti/io-ts/blob/master/index.md#implemented-types--combinators)

const traveler = t.type(
  {
    id: t.string,
    name: t.string,
    last_name: t.string,
    age: positiveInt // positive // t.Int
  },
  "traveler"
);

log(1)(traveler);

type Traveler = t.TypeOf<typeof traveler>;

const travelerToBeValidated = {
  id: "UUID",
  name: "Baris",
  last_name: "Aydek",
  age: 35 // TODO: break this
};

if (!traveler.is(travelerToBeValidated)) {
  throw new Error("no");
}

const travelerA: Traveler = travelerToBeValidated;

const unknownTraveler: unknown = {
  id: "UUID2",
  name: "Baris2",
  last_name: "Aydekk",
  age: 35 // TODO: break this
};

// decode (unknown -> validation)
pipe(unknownTraveler, traveler.decode, E.mapLeft(log(2.1)));
pipe(unknownTraveler, traveler.decode, PathReporter.report, log(2.2));
pipe(travelerA, traveler.decode, E.map(log(2.3)));

// optional fields
const travelerOpt = t.intersection(
  [
    t.type({
      id: t.string,
      name: t.string,
      last_name: t.string
    }),
    t.partial({
      age: mt.withDesc("Age of the traveler")(t.number)
    })
  ],
  "travelerOpt"
);

pipe(unknownTraveler, travelerOpt.decode, PathReporter.report, log(3));

log(4)(travelerOpt);

// encode
log(5)(travelerOpt.encode(travelerA));

// type guard
if (travelerOpt.is(unknownTraveler)) {
  log(6)(unknownTraveler.id);
} else {
  // we don't know
}

// generate swagger definitions

interface Context {
  _tag: mt.ALL_TYPES;
  _desc?: string;
  name: string;
}

const getUnderlyingType = (params: mt.AllTypes): { tag: mt.PRIMITIVE_TYPES, name: string } => {
    switch(params._tag) {
        case "StringType":
        case "BigIntType":
        case "NumberType":
        case "BooleanType":
            return { tag: params._tag, name: params.name };
        case "PartialType":
        case "InterfaceType":
            throw new Error('I do not know what to do');
        case "IntersectionType": {
            return getUnderlyingType(params.types[0]);
        }
        case 'RefinementType': {
            return { tag: params.type._tag, name: params.type.name };
        }
        default:
            log(100)(params);
            throw new Error(`${params._tag} not found`);
    }
}

const convertInterfaceType = (it: mt.InterfaceType): mt.InterfaceType => {
    const r = (e: [string, mt.AllTypes][]) => e.reduce((acc, [p1, p2]) => ({ [p1]: p2, ...acc }), {});
    const entries = Object.entries(it.props);
    const convertedProps = r(entries.map(([propName, prop]) => {
        const { tag, name } = getUnderlyingType(prop);

        return [propName, { ...prop, _tag: tag, name }];
    }));

    log(30)(convertedProps);
    
    return {
        ...it,
        props: convertedProps
    }
}

const getUnderlyingContext = (params: mt.AllTypes): (mt.PrimitiveType | mt.InterfaceType | mt.PartialType)[] => {
    switch(params._tag) {
        case "StringType":
        case "BigIntType":
        case "NumberType":
        case "BooleanType":
        case "PartialType":
            return [params];
        case "InterfaceType": {
            return [convertInterfaceType(params)];
        }
        case "IntersectionType": {
            return params.types.flatMap(getUnderlyingContext);
        }
        case 'RefinementType': {
            log(20)(params);

            return getUnderlyingContext(params.type);
        }
        default:
            log(100)(params);
            throw new Error(`${params._tag} not found`);
    }
};

const getProperties = (iots: mt.AllTypes) => {
    return getUnderlyingContext(iots)
        .filter(mt.isComplexType)
        .flatMap((c) => Object.entries(c.props).map(([propName, context]) => {
            return {
                [propName]: {
                    type: context.name,
                    description: context._desc
                }
            }
        }));
}

log(8)(traveler);
// log(9)(travelerOpt);

const getRequired = (iots: mt.AllTypes): string[] => {
    return getUnderlyingContext(iots)
        .filter(mt.isInterfaceType)
        .flatMap(c => Object.keys(c.props));
}

const travelerOptDefinition = {
  [travelerOpt.name]: {
    type: "object",
    properties: getProperties(travelerOpt as unknown as mt.AllTypes),
    required: getRequired(travelerOpt as unknown as mt.AllTypes)
  }
};

log(11)(travelerOptDefinition);

const travelerDefinition = {
    [traveler.name]: {
      type: "object",
      properties: getProperties(traveler as unknown as mt.AllTypes),
      required: getRequired(traveler as unknown as mt.AllTypes)
    }
  };
  
log(12)(travelerDefinition);

fs.writeFileSync("swaggerDefinitions.yaml", stringify({ 
    ...travelerDefinition, ...travelerOptDefinition 
}));

// https://github.com/gcanti/io-ts-codegen

// Branded types / Refinements
// TODO: go to top of the page and uncomment PositiveInt
