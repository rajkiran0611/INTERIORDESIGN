import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Modal, message, Typography, Space } from 'antd';
import { CheckCircleOutlined, CompassOutlined } from '@ant-design/icons';
import TopNav from './components/TopNav';
import ControlPanel from './components/ControlPanel';
import VirtualCanvas from './components/VirtualCanvas';
import SummaryPanel from './components/SummaryPanel';
import { ROOM_TYPES, ACCESSORIES } from './data/accessories';

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

export default function App() {
  // --- STATE MANAGEMENT ---
  const [roomType, setRoomType] = useState('living');
  const [wallColor, setWallColor] = useState('#f4ede4');
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState(['nordic-sofa', 'ficus-tree']);
  
  // Custom drag offsets for accessories: { [id]: { left: string, bottom?: string, top?: string } }
  const [accessoryPositions, setAccessoryPositions] = useState({});

  // Reset or adjust compatible accessories when room layout changes
  useEffect(() => {
    // Retain only selected accessories that are compatible with the new room type
    setSelectedAccessoryIds(prev => 
      prev.filter(id => {
        const item = ACCESSORIES.find(a => a.id === id);
        return item && item.rooms.includes(roomType);
      })
    );
    // Reset colors to room defaults to feel natural
    if (roomType === 'bedroom') {
      setWallColor('#cfdac8'); // Sage for bedroom
    } else if (roomType === 'kitchen') {
      setWallColor('#c5d3e0'); // Denim for kitchen
    } else {
      setWallColor('#f4ede4'); // Alabaster for living room
    }
  }, [roomType]);

  // --- HANDLERS ---
  const handleToggleAccessory = (id) => {
    setSelectedAccessoryIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleUpdatePosition = (id, newPosition) => {
    setAccessoryPositions(prev => ({
      ...prev,
      [id]: newPosition
    }));
  };

  const handleResetPositions = () => {
    setAccessoryPositions({});
    message.success('Accessory placements reset to blueprint defaults.');
  };

  // Save Configuration Callback
  const handleSaveConfig = (configData) => {
    Modal.success({
      title: 'Design Configuration Saved',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      okText: 'Done',
      content: (
        <div style={{ marginTop: '12px' }}>
          <p>Your room customization has been successfully cataloged to the dashboard archive.</p>
          <div style={{ background: '#f9f8f6', padding: '12px', borderRadius: '8px', border: '1px solid #f0ede9', fontSize: '12px' }}>
            <strong>Configuration Payload:</strong>
            <pre style={{ margin: '6px 0 0', overflow: 'auto', maxHeight: '120px', fontFamily: 'monospace' }}>
              {JSON.stringify(configData, null, 2)}
            </pre>
          </div>
        </div>
      )
    });
  };

  // Exporters
  const handleExportJSON = () => {
    const activeRoom = ROOM_TYPES.find(r => r.id === roomType);
    const activeAccs = ACCESSORIES.filter(item => 
      selectedAccessoryIds.includes(item.id) && item.rooms.includes(roomType)
    );
    
    const config = {
      appName: 'AuraSpace',
      exportedAt: new Date().toLocaleString(),
      room: {
        type: roomType,
        name: activeRoom?.name,
        baseCost: activeRoom?.basePrice
      },
      wallColor,
      accessories: activeAccs.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        coordinates: accessoryPositions[item.id] || item.position
      })),
      totals: {
        baseCost: activeRoom?.basePrice,
        accCost: activeAccs.reduce((sum, item) => sum + item.price, 0),
        estimatedTotal: (activeRoom?.basePrice || 0) + activeAccs.reduce((sum, item) => sum + item.price, 0)
      }
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `auraspace_${roomType}_setup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    message.success('JSON specification file exported successfully!');
  };

  const handleExportImage = () => {
    Modal.info({
      title: 'Generate Print Spec Sheet',
      content: (
        <div style={{ marginTop: '10px' }}>
          <p>Generating design card for <strong>{ROOM_TYPES.find(r => r.id === roomType)?.name}</strong>.</p>
          <p style={{ fontSize: '12px', color: '#888' }}>
            This action compiles the wall finish specifications and furniture inventory into a printable document template.
          </p>
        </div>
      ),
      okText: 'Open Print Dialog',
      cancelText: 'Cancel',
      closable: true,
      onOk() {
        window.print();
      }
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1e1e1e', // Sleek dark primary accent
          fontFamily: "'Outfit', 'Inter', sans-serif",
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          colorBorder: '#f0ede9'
        },
        components: {
          Tabs: {
            cardBg: '#faf9f7',
            cardHeight: 38,
            titleFontSize: 13
          },
          Collapse: {
            headerPadding: '12px 8px',
            contentPadding: '8px'
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#faf9f6' }}>
        
        {/* Top Navbar */}
        <TopNav 
          onExportImage={handleExportImage}
          onExportJSON={handleExportJSON}
        />

        {/* 3-Column Layout Workspace */}
        <Layout>
          
          {/* Column 1: Left Control Panel Sidebar */}
          <Sider 
            width={340} 
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            style={{ 
              background: '#ffffff',
              borderRight: '1px solid #f0ede9',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              position: 'relative',
              zIndex: 5
            }}
          >
            <ControlPanel 
              roomType={roomType}
              setRoomType={setRoomType}
              wallColor={wallColor}
              setWallColor={setWallColor}
              selectedAccessoryIds={selectedAccessoryIds}
              onToggleAccessory={handleToggleAccessory}
            />
          </Sider>

          {/* Column 2: Center Interactive Virtual Canvas */}
          <Content style={{ padding: '24px 30px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            <VirtualCanvas 
              roomType={roomType}
              wallColor={wallColor}
              selectedAccessoryIds={selectedAccessoryIds}
              onToggleAccessory={handleToggleAccessory}
              accessoryPositions={accessoryPositions}
              onUpdatePosition={handleUpdatePosition}
              onResetPositions={handleResetPositions}
            />
          </Content>

          {/* Column 3: Right Design Summary Sidebar */}
          <Sider 
            width={320} 
            breakpoint="xl"
            collapsedWidth="0"
            trigger={null}
            style={{ 
              background: '#ffffff',
              borderLeft: '1px solid #f0ede9',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              position: 'relative',
              zIndex: 5
            }}
          >
            <SummaryPanel 
              roomType={roomType}
              wallColor={wallColor}
              selectedAccessoryIds={selectedAccessoryIds}
              onToggleAccessory={handleToggleAccessory}
              onSaveConfig={handleSaveConfig}
            />
          </Sider>

        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
