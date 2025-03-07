


export interface IQuiz {
    quiz: string;
    slug: string;
    options: string[];
    answer: string;
    explanation: string;
}


export type TQuizQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};