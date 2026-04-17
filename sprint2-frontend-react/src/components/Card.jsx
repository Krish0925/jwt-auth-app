import "./Card.css";

function Card({ title, description }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>View Details</button>
    </div>
  );
}

export default Card;