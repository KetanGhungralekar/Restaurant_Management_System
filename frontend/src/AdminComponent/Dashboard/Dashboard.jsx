import React from 'react';
import styled from 'styled-components';

// Sidebar styling
const Sidebar = styled.aside`
    width: 250px;
    background-color: #2d3748;
    color: #fff;
    padding: 20px;

    h2 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px 0;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            color: #63b3ed;
        }
    }
`;

// Main content area
const MainContent = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #f3f4f6;
    display: flex;
    flex-direction: column;
`;

// Header styling
const Header = styled.header`
    margin-bottom: 20px;

    h1 {
        font-size: 2rem;
        color: #2d3748;
    }

    p {
        color: #718096;
    }
`;

// Dashboard stats container
const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

// 3D effect card styling
const DashboardCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.06);

    h3 {
        color: #2d3748;
        font-size: 1.2rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 1.5rem;
        font-weight: bold;
        color: #4a5568;
    }

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1);
    }
`;

// Main container styling
const DashboardContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const Dashboard = () => {
    return (
        <DashboardContainer>
            {/* Sidebar */}
            {/* <Sidebar>
                <h2>Admin Panel</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Orders</li>
                    <li>Restaurants</li>
                    <li>Revenue</li>
                    <li>Analytics</li>
                    <li>Settings</li>
                </ul>
            </Sidebar> */}

            {/* Main Dashboard Area */}
            <MainContent>
                <Header>
                    <h1>Dashboard</h1>
                    <p>Welcome back, Admin!</p>
                </Header>

                <StatsContainer>
                    {/* Cards with 3D Effect */}
                    <DashboardCard>
                        <h3>Total Orders</h3>
                        <p>3,567</p>
                    </DashboardCard>

                    <DashboardCard>
                        <h3>Revenue</h3>
                        <p>$25,342</p>
                    </DashboardCard>

                    <DashboardCard>
                        <h3>Restaurants</h3>
                        <p>15</p>
                    </DashboardCard>

                    <DashboardCard>
                        <h3>New Customers</h3>
                        <p>1,243</p>
                    </DashboardCard>
                </StatsContainer>
            </MainContent>
        </DashboardContainer>
    );
};
