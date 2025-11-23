// src/ui/components/dashboard/dashboard.tsx
'use client';

import React, { useState } from 'react';
import { Layout, Menu, Card, Typography } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import DashboardSection from './sections/DashboardSection';
import UsersSection from './sections/UsersSection';

const { Sider, Content } = Layout;
const { Text } = Typography;

type MenuKey = 'dashboard' | 'users' | 'orders' | 'stats' | 'settings';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('dashboard');

  return (
    <Layout style={{ width: '100%', height: '100vh' }}>
      <Sider width={220} theme="dark">
        <div className="h-16 flex items-center px-4 text-white font-semibold text-lg">
          Fitloop Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          onClick={(e) => setActiveMenu(e.key as MenuKey)}
          items={[
            { key: 'dashboard', icon: <HomeOutlined />, label: '대시보드' },
            { key: 'users', icon: <UserOutlined />, label: '사용자 관리' },
            { key: 'orders', icon: <ShoppingCartOutlined />, label: '주문 관리' },
            { key: 'stats', icon: <BarChartOutlined />, label: '통계' },
            { key: 'settings', icon: <SettingOutlined />, label: '환경설정' },
          ]}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            padding: 16,
            overflow: 'auto',
            background: '#f5f5f5',
          }}
        >
          {activeMenu === 'dashboard' && <DashboardSection />}
          {activeMenu === 'users' && <UsersSection />}

          {activeMenu === 'orders' && (
            <Card>
              <Text type="secondary">주문 관리 화면은 추후 연동 예정</Text>
            </Card>
          )}

          {activeMenu === 'stats' && (
            <Card>
              <Text type="secondary">통계 화면은 추후 연동 예정</Text>
            </Card>
          )}

          {activeMenu === 'settings' && (
            <Card>
              <Text type="secondary">환경설정 화면은 추후 연동 예정</Text>
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
