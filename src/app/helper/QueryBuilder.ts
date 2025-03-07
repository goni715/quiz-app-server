


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