class apiError extends TypeError {
  public status: number;
  public isError: boolean;
  constructor(status: number, message: string, isError: boolean) {
    super();
    this.status = status;
    this.message = message;
    this.isError = isError;
  }

  static badRequest(message: string, isError = true) {
    return new apiError(400, message, isError);
  }

  static unauthorized(message: string, isError = true) {
    return new apiError(401, message, isError);
  }

  static forbidden(message: string, isError = true) {
    return new apiError(403, message, isError);
  }

  static notFound(message: string, isError = true) {
    return new apiError(404, message, isError);
  }

  static conflict(message: string, isError = true) {
    return new apiError(409, message, isError);
  }

  static internal(message: string, isError = true) {
    return new apiError(500, message, isError);
  }
}

export default apiError;
