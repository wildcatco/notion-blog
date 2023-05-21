export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="flex space-x-2">
      {categories.map((category) => (
        <span
          key={category}
          className="bg-secondary rounded-full px-4 py-2 text-sm"
        >
          {category}
        </span>
      ))}
    </div>
  );
}
