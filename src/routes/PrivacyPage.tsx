import { useContextClass } from '../hooks/useContextClass'

/**
 * /privacy - minimal placeholder so the footer Privacy link never resolves to
 * a 404 or an empty SPA shell. The real privacy notice is being drafted
 * separately (launch-day brief Part 6) and needs review - do NOT add policy
 * content here.
 */
export function PrivacyPage() {
  useContextClass('context-cream')

  return (
    <main className="stub-page stub-page--cream">
      <div className="stub-page-inner">
        <p className="stub-page-micro">/PRIVACY</p>
        <h1 className="stub-page-headline">Privacy notice - coming shortly.</h1>
        <p className="stub-page-line">
          For any privacy question, contact{' '}
          <a className="stub-page-link" href="mailto:info@netzeroadvisory.uk">
            info@netzeroadvisory.uk
          </a>
          .
        </p>
      </div>
    </main>
  )
}
