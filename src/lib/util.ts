/**
 * Paginates an array of data.

 */
export function paginate(data: any[], { page = 1, limit }: { page?: number; limit: number } ): any[] {
  if (limit) {
    return data.slice((page - 1) * limit, page * limit);
  }

  return data;
}