import * as t from 'io-ts';
import { describe, test, expect } from '@jest/globals';

import { toSwagger } from './iotsToSwaggerConverter';

describe('toSwagger', () => {
  test('string', () => {
    expect(toSwagger(t.string)).toEqual({
      type: 'string'
    });
  });

  test('number', () => {
    expect(toSwagger(t.number)).toEqual({
      type: 'number'
    });
  });

  test('boolean', () => {
    expect(toSwagger(t.boolean)).toEqual({
      type: 'boolean'
    });
  });

  test('Int', () => {
    expect(toSwagger(t.Int)).toEqual({
      type: 'number'
    });
  });

  test('array', () => {
    expect(toSwagger(t.array(t.number))).toEqual({
      type: 'array',
      items: {
        type: 'number'
      }
    });
  });

  describe('object', () => {
    test('all required', () => {
      const nameAndAge = t.type({
        name: t.string,
        age: t.number
      });

      expect(toSwagger(nameAndAge)).toEqual({
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number'
          }
        },
        required: ['name', 'age']
      });
    });

    test('partial', () => {
      const nameAndAge = t.partial({
        name: t.string,
        age: t.number
      });

      expect(toSwagger(nameAndAge)).toEqual({
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number'
          }
        }
      });
    });

    test('intersaction with partial', () => {
      const partialTraveler = t.intersection([
        t.type({
          name: t.string
        }),
        t.partial({
          age: t.number
        })
      ]);

      expect(toSwagger(partialTraveler)).toEqual({
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number'
          }
        },
        required: ['name']
      });
    });

    test('Keyof', () => {
      expect(
        toSwagger(
          t.type({
            invoice_address_id: t.string,
            language: t.keyof({
              de: null,
              en: null
            })
          })
        )
      ).toEqual({
        type: 'object',
        properties: {
          invoice_address_id: {
            type: 'string'
          },
          language: {
            type: 'string',
            enum: ['de', 'en']
          }
        },
        required: ['invoice_address_id', 'language']
      });
    });
  });
});
