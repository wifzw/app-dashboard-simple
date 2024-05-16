// eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
const compareObjectSimple = (obj1: any, obj2: any): boolean => JSON.stringify(obj1) === JSON.stringify(obj2);

export default compareObjectSimple;
