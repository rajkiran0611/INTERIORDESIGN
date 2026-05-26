import React, { useState } from 'react';
import { 
  List, 
  Statistic, 
  Button, 
  Divider, 
  Typography, 
  Space, 
  Progress, 
  InputNumber, 
  theme, 
  Tag, 
  Alert,
  Tooltip,
  Row,
  Col
} from 'antd';
import { 
  ShoppingCartOutlined, 
  DeleteOutlined, 
  SaveOutlined, 
  DollarOutlined,
  SettingOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { ROOM_TYPES, ACCESSORIES } from '../data/accessories';

const { Text, Title } = Typography;

export default function SummaryPanel({ 
  roomType, 
  wallColor, 
  selectedAccessoryIds, 
  onToggleAccessory, 
  onSaveConfig 
}) {
  const { token } = theme.useToken();
  const [budgetLimit, setBudgetLimit] = useState(4000);
  const [isSaving, setIsSaving] = useState(false);

  const activeRoom = ROOM_TYPES.find(r => r.id === roomType);
  const basePrice = activeRoom ? activeRoom.basePrice : 0;

  // Selected accessories details
  const activeAccessories = ACCESSORIES.filter(item => 
    selectedAccessoryIds.includes(item.id) && item.rooms.includes(roomType)
  );

  const accessoriesTotal = activeAccessories.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = basePrice + accessoriesTotal;
  const isOverBudget = grandTotal > budgetLimit;
  const budgetPercentage = Math.min(100, Math.round((grandTotal / budgetLimit) * 100));

  // Simulated Save Handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onSaveConfig({
        roomType,
        wallColor,
        selectedAccessories: activeAccessories.map(item => ({ id: item.id, name: item.name, price: item.price })),
        grandTotal,
        budgetLimit
      });
    }, 1200);
  };

  // Compile summary items for list
  const summaryData = [
    {
      title: 'Base Room Structure',
      value: activeRoom?.name || 'None Selected',
      price: basePrice,
      type: 'room',
      meta: activeRoom?.description
    },
    {
      title: 'Wall Treatment',
      value: wallColor,
      price: 0, // Treated as included in room base
      type: 'color',
      meta: 'Custom color tone coating'
    },
    ...activeAccessories.map(item => ({
      id: item.id,
      title: item.name,
      value: item.category.toUpperCase(),
      price: item.price,
      type: 'accessory',
      meta: item.description
    }))
  ];

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      
      <div>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <ShoppingCartOutlined style={{ color: '#888', fontSize: '16px' }} />
          <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
            Design Summary
          </Title>
        </div>

        {/* Configuration List */}
        <List
          dataSource={summaryData}
          split={true}
          style={{ marginBottom: '20px' }}
          renderItem={(item) => (
            <List.Item
              style={{ padding: '12px 0' }}
              actions={item.type === 'accessory' ? [
                <Tooltip title="Remove accent">
                  <Button 
                    type="text" 
                    danger 
                    size="small" 
                    icon={<DeleteOutlined />} 
                    onClick={() => onToggleAccessory(item.id)}
                  />
                </Tooltip>
              ] : []}
            >
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 600, fontSize: '13px' }}>{item.title}</Text>
                    <Text style={{ fontWeight: 600, fontSize: '13px' }}>
                      {item.price > 0 ? `$${item.price}` : 'Incl.'}
                    </Text>
                  </div>
                }
                description={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    {item.type === 'color' && (
                      <span 
                        style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          background: item.value, 
                          border: '1px solid #d2cfca',
                          display: 'inline-block'
                        }} 
                      />
                    )}
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      {item.value} — {item.meta}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      <div>
        <Divider style={{ margin: '12px 0' }} />

        {/* Budget Limit Config */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Text style={{ fontSize: '12px', fontWeight: 600, color: '#555' }}>Staging Budget Cap</Text>
            <Space size={4}>
              <Text style={{ fontSize: '11px', color: '#888' }}>$</Text>
              <InputNumber
                size="small"
                min={1000}
                max={10000}
                step={500}
                value={budgetLimit}
                onChange={(val) => setBudgetLimit(val || 4000)}
                style={{ width: '75px', borderRadius: '4px', fontSize: '11px' }}
                bordered={false}
              />
            </Space>
          </div>
          
          <Progress 
            percent={budgetPercentage} 
            status={isOverBudget ? 'exception' : 'active'}
            strokeColor={isOverBudget ? token.colorError : '#1e1e1e'}
            showInfo={true}
            size="small"
            format={(percent) => `$${grandTotal} / $${budgetLimit}`}
            style={{ marginBottom: '8px' }}
          />

          {isOverBudget && (
            <Alert
              message="Budget limit exceeded. Consider removing some accent pieces."
              type="warning"
              showIcon
              style={{ padding: '6px 10px', borderRadius: '8px', fontSize: '11px' }}
            />
          )}
        </div>

        <Divider style={{ margin: '12px 0' }} />

        {/* Totals & Primary CTA */}
        <div style={{ background: '#f9f8f6', padding: '16px', borderRadius: '12px', border: '1px solid #f0ede9', marginBottom: '16px' }}>
          <Row gutter={12}>
            <Col span={12}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Base Cost</Text>} 
                value={basePrice} 
                prefix={<span style={{ fontSize: '14px', fontWeight: 500 }}>$</span>}
                valueStyle={{ fontSize: '18px', fontWeight: 700, color: '#444' }}
              />
            </Col>
            <Col span={12}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '11px', textTransform: 'uppercase' }}>Accents</Text>} 
                value={accessoriesTotal} 
                prefix={<span style={{ fontSize: '14px', fontWeight: 500 }}>$</span>}
                valueStyle={{ fontSize: '18px', fontWeight: 700, color: '#444' }}
              />
            </Col>
            <Col span={24}>
              <Divider style={{ margin: '10px 0' }} />
              <Statistic 
                title={<Text style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, color: '#1e1e1e' }}>Estimated Staging Total</Text>} 
                value={grandTotal} 
                prefix={<span style={{ fontSize: '18px', fontWeight: 600 }}>$</span>}
                valueStyle={{ fontSize: '24px', fontWeight: 800, color: '#1e1e1e' }}
              />
            </Col>
          </Row>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          loading={isSaving}
          onClick={handleSave}
          style={{ 
            width: '100%', 
            borderRadius: '10px', 
            height: '46px',
            fontWeight: 600,
            backgroundColor: '#1e1e1e',
            borderColor: '#1e1e1e'
          }}
        >
          Save Configuration
        </Button>
      </div>

    </div>
  );
}
