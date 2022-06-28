export type PaginationData = {
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        first: string;
        previous: string;
        next: string;
        last: string;
    };
};

export type ApiResponse<T> = { data: T; statusCode: number } & PaginationData;
