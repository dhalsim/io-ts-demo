import * as fs from 'fs';

import * as t from "io-ts";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
// import * as A from "fp-ts/Array";
import { PathReporter } from "io-ts/PathReporter";
import { stringify } from 'json-to-pretty-yaml'

import * as mt from './types';
import * as h from './helpers';
import * as td from '../typeDefinitions';

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
    age: positiveInt //t.number // positive // t.Int
  },
  "traveler"
);

h.log(1)(traveler);

type Traveler = t.TypeOf<typeof traveler>;

const travelerToBeValidated = {
  id: "UUID",
  name: "Baris",
  last_name: "Aydek",
  age: 34 // TODO: break this
};

if (!traveler.is(travelerToBeValidated)) {
  throw new Error("no");
}

const travelerA: Traveler = travelerToBeValidated;

const unknownTraveler: unknown = {
  id: "UUID2",
  name: "Baris2",
  last_name: "Aydekk",
  age: 35.4 // TODO: break this
};

// decode (unknown -> validation)
pipe(unknownTraveler, traveler.decode, E.mapLeft(h.log(2.1)));
pipe(unknownTraveler, traveler.decode, PathReporter.report, h.log(2.2));
pipe(travelerA, traveler.decode, E.map(h.log(2.3)));

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

pipe(unknownTraveler, travelerOpt.decode, PathReporter.report, h.log(3));

h.log(4)(travelerOpt);

// encode
h.log(5)(travelerOpt.encode(travelerA));

// type guard
if (travelerOpt.is(unknownTraveler)) {
  h.log(6)(unknownTraveler.id);
} else {
  // we don't know
}

// generate swagger definitions
h.log(8)(traveler);
// log(9)(travelerOpt);

const travelerOptDefinition = {
  [travelerOpt.name]: {
    type: "object",
    properties: h.getProperties(travelerOpt as unknown as mt.AllTypes),
    required: h.getRequired(travelerOpt as unknown as mt.AllTypes)
  }
};

h.log(11)(travelerOptDefinition);

const travelerDefinition = {
    [traveler.name]: {
      type: "object",
      properties: h.getProperties(traveler as unknown as mt.AllTypes),
      required: h.getRequired(traveler as unknown as mt.AllTypes)
    }
  };
  
h.log(12)(travelerDefinition);

// TODO: doesn't work right now (Error: KeyofType not found)
// const generatedTraveler = {
//   'generatedTraveler': {
//     type: "object",
//     properties: h.getProperties(td.traveler as unknown as mt.AllTypes),
//     required: h.getRequired(td.traveler as unknown as mt.AllTypes)
//   }
// }

fs.writeFileSync("swaggerDefinitions.yaml", stringify({ 
    ...travelerDefinition, ...travelerOptDefinition 
}));

// https://github.com/gcanti/io-ts-codegen

// Branded types / Refinements
// TODO: go to top of the page and uncomment PositiveInt

const ct: td.traveler = {
  first_name: 'baris',
  gender: 'm',
  language: 'en',
  last_name: 'aydek',
  title: 'Mr',
  contact: {
    address: {
      city: 'berlin',
      country: 'DE'
    }
  },
  identifications: [
    {
      type: 'drivers_license',
      card_number: '23123123123',
      issuing_country: 'DE'
    }
  ],
  invoice_address_id: 'test',
  notification_settings: {
    notification_receivers: [],
    when_to_send: 'never'
  },
  __v: 2,
  _id: 'Mongo ID',
  email: 'email@email.com'
}

h.log(30)(ct)