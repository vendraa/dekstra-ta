import { RequestLifecycle, RequestStep } from "../types/types";
import { LetterRequest } from "../types/types";

export interface GetRequestsParams {
  page?: number;
  limit?: number;

  lifecycle?: RequestLifecycle;
  currentStep?: RequestStep;

  nik?: string;       
  search?: string;

  status?:      string;
  letterType?:  string;
  createdAt?: {
    from?: string;
    to?:   string;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  totalRows: number;
}

export interface RequestRepository {
  getCitizenRequests(
    params?: GetRequestsParams
  ): Promise<PaginatedResult<LetterRequest>>;

  getAdminValidationRequests(
    params?: GetRequestsParams
  ): Promise<PaginatedResult<LetterRequest>>;

  getArsipSuratRequests(
    params?: GetRequestsParams
  ): Promise<PaginatedResult<LetterRequest>>;

  getRiwayatPengajuanRequests(
    params?: GetRequestsParams
  ): Promise<PaginatedResult<LetterRequest>>;

  getLetterRequestById(id: string): Promise<LetterRequest | null>;
}