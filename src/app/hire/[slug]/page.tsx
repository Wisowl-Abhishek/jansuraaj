import { getAllRecruiterSlugs } from '@/lib/recruiter-pseo-data';
import RedirectToHome from '@/components/common/RedirectToHome';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRecruiterSlugs().map((slug) => ({ slug }));
}

export default function RecruiterHireDLP() {
  return <RedirectToHome />;
}
