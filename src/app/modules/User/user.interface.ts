

export interface IUser {
    fullName: string;
    email: string;
    country: string;
    university: string;
    profession: string;
    password: string;
    role: 'user' | 'admin';
}


export type TUserQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  country?: string,
  university?: string,
  profession?: string,
};
