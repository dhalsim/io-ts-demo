export const log =
  (index: number = 0) =>
  <T>(e: T): T => {
    if (index >= 1) {
      console.log(index, JSON.stringify(e, null, 2));
    }

    return e;
  };
