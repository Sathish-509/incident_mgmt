// adapted from https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
class NetworkError extends Error {
  constructor(message?: string) {
    const errorMessage = message && message.length > 0 ? message : 'Network Error';
    // 'Error' breaks prototype chain here
    super(errorMessage);
    // restore prototype chain
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
    this.name = 'NetworkError';
  }
}

export { NetworkError };
