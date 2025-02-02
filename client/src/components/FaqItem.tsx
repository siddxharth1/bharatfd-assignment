import { useState } from 'react';
import { IFaq } from '../types/faq.types';

interface Props {
  faq: IFaq;
}

const FaqItem = ({ faq }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <button
        className="w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{faq.question}</h3>
          <span className="text-2xl">{isOpen ? '−' : '+'}</span>
        </div>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 prose">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default FaqItem; 