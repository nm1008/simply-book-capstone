

export default function CardCourse({ id, name }) {
  return (
    <Card className="mt-5 w-50">
      <Card.Body key={id} className="">
        <Card.Title className="text-center">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
}
