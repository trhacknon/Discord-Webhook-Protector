import { Response, Request, Query } from "express-serve-static-core";
import { PathLike } from "fs";

export type Resp = Response<any, Record<string, any>, number>;
export type Requ = Request<{}, any, any, Query, Record<string, any>>;

export interface webhookFileType {
  hook: string;
  file: PathLike;
}

export interface webhookPayloadType {
  hook: string;
  payload: object;
}

export type fileType = formidable.Files;

export type NoParamCallback = (err: NodeJS.ErrnoException | null) => void;
export interface rateLimit {
  readonly ip: string;
  limit: Set<string>;
  public exist(): boolean;
  public timeout(): void;
}
