import { describe, expect, test } from '@jest/globals';
import * as t from 'io-ts';

import { getProperties } from './helpers';
import { withDesc } from './types';

export interface PositiveBrand {
  readonly Positive: unique symbol;
}

describe('getProperties', () => {
  describe('object type', () => {
    test('t.number', () => {
      const traveler = t.type(
        {
          id: withDesc('UUID')(t.string),
          name: withDesc('name of the traveler')(t.string),
          last_name: withDesc('last name of the traveler')(t.string),
          age: withDesc('age of the traveler')(t.number)
        },
        'traveler'
      );

      expect(getProperties(traveler)).toEqual([
        {
          age: { description: 'age of the traveler', type: 'number' }
        },
        {
          last_name: {
            description: 'last name of the traveler',
            type: 'string'
          }
        },
        {
          name: { description: 'name of the traveler', type: 'string' }
        },
        {
          id: { description: 'UUID', type: 'string' }
        }
      ]);
    });

    test('t.Int', () => {
      const traveler = t.type(
        {
          id: withDesc('UUID')(t.string),
          name: withDesc('name of the traveler')(t.string),
          last_name: withDesc('last name of the traveler')(t.string),
          age: withDesc('age of the traveler')(t.number)
        },
        'traveler'
      );

      expect(getProperties(traveler)).toEqual([
        {
          age: { description: 'age of the traveler', type: 'number' }
        },
        {
          last_name: {
            description: 'last name of the traveler',
            type: 'string'
          }
        },
        {
          name: { description: 'name of the traveler', type: 'string' }
        },
        {
          id: { description: 'UUID', type: 'string' }
        }
      ]);
    });

    test('positiveInt', () => {
      const positive = t.brand(
        t.number, // a codec representing the type to be refined
        (n): n is t.Branded<number, PositiveBrand> => 0 < n, // a custom type guard using the build-in helper `Branded`
        'Positive' // the name must match the readonly field in the brand
      );

      const positiveInt = t.intersection([t.Int, positive]);

      const traveler = t.type(
        {
          id: withDesc('UUID')(t.string),
          name: withDesc('name of the traveler')(t.string),
          last_name: withDesc('last name of the traveler')(t.string),
          age: withDesc('age of the traveler')(positiveInt)
        },
        'traveler'
      );

      expect(getProperties(traveler)).toEqual([
        {
          age: { description: 'age of the traveler', type: 'number' }
        },
        {
          last_name: {
            description: 'last name of the traveler',
            type: 'string'
          }
        },
        {
          name: { description: 'name of the traveler', type: 'string' }
        },
        {
          id: { description: 'UUID', type: 'string' }
        }
      ]);
    });
  });
});
