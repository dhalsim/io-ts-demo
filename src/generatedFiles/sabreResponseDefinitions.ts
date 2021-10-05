
import * as t from 'io-ts';

export const groupedItineraryResponse = t.type({
  version: t.string,
  messages: t.array(t.type({
    severity: t.string,
    type: t.string,
    code: t.string,
    text: t.string
  })),
  statistics: t.type({
    itineraryCount: t.number
  }),
  scheduleDescs: t.array(t.type({
    id: t.number,
    frequency: t.string,
    stopCount: t.number,
    eTicketable: t.boolean,
    totalMilesFlown: t.number,
    elapsedTime: t.number,
    departure: t.type({
      airport: t.string,
      city: t.string,
      country: t.string,
      time: t.string,
      terminal: t.string
    }),
    arrival: t.type({
      airport: t.string,
      city: t.string,
      country: t.string,
      time: t.string,
      terminal: t.string
    }),
    carrier: t.type({
      marketing: t.string,
      marketingFlightNumber: t.number,
      operating: t.string,
      operatingFlightNumber: t.number,
      equipment: t.type({
        code: t.string,
        typeForFirstLeg: t.string,
        typeForLastLeg: t.string
      })
    })
  })),
  taxDescs: t.array(t.type({
    id: t.number,
    code: t.string,
    amount: t.number,
    currency: t.string,
    description: t.string,
    publishedAmount: t.number,
    publishedCurrency: t.string,
    station: t.string,
    country: t.string
  })),
  taxSummaryDescs: t.array(t.type({
    id: t.number,
    code: t.string,
    amount: t.number,
    currency: t.string,
    description: t.string
  })),
  obFeeDescs: t.array(t.type({
    id: t.number,
    amount: t.number,
    currency: t.string
  })),
  fareComponentDescs: t.array(t.type({
    id: t.number,
    governingCarrier: t.string,
    fareAmount: t.number,
    fareCurrency: t.string,
    fareBasisCode: t.string,
    farePassengerType: t.string,
    directionality: t.string,
    applicablePricingCategories: t.string,
    vendorCode: t.string,
    fareTypeBitmap: t.string,
    fareType: t.string,
    fareTariff: t.string,
    fareRule: t.string,
    cabinCode: t.string,
    segments: t.array(t.type({
      segment: t.type({

      })
    }))
  })),
  validatingCarrierDescs: t.array(t.type({
    id: t.number,
    settlementMethod: t.string,
    newVcxProcess: t.boolean,
    default: t.type({
      code: t.string
    }),
    alternates: t.array(t.type({
      code: t.string
    }))
  })),
  baggageAllowanceDescs: t.array(t.type({
    id: t.number,
    pieceCount: t.number
  })),
  legDescs: t.array(t.type({
    id: t.number,
    elapsedTime: t.number,
    schedules: t.array(t.type({
      ref: t.number
    }))
  })),
  itineraryGroups: t.array(t.type({
    groupDescription: t.type({
      legDescriptions: t.array(t.type({
        departureDate: t.string,
        departureLocation: t.string,
        arrivalLocation: t.string
      }))
    }),
    itineraries: t.array(t.type({
      id: t.number,
      pricingSource: t.string,
      legs: t.array(t.type({
        ref: t.number
      })),
      pricingInformation: t.array(t.type({
        pricingSubsource: t.string,
        fare: t.type({
          validatingCarrierCode: t.string,
          vita: t.boolean,
          eTicketable: t.boolean,
          lastTicketDate: t.string,
          lastTicketTime: t.string,
          governingCarriers: t.string,
          passengerInfoList: t.array(t.type({
            passengerInfo: t.type({
              passengerType: t.string,
              passengerNumber: t.number,
              nonRefundable: t.boolean,
              fareComponents: t.array(t.type({
                ref: t.number,
                segments: t.array(t.type({
                  segment: t.type({
                    bookingCode: t.string,
                    cabinCode: t.string,
                    mealCode: t.string,
                    seatsAvailable: t.number
                  })
                }))
              })),
              taxes: t.array(t.type({
                ref: t.number
              })),
              taxSummaries: t.array(t.type({
                ref: t.number
              })),
              obFees: t.array(t.type({
                ref: t.number
              })),
              currencyConversion: t.type({
                from: t.string,
                to: t.string,
                exchangeRateUsed: t.number
              }),
              passengerTotalFare: t.type({
                totalFare: t.number,
                totalTaxAmount: t.number,
                currency: t.string,
                baseFareAmount: t.number,
                baseFareCurrency: t.string,
                equivalentAmount: t.number,
                equivalentCurrency: t.string,
                constructionAmount: t.number,
                constructionCurrency: t.string
              }),
              baggageInformation: t.array(t.type({
                provisionType: t.string,
                airlineCode: t.string,
                segments: t.array(t.type({
                  id: t.number
                })),
                allowance: t.type({
                  ref: t.number
                })
              })),
              penaltiesInfo: t.type({
                penalties: t.array(t.type({
                  type: t.string,
                  applicability: t.string,
                  refundable: t.boolean
                }))
              })
            })
          })),
          totalFare: t.type({
            totalPrice: t.number,
            totalTaxAmount: t.number,
            currency: t.string,
            baseFareAmount: t.number,
            baseFareCurrency: t.string,
            constructionAmount: t.number,
            constructionCurrency: t.string,
            equivalentAmount: t.number,
            equivalentCurrency: t.string
          }),
          validatingCarriers: t.array(t.type({
            ref: t.number
          }))
        })
      })),
      diversitySwapper: t.type({
        weighedPrice: t.number
      })
    }))
  }))
})

const sabreSearchResponse = t.type({
  groupedItineraryResponse: groupedItineraryResponse
})

interface GroupedItineraryResponse {
  version: string,
  messages: Array<{
    severity: string,
    type: string,
    code: string,
    text: string
  }>,
  statistics: {
    itineraryCount: number
  },
  scheduleDescs: Array<{
    id: number,
    frequency: string,
    stopCount: number,
    eTicketable: boolean,
    totalMilesFlown: number,
    elapsedTime: number,
    departure: {
      airport: string,
      city: string,
      country: string,
      time: string,
      terminal: string
    },
    arrival: {
      airport: string,
      city: string,
      country: string,
      time: string,
      terminal: string
    },
    carrier: {
      marketing: string,
      marketingFlightNumber: number,
      operating: string,
      operatingFlightNumber: number,
      equipment: {
        code: string,
        typeForFirstLeg: string,
        typeForLastLeg: string
      }
    }
  }>,
  taxDescs: Array<{
    id: number,
    code: string,
    amount: number,
    currency: string,
    description: string,
    publishedAmount: number,
    publishedCurrency: string,
    station: string,
    country: string
  }>,
  taxSummaryDescs: Array<{
    id: number,
    code: string,
    amount: number,
    currency: string,
    description: string
  }>,
  obFeeDescs: Array<{
    id: number,
    amount: number,
    currency: string
  }>,
  fareComponentDescs: Array<{
    id: number,
    governingCarrier: string,
    fareAmount: number,
    fareCurrency: string,
    fareBasisCode: string,
    farePassengerType: string,
    directionality: string,
    applicablePricingCategories: string,
    vendorCode: string,
    fareTypeBitmap: string,
    fareType: string,
    fareTariff: string,
    fareRule: string,
    cabinCode: string,
    segments: Array<{
      segment: {

      }
    }>
  }>,
  validatingCarrierDescs: Array<{
    id: number,
    settlementMethod: string,
    newVcxProcess: boolean,
    default: {
      code: string
    },
    alternates: Array<{
      code: string
    }>
  }>,
  baggageAllowanceDescs: Array<{
    id: number,
    pieceCount: number
  }>,
  legDescs: Array<{
    id: number,
    elapsedTime: number,
    schedules: Array<{
      ref: number
    }>
  }>,
  itineraryGroups: Array<{
    groupDescription: {
      legDescriptions: Array<{
        departureDate: string,
        departureLocation: string,
        arrivalLocation: string
      }>
    },
    itineraries: Array<{
      id: number,
      pricingSource: string,
      legs: Array<{
        ref: number
      }>,
      pricingInformation: Array<{
        pricingSubsource: string,
        fare: {
          validatingCarrierCode: string,
          vita: boolean,
          eTicketable: boolean,
          lastTicketDate: string,
          lastTicketTime: string,
          governingCarriers: string,
          passengerInfoList: Array<{
            passengerInfo: {
              passengerType: string,
              passengerNumber: number,
              nonRefundable: boolean,
              fareComponents: Array<{
                ref: number,
                segments: Array<{
                  segment: {
                    bookingCode: string,
                    cabinCode: string,
                    mealCode: string,
                    seatsAvailable: number
                  }
                }>
              }>,
              taxes: Array<{
                ref: number
              }>,
              taxSummaries: Array<{
                ref: number
              }>,
              obFees: Array<{
                ref: number
              }>,
              currencyConversion: {
                from: string,
                to: string,
                exchangeRateUsed: number
              },
              passengerTotalFare: {
                totalFare: number,
                totalTaxAmount: number,
                currency: string,
                baseFareAmount: number,
                baseFareCurrency: string,
                equivalentAmount: number,
                equivalentCurrency: string,
                constructionAmount: number,
                constructionCurrency: string
              },
              baggageInformation: Array<{
                provisionType: string,
                airlineCode: string,
                segments: Array<{
                  id: number
                }>,
                allowance: {
                  ref: number
                }
              }>,
              penaltiesInfo: {
                penalties: Array<{
                  type: string,
                  applicability: string,
                  refundable: boolean
                }>
              }
            }
          }>,
          totalFare: {
            totalPrice: number,
            totalTaxAmount: number,
            currency: string,
            baseFareAmount: number,
            baseFareCurrency: string,
            constructionAmount: number,
            constructionCurrency: string,
            equivalentAmount: number,
            equivalentCurrency: string
          },
          validatingCarriers: Array<{
            ref: number
          }>
        }
      }>,
      diversitySwapper: {
        weighedPrice: number
      }
    }>
  }>
}

export interface SabreSearchResponse {
  groupedItineraryResponse: GroupedItineraryResponse
}
  