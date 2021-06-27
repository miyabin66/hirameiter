const wait = (msec: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, msec))

export default wait
