import * as mt from './types';

export const log =
  (index: number = 0) =>
  (e: any) => {
    if (index >= 1) {
      console.log(index, JSON.stringify(e, null, 2));
    }

    return e;
  };

export const getUnderlyingTypeAndName = (
  params: mt.AllTypes
): { tag: mt.PRIMITIVE_TYPES; name: string } => {
  switch (params._tag) {
    case 'StringType':
    case 'BigIntType':
    case 'NumberType':
    case 'BooleanType':
      return { tag: params._tag, name: params.name };
    case 'PartialType':
    case 'InterfaceType':
      throw new Error('I do not know what to do');
    case 'IntersectionType': {
      return getUnderlyingTypeAndName(params.types[0]);
    }
    case 'RefinementType': {
      return { tag: params.type._tag, name: params.type.name };
    }
    default:
      log(100)(params);
      throw new Error(`${params._tag} not found`);
  }
};

export const convertInterfaceType = (
  it: mt.InterfaceType
): mt.InterfaceType => {
  const r = (e: [string, mt.AllTypes][]) =>
    e.reduce((acc, [p1, p2]) => ({ [p1]: p2, ...acc }), {});
  const entries = Object.entries(it.props);
  const convertedProps = r(
    entries.map(([propName, prop]) => {
      const { tag, name } = getUnderlyingTypeAndName(prop);

      return [propName, { ...prop, _tag: tag, name }];
    })
  );

  return {
    ...it,
    props: convertedProps
  };
};

export const getUnderlyingContext = (
  params: mt.AllTypes
): (mt.PrimitiveType | mt.InterfaceType | mt.PartialType)[] => {
  switch (params._tag) {
    case 'StringType':
    case 'BigIntType':
    case 'NumberType':
    case 'BooleanType':
    case 'PartialType':
      return [params];
    case 'InterfaceType': {
      return [convertInterfaceType(params)];
    }
    case 'IntersectionType': {
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

export const getProperties = (iots: mt.AllTypes) => {
  return getUnderlyingContext(iots)
    .filter(mt.isComplexType)
    .flatMap((c) =>
      Object.entries(c.props).map(([propName, context]) => {
        return {
          [propName]: {
            type: context.name,
            description: context._desc
          }
        };
      })
    );
};

export const getRequired = (iots: mt.AllTypes): string[] => {
  return getUnderlyingContext(iots)
    .filter(mt.isInterfaceType)
    .flatMap((c) => Object.keys(c.props));
};
