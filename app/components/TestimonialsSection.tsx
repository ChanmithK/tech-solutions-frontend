import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Tech Solutions helped us achieve our goals with their expertise in digital transformation.",
      author: "John Kate",
      company: "CEO, Torentro Company",
    },
    {
      quote: "Their commitment to quality and innovation is commendable.",
      author: "Jane Smith",
      company: "CTO, Jade Company",
    },
    {
      quote:
        "We are delighted with the customized solutions provided by Tech Solutions.",
      author: "David Lee",
      company: "Marketing Director, New Ventures",
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-blue-500"
            >
              <p className="text-gray-200 text-lg mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="font-semibold text-blue-300">
                {testimonial.author}
              </p>
              <p className="text-gray-400">{testimonial.company}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
