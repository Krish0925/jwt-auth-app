import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

fetch("http://localhost:5000/users", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 15px",
          marginBottom: "15px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div style={{ display: "grid", gap: "15px" }}>
        {data.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            description={user.email}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;