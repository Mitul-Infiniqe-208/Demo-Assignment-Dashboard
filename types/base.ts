export interface ApiResponse<TData> {
    statusCode: number;
    status: boolean;
    message: string;
    data: TData;
    meta: Meta;
  }

export interface Meta {
    total: number;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
}