import React from 'react';
import UserList from '../UserList/UserList';
import GridDisplay from '../Grid/GridDisplay';
import '../../styles/components/Dashboard.css';
import SeeMBtn from '../button/SeemoreBtn';
import OrderStatCard from '../Card/OrderStatCard';
import TotalCard from '../Card/TotalCard';

function Dashboard() {
    // Example click handlers for demonstration
    const handleCardClick = (cardName) => {
        console.log(`${cardName} card clicked!`);
        // You can add navigation logic here
    };

    const handleViewAll = (section) => {
        console.log(`View All clicked for ${section}`);
        // Add navigation logic for each section
    };

    // Sample data for Top Customers (exactly 4 people)
    const topCustomers = [
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];

    // Sample data for Top Marketers (exactly 4 people)
    const topMarketers = [
        {
            name: "Sarah Wilson",
            contact: "+880***********45",
            sales: 85,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Mike Chen",
            contact: "+880***********67",
            sales: 72,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Emily Davis",
            contact: "+880***********89",
            sales: 68,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Alex Rodriguez",
            contact: "+880***********12",
            sales: 55,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        }
    ];

    // Sample data for Top Selling Products (8 items for 4x2 grid)
    const topProducts = [
        { name: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop" },
        { name: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop" },
        { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
        { name: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" },
        { name: "Camera", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150&h=150&fit=crop" },
        { name: "Tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop" },
        { name: "Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" },
        { name: "Gaming Console", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150&h=150&fit=crop" }
    ];

    // Sample data for Most Popular Companies (8 items for 4x2 grid)
    const topCompanies = [
        { name: "Apple", image: "https://logo.clearbit.com/apple.com" },
        { name: "Microsoft", image: "https://logo.clearbit.com/microsoft.com" },
        { name: "Google", image: "https://logo.clearbit.com/google.com" },
        { name: "Amazon", image: "https://logo.clearbit.com/amazon.com" },
        { name: "Samsung", image: "https://logo.clearbit.com/samsung.com" },
        { name: "Sony", image: "https://logo.clearbit.com/sony.com" },
        { name: "Intel", image: "https://logo.clearbit.com/intel.com" },
        { name: "NVIDIA", image: "https://logo.clearbit.com/nvidia.com" }
    ];


    // Icons for the cards
    const orderIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5625 3.375C18.2975 3.37499 18.0363 3.43737 17.7999 3.55709C17.5635 3.67681 17.3587 3.85051 17.2019 4.06412C17.0452 4.27774 16.9409 4.52527 16.8976 4.78667C16.8543 5.04807 16.8731 5.31599 16.9526 5.56875L17.3239 6.75H11.8125C11.3649 6.75 10.9357 6.92779 10.6193 7.24426C10.3028 7.56073 10.125 7.98995 10.125 8.4375V48.9375C10.125 49.3851 10.3028 49.8143 10.6193 50.1307C10.9357 50.4472 11.3649 50.625 11.8125 50.625H42.1875C42.6351 50.625 43.0643 50.4472 43.3807 50.1307C43.6972 49.8143 43.875 49.3851 43.875 48.9375V8.4375C43.875 7.98995 43.6972 7.56073 43.3807 7.24426C43.0643 6.92779 42.6351 6.75 42.1875 6.75H36.6795L37.0507 5.56875C37.1303 5.31572 37.1491 5.0475 37.1056 4.78583C37.0622 4.52417 36.9576 4.27645 36.8005 4.06276C36.6433 3.84907 36.438 3.67544 36.2012 3.55594C35.9644 3.43645 35.7027 3.37446 35.4375 3.375H18.5625ZM20.8575 6.75H33.1425L32.0861 10.125H21.9139L20.8575 6.75ZM37.125 23.625H16.875V20.25H37.125V23.625ZM37.125 32.0625H16.875V28.6875H37.125V32.0625ZM16.875 40.5H30.375V37.125H16.875V40.5Z" fill="#009E18" />
        </svg>
    );

    const customerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <g clip-path="url(#clip0_307_575)">
                <g filter="url(#filter0_d_307_575)">
                    <path d="M28 56C28 56 24 56 24 52C24 48 28 36 44 36C60 36 64 48 64 52C64 56 60 56 60 56H28ZM44 32C47.1826 32 50.2348 30.7357 52.4853 28.4853C54.7357 26.2348 56 23.1826 56 20C56 16.8174 54.7357 13.7652 52.4853 11.5147C50.2348 9.26428 47.1826 8 44 8C40.8174 8 37.7652 9.26428 35.5147 11.5147C33.2643 13.7652 32 16.8174 32 20C32 23.1826 33.2643 26.2348 35.5147 28.4853C37.7652 30.7357 40.8174 32 44 32ZM20.864 56C20.2713 54.7512 19.9756 53.3821 20 52C20 46.58 22.72 41 27.744 37.12C25.2367 36.3457 22.6239 35.9679 20 36C4 36 0 48 0 52C0 56 4 56 4 56H20.864ZM18 32C20.6522 32 23.1957 30.9464 25.0711 29.0711C26.9464 27.1957 28 24.6522 28 22C28 19.3478 26.9464 16.8043 25.0711 14.9289C23.1957 13.0536 20.6522 12 18 12C15.3478 12 12.8043 13.0536 10.9289 14.9289C9.05357 16.8043 8 19.3478 8 22C8 24.6522 9.05357 27.1957 10.9289 29.0711C12.8043 30.9464 15.3478 32 18 32Z" fill="#FFAF1A" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_307_575" x="0" y="6" width="70" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="4" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.862019 0 0 0 0 0.605769 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_307_575" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_307_575" result="shape" />
                </filter>
                <clipPath id="clip0_307_575">
                    <rect width="64" height="64" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );

    const marketersIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path d="M57.0459 47.626C56.0099 46.606 43.4559 41.75 41.1779 40.834C38.9119 39.934 38.0079 37.44 38.0079 37.44C38.0079 37.44 36.9879 38.004 36.9879 36.42C36.9879 34.834 38.0079 37.44 39.0279 31.324C39.0279 31.324 41.8579 30.53 41.2959 23.964H40.6159C40.6159 23.964 42.3159 16.944 40.6159 14.568C38.9099 12.192 38.2419 10.608 34.4959 9.47201C30.7559 8.33801 32.1159 8.56401 29.3999 8.68001C26.6799 8.79401 24.4159 10.266 24.4159 11.056C24.4159 11.056 22.7159 11.17 22.0399 11.85C21.3599 12.53 20.2279 15.698 20.2279 16.49C20.2279 17.282 20.7939 22.61 21.3599 23.738L20.6859 23.958C20.1199 30.526 22.9499 31.322 22.9499 31.322C23.9699 37.438 24.9899 34.832 24.9899 36.418C24.9899 38.002 23.9699 37.438 23.9699 37.438C23.9699 37.438 23.0639 39.93 20.7999 40.832C18.5359 41.738 5.96794 46.606 4.94594 47.624C3.92594 48.664 4.03994 53.416 4.03994 53.416H28.1119L29.8679 46.496L28.3079 44.936L30.9939 42.246L33.6799 44.934L32.1199 46.494L33.8759 53.414H57.9479C57.9479 53.414 58.0739 48.658 57.0419 47.62L57.0459 47.626Z" fill="#9977FF" />
        </svg>
    );

    const trendIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
            <path d="M6 0L12 10H0L6 0Z" />
        </svg>
    );
    const salesIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="71" height="71" viewBox="0 0 71 71" fill="none">
            <path d="M38.7245 16.009L47.4531 24.7953L53.497 59.038L23.5483 64.3438L17.5044 30.1011L22.6948 18.849L38.7245 16.009Z" fill="#FFAF1A" fill-opacity="0.5" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M33.4884 21.7674C33.5416 22.0268 33.5422 22.2943 33.4904 22.554C33.4385 22.8136 33.3351 23.0603 33.1863 23.2793C33.0375 23.4984 32.8464 23.6854 32.6241 23.8294C32.4018 23.9733 32.153 24.0712 31.8922 24.1174C31.6315 24.1636 31.3641 24.157 31.1059 24.0981C30.8477 24.0392 30.604 23.9292 30.389 23.7745C30.1741 23.6199 29.9923 23.4237 29.8544 23.1976C29.7166 22.9715 29.6254 22.7201 29.5863 22.4582C29.5331 22.1988 29.5324 21.9314 29.5843 21.6717C29.6362 21.412 29.7396 21.1653 29.8884 20.9463C30.0371 20.7272 30.2283 20.5402 30.4506 20.3963C30.6729 20.2523 30.9217 20.1544 31.1825 20.1082C31.4432 20.0621 31.7106 20.0686 31.9688 20.1275C32.2269 20.1864 32.4707 20.2964 32.6856 20.4511C32.9006 20.6058 33.0824 20.8019 33.2202 21.028C33.3581 21.2541 33.4493 21.5055 33.4884 21.7674Z" fill="#FFAF1A" fill-opacity="0.5" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.0806 6.65625C28.3956 10.9473 29.2787 17.3358 31.2327 20.4894L28.0806 6.65625Z" fill="#FFAF1A" fill-opacity="0.5" />
            <path d="M28.0806 6.65625C28.3956 10.9473 29.2787 17.3358 31.2327 20.4894" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M30.2505 7.92834C30.5212 13.774 31.5004 21.6964 30.5508 20.6004L30.2505 7.92834ZM43.4313 40.0484C44.4934 39.4198 46.4178 38.4924 47.147 39.0707C47.9369 39.6949 47.3881 41.4522 46.8423 42.8367" fill="#FFAF1A" fill-opacity="0.5" />
            <path d="M30.2505 7.92834C30.5212 13.774 31.5004 21.6964 30.5508 20.6004M43.4313 40.0484C44.4934 39.4198 46.4178 38.4924 47.147 39.0707C47.9369 39.6949 47.3881 41.4522 46.8423 42.8367" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.5752 44.2537C24.6061 45.2595 30.2772 46.3482 35.9365 45.3453C41.331 44.3898 44.3042 41.9935 45.8173 40.5824" fill="#FFAF1A" fill-opacity="0.5" />
            <path d="M22.5752 44.2537C24.6061 45.2595 30.2772 46.3482 35.9365 45.3453C41.331 44.3898 44.3042 41.9935 45.8173 40.5824" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );

    const productIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
            <path d="M24.5643 60.1358C29.686 62.825 32.2468 64.1667 35.0002 64.1667V35L7.69433 20.6296L7.57766 20.825C5.8335 23.7825 5.8335 27.4662 5.8335 34.8308V35.1721C5.8335 42.5337 5.8335 46.2175 7.57475 49.175C9.31891 52.1354 12.4572 53.7833 18.731 57.0762L24.5643 60.1358Z" fill="#C58700" />
            <path opacity="0.7" d="M51.2664 12.9266L45.4331 9.86415C40.3143 7.1779 37.7535 5.83331 35.0002 5.83331C32.2439 5.83331 29.686 7.17498 24.5643 9.86415L18.731 12.9266C12.5943 16.1466 9.456 17.7916 7.69434 20.6266L35.0002 35L62.306 20.6296C60.5385 17.7916 57.406 16.1466 51.2664 12.9266Z" fill="#C58700" />
            <path opacity="0.5" d="M62.4254 20.825L62.3058 20.6296L35 35V64.1667C37.7533 64.1667 40.3142 62.825 45.4358 60.1358L51.2692 57.0733C57.5429 53.7804 60.6812 52.1354 62.4254 49.175C64.1667 46.2175 64.1667 42.5337 64.1667 35.175V34.8337C64.1667 27.4692 64.1667 23.7825 62.4254 20.825Z" fill="#C58700" />
            <path d="M18.4421 13.0783L18.7338 12.9267L23.0884 10.64L49.63 25.2379L61.3696 19.3725C61.7682 19.8236 62.1202 20.3078 62.4254 20.825C62.8629 21.5658 63.1896 22.3533 63.4346 23.2313L51.7709 29.0617V37.9167C51.7709 38.4968 51.5404 39.0532 51.1302 39.4635C50.7199 39.8737 50.1635 40.1042 49.5834 40.1042C49.0032 40.1042 48.4468 39.8737 48.0366 39.4635C47.6263 39.0532 47.3959 38.4968 47.3959 37.9167V31.2492L37.1875 36.3533V63.8867C36.4731 64.0719 35.7381 64.166 35 64.1667C34.2767 64.1667 33.5621 64.0733 32.8125 63.8867V36.3533L6.56836 23.2283C6.81336 22.3533 7.14003 21.5658 7.57753 20.825C7.88086 20.3078 8.2328 19.8236 8.63336 19.3725L35 32.5558L44.8788 27.6179L18.4421 13.0783Z" fill="#C58700" />
        </svg>
    );

    return (
        <div className="dashboard">
            <div className="dashboard-cards">
                <h2 className="dashboard-title">Dashboard</h2>

                <div className="dashboard-main-layout">
                    {/* Left Section */}
                    <div className="dashboard-left">
                        {/* Upper row: 2 TotalCards side by side */}
                        <div className="dashboard-left-upper">
                            <TotalCard
                                title="Total Order"
                                icon={orderIcon}
                                number="60"
                                showTrend={true}
                                trendText="10 new today"
                                trendIcon={trendIcon}
                                trendType="positive"
                                onSeeMoreClick={() => handleViewAll('Total Order')}
                            />
                            <TotalCard
                                title="Total Customer"
                                icon={customerIcon}
                                number="50"
                                showTrend={true}
                                trendText="Increased by 15%"
                                trendIcon={trendIcon}
                                trendType="positive"
                                onSeeMoreClick={() => handleViewAll('Total Customer')}
                            />
                        </div>

                        {/* Lower row: OrderStatCard taking full width */}
                        <div className="dashboard-left-lower">
                            <OrderStatCard
                                title="Sales Overview"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="45" viewBox="0 0 43 45" fill="none">
                                        <path d="M6.6665 0.52002C5.0089 0.52002 3.41919 1.20905 2.24709 2.43554C1.07498 3.66203 0.416504 5.3255 0.416504 7.06002V44.12H35.8332C37.4908 44.12 39.0805 43.431 40.2526 42.2045C41.4247 40.978 42.0832 39.3145 42.0832 37.58V15.78C42.0832 14.0455 41.4247 12.382 40.2526 11.1555C39.0805 9.92905 37.4908 9.24002 35.8332 9.24002H6.6665C6.11397 9.24002 5.58407 9.01034 5.19337 8.60151C4.80266 8.19268 4.58317 7.63819 4.58317 7.06002C4.58317 6.48185 4.80266 5.92736 5.19337 5.51853C5.58407 5.1097 6.11397 4.88002 6.6665 4.88002H37.9165V0.52002H6.6665ZM33.7498 28.86H27.4998V24.5H33.7498V28.86Z" fill="#02A71A" />
                                    </svg>
                                }
                                number="$84,500"
                                trendText="$10,500 since last Week"
                                trendType="positive"
                                chartData={[70000, 72000, 75000, 73000, 78000, 76000, 79000, 82000, 80000, 81000, 83000, 84500]}
                                chartLineColor="#02A71A"
                                chartFillColor="rgba(2, 167, 26, 0.1)"
                            />
                        </div>
                    </div>

                    {/* Right Section: 3 TotalCards stacked vertically */}
                    <div className="dashboard-right">
                        <TotalCard
                            title="Total Marketers"
                            icon={marketersIcon}
                            number="50"
                            showTrend={false}
                            onSeeMoreClick={() => handleViewAll('Total Marketers')}
                        />
                        <TotalCard
                            title="Total Sellers"
                            icon={salesIcon}
                            number="50"
                            showTrend={false}
                            onSeeMoreClick={() => handleViewAll('Total Sellers')}
                        />
                        <TotalCard
                            title="Total Products"
                            icon={productIcon}
                            number="5000"
                            showTrend={false}
                            onSeeMoreClick={() => window.location.href = "/productlist"}
                        />
                    </div>
                </div>
            </div>

            <div className="item-boxs">
                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Selling Product</h2>
                    </div>
                    <div className="item-box-content">
                        <GridDisplay items={topProducts} type="products" />
                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Selling Product')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Most Popular Company</h2>
                    </div>
                    <div className="item-box-content">
                        <GridDisplay items={topCompanies} type="companies" />
                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Most Popular Company')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Customers</h2>
                    </div>
                    <div className="item-box-content">
                        <UserList
                            users={topCustomers}
                            title="Top Customers"
                            showContact={true}
                            showOrders={true}
                        />

                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Customers')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Marketers</h2>
                    </div>
                    <div className="item-box-content">
                        <UserList
                            users={topMarketers}
                            title="Top Marketers"
                            showContact={true}
                            showOrders={false}
                        />

                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Marketers')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;