function CategoryCard({ icon: Icon, name }) {
  return (
    <div className="category-card">
      <Icon className="category-icon" />
      <p>{name}</p>
    </div>
  )
}

export default CategoryCard