import React, { useState } from 'react';

function ActivityDropdown({ selectedActivity, setSelectedActivity }) {
    const [showChoices, setShowChoices] = useState(false);
    
    const activities = [
        'Hiking',
        'Sightseeing',
        'Beach',
        'Museums',
        'Food Tour',
        'Shopping',
        'Adventure Sports',
        'Cultural Experience'
    ];

    const toggleChoices = () => {
        setShowChoices(!showChoices);
    };

    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);
        setShowChoices(false);
    };

    return (
        <div className="custom-dropdown">
            <button 
                type="button"
                className="dropdown-toggle"
                onClick={toggleChoices}
            >
                {selectedActivity}
            </button>
            {showChoices && (
                <div className="dropdown-menu">
                    {activities.map((activity) => (
                        <div
                            key={activity}
                            className="dropdown-item"
                            onClick={() => handleActivitySelect(activity)}
                        >
                            {activity}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ActivityDropdown;