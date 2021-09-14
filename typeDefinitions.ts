import * as t from 'io-ts';

export const traveler = t.intersection([
  t.type({
    invoice_address_id: t.string,
    first_name: t.string,
    last_name: t.string,
    email: t.string,
    language: t.keyof({
      de: null,
      en: null
    }),
    title: t.keyof({
      Mr: null,
      Mrs: null
    }),
    gender: t.keyof({
      m: null,
      f: null
    }),
    notification_settings: t.type({
      notification_receivers: t.array(t.string),
      when_to_send: t.keyof({
        never: null,
        only_out_of_policy: null,
        always: null
      })
    }),
    _id: t.string,
    __v: t.number
  }),
  t.partial({
    company: t.string,
    middle_name: t.string,
    nationality: t.string,
    birthday: t.string,
    contact: t.partial({
      phone: t.string,
      address: t.intersection([
        t.type({
          city: t.string,
          country: t.string
        }),
        t.partial({
          street_1: t.string,
          street_2: t.string,
          label: t.string,
          zip_code: t.string,
          state: t.string,
          longitude: t.number,
          latitude: t.number
        })
      ]),
      managed: t.boolean,
      newsletter_subscribed: t.boolean
    }),
    identifications: t.array(
      t.intersection([
        t.type({
          type: t.keyof({
            passport: null,
            id_card: null,
            drivers_license: null,
            global_entry_ktn: null
          }),
          issuing_country: t.string,
          card_number: t.string
        }),
        t.partial({
          expires_at: t.string,
          issued_at: t.string
        })
      ])
    ),
    loyalty_cards: t.array(
      t.intersection([
        t.type({
          type: t.string
        }),
        t.partial({
          card_number: t.string,
          expires_at: t.string,
          pin: t.string,
          status: t.string
        })
      ])
    ),
    client_cost_center_1: t.string,
    client_cost_center_2: t.string,
    client_cost_center_3: t.string,
    preference: t.partial({
      airplane: t.partial({
        seat: t.keyof({
          window: null,
          aisle: null
        }),
        section: t.keyof({
          front: null,
          back: null
        }),
        description: t.string
      }),
      train: t.partial({
        reservation: t.boolean,
        class: t.string,
        section: t.keyof({
          open_saloon: null,
          open_saloon_with_table: null,
          compartment: null
        }),
        seat: t.keyof({
          window: null,
          aisle: null
        }),
        zone: t.keyof({
          phone_zone: null,
          quiet_zone: null
        })
      })
    }),
    meta_data: t.partial({
      created_at: t.string,
      updated_at: t.string,
      created_by: t.string,
      updated_by: t.string
    }),
    policy_id: t.string,
    roles: t.array(
      t.keyof({
        admin: null,
        central_booker: null,
        traveler: null
      })
    )
  })
]);

export interface traveler {
  company?: string;
  invoice_address_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  language: 'de' | 'en';
  title: 'Mr' | 'Mrs';
  nationality?: string;
  gender: 'm' | 'f';
  birthday?: string;
  contact?: {
    phone?: string;
    address?: {
      street_1?: string;
      street_2?: string;
      label?: string;
      zip_code?: string;
      city: string;
      state?: string;
      country: string;
      longitude?: number;
      latitude?: number;
    };
    managed?: boolean;
    newsletter_subscribed?: boolean;
  };
  identifications?: Array<{
    type: 'passport' | 'id_card' | 'drivers_license' | 'global_entry_ktn';
    issuing_country: string;
    card_number: string;
    expires_at?: string;
    issued_at?: string;
  }>;
  loyalty_cards?: Array<{
    type: string;
    card_number?: string;
    expires_at?: string;
    pin?: string;
    status?: string;
  }>;
  client_cost_center_1?: string;
  client_cost_center_2?: string;
  client_cost_center_3?: string;
  preference?: {
    airplane?: {
      seat?: 'window' | 'aisle';
      section?: 'front' | 'back';
      description?: string;
    };
    train?: {
      reservation?: boolean;
      class?: string;
      section?: 'open_saloon' | 'open_saloon_with_table' | 'compartment';
      seat?: 'window' | 'aisle';
      zone?: 'phone_zone' | 'quiet_zone';
    };
  };
  meta_data?: {
    created_at?: string;
    updated_at?: string;
    created_by?: string;
    updated_by?: string;
  };
  policy_id?: string;
  notification_settings: {
    notification_receivers: Array<string>;
    when_to_send: 'never' | 'only_out_of_policy' | 'always';
  };
  roles?: Array<'admin' | 'central_booker' | 'traveler'>;
  _id: string;
  __v: number;
}
