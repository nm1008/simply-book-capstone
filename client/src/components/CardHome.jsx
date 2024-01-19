

export default function CardHome({ id, name, description, price}) {
  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body key={id}>
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="text-center">{description}</Card.Text>
        <Card.Text className="text-center">$ {price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
