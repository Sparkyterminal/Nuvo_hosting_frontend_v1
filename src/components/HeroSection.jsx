/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white font-nohemi">  
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Nuvó Hosting Agency</span>
              <motion.img
                src="assets/logo.png"
                alt="Nuvo Hosting Agency Logo"
                className="h-30 w-auto"
                style={{ display: 'block' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </a>
          </div>
          {/* <div className="flex lg:hidden">
            <button 
              type="button" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-6 h-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold text-gray-900 leading-6">Services</a>
            <a href="#" className="text-sm font-semibold text-gray-900 leading-6">Plans</a>
            <a href="#" className="text-sm font-semibold text-gray-900 leading-6">Support</a>
            <a href="#" className="text-sm font-semibold text-gray-900 leading-6">About</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-gray-900 leading-6">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50">
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Nuvo Hosting Agency</span>
                    <div className="h-8 w-auto text-2xl font-bold text-indigo-600">
                      NUVO
                    </div>
                  </a>
                  <button 
                    type="button" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="w-6 h-6">
                      <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                {/* <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 leading-7 hover:bg-gray-50">Services</a>
                      <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 leading-7 hover:bg-gray-50">Plans</a>
                      <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 leading-7 hover:bg-gray-50">Support</a>
                      <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 leading-7 hover:bg-gray-50">About</a>
                    </div>
                    <div className="py-6">
                      <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 leading-7 hover:bg-gray-50">Log in</a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }} 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        
        <div className="mx-auto max-w-2xl pt-32 pb-16 text-center">
          {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm text-gray-600 leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              New hosting plans available now. 
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div> */}
          
          <div className="text-center">
            <motion.h1
              className="text-3xl text-gray-900 sm:text-7xl text-balance"
              style={{ display: 'inline-block', wordBreak: 'break-word' }}
            >
              {"Welcome to Nuvó Hosting Agency, it's good to have you!"
                .split(' ')
                .map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 * i }}
                    style={{ display: 'inline-block', marginRight: '0.35em' }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.h1>
            {/* <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl leading-8 text-pretty">
              Premium hosting solutions designed to power your digital dreams. Fast, reliable, and secure hosting services that grow with your business.
            </p> */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.a
                onClick={() => navigate('/request-quote')}
                className="cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              >
                Request a Quote
              </motion.a>
              <motion.a
                onClick={() => navigate('/recruitment')}
                className="cursor-pointer text-sm font-semibold text-gray-900 leading-6 hover:text-indigo-600 transition-colors duration-200"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
              >
                Join our Team <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </div>
        
        <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }} 
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}