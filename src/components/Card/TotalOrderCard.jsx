import React from 'react';
import StatCard from './StatCard';

const TotalOrderCard = ({ orderData = { total: 60, newToday: 10 } }) => {
    const orderIcon = (
       <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9375 3.625C19.6529 3.62499 19.3723 3.69198 19.1184 3.82057C18.8645 3.94916 18.6445 4.13573 18.4761 4.36517C18.3078 4.59461 18.1958 4.86047 18.1493 5.14124C18.1027 5.422 18.123 5.70977 18.2084 5.98125L18.6071 7.25H12.6875C12.2068 7.25 11.7458 7.44096 11.4059 7.78087C11.066 8.12078 10.875 8.5818 10.875 9.0625V52.5625C10.875 53.0432 11.066 53.5042 11.4059 53.8441C11.7458 54.184 12.2068 54.375 12.6875 54.375H45.3125C45.7932 54.375 46.2542 54.184 46.5941 53.8441C46.934 53.5042 47.125 53.0432 47.125 52.5625V9.0625C47.125 8.5818 46.934 8.12078 46.5941 7.78087C46.2542 7.44096 45.7932 7.25 45.3125 7.25H39.3965L39.7952 5.98125C39.8807 5.70948 39.9009 5.42138 39.8542 5.14034C39.8075 4.8593 39.6952 4.59322 39.5264 4.36371C39.3576 4.13419 39.1371 3.94769 38.8828 3.81934C38.6284 3.691 38.3474 3.62442 38.0625 3.625H19.9375ZM22.4025 7.25H35.5975L34.4629 10.875H23.5371L22.4025 7.25ZM39.875 25.375H18.125V21.75H39.875V25.375ZM39.875 34.4375H18.125V30.8125H39.875V34.4375ZM18.125 43.5H32.625V39.875H18.125V43.5Z" fill="#009E18"/>
</svg>
    );

    const trendIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M2.32959 14.0835H17.6706L10.0001 3.9165L2.32959 14.0835Z" fill="#319F43"/>
</svg>
    );

    const stats = [
        {
            text: `${orderData.newToday} new today`,
            type: 'positive',
            icon: trendIcon
        }
    ];

    return (
        <StatCard
            title="Total Order"
            icon={orderIcon}
            iconClass="order-icon"
            number={orderData.total}
            stats={stats}
        />
    );
};

export default TotalOrderCard;