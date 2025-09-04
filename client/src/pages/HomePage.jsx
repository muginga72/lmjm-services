import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../services/fetchServices";
import PaginationServices from "../components/PaginationServices";
import ServiceCardWithModals from "../components/ServiceCardWithModals";
import { paginate } from "../utils/paginate";
import NavigationBar from "../components/NavigationBar";
import ServicesPromo from "../components/ServicesPromo";

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (err) {
        setError("Unable to load services.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const paginatedServices = paginate(services, currentPage, itemsPerPage);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <NavigationBar />
      <ServicesPromo />
      <h1>Welcome to LMJ Services</h1>
      <p>Explore our mission, values, and what makes us different.</p>

      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => window.open("/who-we-are", "_blank")}
          style={{
            marginRight: "1rem",
            backgroundColor: "lightgray",
            color: "blue",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Who We Are
        </button>
        <button
          onClick={() => navigate("/contact")}
          style={{
            backgroundColor: "lightgray",
            color: "blue",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Contact Us
        </button>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center">
            {paginatedServices.map((service) => (
              <div key={service.id} style={{ width: "350px", margin: "1rem" }}>
                <ServiceCardWithModals
                  title={service.title}
                  description={service.description}
                  image={`/images/${service.image}`} // Correct path to static image
                  link={`/services/${service.id}`}
                />
              </div>
            ))}
          </div>

          <PaginationServices
            totalItems={services.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
      <footer className="text-center py-4 border-top">
    <small>
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </small>
  </footer>
    </div>
  );
};

export default HomePage;
