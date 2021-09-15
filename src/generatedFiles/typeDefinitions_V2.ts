
import * as t from 'io-ts';

const LOYALTYCARDTYPE = t.intersection([
  t.type({
    card_type: t.keyof({
      traveler: null,
      corporate: null
    }),
    text: t.string,
    value: t.string
  }),
  t.partial({
    type: t.string
  })
])
const BASEACCOUNT = t.intersection([
  t.type({
    name: t.string,
    invoice_addresses: t.array(t.intersection([
      t.type({
        city: t.string,
        country: t.string,
        company_name: t.string,
        office_name: t.string,
        status: t.keyof({
          active: null,
          inactive: null
        }),
        invoice_overview_receivers: t.array(t.string),
        payment_method: t.keyof({
          credit_card: null,
          invoice: null,
          sepa: null,
          airplus: null
        }),
        billing_aggregation: t.keyof({
          individual: null,
          monthly: null,
          semimonthly: null
        })
      }),
      t.partial({
        street_1: t.string,
        street_2: t.string,
        label: t.string,
        zip_code: t.string,
        state: t.string,
        longitude: t.number,
        latitude: t.number,
        id: t.string,
        vat_id: t.string
      })
    ])),
    invoice_overview_receivers: t.array(t.string),
    language: t.keyof({
      de: null,
      en: null
    }),
    communication_settings: t.type({
      confirmation: t.keyof({
        booker: null,
        'traveler and booker': null
      }),
      invoice: t.keyof({
        booker: null,
        'traveler and booker': null,
        'finance only': null
      }),
      reminder: t.keyof({
        traveler: null,
        booker: null,
        'traveler and booker': null
      })
    }),
    currency: t.keyof({
      EUR: null
    }),
    status: t.keyof({
      unverified: null,
      trial: null,
      customer: null,
      inactive: null
    }),
    policies: t.array(t.intersection([
      t.type({
        id: t.string,
        name: t.string,
        default: t.boolean
      }),
      t.partial({
        meta_data: t.partial({
          created_at: t.string,
          updated_at: t.string,
          created_by: t.string,
          updated_by: t.string
        }),
        flight: t.partial({
          rules: t.type({
            cabin_class_rules: t.array(t.intersection([
              t.type({
                duration_from: t.number,
                cabin_class: t.keyof({
                  economy: null,
                  'economy plus': null,
                  business: null,
                  first: null
                })
              }),
              t.partial({
                duration_to: t.number,
                budget: t.number
              })
            ]))
          }),
          preferences: t.partial({
            preferred_airlines: t.array(t.string),
            avoided_airlines: t.array(t.string),
            luggage: t.boolean,
            rebookable: t.boolean,
            cancelable: t.boolean
          })
        }),
        hotel: t.partial({
          rules: t.intersection([
            t.type({
              country_budgets: t.array(t.type({
                country: t.string,
                budget: t.number
              }))
            }),
            t.partial({
              max_stars: t.number,
              default_budget: t.number
            })
          ]),
          preferences: t.partial({
            min_stars: t.number,
            includes_breakfast: t.boolean,
            includes_wifi: t.boolean,
            cancelable: t.boolean
          })
        }),
        rental_car: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              M: null,
              N: null,
              E: null,
              H: null,
              C: null,
              D: null,
              I: null,
              J: null,
              S: null,
              R: null,
              F: null,
              G: null,
              P: null,
              U: null,
              L: null,
              W: null,
              O: null,
              X: null
            }),
            budget: t.number
          }),
          preferences: t.intersection([
            t.type({
              preferred_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              })),
              avoided_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              }))
            }),
            t.partial({
              insurance: t.keyof({
                'yes with excess': null,
                'yes without excess': null
              }),
              navigation_system: t.boolean
            })
          ])
        }),
        train: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              '1': null,
              '2': null
            }),
            budget: t.number
          }),
          preferences: t.partial({
            seat_reservation_against_payment: t.boolean,
            flexible: t.boolean,
            cancelable: t.boolean
          })
        })
      })
    ])),
    credit_check_passed: t.boolean
  }),
  t.partial({
    finance_email: t.string,
    travel_management_email: t.string,
    phone: t.string,
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
    meta_data: t.partial({
      created_at: t.string,
      updated_at: t.string,
      created_by: t.string,
      updated_by: t.string
    }),
    cost_center_mandatory: t.boolean,
    fare_codes: t.partial({
      flight: t.partial({
        web: t.array(t.type({
          carrier_code: t.string,
          login_id: t.string,
          api_password: t.string
        })),
        sabre: t.array(t.intersection([
          t.type({
            pricing_code: t.string,
            carrier_code: t.string
          }),
          t.partial({
            carrier_code_osi: t.string,
            osi_text1: t.string,
            osi_text2: t.string,
            osi_text3: t.string,
            osi_text4: t.string
          })
        ])),
        farelogix: t.array(t.type({
          pricing_code: t.string
        }))
      }),
      hotel: t.partial({
        booking_com: t.type({
          affiliate_id: t.string
        }),
        hrs: t.type({
          customer_key: t.string,
          f_key: t.string
        })
      })
    }),
    policy_remarks: t.partial({
      flight: t.string,
      hotel: t.string,
      train: t.string,
      rental_car: t.string
    }),
    monthly_booking_volume: t.number
  })
])
const ACCOUNT = t.intersection([
  t.type({
    name: t.string,
    invoice_addresses: t.array(t.intersection([
      t.type({
        city: t.string,
        country: t.string,
        company_name: t.string,
        office_name: t.string,
        status: t.keyof({
          active: null,
          inactive: null
        }),
        invoice_overview_receivers: t.array(t.string),
        payment_method: t.keyof({
          credit_card: null,
          invoice: null,
          sepa: null,
          airplus: null
        }),
        billing_aggregation: t.keyof({
          individual: null,
          monthly: null,
          semimonthly: null
        })
      }),
      t.partial({
        street_1: t.string,
        street_2: t.string,
        label: t.string,
        zip_code: t.string,
        state: t.string,
        longitude: t.number,
        latitude: t.number,
        id: t.string,
        vat_id: t.string
      })
    ])),
    invoice_overview_receivers: t.array(t.string),
    language: t.keyof({
      de: null,
      en: null
    }),
    communication_settings: t.type({
      confirmation: t.keyof({
        booker: null,
        'traveler and booker': null
      }),
      invoice: t.keyof({
        booker: null,
        'traveler and booker': null,
        'finance only': null
      }),
      reminder: t.keyof({
        traveler: null,
        booker: null,
        'traveler and booker': null
      })
    }),
    currency: t.keyof({
      EUR: null
    }),
    status: t.keyof({
      unverified: null,
      trial: null,
      customer: null,
      inactive: null
    }),
    policies: t.array(t.intersection([
      t.type({
        id: t.string,
        name: t.string,
        default: t.boolean
      }),
      t.partial({
        meta_data: t.partial({
          created_at: t.string,
          updated_at: t.string,
          created_by: t.string,
          updated_by: t.string
        }),
        flight: t.partial({
          rules: t.type({
            cabin_class_rules: t.array(t.intersection([
              t.type({
                duration_from: t.number,
                cabin_class: t.keyof({
                  economy: null,
                  'economy plus': null,
                  business: null,
                  first: null
                })
              }),
              t.partial({
                duration_to: t.number,
                budget: t.number
              })
            ]))
          }),
          preferences: t.partial({
            preferred_airlines: t.array(t.string),
            avoided_airlines: t.array(t.string),
            luggage: t.boolean,
            rebookable: t.boolean,
            cancelable: t.boolean
          })
        }),
        hotel: t.partial({
          rules: t.intersection([
            t.type({
              country_budgets: t.array(t.type({
                country: t.string,
                budget: t.number
              }))
            }),
            t.partial({
              max_stars: t.number,
              default_budget: t.number
            })
          ]),
          preferences: t.partial({
            min_stars: t.number,
            includes_breakfast: t.boolean,
            includes_wifi: t.boolean,
            cancelable: t.boolean
          })
        }),
        rental_car: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              M: null,
              N: null,
              E: null,
              H: null,
              C: null,
              D: null,
              I: null,
              J: null,
              S: null,
              R: null,
              F: null,
              G: null,
              P: null,
              U: null,
              L: null,
              W: null,
              O: null,
              X: null
            }),
            budget: t.number
          }),
          preferences: t.intersection([
            t.type({
              preferred_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              })),
              avoided_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              }))
            }),
            t.partial({
              insurance: t.keyof({
                'yes with excess': null,
                'yes without excess': null
              }),
              navigation_system: t.boolean
            })
          ])
        }),
        train: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              '1': null,
              '2': null
            }),
            budget: t.number
          }),
          preferences: t.partial({
            seat_reservation_against_payment: t.boolean,
            flexible: t.boolean,
            cancelable: t.boolean
          })
        })
      })
    ])),
    credit_check_passed: t.boolean,
    _id: t.string,
    __v: t.number
  }),
  t.partial({
    finance_email: t.string,
    travel_management_email: t.string,
    phone: t.string,
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
    meta_data: t.partial({
      created_at: t.string,
      updated_at: t.string,
      created_by: t.string,
      updated_by: t.string
    }),
    cost_center_mandatory: t.boolean,
    fare_codes: t.partial({
      flight: t.partial({
        web: t.array(t.type({
          carrier_code: t.string,
          login_id: t.string,
          api_password: t.string
        })),
        sabre: t.array(t.intersection([
          t.type({
            pricing_code: t.string,
            carrier_code: t.string
          }),
          t.partial({
            carrier_code_osi: t.string,
            osi_text1: t.string,
            osi_text2: t.string,
            osi_text3: t.string,
            osi_text4: t.string
          })
        ])),
        farelogix: t.array(t.type({
          pricing_code: t.string
        }))
      }),
      hotel: t.partial({
        booking_com: t.type({
          affiliate_id: t.string
        }),
        hrs: t.type({
          customer_key: t.string,
          f_key: t.string
        })
      })
    }),
    policy_remarks: t.partial({
      flight: t.string,
      hotel: t.string,
      train: t.string,
      rental_car: t.string
    }),
    monthly_booking_volume: t.number
  })
])
const BASECOMPANY = t.intersection([
  t.type({
    name: t.string,
    invoice_addresses: t.array(t.intersection([
      t.type({
        city: t.string,
        country: t.string,
        company_name: t.string,
        office_name: t.string,
        status: t.keyof({
          active: null,
          inactive: null
        }),
        invoice_overview_receivers: t.array(t.string),
        payment_method: t.keyof({
          credit_card: null,
          invoice: null,
          sepa: null,
          airplus: null
        }),
        billing_aggregation: t.keyof({
          individual: null,
          monthly: null,
          semimonthly: null
        })
      }),
      t.partial({
        street_1: t.string,
        street_2: t.string,
        label: t.string,
        zip_code: t.string,
        state: t.string,
        longitude: t.number,
        latitude: t.number,
        id: t.string,
        vat_id: t.string
      })
    ])),
    invoice_overview_receivers: t.array(t.string),
    language: t.keyof({
      de: null,
      en: null
    }),
    communication_settings: t.type({
      confirmation: t.keyof({
        booker: null,
        'traveler and booker': null
      }),
      invoice: t.keyof({
        booker: null,
        'traveler and booker': null,
        'finance only': null
      }),
      reminder: t.keyof({
        traveler: null,
        booker: null,
        'traveler and booker': null
      })
    }),
    currency: t.keyof({
      EUR: null
    }),
    status: t.keyof({
      unverified: null,
      trial: null,
      customer: null,
      inactive: null
    }),
    policies: t.array(t.intersection([
      t.type({
        id: t.string,
        name: t.string,
        default: t.boolean
      }),
      t.partial({
        meta_data: t.partial({
          created_at: t.string,
          updated_at: t.string,
          created_by: t.string,
          updated_by: t.string
        }),
        flight: t.partial({
          rules: t.type({
            cabin_class_rules: t.array(t.intersection([
              t.type({
                duration_from: t.number,
                cabin_class: t.keyof({
                  economy: null,
                  'economy plus': null,
                  business: null,
                  first: null
                })
              }),
              t.partial({
                duration_to: t.number,
                budget: t.number
              })
            ]))
          }),
          preferences: t.partial({
            preferred_airlines: t.array(t.string),
            avoided_airlines: t.array(t.string),
            luggage: t.boolean,
            rebookable: t.boolean,
            cancelable: t.boolean
          })
        }),
        hotel: t.partial({
          rules: t.intersection([
            t.type({
              country_budgets: t.array(t.type({
                country: t.string,
                budget: t.number
              }))
            }),
            t.partial({
              max_stars: t.number,
              default_budget: t.number
            })
          ]),
          preferences: t.partial({
            min_stars: t.number,
            includes_breakfast: t.boolean,
            includes_wifi: t.boolean,
            cancelable: t.boolean
          })
        }),
        rental_car: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              M: null,
              N: null,
              E: null,
              H: null,
              C: null,
              D: null,
              I: null,
              J: null,
              S: null,
              R: null,
              F: null,
              G: null,
              P: null,
              U: null,
              L: null,
              W: null,
              O: null,
              X: null
            }),
            budget: t.number
          }),
          preferences: t.intersection([
            t.type({
              preferred_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              })),
              avoided_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              }))
            }),
            t.partial({
              insurance: t.keyof({
                'yes with excess': null,
                'yes without excess': null
              }),
              navigation_system: t.boolean
            })
          ])
        }),
        train: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              '1': null,
              '2': null
            }),
            budget: t.number
          }),
          preferences: t.partial({
            seat_reservation_against_payment: t.boolean,
            flexible: t.boolean,
            cancelable: t.boolean
          })
        })
      })
    ])),
    credit_check_passed: t.boolean
  }),
  t.partial({
    finance_email: t.string,
    travel_management_email: t.string,
    phone: t.string,
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
    meta_data: t.partial({
      created_at: t.string,
      updated_at: t.string,
      created_by: t.string,
      updated_by: t.string
    }),
    cost_center_mandatory: t.boolean,
    fare_codes: t.partial({
      flight: t.partial({
        web: t.array(t.type({
          carrier_code: t.string,
          login_id: t.string,
          api_password: t.string
        })),
        sabre: t.array(t.intersection([
          t.type({
            pricing_code: t.string,
            carrier_code: t.string
          }),
          t.partial({
            carrier_code_osi: t.string,
            osi_text1: t.string,
            osi_text2: t.string,
            osi_text3: t.string,
            osi_text4: t.string
          })
        ])),
        farelogix: t.array(t.type({
          pricing_code: t.string
        }))
      }),
      hotel: t.partial({
        booking_com: t.type({
          affiliate_id: t.string
        }),
        hrs: t.type({
          customer_key: t.string,
          f_key: t.string
        })
      })
    }),
    policy_remarks: t.partial({
      flight: t.string,
      hotel: t.string,
      train: t.string,
      rental_car: t.string
    }),
    monthly_booking_volume: t.number,
    pricing: t.partial({
      payment_fee: t.boolean,
      apply_booking_fee: t.boolean,
      booking_fee_data: t.type({
        booking_fees: t.type({
          flight: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            }))
          }),
          hotel: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          }),
          rental_car: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          }),
          train: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          })
        }),
        domestic_countries: t.array(t.string),
        continents: t.array(t.string)
      })
    }),
    integrations: t.partial({
      circula: t.partial({
        token: t.string
      })
    })
  })
])
const COMPANY = t.intersection([
  t.type({
    name: t.string,
    invoice_addresses: t.array(t.intersection([
      t.type({
        city: t.string,
        country: t.string,
        company_name: t.string,
        office_name: t.string,
        status: t.keyof({
          active: null,
          inactive: null
        }),
        invoice_overview_receivers: t.array(t.string),
        payment_method: t.keyof({
          credit_card: null,
          invoice: null,
          sepa: null,
          airplus: null
        }),
        billing_aggregation: t.keyof({
          individual: null,
          monthly: null,
          semimonthly: null
        })
      }),
      t.partial({
        street_1: t.string,
        street_2: t.string,
        label: t.string,
        zip_code: t.string,
        state: t.string,
        longitude: t.number,
        latitude: t.number,
        id: t.string,
        vat_id: t.string
      })
    ])),
    invoice_overview_receivers: t.array(t.string),
    language: t.keyof({
      de: null,
      en: null
    }),
    communication_settings: t.type({
      confirmation: t.keyof({
        booker: null,
        'traveler and booker': null
      }),
      invoice: t.keyof({
        booker: null,
        'traveler and booker': null,
        'finance only': null
      }),
      reminder: t.keyof({
        traveler: null,
        booker: null,
        'traveler and booker': null
      })
    }),
    currency: t.keyof({
      EUR: null
    }),
    status: t.keyof({
      unverified: null,
      trial: null,
      customer: null,
      inactive: null
    }),
    policies: t.array(t.intersection([
      t.type({
        id: t.string,
        name: t.string,
        default: t.boolean
      }),
      t.partial({
        meta_data: t.partial({
          created_at: t.string,
          updated_at: t.string,
          created_by: t.string,
          updated_by: t.string
        }),
        flight: t.partial({
          rules: t.type({
            cabin_class_rules: t.array(t.intersection([
              t.type({
                duration_from: t.number,
                cabin_class: t.keyof({
                  economy: null,
                  'economy plus': null,
                  business: null,
                  first: null
                })
              }),
              t.partial({
                duration_to: t.number,
                budget: t.number
              })
            ]))
          }),
          preferences: t.partial({
            preferred_airlines: t.array(t.string),
            avoided_airlines: t.array(t.string),
            luggage: t.boolean,
            rebookable: t.boolean,
            cancelable: t.boolean
          })
        }),
        hotel: t.partial({
          rules: t.intersection([
            t.type({
              country_budgets: t.array(t.type({
                country: t.string,
                budget: t.number
              }))
            }),
            t.partial({
              max_stars: t.number,
              default_budget: t.number
            })
          ]),
          preferences: t.partial({
            min_stars: t.number,
            includes_breakfast: t.boolean,
            includes_wifi: t.boolean,
            cancelable: t.boolean
          })
        }),
        rental_car: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              M: null,
              N: null,
              E: null,
              H: null,
              C: null,
              D: null,
              I: null,
              J: null,
              S: null,
              R: null,
              F: null,
              G: null,
              P: null,
              U: null,
              L: null,
              W: null,
              O: null,
              X: null
            }),
            budget: t.number
          }),
          preferences: t.intersection([
            t.type({
              preferred_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              })),
              avoided_vendors: t.array(t.keyof({
                Europcar: null,
                Enterprise: null,
                Hertz: null,
                Sixt: null
              }))
            }),
            t.partial({
              insurance: t.keyof({
                'yes with excess': null,
                'yes without excess': null
              }),
              navigation_system: t.boolean
            })
          ])
        }),
        train: t.partial({
          rules: t.partial({
            max_class: t.keyof({
              '1': null,
              '2': null
            }),
            budget: t.number
          }),
          preferences: t.partial({
            seat_reservation_against_payment: t.boolean,
            flexible: t.boolean,
            cancelable: t.boolean
          })
        })
      })
    ])),
    credit_check_passed: t.boolean,
    _id: t.string,
    __v: t.number
  }),
  t.partial({
    finance_email: t.string,
    travel_management_email: t.string,
    phone: t.string,
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
    meta_data: t.partial({
      created_at: t.string,
      updated_at: t.string,
      created_by: t.string,
      updated_by: t.string
    }),
    cost_center_mandatory: t.boolean,
    fare_codes: t.partial({
      flight: t.partial({
        web: t.array(t.type({
          carrier_code: t.string,
          login_id: t.string,
          api_password: t.string
        })),
        sabre: t.array(t.intersection([
          t.type({
            pricing_code: t.string,
            carrier_code: t.string
          }),
          t.partial({
            carrier_code_osi: t.string,
            osi_text1: t.string,
            osi_text2: t.string,
            osi_text3: t.string,
            osi_text4: t.string
          })
        ])),
        farelogix: t.array(t.type({
          pricing_code: t.string
        }))
      }),
      hotel: t.partial({
        booking_com: t.type({
          affiliate_id: t.string
        }),
        hrs: t.type({
          customer_key: t.string,
          f_key: t.string
        })
      })
    }),
    policy_remarks: t.partial({
      flight: t.string,
      hotel: t.string,
      train: t.string,
      rental_car: t.string
    }),
    monthly_booking_volume: t.number,
    pricing: t.partial({
      payment_fee: t.boolean,
      apply_booking_fee: t.boolean,
      booking_fee_data: t.type({
        booking_fees: t.type({
          flight: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              }),
              geography: t.keyof({
                domestic: null,
                continental: null,
                others: null
              })
            }))
          }),
          hotel: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          }),
          rental_car: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          }),
          train: t.type({
            booking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            rebooking: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            })),
            cancelation: t.array(t.type({
              value: t.number,
              comtravo_fee_source: t.keyof({
                online: null,
                offline: null
              })
            }))
          })
        }),
        domestic_countries: t.array(t.string),
        continents: t.array(t.string)
      })
    }),
    integrations: t.partial({
      circula: t.partial({
        token: t.string
      })
    })
  })
])
const BASETRAVELER = t.intersection([
  t.type({
    first_name: t.string,
    last_name: t.string,
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
    email: t.string,
    invoice_address_id: t.string,
    notification_settings: t.type({
      notification_receivers: t.array(t.string),
      when_to_send: t.keyof({
        never: null,
        only_out_of_policy: null,
        always: null
      })
    })
  }),
  t.partial({
    company: t.string,
    invoice_address_id: t.string,
    middle_name: t.string,
    email: t.string,
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
    identifications: t.array(t.intersection([
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
    ])),
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
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
    roles: t.array(t.keyof({
      admin: null,
      central_booker: null,
      traveler: null
    }))
  })
])
const TRAVELER = t.intersection([
  t.type({
    first_name: t.string,
    last_name: t.string,
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
    email: t.string,
    invoice_address_id: t.string,
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
    invoice_address_id: t.string,
    middle_name: t.string,
    email: t.string,
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
    identifications: t.array(t.intersection([
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
    ])),
    loyalty_cards: t.array(t.intersection([
      t.type({
        type: t.string
      }),
      t.partial({
        card_number: t.string,
        expires_at: t.string,
        pin: t.string,
        status: t.string
      })
    ])),
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
    roles: t.array(t.keyof({
      admin: null,
      central_booker: null,
      traveler: null
    }))
  })
])
const TRAVELERNAME = t.type({
  __v: t.number,
  _id: t.string,
  first_name: t.string,
  last_name: t.string
})
const PRICING = t.partial({
  payment_fee: t.boolean,
  apply_booking_fee: t.boolean,
  booking_fee_data: t.type({
    booking_fees: t.type({
      flight: t.type({
        booking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          }),
          geography: t.keyof({
            domestic: null,
            continental: null,
            others: null
          })
        })),
        rebooking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          }),
          geography: t.keyof({
            domestic: null,
            continental: null,
            others: null
          })
        })),
        cancelation: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          }),
          geography: t.keyof({
            domestic: null,
            continental: null,
            others: null
          })
        }))
      }),
      hotel: t.type({
        booking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        rebooking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        cancelation: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        }))
      }),
      rental_car: t.type({
        booking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        rebooking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        cancelation: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        }))
      }),
      train: t.type({
        booking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        rebooking: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        })),
        cancelation: t.array(t.type({
          value: t.number,
          comtravo_fee_source: t.keyof({
            online: null,
            offline: null
          })
        }))
      })
    }),
    domestic_countries: t.array(t.string),
    continents: t.array(t.string)
  })
})
const BOOKING_FEES = t.type({
  flight: t.type({
    booking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      }),
      geography: t.keyof({
        domestic: null,
        continental: null,
        others: null
      })
    })),
    rebooking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      }),
      geography: t.keyof({
        domestic: null,
        continental: null,
        others: null
      })
    })),
    cancelation: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      }),
      geography: t.keyof({
        domestic: null,
        continental: null,
        others: null
      })
    }))
  }),
  hotel: t.type({
    booking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    rebooking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    cancelation: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    }))
  }),
  rental_car: t.type({
    booking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    rebooking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    cancelation: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    }))
  }),
  train: t.type({
    booking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    rebooking: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    })),
    cancelation: t.array(t.type({
      value: t.number,
      comtravo_fee_source: t.keyof({
        online: null,
        offline: null
      })
    }))
  })
})
const INTEGRATIONS = t.partial({
  circula: t.partial({
    token: t.string
  })
})
const BOOKINGFEEFLIGHTCONFIGURATION = t.type({
  booking: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    }),
    geography: t.keyof({
      domestic: null,
      continental: null,
      others: null
    })
  })),
  rebooking: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    }),
    geography: t.keyof({
      domestic: null,
      continental: null,
      others: null
    })
  })),
  cancelation: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    }),
    geography: t.keyof({
      domestic: null,
      continental: null,
      others: null
    })
  }))
})
const BOOKINGFEECONFIGURATION = t.type({
  booking: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    })
  })),
  rebooking: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    })
  })),
  cancelation: t.array(t.type({
    value: t.number,
    comtravo_fee_source: t.keyof({
      online: null,
      offline: null
    })
  }))
})
const BOOKINGFEESTANDARD = t.type({
  value: t.number,
  comtravo_fee_source: t.keyof({
    online: null,
    offline: null
  })
})
const BOOKINGFEEGEOGRAPHYEXTENSION = t.type({
  value: t.number,
  comtravo_fee_source: t.keyof({
    online: null,
    offline: null
  }),
  geography: t.keyof({
    domestic: null,
    continental: null,
    others: null
  })
})
const COMMUNICATION_SETTINGS = t.type({
  confirmation: t.keyof({
    booker: null,
    'traveler and booker': null
  }),
  invoice: t.keyof({
    booker: null,
    'traveler and booker': null,
    'finance only': null
  }),
  reminder: t.keyof({
    traveler: null,
    booker: null,
    'traveler and booker': null
  })
})
const COLLECTIVEINVOICE = t.intersection([
  t.type({
    id: t.string,
    date_of_issue: t.string,
    company_id: t.string,
    invoice_address: t.intersection([
      t.type({
        city: t.string,
        country: t.string,
        company_name: t.string,
        office_name: t.string,
        status: t.keyof({
          active: null,
          inactive: null
        }),
        invoice_overview_receivers: t.array(t.string),
        payment_method: t.keyof({
          credit_card: null,
          invoice: null,
          sepa: null,
          airplus: null
        }),
        billing_aggregation: t.keyof({
          individual: null,
          monthly: null,
          semimonthly: null
        })
      }),
      t.partial({
        street_1: t.string,
        street_2: t.string,
        label: t.string,
        zip_code: t.string,
        state: t.string,
        longitude: t.number,
        latitude: t.number,
        id: t.string,
        vat_id: t.string
      })
    ]),
    invoice_start_date: t.string,
    invoice_end_date: t.string
  }),
  t.partial({
    document_id: t.string,
    invoice_number: t.string
  })
])
const COMPANY.GETCOMPANIESBYIDS.PARAMETERS = t.array(t.string)
const TRAVELER.GETTRAVELERSBYIDS.PARAMETERS = t.array(t.string)

interface LOYALTYCARDTYPE {
  card_type:
    (
    | 'traveler'
    | 'corporate'
    ),
  text: string,
  value: string,
  type?: string
}
interface BASEACCOUNT {
  name: string,
  invoice_addresses: Array<{
    street_1?: string,
    street_2?: string,
    label?: string,
    zip_code?: string,
    city: string,
    state?: string,
    country: string,
    longitude?: number,
    latitude?: number,
    id?: string,
    vat_id?: string,
    company_name: string,
    office_name: string,
    status:
      (
      | 'active'
      | 'inactive'
      ),
    invoice_overview_receivers: Array<string>,
    payment_method:
      (
      | 'credit_card'
      | 'invoice'
      | 'sepa'
      | 'airplus'
      ),
    billing_aggregation:
      (
      | 'individual'
      | 'monthly'
      | 'semimonthly'
      )
  }>,
  invoice_overview_receivers: Array<string>,
  finance_email?: string,
  travel_management_email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  communication_settings: {
    confirmation:
      (
      | 'booker'
      | 'traveler and booker'
      ),
    invoice:
      (
      | 'booker'
      | 'traveler and booker'
      | 'finance only'
      ),
    reminder:
      (
      | 'traveler'
      | 'booker'
      | 'traveler and booker'
      )
  },
  currency:
    (
    | 'EUR'
    ),
  status:
    (
    | 'unverified'
    | 'trial'
    | 'customer'
    | 'inactive'
    ),
  phone?: string,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  cost_center_mandatory?: boolean,
  fare_codes?: {
    flight?: {
      web?: Array<{
        carrier_code: string,
        login_id: string,
        api_password: string
      }>,
      sabre?: Array<{
        pricing_code: string,
        carrier_code: string,
        carrier_code_osi?: string,
        osi_text1?: string,
        osi_text2?: string,
        osi_text3?: string,
        osi_text4?: string
      }>,
      farelogix?: Array<{
        pricing_code: string
      }>
    },
    hotel?: {
      booking_com?: {
        affiliate_id: string
      },
      hrs?: {
        customer_key: string,
        f_key: string
      }
    }
  },
  policies: Array<{
    id: string,
    name: string,
    default: boolean,
    meta_data?: {
      created_at?: string,
      updated_at?: string,
      created_by?: string,
      updated_by?: string
    },
    flight?: {
      rules?: {
        cabin_class_rules: Array<{
          duration_from: number,
          duration_to?: number,
          cabin_class:
            (
            | 'economy'
            | 'economy plus'
            | 'business'
            | 'first'
            ),
          budget?: number
        }>
      },
      preferences?: {
        preferred_airlines?: Array<string>,
        avoided_airlines?: Array<string>,
        luggage?: boolean,
        rebookable?: boolean,
        cancelable?: boolean
      }
    },
    hotel?: {
      rules?: {
        max_stars?: number,
        default_budget?: number,
        country_budgets: Array<{
          country: string,
          budget: number
        }>
      },
      preferences?: {
        min_stars?: number,
        includes_breakfast?: boolean,
        includes_wifi?: boolean,
        cancelable?: boolean
      }
    },
    rental_car?: {
      rules?: {
        max_class?:
          (
          | 'M'
          | 'N'
          | 'E'
          | 'H'
          | 'C'
          | 'D'
          | 'I'
          | 'J'
          | 'S'
          | 'R'
          | 'F'
          | 'G'
          | 'P'
          | 'U'
          | 'L'
          | 'W'
          | 'O'
          | 'X'
          ),
        budget?: number
      },
      preferences?: {
        preferred_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        avoided_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        insurance?:
          (
          | 'yes with excess'
          | 'yes without excess'
          ),
        navigation_system?: boolean
      }
    },
    train?: {
      rules?: {
        max_class?:
          (
          | '1'
          | '2'
          ),
        budget?: number
      },
      preferences?: {
        seat_reservation_against_payment?: boolean,
        flexible?: boolean,
        cancelable?: boolean
      }
    }
  }>,
  policy_remarks?: {
    flight?: string,
    hotel?: string,
    train?: string,
    rental_car?: string
  },
  monthly_booking_volume?: number,
  credit_check_passed: boolean
}
interface ACCOUNT {
  name: string,
  invoice_addresses: Array<{
    street_1?: string,
    street_2?: string,
    label?: string,
    zip_code?: string,
    city: string,
    state?: string,
    country: string,
    longitude?: number,
    latitude?: number,
    id?: string,
    vat_id?: string,
    company_name: string,
    office_name: string,
    status:
      (
      | 'active'
      | 'inactive'
      ),
    invoice_overview_receivers: Array<string>,
    payment_method:
      (
      | 'credit_card'
      | 'invoice'
      | 'sepa'
      | 'airplus'
      ),
    billing_aggregation:
      (
      | 'individual'
      | 'monthly'
      | 'semimonthly'
      )
  }>,
  invoice_overview_receivers: Array<string>,
  finance_email?: string,
  travel_management_email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  communication_settings: {
    confirmation:
      (
      | 'booker'
      | 'traveler and booker'
      ),
    invoice:
      (
      | 'booker'
      | 'traveler and booker'
      | 'finance only'
      ),
    reminder:
      (
      | 'traveler'
      | 'booker'
      | 'traveler and booker'
      )
  },
  currency:
    (
    | 'EUR'
    ),
  status:
    (
    | 'unverified'
    | 'trial'
    | 'customer'
    | 'inactive'
    ),
  phone?: string,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  cost_center_mandatory?: boolean,
  fare_codes?: {
    flight?: {
      web?: Array<{
        carrier_code: string,
        login_id: string,
        api_password: string
      }>,
      sabre?: Array<{
        pricing_code: string,
        carrier_code: string,
        carrier_code_osi?: string,
        osi_text1?: string,
        osi_text2?: string,
        osi_text3?: string,
        osi_text4?: string
      }>,
      farelogix?: Array<{
        pricing_code: string
      }>
    },
    hotel?: {
      booking_com?: {
        affiliate_id: string
      },
      hrs?: {
        customer_key: string,
        f_key: string
      }
    }
  },
  policies: Array<{
    id: string,
    name: string,
    default: boolean,
    meta_data?: {
      created_at?: string,
      updated_at?: string,
      created_by?: string,
      updated_by?: string
    },
    flight?: {
      rules?: {
        cabin_class_rules: Array<{
          duration_from: number,
          duration_to?: number,
          cabin_class:
            (
            | 'economy'
            | 'economy plus'
            | 'business'
            | 'first'
            ),
          budget?: number
        }>
      },
      preferences?: {
        preferred_airlines?: Array<string>,
        avoided_airlines?: Array<string>,
        luggage?: boolean,
        rebookable?: boolean,
        cancelable?: boolean
      }
    },
    hotel?: {
      rules?: {
        max_stars?: number,
        default_budget?: number,
        country_budgets: Array<{
          country: string,
          budget: number
        }>
      },
      preferences?: {
        min_stars?: number,
        includes_breakfast?: boolean,
        includes_wifi?: boolean,
        cancelable?: boolean
      }
    },
    rental_car?: {
      rules?: {
        max_class?:
          (
          | 'M'
          | 'N'
          | 'E'
          | 'H'
          | 'C'
          | 'D'
          | 'I'
          | 'J'
          | 'S'
          | 'R'
          | 'F'
          | 'G'
          | 'P'
          | 'U'
          | 'L'
          | 'W'
          | 'O'
          | 'X'
          ),
        budget?: number
      },
      preferences?: {
        preferred_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        avoided_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        insurance?:
          (
          | 'yes with excess'
          | 'yes without excess'
          ),
        navigation_system?: boolean
      }
    },
    train?: {
      rules?: {
        max_class?:
          (
          | '1'
          | '2'
          ),
        budget?: number
      },
      preferences?: {
        seat_reservation_against_payment?: boolean,
        flexible?: boolean,
        cancelable?: boolean
      }
    }
  }>,
  policy_remarks?: {
    flight?: string,
    hotel?: string,
    train?: string,
    rental_car?: string
  },
  monthly_booking_volume?: number,
  credit_check_passed: boolean,
  _id: string,
  __v: number
}
interface BASECOMPANY {
  name: string,
  invoice_addresses: Array<{
    street_1?: string,
    street_2?: string,
    label?: string,
    zip_code?: string,
    city: string,
    state?: string,
    country: string,
    longitude?: number,
    latitude?: number,
    id?: string,
    vat_id?: string,
    company_name: string,
    office_name: string,
    status:
      (
      | 'active'
      | 'inactive'
      ),
    invoice_overview_receivers: Array<string>,
    payment_method:
      (
      | 'credit_card'
      | 'invoice'
      | 'sepa'
      | 'airplus'
      ),
    billing_aggregation:
      (
      | 'individual'
      | 'monthly'
      | 'semimonthly'
      )
  }>,
  invoice_overview_receivers: Array<string>,
  finance_email?: string,
  travel_management_email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  communication_settings: {
    confirmation:
      (
      | 'booker'
      | 'traveler and booker'
      ),
    invoice:
      (
      | 'booker'
      | 'traveler and booker'
      | 'finance only'
      ),
    reminder:
      (
      | 'traveler'
      | 'booker'
      | 'traveler and booker'
      )
  },
  currency:
    (
    | 'EUR'
    ),
  status:
    (
    | 'unverified'
    | 'trial'
    | 'customer'
    | 'inactive'
    ),
  phone?: string,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  cost_center_mandatory?: boolean,
  fare_codes?: {
    flight?: {
      web?: Array<{
        carrier_code: string,
        login_id: string,
        api_password: string
      }>,
      sabre?: Array<{
        pricing_code: string,
        carrier_code: string,
        carrier_code_osi?: string,
        osi_text1?: string,
        osi_text2?: string,
        osi_text3?: string,
        osi_text4?: string
      }>,
      farelogix?: Array<{
        pricing_code: string
      }>
    },
    hotel?: {
      booking_com?: {
        affiliate_id: string
      },
      hrs?: {
        customer_key: string,
        f_key: string
      }
    }
  },
  policies: Array<{
    id: string,
    name: string,
    default: boolean,
    meta_data?: {
      created_at?: string,
      updated_at?: string,
      created_by?: string,
      updated_by?: string
    },
    flight?: {
      rules?: {
        cabin_class_rules: Array<{
          duration_from: number,
          duration_to?: number,
          cabin_class:
            (
            | 'economy'
            | 'economy plus'
            | 'business'
            | 'first'
            ),
          budget?: number
        }>
      },
      preferences?: {
        preferred_airlines?: Array<string>,
        avoided_airlines?: Array<string>,
        luggage?: boolean,
        rebookable?: boolean,
        cancelable?: boolean
      }
    },
    hotel?: {
      rules?: {
        max_stars?: number,
        default_budget?: number,
        country_budgets: Array<{
          country: string,
          budget: number
        }>
      },
      preferences?: {
        min_stars?: number,
        includes_breakfast?: boolean,
        includes_wifi?: boolean,
        cancelable?: boolean
      }
    },
    rental_car?: {
      rules?: {
        max_class?:
          (
          | 'M'
          | 'N'
          | 'E'
          | 'H'
          | 'C'
          | 'D'
          | 'I'
          | 'J'
          | 'S'
          | 'R'
          | 'F'
          | 'G'
          | 'P'
          | 'U'
          | 'L'
          | 'W'
          | 'O'
          | 'X'
          ),
        budget?: number
      },
      preferences?: {
        preferred_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        avoided_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        insurance?:
          (
          | 'yes with excess'
          | 'yes without excess'
          ),
        navigation_system?: boolean
      }
    },
    train?: {
      rules?: {
        max_class?:
          (
          | '1'
          | '2'
          ),
        budget?: number
      },
      preferences?: {
        seat_reservation_against_payment?: boolean,
        flexible?: boolean,
        cancelable?: boolean
      }
    }
  }>,
  policy_remarks?: {
    flight?: string,
    hotel?: string,
    train?: string,
    rental_car?: string
  },
  monthly_booking_volume?: number,
  credit_check_passed: boolean,
  pricing?: {
    payment_fee?: boolean,
    apply_booking_fee?: boolean,
    booking_fee_data?: {
      booking_fees: {
        flight: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>
        },
        hotel: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        },
        rental_car: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        },
        train: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        }
      },
      domestic_countries: Array<string>,
      continents: Array<string>
    }
  },
  integrations?: {
    circula?: {
      token?: string
    }
  }
}
interface COMPANY {
  name: string,
  invoice_addresses: Array<{
    street_1?: string,
    street_2?: string,
    label?: string,
    zip_code?: string,
    city: string,
    state?: string,
    country: string,
    longitude?: number,
    latitude?: number,
    id?: string,
    vat_id?: string,
    company_name: string,
    office_name: string,
    status:
      (
      | 'active'
      | 'inactive'
      ),
    invoice_overview_receivers: Array<string>,
    payment_method:
      (
      | 'credit_card'
      | 'invoice'
      | 'sepa'
      | 'airplus'
      ),
    billing_aggregation:
      (
      | 'individual'
      | 'monthly'
      | 'semimonthly'
      )
  }>,
  invoice_overview_receivers: Array<string>,
  finance_email?: string,
  travel_management_email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  communication_settings: {
    confirmation:
      (
      | 'booker'
      | 'traveler and booker'
      ),
    invoice:
      (
      | 'booker'
      | 'traveler and booker'
      | 'finance only'
      ),
    reminder:
      (
      | 'traveler'
      | 'booker'
      | 'traveler and booker'
      )
  },
  currency:
    (
    | 'EUR'
    ),
  status:
    (
    | 'unverified'
    | 'trial'
    | 'customer'
    | 'inactive'
    ),
  phone?: string,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  cost_center_mandatory?: boolean,
  fare_codes?: {
    flight?: {
      web?: Array<{
        carrier_code: string,
        login_id: string,
        api_password: string
      }>,
      sabre?: Array<{
        pricing_code: string,
        carrier_code: string,
        carrier_code_osi?: string,
        osi_text1?: string,
        osi_text2?: string,
        osi_text3?: string,
        osi_text4?: string
      }>,
      farelogix?: Array<{
        pricing_code: string
      }>
    },
    hotel?: {
      booking_com?: {
        affiliate_id: string
      },
      hrs?: {
        customer_key: string,
        f_key: string
      }
    }
  },
  policies: Array<{
    id: string,
    name: string,
    default: boolean,
    meta_data?: {
      created_at?: string,
      updated_at?: string,
      created_by?: string,
      updated_by?: string
    },
    flight?: {
      rules?: {
        cabin_class_rules: Array<{
          duration_from: number,
          duration_to?: number,
          cabin_class:
            (
            | 'economy'
            | 'economy plus'
            | 'business'
            | 'first'
            ),
          budget?: number
        }>
      },
      preferences?: {
        preferred_airlines?: Array<string>,
        avoided_airlines?: Array<string>,
        luggage?: boolean,
        rebookable?: boolean,
        cancelable?: boolean
      }
    },
    hotel?: {
      rules?: {
        max_stars?: number,
        default_budget?: number,
        country_budgets: Array<{
          country: string,
          budget: number
        }>
      },
      preferences?: {
        min_stars?: number,
        includes_breakfast?: boolean,
        includes_wifi?: boolean,
        cancelable?: boolean
      }
    },
    rental_car?: {
      rules?: {
        max_class?:
          (
          | 'M'
          | 'N'
          | 'E'
          | 'H'
          | 'C'
          | 'D'
          | 'I'
          | 'J'
          | 'S'
          | 'R'
          | 'F'
          | 'G'
          | 'P'
          | 'U'
          | 'L'
          | 'W'
          | 'O'
          | 'X'
          ),
        budget?: number
      },
      preferences?: {
        preferred_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        avoided_vendors: Array<
          (
          | 'Europcar'
          | 'Enterprise'
          | 'Hertz'
          | 'Sixt'
          )>,
        insurance?:
          (
          | 'yes with excess'
          | 'yes without excess'
          ),
        navigation_system?: boolean
      }
    },
    train?: {
      rules?: {
        max_class?:
          (
          | '1'
          | '2'
          ),
        budget?: number
      },
      preferences?: {
        seat_reservation_against_payment?: boolean,
        flexible?: boolean,
        cancelable?: boolean
      }
    }
  }>,
  policy_remarks?: {
    flight?: string,
    hotel?: string,
    train?: string,
    rental_car?: string
  },
  monthly_booking_volume?: number,
  credit_check_passed: boolean,
  pricing?: {
    payment_fee?: boolean,
    apply_booking_fee?: boolean,
    booking_fee_data?: {
      booking_fees: {
        flight: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              ),
            geography:
              (
              | 'domestic'
              | 'continental'
              | 'others'
              )
          }>
        },
        hotel: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        },
        rental_car: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        },
        train: {
          booking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          rebooking: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>,
          cancelation: Array<{
            value: number,
            comtravo_fee_source:
              (
              | 'online'
              | 'offline'
              )
          }>
        }
      },
      domestic_countries: Array<string>,
      continents: Array<string>
    }
  },
  integrations?: {
    circula?: {
      token?: string
    }
  },
  _id: string,
  __v: number
}
interface BASETRAVELER {
  company?: string,
  invoice_address_id?: string,
  first_name: string,
  middle_name?: string,
  last_name: string,
  email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  title:
    (
    | 'Mr'
    | 'Mrs'
    ),
  nationality?: string,
  gender:
    (
    | 'm'
    | 'f'
    ),
  birthday?: string,
  contact?: {
    phone?: string,
    address?: {
      street_1?: string,
      street_2?: string,
      label?: string,
      zip_code?: string,
      city: string,
      state?: string,
      country: string,
      longitude?: number,
      latitude?: number
    },
    managed?: boolean,
    newsletter_subscribed?: boolean
  },
  identifications?: Array<{
    type:
      (
      | 'passport'
      | 'id_card'
      | 'drivers_license'
      | 'global_entry_ktn'
      ),
    issuing_country: string,
    card_number: string,
    expires_at?: string,
    issued_at?: string
  }>,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  client_cost_center_1?: string,
  client_cost_center_2?: string,
  client_cost_center_3?: string,
  preference?: {
    airplane?: {
      seat?:
        (
        | 'window'
        | 'aisle'
        ),
      section?:
        (
        | 'front'
        | 'back'
        ),
      description?: string
    },
    train?: {
      reservation?: boolean,
      class?: string,
      section?:
        (
        | 'open_saloon'
        | 'open_saloon_with_table'
        | 'compartment'
        ),
      seat?:
        (
        | 'window'
        | 'aisle'
        ),
      zone?:
        (
        | 'phone_zone'
        | 'quiet_zone'
        )
    }
  },
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  policy_id?: string,
  email: string,
  invoice_address_id: string,
  notification_settings: {
    notification_receivers: Array<string>,
    when_to_send:
      (
      | 'never'
      | 'only_out_of_policy'
      | 'always'
      )
  },
  roles?: Array<
    (
    | 'admin'
    | 'central_booker'
    | 'traveler'
    )>
}
interface TRAVELER {
  company?: string,
  invoice_address_id?: string,
  first_name: string,
  middle_name?: string,
  last_name: string,
  email?: string,
  language:
    (
    | 'de'
    | 'en'
    ),
  title:
    (
    | 'Mr'
    | 'Mrs'
    ),
  nationality?: string,
  gender:
    (
    | 'm'
    | 'f'
    ),
  birthday?: string,
  contact?: {
    phone?: string,
    address?: {
      street_1?: string,
      street_2?: string,
      label?: string,
      zip_code?: string,
      city: string,
      state?: string,
      country: string,
      longitude?: number,
      latitude?: number
    },
    managed?: boolean,
    newsletter_subscribed?: boolean
  },
  identifications?: Array<{
    type:
      (
      | 'passport'
      | 'id_card'
      | 'drivers_license'
      | 'global_entry_ktn'
      ),
    issuing_country: string,
    card_number: string,
    expires_at?: string,
    issued_at?: string
  }>,
  loyalty_cards?: Array<{
    type: string,
    card_number?: string,
    expires_at?: string,
    pin?: string,
    status?: string
  }>,
  client_cost_center_1?: string,
  client_cost_center_2?: string,
  client_cost_center_3?: string,
  preference?: {
    airplane?: {
      seat?:
        (
        | 'window'
        | 'aisle'
        ),
      section?:
        (
        | 'front'
        | 'back'
        ),
      description?: string
    },
    train?: {
      reservation?: boolean,
      class?: string,
      section?:
        (
        | 'open_saloon'
        | 'open_saloon_with_table'
        | 'compartment'
        ),
      seat?:
        (
        | 'window'
        | 'aisle'
        ),
      zone?:
        (
        | 'phone_zone'
        | 'quiet_zone'
        )
    }
  },
  meta_data?: {
    created_at?: string,
    updated_at?: string,
    created_by?: string,
    updated_by?: string
  },
  policy_id?: string,
  email: string,
  invoice_address_id: string,
  notification_settings: {
    notification_receivers: Array<string>,
    when_to_send:
      (
      | 'never'
      | 'only_out_of_policy'
      | 'always'
      )
  },
  roles?: Array<
    (
    | 'admin'
    | 'central_booker'
    | 'traveler'
    )>,
  _id: string,
  __v: number
}
interface TRAVELERNAME {
  __v: number,
  _id: string,
  first_name: string,
  last_name: string
}
interface PRICING {
  payment_fee?: boolean,
  apply_booking_fee?: boolean,
  booking_fee_data?: {
    booking_fees: {
      flight: {
        booking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            ),
          geography:
            (
            | 'domestic'
            | 'continental'
            | 'others'
            )
        }>,
        rebooking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            ),
          geography:
            (
            | 'domestic'
            | 'continental'
            | 'others'
            )
        }>,
        cancelation: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            ),
          geography:
            (
            | 'domestic'
            | 'continental'
            | 'others'
            )
        }>
      },
      hotel: {
        booking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        rebooking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        cancelation: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>
      },
      rental_car: {
        booking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        rebooking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        cancelation: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>
      },
      train: {
        booking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        rebooking: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>,
        cancelation: Array<{
          value: number,
          comtravo_fee_source:
            (
            | 'online'
            | 'offline'
            )
        }>
      }
    },
    domestic_countries: Array<string>,
    continents: Array<string>
  }
}
interface BOOKING_FEES {
  flight: {
    booking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        ),
      geography:
        (
        | 'domestic'
        | 'continental'
        | 'others'
        )
    }>,
    rebooking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        ),
      geography:
        (
        | 'domestic'
        | 'continental'
        | 'others'
        )
    }>,
    cancelation: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        ),
      geography:
        (
        | 'domestic'
        | 'continental'
        | 'others'
        )
    }>
  },
  hotel: {
    booking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    rebooking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    cancelation: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>
  },
  rental_car: {
    booking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    rebooking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    cancelation: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>
  },
  train: {
    booking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    rebooking: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>,
    cancelation: Array<{
      value: number,
      comtravo_fee_source:
        (
        | 'online'
        | 'offline'
        )
    }>
  }
}
interface INTEGRATIONS {
  circula?: {
    token?: string
  }
}
interface BOOKINGFEEFLIGHTCONFIGURATION {
  booking: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      ),
    geography:
      (
      | 'domestic'
      | 'continental'
      | 'others'
      )
  }>,
  rebooking: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      ),
    geography:
      (
      | 'domestic'
      | 'continental'
      | 'others'
      )
  }>,
  cancelation: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      ),
    geography:
      (
      | 'domestic'
      | 'continental'
      | 'others'
      )
  }>
}
interface BOOKINGFEECONFIGURATION {
  booking: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      )
  }>,
  rebooking: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      )
  }>,
  cancelation: Array<{
    value: number,
    comtravo_fee_source:
      (
      | 'online'
      | 'offline'
      )
  }>
}
interface BOOKINGFEESTANDARD {
  value: number,
  comtravo_fee_source:
    (
    | 'online'
    | 'offline'
    )
}
interface BOOKINGFEEGEOGRAPHYEXTENSION {
  value: number,
  comtravo_fee_source:
    (
    | 'online'
    | 'offline'
    ),
  geography:
    (
    | 'domestic'
    | 'continental'
    | 'others'
    )
}
interface COMMUNICATION_SETTINGS {
  confirmation:
    (
    | 'booker'
    | 'traveler and booker'
    ),
  invoice:
    (
    | 'booker'
    | 'traveler and booker'
    | 'finance only'
    ),
  reminder:
    (
    | 'traveler'
    | 'booker'
    | 'traveler and booker'
    )
}
interface COLLECTIVEINVOICE {
  id: string,
  date_of_issue: string,
  company_id: string,
  invoice_address: {
    street_1?: string,
    street_2?: string,
    label?: string,
    zip_code?: string,
    city: string,
    state?: string,
    country: string,
    longitude?: number,
    latitude?: number,
    id?: string,
    vat_id?: string,
    company_name: string,
    office_name: string,
    status:
      (
      | 'active'
      | 'inactive'
      ),
    invoice_overview_receivers: Array<string>,
    payment_method:
      (
      | 'credit_card'
      | 'invoice'
      | 'sepa'
      | 'airplus'
      ),
    billing_aggregation:
      (
      | 'individual'
      | 'monthly'
      | 'semimonthly'
      )
  },
  document_id?: string,
  invoice_start_date: string,
  invoice_end_date: string,
  invoice_number?: string
}
type COMPANY.GETCOMPANIESBYIDS.PARAMETERS = Array<string>
type TRAVELER.GETTRAVELERSBYIDS.PARAMETERS = Array<string>
