export type APIResponse<T> = {
  success: boolean
  content: T;
  status?: number;
}
//TODO: use this in api services