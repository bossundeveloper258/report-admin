interface Category{
    categoryId: number;
    categoryName: string;
}

const categories: Category[] = [
    {categoryId : 1 , categoryName: 'Usuario'},
    {categoryId : 2 , categoryName: 'Coordinador'},
    {categoryId : 3 , categoryName: 'Ciudadano'},
    {categoryId : 4 , categoryName: 'Otro'}
]

export {categories};