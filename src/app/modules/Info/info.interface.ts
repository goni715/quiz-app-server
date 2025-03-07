
export interface IInfo {
    title : string;
    subTitle: string;
    explainOne: string;
    explainTwo: string;
}


export type TInfoQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};