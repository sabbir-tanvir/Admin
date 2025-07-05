import React from 'react';
import '../../styles/Cards/UserCard.css';

function UserCard({
    id,
    name,
    contact,
    company,
    image,
    onClick,
    status,
    type = "user" // user, seller, employee, marketer
}) {
    return (
        <div className="user-card" onClick={onClick}>
            {status && (
                <div className={`status-badge ${status.toLowerCase()}`}>
                    {status}
                </div>
            )}
            
            <div className="user-image-container">
                <img
                    src={image}
                    alt={name}
                    className="user-image"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150x150/cccccc/666666?text=User";
                    }}
                />
            </div>

            <div className="user-info">
                <div className="user-id">
                    <span className="id-label">ID :</span>
                    <span className="id-value">{id}</span>
                </div>
                <div className="user-details">

                    {/* <div className="user-detail">
                            <span className="detail-label">Name :</span>
                        <span className="detail-value">{name}</span>
                    </div>

                    <div className="user-detail">
                        <span className="detail-label">Contact :</span>
                        <span className="detail-value">{contact}</span>
                    </div>

                    <div className="user-detail">
                        <span className="detail-label">Company :</span>
                        <span className="detail-value">{company}</span>
                    </div> */}


                    <div className="detail-labels">
                        <span className="detail-label">Name :</span>
                        <span className="detail-label">Contact :</span>
                        <span className="detail-label">Company :</span>

                    </div>
                    <div className="detail-values">
                        <span className="detail-value">{name}</span>
                        <span className="detail-value">{contact}</span>
                        <span className="detail-value">{company}</span>
                    </div>

                </div>



            </div>
        </div>
    );
}

export default UserCard;