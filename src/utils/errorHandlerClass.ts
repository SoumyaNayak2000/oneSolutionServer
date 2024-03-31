class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;

/* The `ErrorHandler` class is a custom error class that extends the built-in `Error` class in JavaScript. It is used to create custom error objects with a specific error message and status code.

The constructor of the `ErrorHandler` class takes two parameters:
1. `message`: A string that represents the error message.
2. `statusCode`: A number that represents the HTTP status code associated with the error.

When an instance of `ErrorHandler` is created, it calls the `super` method with the provided error message to set the error message in the base `Error` class. It then sets the `statusCode` property of the instance to the provided status code.

This custom error class can be used to throw specific errors with custom messages and status codes in an Express application, allowing for better error handling and response customization.*/
