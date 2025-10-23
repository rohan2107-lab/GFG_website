import React from 'react';

const FlippingLogos = () => {
    return (
        <div className="flipping-logo-container">
            <div className="flipping-card">
                {/* Front face (GFG Logo) */}
                <div className="logo-face logo-front">
                    <img src="/images/gfg-logo.png" alt="GeeksforGeeks Logo" />
                </div>
                {/* Back face (IKGPTU Logo) */}
                <div className="logo-face logo-back">
                    <img src="/images/ptu-logo.png" alt="IKGPTU Logo" />
                </div>
            </div>
        </div>
    );
};

export default FlippingLogos;