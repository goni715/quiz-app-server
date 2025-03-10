


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
    let value = filters[key];
    
      if (value === "true") {
        filterQuery[key] = true;
      }
      else if (value === "false") {
        filterQuery[key] = false;
      }


      // Convert numeric strings to actual numbers
      else if (!isNaN(Number(value))) {
        filterQuery[key] = Number(value);
      }
      // Keep it as a string if none of the above conditions match
      else {
        filterQuery[key] = value;
      }
    
  });

  return filterQuery;
};