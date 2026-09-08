import { ZapIcon } from 'lucide-react';

export default function RateLimitedUI() {
  return (
    <section className='max-w-6xl mx-auto px-4 py-8'>
      <aside className='bg-primary/10 border border-primary/30 rounded-lg shadow-md flex flex-col md:flex-row items-center p-6'>
        {/* Lightning Icon */}
        <div className='shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6'>
          <ZapIcon />
        </div>

        {/* Descriptions */}
        <div className='flex-1 text-center md:text-left'>
          <h3 className='text-xl font-bold mb-2'>Ratelimit Reached</h3>
          <p className='text-base-content mb-1'>
            You've made too many requests in a short period.
          </p>
          <p className='text-sm text-base-content/70'>
            Please try again in one minute.
          </p>
        </div>
      </aside>
    </section>
  );
}
