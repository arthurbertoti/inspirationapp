import { AxiosError } from "axios"
import { ErrorMessage } from "./ErrorMessage"

export type RequestResponse<T> =
  | [T, null, null]
  | [null, ErrorMessage, null]
  | [null, null, AxiosError]
