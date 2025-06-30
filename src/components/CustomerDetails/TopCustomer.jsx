import React from 'react';
import '../../styles/components/TopCustomer.css'

function TopCustomer() {
  // Sample top customer data
  const topCustomers = [
    {
      id: 1,
      name: "John Smith",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      company: "TechCorp",
      sales: "$2.5M"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      company: "InnovateX",
      sales: "$1.8M"
    },
    {
      id: 3,
      name: "Mike Chen",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      company: "BuildPro",
      sales: "$1.5M"
    },
    {
      id: 4,
      name: "Emily Davis",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "FoodTech",
      sales: "$1.3M"
    },
    {
      id: 5,
      name: "David Wilson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      company: "StyleCo",
      sales: "$1.1M"
    },
    {
      id: 6,
      name: "Lisa Brown",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "CafePlus",
      sales: "$980K"
    },
    {
      id: 7,
      name: "Alex Rodriguez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "SportGear",
      sales: "$850K"
    },
        {
      id: 5,
      name: "David Wilson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      company: "StyleCo",
      sales: "$1.1M"
    },
    {
      id: 6,
      name: "Lisa Brown",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "CafePlus",
      sales: "$980K"
    },
    {
      id: 7,
      name: "Alex Rodriguez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      company: "SportGear",
      sales: "$850K"
    }
  ];

  // Function to get only top 7 customers
  const getTopCustomers = () => {
    return topCustomers.slice(0, 6);
  };

  return (
    <div className="top-customer-container">
      <div className="top-customer-header">
        <h2>Top Customer</h2>
      </div>

      <div className="customers-grid">
        {getTopCustomers().map((customer) => (

          <div key={customer.id} className="customer-card">
            <div className="customer-image-container">
              <img
                src={customer.image}
                alt={customer.name}
                className="customer-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x100/cccccc/666666?text=User";
                }}
              />
            </div>
            <div className="customer-info">
              <h4 className="customer-name">{customer.name}</h4>
              <p className="customer-company">{customer.company}</p>
              <p className="customer-sales">{customer.sales}</p>
            </div>

          </div>
          
        ))}
        
        <div className="see-more-card">
          <button className="see-more-btn">
            See More →
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TopCustomer;