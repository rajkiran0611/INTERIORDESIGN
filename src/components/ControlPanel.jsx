import React from 'react';
import { 
  Tabs, 
  Collapse, 
  Card, 
  Button, 
  Space, 
  ColorPicker, 
  Typography, 
  Row, 
  Col, 
  Tooltip,
  Tag,
  theme
} from 'antd';
import { 
  PlusOutlined, 
  DeleteOutlined, 
  CheckOutlined, 
  HomeOutlined, 
  BulbOutlined
} from '@ant-design/icons';
import { WALL_COLORS, ROOM_TYPES, ACCESSORIES } from '../data/accessories';

const { Text, Title, Paragraph } = Typography;

export default function ControlPanel({ 
  roomType, 
  setRoomType, 
  wallColor, 
  setWallColor, 
  selectedAccessoryIds, 
  onToggleAccessory 
}) {
  const { token } = theme.useToken();

  // Filter accessories based on active room type
  const roomAccessories = ACCESSORIES.filter(item => item.rooms.includes(roomType));

  const furnitureItems = roomAccessories.filter(item => item.category === 'furniture');
  const lightingItems = roomAccessories.filter(item => item.category === 'lighting');
  const decorItems = roomAccessories.filter(item => item.category === 'plants');

  // Handle color change from AntD ColorPicker
  const handleColorPickerChange = (color) => {
    setWallColor(color.toHexString());
  };

  // Tabs configurations for room types
  const tabItems = ROOM_TYPES.map(room => ({
    key: room.id,
    label: (
      <span style={{ fontSize: '13px', fontWeight: 600 }}>
        {room.name}
      </span>
    )
  }));

  // Render list of accessories as modern cards
  const renderAccessoryCards = (items) => {
    if (items.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '16px', color: '#8c8c8c' }}>
          No items available for this room type.
        </div>
      );
    }

    return (
      <Row gutter={[12, 12]}>
        {items.map(item => {
          const isSelected = selectedAccessoryIds.includes(item.id);
          return (
            <Col span={24} key={item.id}>
              <Card
                size="small"
                hoverable
                className={isSelected ? 'accessory-card-selected' : ''}
                style={{
                  borderRadius: '12px',
                  border: isSelected ? '1px solid #1e1e1e' : '1px solid #f0ede9',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {/* Left: Thumbnail Preview of SVG */}
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      background: '#f9f8f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '4px',
                      border: '1px solid #f0ede9'
                    }}
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />

                  {/* Middle: Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 600, display: 'block', fontSize: '13px' }} ellipsis>
                        {item.name}
                      </Text>
                      <Text style={{ fontWeight: 700, fontSize: '13px', color: '#1e1e1e' }}>
                        ${item.price}
                      </Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '2px' }} ellipsis>
                      {item.description}
                    </Text>
                  </div>

                  {/* Right: Actions */}
                  <div>
                    {isSelected ? (
                      <Button
                        type="primary"
                        danger
                        shape="circle"
                        size="middle"
                        icon={<DeleteOutlined />}
                        onClick={() => onToggleAccessory(item.id)}
                        title="Remove from room"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      />
                    ) : (
                      <Button
                        type="dashed"
                        shape="circle"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => onToggleAccessory(item.id)}
                        title="Add to room"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  };

  // Modern Collapse structure using the items prop
  const collapseItems = [
    {
      key: 'furniture',
      label: (
        <Space size={6}>
          <Text style={{ fontWeight: 600, fontSize: '13px' }}>Furniture Pieces</Text>
          <Tag bordered={false} style={{ fontSize: '10px', borderRadius: '10px' }}>
            {furnitureItems.length}
          </Tag>
        </Space>
      ),
      children: (
        <div style={{ paddingTop: '4px', paddingBottom: '12px' }}>
          {renderAccessoryCards(furnitureItems)}
        </div>
      ),
      style: { borderBottom: '1px solid #f0ede9' }
    },
    {
      key: 'lighting',
      label: (
        <Space size={6}>
          <Text style={{ fontWeight: 600, fontSize: '13px' }}>Designer Lighting</Text>
          <Tag bordered={false} style={{ fontSize: '10px', borderRadius: '10px' }}>
            {lightingItems.length}
          </Tag>
        </Space>
      ),
      children: (
        <div style={{ paddingTop: '4px', paddingBottom: '12px' }}>
          {renderAccessoryCards(lightingItems)}
        </div>
      ),
      style: { borderBottom: '1px solid #f0ede9' }
    },
    {
      key: 'decor',
      label: (
        <Space size={6}>
          <Text style={{ fontWeight: 600, fontSize: '13px' }}>Plants & Accent Decor</Text>
          <Tag bordered={false} style={{ fontSize: '10px', borderRadius: '10px' }}>
            {decorItems.length}
          </Tag>
        </Space>
      ),
      children: (
        <div style={{ paddingTop: '4px', paddingBottom: '12px' }}>
          {renderAccessoryCards(decorItems)}
        </div>
      ),
      style: { borderBottom: '1px solid #f0ede9' }
    }
  ];

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. ROOM TYPE SELECTOR */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <HomeOutlined style={{ color: '#888', fontSize: '15px' }} />
          <Title level={5} style={{ margin: 0, fontSize: '14px', letterSpacing: '0.2px' }}>
            Room Layout
          </Title>
        </div>
        <Tabs 
          activeKey={roomType} 
          onChange={setRoomType} 
          items={tabItems}
          type="card"
          size="small"
          style={{ marginBottom: '8px' }}
        />
        <Paragraph type="secondary" style={{ fontSize: '12px', margin: '4px 0 0' }}>
          {ROOM_TYPES.find(r => r.id === roomType)?.description}
        </Paragraph>
      </div>

      <div style={{ height: '1px', background: '#f0ede9' }} />

      {/* 2. WALL COLORS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <Space align="center" size={8}>
            <span style={{ 
              width: '14px', 
              height: '14px', 
              borderRadius: '3px', 
              background: 'linear-gradient(135deg, #1e1e1e, #888)' 
            }} />
            <Title level={5} style={{ margin: 0, fontSize: '14px' }}>Wall Color Swatch</Title>
          </Space>
          
          <Tooltip title="Custom Wall Color">
            <ColorPicker 
              value={wallColor} 
              onChange={handleColorPickerChange} 
              size="small"
              showText
              allowClear={false}
            />
          </Tooltip>
        </div>

        {/* Grid of Circular Color Swatches */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          {WALL_COLORS.map(color => {
            const isActive = wallColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <Tooltip key={color.id} title={`${color.name} (${color.hex})`}>
                <button
                  className={`color-swatch-btn ${isActive ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setWallColor(color.hex)}
                  aria-label={color.name}
                >
                  {isActive && <CheckOutlined style={{ fontSize: '12px', color: color.id === 'slate' ? '#fff' : '#1e1e1e' }} />}
                </button>
              </Tooltip>
            );
          })}
        </div>
        
        {/* Selected Color Information */}
        {WALL_COLORS.find(c => c.hex.toLowerCase() === wallColor.toLowerCase()) && (
          <div style={{ background: '#f9f8f6', padding: '8px 12px', borderRadius: '8px', border: '1px solid #f0ede9' }}>
            <Text style={{ fontSize: '11px', fontWeight: 600, display: 'block' }}>
              {WALL_COLORS.find(c => c.hex.toLowerCase() === wallColor.toLowerCase())?.name}
            </Text>
            <Text type="secondary" style={{ fontSize: '10px', display: 'block' }}>
              {WALL_COLORS.find(c => c.hex.toLowerCase() === wallColor.toLowerCase())?.description}
            </Text>
          </div>
        )}
      </div>

      <div style={{ height: '1px', background: '#f0ede9' }} />

      {/* 3. ACCESSORIES COLLAPSE */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <BulbOutlined style={{ color: '#888', fontSize: '15px' }} />
          <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
            Accents & Furnishings
          </Title>
        </div>

        <Collapse 
          defaultActiveKey={['furniture']} 
          ghost 
          expandIconPosition="end"
          style={{ 
            background: 'transparent',
            margin: '0 -8px'
          }}
          items={collapseItems}
        />
      </div>

    </div>
  );
}
