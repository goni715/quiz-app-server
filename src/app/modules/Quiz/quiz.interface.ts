


export interface IQuiz {
    quiz: string;
    slug: string;
    options: string[];
    answer: string;
    explanation: string;
    readingTime: number; //seconds
    point: number;
    condition: string;
}


export type TQuizQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};