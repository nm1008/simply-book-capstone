

export default function Cards({
  id,
  name,
  description,
  price,
  onEnrollCourse,
  editCoursePage,
  onDeleteCourse,
}) {
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body key={id}>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">{description}</Card.Text>
        <Card.Text className="text-center">$ {price}</Card.Text>
        <div className="text-center">
          {isAdmin === "false" ? (
            <Button className="btn btn-primary" onClick={onEnrollCourse}>
              Enroll
            </Button>
          ) : (
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-primary" onClick={editCoursePage}>
                Edit Course
              </button>
              <button className="btn btn-danger" onClick={onDeleteCourse}>
                Delete Course
              </button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
