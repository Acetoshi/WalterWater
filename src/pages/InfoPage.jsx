import  "../styles/InfoPage.css";

function InfoPage() {
    
    return (
    
      <figure className="card">
     <p className="Paragraph"> Cette application web a été développée par quatre étudiants de la Wild Code School à Nantes. Réalisée en seulement deux jours, elle reflète notre dévouement et notre capacité à travailler efficacement en équipe. Pour en savoir plus sur chacun dentre nous et notre parcours, vous pouvez consulter nos profils LinkedIn et GitHub ci-dessous :
     </p>
<ul className="list-reset list-custom-info">
  <li className="Martin"><a href="https://www.linkedin.com/in/martin-berthaud-5311372a3/">Martin Berthaud</a></li>
  <li className="David"><a href="https://www.linkedin.com/in/davidlegall/">David Le Gall</a></li>
  <li className="Lucas"><a href="https://www.linkedin.com/in/lucas-aksu-a196a1271/">Lucas Aksu</a></li>
  <li className="Antoine"><a href="https://github.com/ATN35">Antoine Lelièvre</a></li>
</ul>
</figure>
    );
}
export default InfoPage;