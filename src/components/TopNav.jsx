import React from 'react';
import { Layout, Button, Avatar, Space, Typography, Tooltip, Dropdown, theme } from 'antd';
import { 
  DownloadOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  CodeOutlined,
  CompassOutlined,
  BellOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

export default function TopNav({ onExportImage, onExportJSON }) {
  const { token } = theme.useToken();

  const exportMenuItems = [
    {
      key: 'image',
      label: 'Export as Image',
      icon: <DownloadOutlined />,
      onClick: onExportImage
    },
    {
      key: 'json',
      label: 'Download Config (JSON)',
      icon: <CodeOutlined />,
      onClick: onExportJSON
    }
  ];

  return (
    <Header
      style={{
        background: '#ffffff',
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Brand Logo */}
      <Space align="center" size={12}>
        <div
          style={{
            background: token.colorPrimary,
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
          }}
        >
          <CompassOutlined style={{ fontSize: '20px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
          <Text style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1e1e1e', letterSpacing: '-0.3px' }}>
            AuraSpace
          </Text>
          <Text type="secondary" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Virtual Studio
          </Text>
        </div>
      </Space>

      {/* Action Controls & Profile */}
      <Space size={18}>
        <Tooltip title="Notifications">
          <Button 
            type="text" 
            shape="circle" 
            icon={<BellOutlined style={{ fontSize: '16px' }} />} 
            style={{ color: '#555' }}
          />
        </Tooltip>

        <Dropdown menu={{ items: exportMenuItems }} placement="bottomRight" arrow>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            style={{ 
              borderRadius: '8px', 
              fontWeight: 500,
              backgroundColor: '#1e1e1e',
              borderColor: '#1e1e1e'
            }}
          >
            Export Design
          </Button>
        </Dropdown>

        <div style={{ borderLeft: '1px solid #f0ede9', height: '24px' }} />

        <Space size={8} style={{ cursor: 'pointer' }}>
          <Avatar 
            size={36} 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: '#eae6df', 
              color: '#5c5246',
              border: '1.5px solid #d2cfca'
            }} 
          />
          <div style={{ display: 'none', flexDirection: 'column', lineHeight: 1.1 }} className="profile-name">
            <Text style={{ fontSize: '13px', fontWeight: 600 }}>Alex Chen</Text>
            <Text type="secondary" style={{ fontSize: '10px' }}>Lead Architect</Text>
          </div>
        </Space>
      </Space>
    </Header>
  );
}
