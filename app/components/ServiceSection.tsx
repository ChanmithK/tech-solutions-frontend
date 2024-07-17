import React from "react";

const ServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom web solutions tailored to your business needs.",
    },
    {
      title: "Mobile App Development",
      description:
        "iOS and Android apps crafted for superior user experiences.",
    },
    {
      title: "Cloud Services",
      description: "Scalable cloud solutions to support your growing business.",
    },
    {
      title: "UI/UX Design",
      description:
        "Beautiful and intuitive designs that enhance user engagement.",
    },
    {
      title: "E-commerce Solutions",
      description:
        "End-to-end e-commerce platforms for seamless online shopping.",
    },
    {
      title: "SEO & Digital Marketing",
      description:
        "Optimize your online presence and reach your target audience.",
    },
  ];

  return (
    <section id="services" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-blue-500"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-500">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
