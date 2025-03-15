import { CategoryCard } from "./category-card";

export const FeaturedCategories = () => {
  return (
    <section className="w-full p-4 md:p-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CategoryCard key={index} />
        ))}
      </div>
    </section>
  );
};
