import React, { useState } from 'react';
import { Button, Space, Typography, Tooltip, Switch, theme, Badge } from 'antd';
import { 
  DragOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined, 
  ReloadOutlined,
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { ROOM_TYPES, ACCESSORIES } from '../data/accessories';

const { Text, Title } = Typography;

export default function VirtualCanvas({ 
  roomType, 
  wallColor, 
  selectedAccessoryIds, 
  onToggleAccessory,
  accessoryPositions,
  onUpdatePosition,
  onResetPositions
}) {
  const { token } = theme.useToken();
  const [showGrid, setShowGrid] = useState(true);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const activeRoom = ROOM_TYPES.find(r => r.id === roomType);

  // Filter selected accessories
  const activeAccessories = ACCESSORIES.filter(item => 
    selectedAccessoryIds.includes(item.id) && item.rooms.includes(roomType)
  );

  // Drag Handler
  const handleMouseDown = (e, item) => {
    e.preventDefault();
    const element = e.currentTarget;
    const canvasContainer = element.parentElement; // .canvas-container
    const rect = canvasContainer.getBoundingClientRect();
    
    const startX = e.clientX;
    const startY = e.clientY;
    
    // Get initial style values
    const style = window.getComputedStyle(element);
    const initialLeft = parseFloat(style.left) || 0;
    const initialBottom = parseFloat(style.bottom) || 0;
    const initialTop = parseFloat(style.top) || 0;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      const newLeftPx = initialLeft + deltaX;
      const leftPercent = (newLeftPx / rect.width) * 100;
      let clampedLeft = Math.max(0, Math.min(90, leftPercent));
      
      let newPosition = { left: `${clampedLeft.toFixed(1)}%` };

      // Apply contextual vertical constraints based on item type
      if (item.position.top === '0px' || item.id === 'pendant-light') {
        // Ceiling lights only slide horizontally
        newPosition.top = '0px';
      } else if (item.id === 'abstract-art' || item.id === 'globe-sconce') {
        // Wall decor slides on the wall
        const newTopPx = initialTop + deltaY;
        const topPercent = (newTopPx / rect.height) * 100;
        const clampedTop = Math.max(10, Math.min(50, topPercent)); // keep in upper half
        newPosition.top = `${clampedTop.toFixed(1)}%`;
      } else {
        // Floor furniture slides on the floor/bottom base
        const newBottomPx = initialBottom - deltaY;
        const bottomPercent = (newBottomPx / rect.height) * 100;
        const clampedBottom = Math.max(8, Math.min(22, bottomPercent)); // stay on floor/baseboard
        newPosition.bottom = `${clampedBottom.toFixed(1)}%`;
      }

      onUpdatePosition(item.id, newPosition);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Canvas Top Bar Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space direction="vertical" size={2}>
          <Space align="center">
            <Title level={4} style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 600 }}>
              Visualizer Canvas
            </Title>
            <Badge 
              status="processing" 
              text={<Text style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#8c8c8c' }}>Live Preview</Text>} 
            />
          </Space>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Drag objects to position them. Floor items remain on the floor.
          </Text>
        </Space>
        
        <Space size={12}>
          <Space size={6}>
            <Text style={{ fontSize: '12px', color: '#888' }}>Grid Layout:</Text>
            <Switch 
              size="small" 
              checked={showGrid} 
              onChange={setShowGrid} 
              checkedChildren={<EyeOutlined />}
              unCheckedChildren={<EyeInvisibleOutlined />}
            />
          </Space>
          <Button 
            size="small" 
            icon={<ReloadOutlined />} 
            onClick={onResetPositions}
            style={{ borderRadius: '6px', fontSize: '12px' }}
          >
            Reset Layout
          </Button>
        </Space>
      </div>

      {/* Main Room Canvas Container */}
      <div className="canvas-container" id="capture-room-canvas">
        {/* Grid pattern */}
        {showGrid && <div className="canvas-grid" />}

        {/* Room Label Tag */}
        <div className="room-tag-overlay">
          {activeRoom?.name}
        </div>

        {/* Wall Canvas (upper 72%) */}
        <div className="room-wall" style={{ backgroundColor: wallColor }}>
          
          {/* Baseboard divider between wall and floor */}
          <div className="room-baseboard" />
          
          {/* Render Active Accessories */}
          {activeAccessories.map(item => {
            const pos = accessoryPositions[item.id] || item.position;
            const isHovered = hoveredItemId === item.id;
            
            // Build style object combining dimensions and positions
            const style = {
              width: item.position.width,
              height: item.position.height,
              left: pos.left,
              ...((pos.top !== undefined) ? { top: pos.top } : { bottom: pos.bottom }),
            };

            return (
              <div
                key={item.id}
                className="accessory-overlay accessory-enter"
                style={style}
                onMouseDown={(e) => handleMouseDown(e, item)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                {/* Visual indicator of grab state when hovered */}
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-32px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(30, 30, 30, 0.9)',
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 100,
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                      pointerEvents: 'none'
                    }}
                  >
                    <DragOutlined style={{ fontSize: '10px' }} />
                    <span>{item.name} (${item.price})</span>
                  </div>
                )}
                
                {/* SVG Render */}
                <div 
                  style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
              </div>
            );
          })}
        </div>

        {/* Floor Canvas (bottom 28%) */}
        <div className="room-floor" />
      </div>

      {/* Floating Canvas Footer Info */}
      <div 
        style={{ 
          background: '#f9f8f6', 
          border: '1px solid #f0ede9', 
          borderRadius: '12px', 
          padding: '12px 16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}
      >
        <InfoCircleOutlined style={{ color: '#8e7e72', fontSize: '16px' }} />
        <Text type="secondary" style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <strong>UX Suggestion</strong>: The visualizer displays a mock 2.5D environment. Drag accessories horizontally to adjust furniture staging. Ceiling pendant lamps attach strictly to the roof line.
        </Text>
      </div>

    </div>
  );
}
