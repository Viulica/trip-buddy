import React from 'react'
import { QRCodeSVG } from 'qrcode.react';

const TripQRCode = ({tripId}) => {
    const baseUrl = window.location.origin;
    const tripLink = `${baseUrl}/trips/${tripId}`;
    
    console.log('QR Code URL:', tripLink);
    console.log('Trip ID:', tripId);

    return (
        <div>
            <QRCodeSVG value={tripLink} size={150} />
            <p>Scan to view trip details</p>
        </div>
    )
}

export default TripQRCode