/**
 *
 * Error Payload type
 *
 * - StatusCode: HTTP Status Code. Standard: node:http
 * - errorCode: Union Type of Error Code Enumerations
 * - message: Error Message
 * - timestamp: Time of error tirggered
 */

export type ErrorResponsePayload = {
  statusCode: number;
  errorCode: string;
  message: string;
  timestamp: Date;
};
