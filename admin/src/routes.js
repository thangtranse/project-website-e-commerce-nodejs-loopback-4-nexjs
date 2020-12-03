import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayoutProduct';
import NewsProductionView from 'src/viewProducts/news';
import NewsDetailView from 'src/viewProducts/news/detail';
import PageAboutLayout from 'src/viewProducts/page/about';
import PageAgentHubLayout from 'src/viewProducts/page/agentHub';
import PageWriteToUSLayout from 'src/viewProducts/page/writeToUs';
import ItemsProductionView from 'src/viewProducts/product';
import ItemsDetailProductionView from 'src/viewProducts/product/detail';
import AccountView from 'src/viewsAdmin/account/AccountView';
import LoginView from 'src/viewsAdmin/auth/LoginView';
import RegisterView from 'src/viewsAdmin/auth/RegisterView';
import CategoryView from 'src/viewsAdmin/category';
import CustomerListView from 'src/viewsAdmin/customer/CustomerListView';
import NewsView from 'src/viewsAdmin/news';
import NewsCURDView from 'src/viewsAdmin/news/CU';
import NewsListView from 'src/viewsAdmin/news/NewsListView';
import PageView from 'src/viewsAdmin/page';
import PageCURDView from 'src/viewsAdmin/page/CU';
import PageListView from 'src/viewsAdmin/page/PageListView';
import ProductView from 'src/viewsAdmin/product';
import ProductCURDView from 'src/viewsAdmin/product/CU';
import ProductListView from 'src/viewsAdmin/product/ProductListView';
import DashboardView from 'src/viewsAdmin/reports/DashboardView';
import SettingsView from 'src/viewsAdmin/settings/SettingsView';
import SettingWebsiteView from 'src/viewsAdmin/settings/WebsiteView';
import PostView from 'src/viewsAdmin/test/posts-component';
import NotFoundView from './components/Errors/NotFoundView';
// PRODUCTION
import HomeView from './viewProducts/page/home';

// END-PRODUCTION

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      {
        path: 'pages',
        element: <PageView />,
        children: [
          { path: '/', element: <PageListView /> },
          { path: 'edit/:id', element: <PageCURDView /> },
        ]
      },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'menu', element: <DashboardView /> },
      {
        path: 'categories', element: <CategoryView />,
        children: [
          { path: '/', element: <CategoryView /> },
        ]
      },
      {
        path: 'products',
        element: <ProductView />,
        children: [
          { path: '/', element: <ProductListView /> },
          { path: 'create', element: <ProductCURDView urlRoot={`/products`} /> },
          { path: 'edit/:id', element: <ProductCURDView urlRoot={`/products`} /> },
        ]
      },
      {
        path: 'news',
        element: <NewsView />,
        children: [
          { path: '/', element: <NewsListView /> },
          { path: 'create', element: <NewsCURDView /> },
          { path: 'edit/:id', element: <NewsCURDView /> },
        ]
      },
      { path: 'crm', element: <SettingWebsiteView /> },
      { path: 'website', element: <SettingWebsiteView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/test',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: '/blog', element: <NewsProductionView pathDirectProductDefault={'blog/'} /> },
      { path: '/blog/:id', element: <NewsDetailView /> },
      {
        path: '/testimonial', element: <NewsProductionView
          categoriesObject={`TESTIMONIAL`}
          pathDirectProductDefault={'testimonial/'}
          filterPageDefault={{ "type.key": "testimonial" }}
        />
      },
      { path: '/testimonial/:id', element: <NewsDetailView /> },
      { path: '/product', element: <ItemsProductionView /> },
      { path: '/product/:id', element: <ItemsDetailProductionView /> },
      { path: '/destination', element: <ItemsProductionView pathDirectProductDefault={`destination/`} /> },
      { path: '/destination/:id', element: <ItemsDetailProductionView /> },
      { path: '/daily-local-tours', element: <ItemsProductionView filterPageDefault={{ "type.key": "daily-local-tour" }} pathDirectProductDefault={`daily-local-tours/`} /> },
      { path: '/daily-local-tours/:id', element: <ItemsDetailProductionView /> },
      { path: '/unique-experience', element: <ItemsProductionView filterPageDefault={{ "type.key": "unique-experience" }} pathDirectProductDefault={`unique-experience/`} /> },
      { path: '/unique-experience/:id', element: <ItemsDetailProductionView /> },
      { path: '/about-us', element: <PageAboutLayout /> },
      { path: '/write-to-us', element: <PageWriteToUSLayout /> },
      { path: '/agent-hub', element: <PageAgentHubLayout /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/test',
    element: <MainLayout />,
    children: [
      { path: 'post', element: <PostView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/login',
    element: <LoginView />
  }
];

export default routes;
