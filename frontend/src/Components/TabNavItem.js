import React from "react";

const TabNavItem = ({ id, title, activeTab, setActiveTab, classes }) => {
    const handleClick = () => {
        setActiveTab(id);
    };

    return (
        <li onClick={handleClick} className={"py-2 md:px-5 truncate px-2 text-sm text-white font-medium cursor-pointer z-10 " + (activeTab === id ? " rounded-lg" : "bg-primary-850") + (classes && " " + classes)}>
            {title}
        </li>
    );
};

export default TabNavItem;
