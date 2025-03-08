


export const makeSearchQuery = (searchTerm: string, SearchFields: string[]) => {
        
    // const searchQuery = {
    //   $or: [
    //     { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive name search
    //   ],
    // };


    const searchQuery = {
      $or: SearchFields.map((item) => ({
        [item]: { $regex: searchTerm, $options: "i" },
      })),
    };

    return searchQuery;
    
}


export const makeFilterQuery = (filters: Record<string, string>) => {
  let filterQuery: any = {};

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filterQuery[key] = filters[key];
    }
  });

   return filterQuery;

};