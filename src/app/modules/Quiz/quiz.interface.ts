


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
    sortOrder?: 'asc' | 'desc';
    name?: string;
    email?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber?: string;
    gender?: 'male' | 'female';
    qualification?: string;
    currentWorkingPlace?: string;
    designation?: string;
    specialties?: string;
  };