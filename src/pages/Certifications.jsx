import Seo from "../components/Seo";
import { certifications } from "../data/profile";
import "./Certifications.css";

export default function Certifications() {
  return (
    <>
      <Seo
        title="Certifications"
        description="Professional certifications in data analytics, AI literacy, and cloud fundamentals from Deloitte, Microsoft, and GitHub."
      />

      <section className="section page-header">
        <div className="container">
          <p className="eyebrow">Credentials</p>
          <h1>Certifications</h1>
          <p className="page-header__sub">
            Certifications completed alongside the M.S. Analytics coursework, rounding out
            practical exposure to job-simulation analytics work and current AI tooling.
          </p>
        </div>
      </section>

      <section className="section-tight certs-section">
        <div className="container">
          <div className="certs-grid">
            {certifications.map((cert) => (
              <div className="cert-card card" key={cert.name}>
                <div className="cert-card__icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M11 2 13.5 7.3 19.4 8.1 15.2 12.2 16.2 18 11 15.2 5.8 18 6.8 12.2 2.6 8.1 8.5 7.3 11 2Z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="cert-card__body">
                  <h3 className="cert-card__name">{cert.name}</h3>
                  <p className="cert-card__issuer">{cert.issuer}</p>
                  <div className="cert-card__meta">
                    {cert.date && <span className="tag tag-neutral">{cert.date}</span>}
                    {cert.credentialId && (
                      <span className="cert-card__credential">ID: {cert.credentialId}</span>
                    )}
                  </div>
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="cert-card__verify">
                      Verify credential →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="certs-note">
            Credential IDs and verification links aren't listed for certificates issued without one —
            all certifications above were completed via LinkedIn Learning or Forage and can be confirmed on request.
          </p>
        </div>
      </section>
    </>
  );
}
