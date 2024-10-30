
import React, { useState } from 'react'
import './PetLookup.css'

export default function PetLookup() {
    const [petId, setPetId] = useState('');
    const [petData, setPetData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (e) => {
      setPetId(e.target.value);
      setError(null);
    };
  
    const fetchPetData = async () => {
      if (!petId) {
        setError('Please enter a pet ID');
        return;
      }
  
      setLoading(true);
      setError(null);
      setPetData(null);
  
      try {
        const response = await fetch(`https://petstore.swagger.io/v2/pet/${petId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Pet not found' : 'Error fetching pet data');
        }
  
        const data = await response.json();
        setPetData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (

    
    <div className="pet-lookup-container">
      <h1 className="pet-lookup-title">Pet Store Lookup</h1>
      
      <div className="search-container">
        <input
          type="number"
          placeholder="Enter Pet ID"
          value={petId}
          onChange={handleInputChange}
          className="pet-input"
        />
        <button
          onClick={fetchPetData}
          disabled={loading}
          className="search-button"
        >
          {loading ? 'Loading...' : 'Find Pet'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <div className="alert-title">Error</div>
          <div className="alert-message">{error}</div>
        </div>
      )}

      {petData && (
        <div className="pet-card">
          <h2 className="pet-name">{petData.name}</h2>
          
          <div className="pet-info-grid">
            <div className="info-section">
              <h3 className="info-title">Status</h3>
              <p className="info-text">{petData.status}</p>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Category</h3>
              <p className="info-text">{petData.category?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="info-section">
            <h3 className="info-title">Tags</h3>
            <div className="tags-container">
              {petData.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="tag"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          
        
        </div>
      )}
    </div>
  )
}
