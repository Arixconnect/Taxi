"use client";

import { FormEvent, useState } from "react";

const PHONE = "[TELEFOONNUMMER]";
const WHATSAPP = "[WHATSAPP-NUMMER]";

const services = [
  { n: "01", title: "Lokale taxiritten", text: "Voor korte en langere ritten binnen ’t Gooi en omgeving." },
  { n: "02", title: "Luchthavenvervoer", text: "Vervoer van en naar Schiphol en andere luchthavens." },
  { n: "03", title: "Zakelijk vervoer", text: "Representatief vervoer voor ondernemers, werknemers en relaties." },
  { n: "04", title: "Evenementenvervoer", text: "Voor feesten, diners, evenementen en avondritten." },
  { n: "05", title: "Langeafstandsritten", text: "Voor ritten buiten de regio en vervoer naar andere steden." },
];

const faqs = [
  ["Hoe kan ik een taxi reserveren?", "Vul het ritformulier in of neem direct contact op via telefoon of WhatsApp. De reservering is definitief zodra deze persoonlijk is bevestigd."],
  ["Hoe lang van tevoren moet ik boeken?", "Reserveer bij voorkeur zo vroeg mogelijk. Voor de minimale reserveringstijd geldt: [NOG AANLEVEREN]."],
  ["Rijdt de taxi ook naar Schiphol?", "Ja, luchthavenvervoer van en naar Schiphol kan vooraf worden aangevraagd."],
  ["Kan ik zakelijk vervoer aanvragen?", "Ja, zowel ondernemers als bedrijven kunnen een zakelijke rit aanvragen. Facturatie en afspraken: [NOG AANLEVEREN]."],
  ["In welke plaatsen is het bedrijf actief?", "De voorlopige lijst bestaat uit Hilversum, Bussum, Naarden, Huizen, Laren, Blaricum en Eemnes. Andere plaatsen zijn in overleg mogelijk."],
  ["Kan ik met meerdere passagiers reizen?", "Geef het aantal passagiers door bij je aanvraag. De maximale capaciteit is [NOG AANLEVEREN]."],
  ["Hoe ontvang ik een prijs voor mijn rit?", "Stuur je ophaallocatie, bestemming, datum en tijd. Je ontvangt daarna persoonlijk een reactie op je aanvraag."],
  ["Welke betaalmogelijkheden zijn er?", "De beschikbare betaalmogelijkheden zijn [NOG AANLEVEREN]."],
];

function MediaPlaceholder({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const assetSrc = `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
  return (
    <div className={`media-placeholder ${className}`}>
      {!failed && <img className={loaded ? "is-loaded" : ""} src={assetSrc} alt="" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
      {!loaded && <div className="placeholder-inner" role="img" aria-label={label}><span>Beeld in voorbereiding</span><strong>{label}</strong><small>PNG • {src}</small></div>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [
      ["Ophaallocatie", data.get("pickup")], ["Bestemming", data.get("destination")],
      ["Datum", data.get("date")], ["Tijd", data.get("time")], ["Passagiers", data.get("passengers")],
      ["Naam", data.get("name")], ["Telefoon", data.get("phone")], ["Bijzonderheden", data.get("notes")],
    ];
    const message = `Hallo, ik wil graag een taxirit aanvragen:\n\n${fields.map(([k, v]) => `${k}: ${v || "-"}`).join("\n")}`;
    // TODO: vervang deze previewflow later door Formspree, EmailJS of een eigen backend.
    navigator.clipboard?.writeText(message);
    setNotice("Je ritgegevens zijn klaar. Omdat het WhatsApp-nummer nog niet is ingevuld, is het bericht naar je klembord gekopieerd.");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Naar boven"><span className="brand-mark">T</span><span><strong>[BEDRIJFSNAAM]</strong><small>Taxi ’t Gooi</small></span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /><b>Menu</b></button>
        <nav id="main-nav" className={menuOpen ? "nav open" : "nav"} aria-label="Hoofdnavigatie">
          <a href="#diensten" onClick={closeMenu}>Diensten</a><a href="#werkgebied" onClick={closeMenu}>Werkgebied</a><a href="#over-ons" onClick={closeMenu}>Over ons</a><a href="#faq" onClick={closeMenu}>FAQ</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-phone" href={`tel:${PHONE}`}>Bel {PHONE}</a><a className="btn btn-dark nav-cta" href="#reserveren" onClick={closeMenu}>Reserveer een taxi</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-grid shell">
            <div className="hero-copy">
              <p className="eyebrow light"><span /> Taxivervoer in ’t Gooi</p>
              <h1>Taxi nodig<br />in ’t Gooi?</h1>
              <p className="hero-lead">Betrouwbaar taxivervoer in Hilversum, Bussum, Naarden, Huizen en omgeving. Reserveer vooraf of neem direct contact op voor je rit.</p>
              <div className="hero-actions"><a className="btn btn-light" href="#reserveren">Reserveer je taxi <span>↗</span></a><a className="btn btn-outline" href={`tel:${PHONE}`}>Bel direct</a></div>
              <a className="text-link light-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Liever WhatsApp? Stuur een bericht <span>→</span></a>
              <ul className="trust-list"><li>Lokaal actief in ’t Gooi</li><li>Vooraf reserveren</li><li>Particulier en zakelijk</li><li>Direct persoonlijk contact</li></ul>
            </div>
            <div className="hero-visual"><MediaPlaceholder src="/assets/images/taxi-hero.png" label="[NOG AANLEVEREN: REPRESENTATIEVE FOTO VAN DE TAXI]" /><div className="hero-location"><span>Werkgebied</span><strong>’t Gooi & omgeving</strong></div><div className="route-line" aria-hidden="true"><i /><i /><i /></div></div>
          </div>
        </section>

        <section className="booking-wrap" id="reserveren">
          <div className="booking shell">
            <div className="booking-head"><div><p className="eyebrow"><span /> Direct je rit aanvragen</p><h2>Waar kunnen we je ophalen?</h2></div><p>Vul je ritgegevens in. Je ontvangt persoonlijk een reactie op je aanvraag.</p></div>
            <form onSubmit={handleSubmit}>
              <label>Ophaallocatie<input name="pickup" placeholder="Straat, plaats of locatie" required /></label>
              <label>Bestemming<input name="destination" placeholder="Waar wil je naartoe?" required /></label>
              <label>Datum<input name="date" type="date" required /></label>
              <label>Tijd<input name="time" type="time" required /></label>
              <label>Aantal passagiers<select name="passengers" defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></label>
              <label>Naam<input name="name" autoComplete="name" placeholder="Je naam" required /></label>
              <label>Telefoonnummer<input name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" required /></label>
              <label className="wide">Bijzonderheden<textarea name="notes" rows={2} placeholder="Bagage, kinderzitje of andere informatie" /></label>
              <button className="btn btn-dark submit" type="submit">Vraag je rit aan <span>↗</span></button>
            </form>
            {notice && <p className="form-notice" role="status">✓ {notice}</p>}
          </div>
        </section>

        <div className="proof-strip"><div className="shell"><span>⌖ Taxivervoer in ’t Gooi</span><span>◷ Vooraf reserveren</span><span>✈ Luchthavenritten</span><span>◇ Zakelijk & particulier</span></div></div>

        <section className="section services" id="diensten">
          <div className="shell"><div className="section-heading"><div><p className="eyebrow"><span /> Onderweg op jouw moment</p><h2>Vervoer dat bij<br />je rit past.</h2></div><p>Van een lokale afspraak tot een vroege vlucht: vraag je rit vooraf aan en bespreek persoonlijk wat je nodig hebt.</p></div>
            <div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><span className="service-num">{service.n}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><a href="#reserveren">Vraag deze rit aan <span>→</span></a></article>)}</div>
          </div>
        </section>

        <section className="section why" id="over-ons">
          <div className="shell why-grid"><MediaPlaceholder src="/assets/images/taxi-side.png" label="[NOG AANLEVEREN: FOTO AUTO OF CHAUFFEUR]" className="why-image" /><div className="why-copy"><p className="eyebrow light"><span /> Persoonlijk en verzorgd</p><h2>Duidelijke afspraken.<br />Prettig onderweg.</h2><p>Persoonlijk taxivervoer met aandacht voor duidelijke communicatie, verzorgd vervoer en prettig contact — voor particulieren én bedrijven.</p><ul className="check-grid"><li>Direct persoonlijk contact</li><li>Bekend met de regio</li><li>Voor particulieren en bedrijven</li><li>Vooraf een rit aanvragen</li><li>Heldere communicatie</li><li>Verzorgd vervoer</li></ul><a className="btn btn-light" href="#reserveren">Bespreek je rit <span>↗</span></a></div></div>
        </section>

        <section className="section area" id="werkgebied"><div className="shell area-grid"><div><p className="eyebrow"><span /> Lokaal in de regio</p><h2>Bekend in<br />’t Gooi.</h2><p>De onderstaande plaatsenlijst is voorlopig en wordt nog gecontroleerd. Staat jouw plaats er niet tussen? Neem contact op om de mogelijkheden te bespreken.</p><a className="text-link" href="#contact">Vraag naar jouw plaats <span>→</span></a></div><div className="places" aria-label="Voorlopig werkgebied">{["Hilversum", "Bussum", "Naarden", "Huizen", "Laren", "Blaricum", "Eemnes", "Overig ’t Gooi"].map((place, index) => <div key={place}><span>0{index + 1}</span><strong>{place}</strong><i>→</i></div>)}</div></div></section>

        <section className="airport"><div className="shell airport-grid"><div><p className="eyebrow light"><span /> Luchthavenvervoer</p><h2>Zonder stress<br />naar de luchthaven.</h2><p>Reserveer vooraf je taxi van ’t Gooi naar Schiphol. Geef je ophaallocatie, datum, tijd en aantal passagiers door en ontvang een passende reactie op je aanvraag.</p><a className="btn btn-light" href="#reserveren">Vraag luchthavenvervoer aan <span>↗</span></a></div><div className="route-card"><div className="route-top"><span>Routeaanvraag</span><span>Vooraf reserveren</span></div><div className="route-points"><div><i /><span>Vertrek</span><strong>’t Gooi</strong></div><b /><div><i /><span>Bestemming</span><strong>Schiphol</strong></div></div><small>Rittijd en prijs worden na je aanvraag persoonlijk afgestemd.</small></div></div></section>

        <section className="section driver"><div className="shell driver-grid"><div className="driver-copy"><p className="eyebrow"><span /> Maak kennis</p><h2>De chauffeur<br />achter het stuur.</h2><h3>[NAAM EIGENAAR]</h3><p>Persoonlijk taxivervoer met aandacht voor duidelijke afspraken, verzorgd vervoer en prettig contact.</p><dl><div><dt>Ervaring</dt><dd>[AANTAL JAREN ERVARING]</dd></div><div><dt>Waarom gestart</dt><dd>[WAAROM HET BEDRIJF IS GESTART]</dd></div><div><dt>Werkwijze</dt><dd>[PERSOONLIJKE WERKWIJZE]</dd></div></dl></div><MediaPlaceholder src="/assets/images/chauffeur.png" label="[NOG AANLEVEREN: PORTRETFOTO CHAUFFEUR]" className="driver-image" /></div></section>

        <section className="section reviews"><div className="shell"><div className="section-heading"><div><p className="eyebrow"><span /> Ervaringen</p><h2>Wat klanten zeggen.</h2></div><p>Echte ervaringen geven het beste beeld. De reviews worden toegevoegd zodra ze zijn aangeleverd.</p></div><div className="review-grid">{[1,2,3].map((n) => <article key={n}><span className="quote">“</span><p>[NOG AANLEVEREN: REVIEW {n}]</p><div><i /><span><strong>[NAAM KLANT]</strong><small>[TYPE RIT]</small></span></div></article>)}</div><a className="reviews-link" href="#contact">[NOG AANLEVEREN: GOOGLE REVIEWS-LINK] <span>↗</span></a></div></section>

        <section className="section faq" id="faq"><div className="shell faq-grid"><div><p className="eyebrow"><span /> Veelgestelde vragen</p><h2>Goed om te weten.</h2><p>Staat je vraag er niet tussen? Neem direct contact op; dan bespreken we je rit persoonlijk.</p><a className="btn btn-dark" href="#contact">Stel je vraag <span>↗</span></a></div><div className="accordion">{faqs.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

        <section className="final-cta"><div className="shell"><p className="eyebrow light"><span /> Direct op weg</p><h2>Taxi nodig in ’t Gooi?</h2><p>Geef je ritgegevens door of neem direct telefonisch contact op.</p><div><a className="btn btn-light" href="#reserveren">Reserveer je taxi <span>↗</span></a><a className="btn btn-outline" href={`tel:${PHONE}`}>Bel {PHONE}</a><a className="text-link light-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp <span>→</span></a></div></div></section>
      </main>

      <footer id="contact"><div className="shell footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">T</span><span><strong>[BEDRIJFSNAAM]</strong><small>Taxi ’t Gooi</small></span></a><p>Persoonlijk taxivervoer in ’t Gooi en omgeving. Voor lokale ritten, luchthavenvervoer en zakelijke aanvragen.</p><span className="made-by">Website door Arix Marketing</span></div><div><h3>Contact</h3><a href={`tel:${PHONE}`}>{PHONE}</a><a href={`https://wa.me/${WHATSAPP}`}>{WHATSAPP}</a><a href="mailto:[E-MAILADRES]">[E-MAILADRES]</a><span>[VESTIGINGSPLAATS]</span></div><div><h3>Gegevens</h3><span>[KVK-NUMMER]</span><span>[OPENINGSTIJDEN OF BEREIKBAARHEID]</span><a href="#">[SOCIALMEDIA-LINK]</a></div><div><h3>Informatie</h3><a href="#">Privacyverklaring</a><a href="#">Algemene voorwaarden</a><a href="#diensten">Diensten</a><a href="#werkgebied">Werkgebied</a></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} [BEDRIJFSNAAM]</span><span>Gegevens in deze preview moeten nog worden gecontroleerd.</span></div></footer>

      <nav className="mobile-bar" aria-label="Snelle acties"><a href={`tel:${PHONE}`}><span>☎</span>Bellen</a><a href={`https://wa.me/${WHATSAPP}`}><span>◉</span>WhatsApp</a><a href="#reserveren"><span>↗</span>Reserveren</a></nav>
    </>
  );
}
