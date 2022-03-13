// adapted from https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
class HttpError extends Error {
  public status: number;

  constructor(status: number, message?: string) {
    const errorMessage = message && message.length > 0 ? message : `${status} Error`;
    // 'Error' breaks prototype chain here
    super(errorMessage);
    // restore prototype chain
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      (this as any).__proto__ = actualProto;
    }
    this.status = status;
    this.name = 'HttpError';
  }
}

export { HttpError };
