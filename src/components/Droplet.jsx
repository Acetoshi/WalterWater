import "../styles/droplet.css";

export default function Droplet() {
  return (
    <div className="droplet-background">
      <div className="drop"></div>
      <section className="ripple-container">
        <div className="wave"></div>
      </section>
    </div>
  );
}
