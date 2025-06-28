import React from 'react';
import '../../styles/Cards/UserCardVertical.css';

function UserCardVertical({
    id,
    name,
    contact,
    company,
    image,
    onClick,
    type = "user" // user, seller, employee, marketer
}) {
    return (
        <div className="user-card-vertical" onClick={onClick}>
            <div className="user-vertical-image-container">
                <img
                    src={image}
                    alt={name}
                    className="user-vertical-image"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150x150/cccccc/666666?text=User";
                    }}
                />
            </div>

            <div className="user-vertical-info">
                <div className="user-vertical-details">
                    <div className="vertical-detail-labels">
                        <span className="vertical-detail-label">Name :</span>
                        <span className="vertical-detail-label">Contact :</span>
                        <span className="vertical-detail-label">Company :</span>
                    </div>
                    <div className="vertical-detail-values">
                        <span className="vertical-detail-value">{name}</span>
                        <span className="vertical-detail-value">{contact}</span>
                        <span className="vertical-detail-value">{company}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCardVertical;