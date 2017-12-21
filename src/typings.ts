import { ICommit } from 'logservable/dist/typings';

export type Handler = (err: Error | null, recommendedVersion?: string) => void;

export interface IOptions {
  directory: string;
  postfix?: string;
}

export interface IVersion {
  major: number;
  minor: number;
  patch: number;
}

export type CommitAssertion = (commit: ICommit) => boolean;
export type VersionMap = (version: IVersion) => IVersion;
