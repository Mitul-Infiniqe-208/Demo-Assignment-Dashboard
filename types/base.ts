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

  export interface BaseParams {
    offset?: number;
    limit?: number;
    search?: string;
    searchText?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: SortOrder;
  }

  export type SortOrder = "ASC" | "DESC";