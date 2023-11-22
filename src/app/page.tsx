import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Remote jobs Greece - Find and Post Remote Jobs in Greece',
  description:
    'Unlock a world of remote work opportunities in Greece with RemoteJobsGreece.gr. Browse listings for freelance, part-time, and full-time remote jobs, or post your own job openings to connect with top talent. Your next career move starts here.',
  openGraph: {
    images: ['https://i.imgur.com/Tamd8rD.png'],
  },
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen landing-page pb-10"
      style={{
        background:
          'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(171,252,255,0.3604035364145658) 25%, rgba(255,181,212,0.13631390056022408) 74%, rgba(255,255,255,1) 100%)',
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-16 sm:pt-48 lg:pt-36">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Empowering Greece, One Remote Job at a time
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find the best remote jobs in Greece, tailored just for you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/jobs"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                href="/about"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md pt-16 mt-10 text-sm">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Our Vision
            </h2>
            <p className="mb-4 text-center">
              <strong>
                Empowering Greek Talent in the Global Remote Work Era
              </strong>
            </p>
            <p className="mb-4">
              In a world where work transcends borders, Remote Jobs Greece
              stands as a beacon of opportunity and hope for the talented
              professionals of Greece. With the evolving landscape of work, the
              traditional constraints of location are dissolving, paving the way
              for a new era of global employment opportunities.
            </p>
            <p className="mb-4">
              Greece, a land rich in history and talent, has long been a cradle
              of potential waiting to be fully realized. The global shift
              towards remote work presents an unprecedented opportunity for the
              Greek workforce. Our mission at Remote Jobs Greece is to harness
              this potential by connecting Greek professionals with
              international employers who value and seek their unique skills and
              perspectives.
            </p>

            <p className="mb-4">
              The inception of Remote Jobs Greece was inspired by a personal
              story close to my heart – the struggles faced by my girlfriend in
              finding fulfilling work in Greece. This is a narrative shared by
              many. It&apos;s not just about finding a job; it&apos;s about
              finding the right job that offers growth, satisfaction, and a
              work-life balance.
            </p>
            <p className="mb-4">
              We believe that Greek professionals should not be limited by
              geographical boundaries. Why should the zip code dictate the
              trajectory of one&apos;s career? The talent in Greece is diverse,
              vibrant, and ready to make a global impact. Remote Jobs Greece is
              here to bridge the gap between this talent and the plethora of
              opportunities in the international remote job market.
            </p>
            <p className="mb-4">
              For companies worldwide, Greek professionals offer a unique blend
              of skills, creativity, and a fresh perspective that can drive
              innovation and growth. By partnering with us, companies not only
              tap into this pool of talent but also contribute to a meaningful
              cause – improving the working conditions and quality of life for
              people in Greece.
            </p>
            <p className="mb-4">
              Join us in this journey. Let&apos;s reshape the future of work
              together.
            </p>

            <p className="mb-4">
              Regards,
              <br />
              The Team at Remote Jobs Greece
            </p>
            <p className="italic">
              P.S. Meet Gleemo, the mascot for our website, generated by DALL-E
            </p>

            <div className="flex items-center justify-center mt-5">
              <Image
                src="/happy-gleemo.png"
                title="Happy Gleemo"
                width={300}
                height={300}
                alt="Happy Gleemo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
